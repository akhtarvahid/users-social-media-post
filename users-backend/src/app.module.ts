import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { PostEntity } from './post/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/user-db',
      synchronize: true, // use only for dev environment
      useUnifiedTopology: true,
      port: 27017,
      entities: [UserEntity, PostEntity],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'users-schema.gql',
    }),
    UserModule,
    PostModule,
  ],
})
export class AppModule {}
