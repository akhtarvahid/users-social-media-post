import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUUID, MinLength } from 'class-validator';
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
  @IsNotEmpty()
  @MinLength(1)
  firstName: string;

  @Field()
  @IsNotEmpty()
  @MinLength(1)
  lastName: string;

  @Field()
  @IsOptional()
  workAt: string;

  @Field()
  @IsOptional()
  designation?: string;

  @IsUUID('4', { each: true })
  @Field(() => [ID], { defaultValue: [] })
  userPosts: string[];
}

// Add validation for required and not required field
@InputType()
export class UpdateUserInput {
  @Field()
  @IsOptional()
  firstName: string;

  @Field()
  @IsOptional()
  lastName: string;

  @Field()
  @IsOptional()
  workAt?: string;

  @Field()
  @IsOptional()
  designation?: string;
}

@ObjectType()
export class DeleteUserResponseType {
  @Field()
  message: string;
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
