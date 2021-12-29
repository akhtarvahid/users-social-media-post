import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { PostType } from 'src/post/post.graphql';

@ObjectType()
export class UserType {
  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  workAt: string;

  @Field()
  designation: string;

  @Field(() => [PostType])
  userPosts: string[];
}

@InputType()
export class CreateUserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  workAt?: string;

  @Field()
  designation?: string;

  @IsUUID('4', { each: true })
  @Field(() => [ID], { defaultValue: [] })
  userPosts: string[];
}

@InputType()
export class DeleteUserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  workAt?: string;

  @Field()
  designation?: string;
}

@InputType()
export class AssignPostsToUser {
  @IsUUID()
  @Field((type) => ID)
  userId: string;

  @IsUUID('4', { each: true })
  @Field((type) => [ID])
  userPostIds: string[];
}
