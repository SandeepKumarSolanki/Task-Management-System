import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import bcrypt from 'bcryptjs';
import { UnauthorizedException, ConflictException } from '@nestjs/common';
import { TaskStatus } from 'src/modules/tasks/task-status/task-status.model';
import { TaskAssignment } from 'src/modules/tasks/task_assignments.model';
import { Task } from 'src/modules/tasks/task/task.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,

    @InjectModel(Task)
    private taskModel: typeof Task,

    @InjectModel(TaskAssignment)
    private taskAssignmentModel: typeof TaskAssignment,

    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const existingUser = await this.userModel.findOne({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = await this.userModel.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role_id: null,
      department_id: null,
      designation_id: null,
    } as any);

    const { password, ...user } = newUser.toJSON();

    const payload = {
      id: newUser.id,
      email: newUser.email,
      role_id: newUser.role_id,
      department_id: newUser.department_id,
      designation_id: newUser.designation_id,
      isactive: 1,
      delete_at: null,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'User signup successfully',
      accessToken,
      user,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { password, ...userWithoutPassword } = user.toJSON();

    const payload = {
      id: user.id,
      email: user.email,
      role_id: user.role_id,
      department_id: user.department_id,
      designation_id: user.designation_id,
      is_active: 1,
      deleted_at: 0,
    } as any;

    const token = this.jwtService.sign(payload);

    return {
      message: 'User Login successfully',
      token,
      user: userWithoutPassword,
    };
  }

  async getMyTasks(userId: number) {
    const tasks = await this.taskModel.findAll({
      include: [
        {
          model: TaskAssignment,
          required: true,
          include: [
            {
              model: User,
              as: 'developer',
              attributes: ['id', 'name'],
            },
            {
              model: User,
              as: 'teamLeader',
              attributes: ['id', 'name'],
            },
          ],
          where: {
            developer_id: userId,
          },
        },
        {
          model: TaskStatus,
          attributes: ['id', 'name', 'code'],
        },
      ],
    });

    return tasks;
  }

  async markTaskCompleted(userId: number, taskId: number) {
    const assignment = await this.taskAssignmentModel.findOne({
      where: {
        task_id: taskId,
        developer_id: userId,
      },
    });

    if (!assignment) {
      throw new ForbiddenException('You are not assigned to this task');
    }

    const task = await this.taskModel.findByPk(taskId);

    if (!task) {
      throw new ForbiddenException('Task not found');
    }

    task.status_id = 4; 
    await task.save();

    return {
      message: 'Task marked as completed',
    };
  }

}
