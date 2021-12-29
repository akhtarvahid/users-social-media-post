import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { CreatePostInput } from './post.graphql';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async createPost(createPostInput: CreatePostInput): Promise<PostEntity> {
    const post = this.postRepository.create({
      id: uuid(),
      ...createPostInput,
    });

    return this.postRepository.save(post);
  }

  async posts(): Promise<PostEntity[]> {
    return this.postRepository.find();
  }

  async getManyPosts(postIds: string[]): Promise<PostEntity[]> {
    return this.postRepository.find({
      where: {
        id: {
          $in: postIds,
        },
      },
    });
  }
}
