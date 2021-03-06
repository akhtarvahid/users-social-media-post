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
      createdAt: Date()
    });

    return this.postRepository.save(post);
  }

  async posts(): Promise<PostEntity[]> {
    return this.postRepository.find();
  }

  async postsCreatedByUser(id: string): Promise<PostEntity[]> {
    const posts = await this.posts();
    return posts.filter(post => post.userId === id);
  }
}
