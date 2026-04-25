import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
  Param,
  Header,
  Headers,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Throttle } from '@nestjs/throttler';
import type { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Throttle(
    {
      default: 
      { 
        limit: 3, 
        ttl: 60000
      }
    }
  )
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.usersService.signup(signupDto);
  }

  @Throttle(
    {
      default: {
        limit: 3,
        ttl: 60000,
      }
    }
  )
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
    @Headers('x-device-id') deviceId: string,
  ) {
    return this.usersService.login(loginDto, req, deviceId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-tasks')
  async getMyTasks(@Req() req) {
    return this.usersService.getMyTasks(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('complete/:taskId/:userId')
  markTaskCompleted(
    @Param('taskId') taskId: number,
    @Param('userId') userId: number,
  ) {
    return this.usersService.markTaskCompleted(userId, taskId);
  }

  @Get('dashboard')
  async getAllInfo() {
    return this.usersService.getAllTaskInfoDetail();
  }

}
