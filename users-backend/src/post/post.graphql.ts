import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostType {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  votes: number;
}

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  votes: number;
}
