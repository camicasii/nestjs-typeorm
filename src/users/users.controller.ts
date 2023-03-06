import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/createProfile.dto copy';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { Users } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private userService: Users) {}
  @Post()
  createUser(@Body() user: CreateUserDto): Promise<User | HttpException> {
    return this.userService.createdUser(user);
  }
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deletedUser(id);
  }
  @Post(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: CreateUserDto,
  ) {
    return this.userService.updatedUser(id, user);
  }

  @Put(':id')
  putUser(@Param('id', ParseIntPipe) id: number, @Body() user: CreateUserDto) {
    return this.userService.updatedUser(id, user);
  }

  @Post(':id/profile')
  createProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() profile: CreateProfileDto,
  ) {
    return this.userService.createProfile(id, profile);
  }
}
