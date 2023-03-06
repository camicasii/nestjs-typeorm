import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    private userService: Users,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}
  create(createPostDto: CreatePostDto) {
    const userFound = this.userService.getUser(createPostDto.authorId);
    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const newPost = this.postRepository.create(createPostDto);
    return this.postRepository.save(newPost);
    return `This action adds a new post`;
  }

  findAll() {
    return this.postRepository.find({
      relations: ['author'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
