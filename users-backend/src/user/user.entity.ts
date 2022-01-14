import { PostEntity } from 'src/post/post.entity';
import { Column, Entity, ObjectIdColumn, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  workAt: string;

  @Column()
  designation: string;

  @Column()
  @OneToMany(() => PostEntity, postEntity=> postEntity.users)
  userPosts: PostEntity[];
}
