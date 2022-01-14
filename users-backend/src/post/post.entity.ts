import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class PostEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column(() => UserEntity)
  users: UserEntity;

  @Column()
  title: string;

  @Column()
  votes: number;
}
