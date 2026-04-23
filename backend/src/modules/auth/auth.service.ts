import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Sequelize } from 'sequelize';
import { User } from '../employees/users/users.model';
import { Role } from '../organization/roles/roles.model';
import { Department } from '../organization/departments/departments.model';
import { Designation } from '../organization/designations/designations.model';
import { JwtService } from '@nestjs/jwt';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AssignUserDto } from './dto/assign-user.dto';
import { Task } from '../tasks/task/task.model';
import { successResponse } from 'src/common/interfaces/api-response.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,

    @InjectModel(Role)
    private roleModel: typeof Role,

    @InjectModel(Department)
    private departmentModel: typeof Department,

    @InjectModel(Designation)
    private designationModel: typeof Designation,

    @InjectModel(Task)
    private taskModel: typeof Task,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async adminLogin(dto: AdminLoginDto) {
    const ADMIN_EMAIL = this.configService.get<string>('ADMIN_EMAIL');
    const ADMIN_PASSWORD = this.configService.get<string>('ADMIN_PASSWORD');

    if (dto.email !== ADMIN_EMAIL || dto.password !== ADMIN_PASSWORD) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: 1,
      email: ADMIN_EMAIL,
      department_id: null,
      role_id: 1,
      designation_id: null,
      is_active: 1,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'Admin login successful',
      accessToken,
      user: payload,
    };
  }

  async assignUserRole(id: number, dto: AssignUserDto) {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new NotFoundException('User not found');

    // Validate role exists and is active
    const role = await this.roleModel.findByPk(dto.role_id);
    if (!role || !role.is_active)
      throw new BadRequestException('Invalid or inactive role');

    // Validate department if provided
    if (dto.department_id) {
      const department = await this.departmentModel.findByPk(dto.department_id);
      if (!department || !department.is_active || department.is_deleted) {
        throw new BadRequestException('Invalid or inactive department');
      }
    }

    // Validate designation if provided and ensure it matches department
    if (dto.designation_id) {
      const designation = await this.designationModel.findByPk(
        dto.designation_id,
        {
          include: [this.departmentModel],
        },
      );
      if (!designation) throw new BadRequestException('Invalid designation');

      // Ensure designation belongs to the selected department
      if (
        dto.department_id &&
        designation.department_id !== dto.department_id
      ) {
        throw new BadRequestException(
          'Designation does not belong to the selected department',
        );
      }

      // Set department_id from designation if not provided
      if (!dto.department_id) {
        dto.department_id = designation.department_id;
      }
    }

    // Special handling for Admin role
    if (role.slug === 'admin') {
      // Check confirmation
      if (!dto.admin_confirmation || dto.admin_confirmation !== 'CONFIRMED') {
        throw new BadRequestException(
          'Admin role assignment requires explicit confirmation',
        );
      }

      // Ensure only one admin exists (excluding the current user if they're already admin)
      const existingAdmins = await this.userModel.count({
        where: { role_id: role.id, id: { [Op.ne]: id } },
      });
      if (existingAdmins > 0) {
        throw new BadRequestException(
          'Only one admin is allowed in the system',
        );
      }

      // Clear department and designation for admin
      dto.department_id = null;
      dto.designation_id = null;
    }

    // For Manager and Team Leader roles, ensure department is set
    if (['manager', 'team_leader'].includes(role.slug) && !dto.department_id) {
      // 2=Manager, 3=Team Leader
      throw new BadRequestException(
        'Department is required for Manager and Team Leader roles',
      );
    }

    // Log the assignment for audit
    console.log(
      `User ${id} assigned role ${dto.role_id}, dept ${dto.department_id}, designation ${dto.designation_id} at ${new Date()}`,
    );

    await user.update({
      role_id: dto.role_id,
      department_id: dto.department_id,
      designation_id: dto.designation_id,
      is_active: dto.is_active ?? true, // Default to active if not specified
    });

    const { password, ...updatedUser } = user.toJSON();

    return {
      message: 'User assigned successfully',
      user: updatedUser,
    };
  }

  async getUsers() {
    return this.userModel.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  async getUserById(id: number) {
    const user = await this.userModel.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUser(id: number, dto: Partial<AssignUserDto>) {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new NotFoundException('User not found');
    await user.update(dto);
    const { password, ...updatedUser } = user.toJSON();
    return {
      message: 'User updated successfully',
      user: updatedUser,
    };
  }

  async deleteUser(id: number) {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new NotFoundException('User not found');
    await user.destroy();
    return {
      message: 'User deleted successfully',
    };
  }

  async getAllTaskInfoDetail() {
    // total tasks
    console.log("Dashboard")
    const totalTasks = await this.taskModel.count();

    // status wise count
    const statusCounts = await this.taskModel.findAll({
      attributes: [
        'status_id',
        [Sequelize.fn('COUNT', Sequelize.col('status_id')), 'count'],
      ],
      group: ['status_id'],
      raw: true,
    });

    // convert array → object
    const statusMap: any = {};

    statusCounts.forEach((item: any) => {
      statusMap[item.status_id] = Number(item.count);
    });

    return successResponse("Task Info Page",  {
      totalTasks,
      pending: statusMap[1] || 0,
      inProgress: statusMap[2] || 0,
      inReview: statusMap[3] || 0,
      completed: statusMap[4] || 0,
      rejected: statusMap[5] || 0,
    })
  }
}
