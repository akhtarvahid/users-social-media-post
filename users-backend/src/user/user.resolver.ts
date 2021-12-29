import { Inject } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PostService } from 'src/post/post.service';
import { UserEntity } from './user.entity';
import { AssignPostsToUser, CreateUserInput, UserType } from './user.graphql';
import { UserService } from './user.service';

@Resolver(() => UserType)
export class UserResolver {
  @Inject() userService: UserService;
  @Inject() postService: PostService;

  @Mutation(() => UserType)
  createUser(@Args('createUserData') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }

  @Query(() => [UserType])
  users() {
    return this.userService.getUsers();
  }
  @Query(() => UserType)
  user(@Args('userId') userId: string) {
    return this.userService.getUser(userId);
  }

  @Mutation(() => UserType)
  deleteUser(@Args('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Mutation(() => UserType)
  assignPostsToUser(
    @Args('assignPostsToUser') assignPostsToUser: AssignPostsToUser,
  ) {
    const { userId, userPostIds } = assignPostsToUser;
    return this.userService.assignPostsToUser(userId, userPostIds);
  }

  @ResolveField()
  userPosts(@Parent() user: UserEntity) {
    return this.postService.getManyPosts(user.userPosts);
  }
}
