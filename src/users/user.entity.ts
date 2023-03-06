import { Post } from 'src/posts/entities/post.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Profile } from './profile.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAT: Date;
  @Column({ default: 'local' })
  authStrategy: string;
  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
