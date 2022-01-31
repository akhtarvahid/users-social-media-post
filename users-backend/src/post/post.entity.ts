import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class PostEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column(() => UserEntity)
  @ManyToOne(() => UserEntity, userEntity=> userEntity.userPosts)
  users: UserEntity;

  @Column()
  title: string;

  @Column()
  votes: number;

  @Column()
  createdAt: Date;
}
