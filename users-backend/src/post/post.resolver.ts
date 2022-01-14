import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from 'src/user/user.service';
import { PostEntity } from './post.entity';
import { CreatePostInput, PostType } from './post.graphql';
import { PostService } from './post.service';

@Resolver(() => PostType)
export class PostResolver {
  @Inject() postService: PostService;
  @Inject() userService: UserService;

  @Mutation(() => PostType)
  createPost(@Args('createPost') createPostInput: CreatePostInput) {
    return this.postService.createPost(createPostInput);
  }

  @Query(() => [PostType])
  getPosts() {
    return this.postService.posts();
  }

  @ResolveField()
  users(@Parent() user: PostEntity) {
    return this.userService.getUser(user.userId);
  }
}
