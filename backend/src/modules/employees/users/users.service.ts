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
import { Sequelize } from 'sequelize-typescript';
import { Device } from 'src/models/devices.model';
import { Session } from 'src/models/sessions.model';
import { UserLogHistory } from 'src/models/user-log-history.model';
import { parseDevice } from 'src/common/utils/device.util';

import { Request } from 'express';
import { v4 as uuid } from 'uuid';
import { getClientIp } from 'src/common/utils/ip.util';



@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,

    @InjectModel(Task)
    private taskModel: typeof Task,

    @InjectModel(TaskAssignment)
    private taskAssignmentModel: typeof TaskAssignment,

    @InjectModel(Device)
    private deviceModel: typeof Device,

    @InjectModel(Session)
    private sessionModel: typeof Session,

    @InjectModel(UserLogHistory)
    private userLogHistoryModel: typeof UserLogHistory,

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

  async login(dto: LoginDto, req: Request, deviceId: string) {
    console.log("Login Dto", dto)
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

    // ======================
    // 3. DEVICE INFORMATION
    // ======================
    const userAgent = req.headers['user-agent'] || '';
    const ip = getClientIp(req);
    // const ip = req.ip;

    const deviceInfo = parseDevice(userAgent);

    // ======================
    // 4. FIND / CREATE DEVICE
    // ======================
    let device = await this.deviceModel.findOne({
      where: {
        user_id: user.id,
        device_id: deviceId,
      },
    });

    if (!device) {
      device = await this.deviceModel.create({
        user_id: user.id,
        device_id: deviceId,
        ...deviceInfo,
        ip_address: ip,
        user_agent: userAgent,
        last_login_at: new Date(),
      });
    } else {
      await device.update({
        last_login_at: new Date(),
        ip_address: ip,
      });
    }

    // ======================
    // 5. LOGOUT OLD SESSION (SAME DEVICE)
    // ======================
    await this.sessionModel.update(
      {
        is_active: false,
        logout_at: new Date(),
      },
      {
        where: {
          user_id: user.id,
          device_id: device.id,
          is_active: true,
        },
      },
    );

    // ======================
    // 6. JWT PAYLOAD
    // ======================
    const payload = {
      id: user.id,
      email: user.email,
      role_id: user.role_id,
      department_id: user.department_id,
      designation_id: user.designation_id,
      is_active: user.is_active,
    };

    const accessToken = this.jwtService.sign(payload);

    const refreshToken = uuid();

    // ======================
    // 7. CREATE SESSION
    // ======================
    await this.sessionModel.create({
      user_id: user.id,
      device_id: device.id,
      access_token: accessToken,
      refresh_token: refreshToken,
      ip_address: ip,
      is_active: true,
      login_at: new Date(),
    });

    // ======================
    // 8. USER LOG HISTORY
    // ======================
    await this.userLogHistoryModel.create({
      user_id: user.id,
      device_id: device.id,
      action: 'USER_LOGIN',
      ip_address: ip,
      description: 'User logged in successfully',
    });

    // ======================
    // 9. RESPONSE
    // ======================
    return {
      message: 'User Login Successfully',
      accessToken,
      refreshToken,
      user: userWithoutPassword,
    };
  }

  // async login(dto: LoginDto) {
  //   const user = await this.userModel.findOne({
  //     where: { email: dto.email },
  //   });

  //   if (!user) {
  //     throw new UnauthorizedException('Invalid email or password');
  //   }

  //   const isPasswordValid = await bcrypt.compare(dto.password, user.password);

  //   if (!isPasswordValid) {
  //     throw new UnauthorizedException('Invalid email or password');
  //   }

  //   const { password, ...userWithoutPassword } = user.toJSON();

  //   const payload = {
  //     id: user.id,
  //     email: user.email,
  //     role_id: user.role_id,
  //     department_id: user.department_id,
  //     designation_id: user.designation_id,
  //     is_active: 1,
  //     deleted_at: 0,
  //   } as any;

  //   const token = this.jwtService.sign(payload);

  //   return {
  //     message: 'User Login successfully',
  //     token,
  //     user: userWithoutPassword,
  //   };
  // }

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

    // task.status_id = 4;
    task.status_id = 3;
    await task.save();

    return {
      message: 'Task marked as completed',
    };
  }

  async getAllTaskInfoDetail() {
    // total tasks
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

    return {
      totalTasks,

      pending: statusMap[1] || 0,
      inProgress: statusMap[2] || 0,
      inReview: statusMap[3] || 0,
      completed: statusMap[4] || 0,
      rejected: statusMap[5] || 0,
    };
  }
}
