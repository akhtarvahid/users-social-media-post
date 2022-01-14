import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UserType } from 'src/user/user.graphql';

@ObjectType()
export class PostType {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field(() => UserType)
  users: UserType

  @Field()
  title: string;

  @Field()
  votes: number;
}

@InputType()
export class CreatePostInput {
  @Field()
  userId: string;

  @Field()
  title: string;

  @Field()
  votes: number;
}
