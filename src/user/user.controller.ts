// user/user.controller.ts
import { Controller, Get, Param, UseGuards, Request, Patch, Body, Delete } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard'; // Import the JwtAuthGuard
import { RoleGuard } from '../auth/guard/';
import { UpdateUserDto } from './dto/';
import { UserService } from './user.service'; // Import the UserService
import { Role } from 'src/auth/role';
import { Roles } from '../auth/decorator';
import { BookingService } from '../booking/booking.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly bookingService: BookingService
    ) {}

    @Get('all')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.Admin)
    getAll() {
      return this.userService.getAllUsers();
    }
    
  @Get()
  @UseGuards(JwtGuard)
  getSelf(@Request() req) {
    const user = req.user;
    const id = user.id;
    let result = this.userService.findOne(id);
    return result;
  }
  
  @Get("booking")
  @UseGuards(JwtGuard)
  async getUserBookings(
    @Request() request
  ) {
    const user = await request.user
    return this.bookingService.getAllBookingsForUser(user);
  }

  @Get(':id')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.Admin)
  getUserById(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post(':id/promote')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.Admin)
  async promoteUser(@Param('id') id: number) {
    return this.userService.promoteUser(id);
  }

  @Post(':id/demote')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.Admin)
  async demoteUser(@Param('id') id: number) {
    return this.userService.demoteUser(id);
  }

  @Get(':id/booking')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.Admin)
  async getBookings(@Param('id') userId: number) {
    const user = await this.userService.findOne(userId)
    return this.bookingService.getAllBookingsForUser(user)
  }

  @Patch("")
  @UseGuards(JwtGuard)
  updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const user = req.user;
    const id = user.id;
    return this.userService.updateSelf(id, updateUserDto);
  }

  @Patch(':id')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.Admin)
   updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(id, updateUserDto);
    }

  @Delete(':id')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.Admin)
  deleteUser(@Param('id') id: number) {
        return this.userService.remove(id);
    }

  @Delete('')
  @UseGuards(JwtGuard)
  deleteSelf(@Request() req) {
    const user = req.user;
    const id = user.id;
    let result = this.userService.remove(id);
    return result;
  }

}