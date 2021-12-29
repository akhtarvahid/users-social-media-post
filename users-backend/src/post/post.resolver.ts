import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreatePostInput, PostType } from './post.graphql';
import { PostService } from './post.service';

@Resolver(() => PostType)
export class PostResolver {
  @Inject() postService: PostService;

  @Mutation(() => PostType)
  createPost(@Args('createPost') createPostInput: CreatePostInput) {
    return this.postService.createPost(createPostInput);
  }

  @Query(() => [PostType])
  getPosts() {
    return this.postService.posts();
  }
}
