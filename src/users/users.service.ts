import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProfileDto } from './dto/createProfile.dto copy';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/user.dto';
import { Profile } from './profile.entity';
import { User } from './user.entity';

@Injectable()
export class Users {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  async createdUser(user: CreateUserDto): Promise<User | HttpException> {
    const userFound = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });
    if (userFound)
      return new HttpException('User already exists', HttpStatus.CONFLICT);
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
  getUser(id: number): Promise<User> {
    return this.userRepository.findOne({
      relations: ['profile', 'posts'],
      where: {
        id,
      },
    });
  }
  getUsers(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['profile', 'posts'],
    });
  }
  async deletedUser(id: number): Promise<DeleteResult | HttpException> {
    const result = await this.userRepository.delete({ id });
    if (result.affected === 0)
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    return result;
  }
  async updatedUser(
    id: number,
    user: UpdateUserDto,
  ): Promise<any | HttpException> {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!userFound)
      return new HttpException('User not found', HttpStatus.NOT_FOUND);

    const updateUser = Object.assign(userFound, user);
    return this.userRepository.save(updateUser);
  }
  async createProfile(
    id: number,
    profile: CreateProfileDto,
  ): Promise<Profile | HttpException> {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    console.log(userFound);
    if (!userFound)
      return new HttpException('User not found', HttpStatus.NOT_FOUND);

    const savedProfile = await this.profileRepository.save(profile);
    userFound.profile = savedProfile;
    await this.userRepository.save(userFound);
  }
}
