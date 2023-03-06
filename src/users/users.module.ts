import { Module } from '@nestjs/common';
import { Users } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Profile } from './profile.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  providers: [Users],
  controllers: [UsersController],
  exports: [Users],
})
export class UsersModule {}
