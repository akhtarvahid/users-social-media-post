import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
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
  @IsEmail()
  email: string;

  @Field()
  locatedAt: string;

  @Field()
  workAt: string;

  @Field()
  designation: string;

  @Field(() => [PostType])
  userPosts: PostType[];
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
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsOptional()
  locatedAt: string;

  @Field()
  @IsOptional()
  workAt: string;

  @Field()
  @IsOptional()
  designation?: string;
}

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
  locatedAt: string;

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
