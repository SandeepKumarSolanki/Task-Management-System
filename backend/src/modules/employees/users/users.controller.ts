import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.usersService.signup(signupDto);
  }
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
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
}
