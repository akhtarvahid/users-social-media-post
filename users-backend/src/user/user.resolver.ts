import { Inject } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
} from '@nestjs/graphql';
import { PostService } from 'src/post/post.service';
import { CreateUserInput, DeleteUserResponseType, UpdateUserInput, UserType } from './user.graphql';
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

  @Mutation(() => DeleteUserResponseType)
  deleteUser(@Args('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Mutation(() => UserType)
  updateUser(
   @Args('id') id: string, 
   @Args('updateUserInput') updateUserInput: UpdateUserInput){
    return this.userService.updateUser(id, updateUserInput);
  }

  @ResolveField()
  userPosts() {
    return this.postService.posts();
  }
}
