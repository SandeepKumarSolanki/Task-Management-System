import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  DefaultValuePipe,
  Param,
  Post,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AssignUserDto } from './dto/assign-user.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin-login')
  async adminLogin(@Body() adminLoginDto: AdminLoginDto) {
    return this.authService.adminLogin(adminLoginDto);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('dashboard')
  async getAllTaskInfo() {
    console.log("Dashboard Detail Api Hit")
    return this.authService.getAllTaskInfoDetail();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('assign-role/:id')
  async assignRole(
    @Param('id') id: Number,
    @Body() assignUserDto: AssignUserDto,
  ) {
    return this.authService.assignUserRole(Number(id), assignUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getUsers() {
    return this.authService.getUsers();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.authService.getUserById(id);
  }

  //   @Patch(':id')
  //   updateUser(@Param('id') id: number, @Body() dto: UpdateUserDto) {
  //     return this.authService.updateUser(id, dto);
  //   }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.authService.deleteUser(id);
  }

  

}
