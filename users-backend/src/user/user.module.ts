import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from 'src/post/post.module';
import { UserEntity } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    forwardRef(() => PostModule),
    TypeOrmModule.forFeature([UserEntity])],
  providers: [UserResolver, UserService],
  exports: [UserService]
})
export class UserModule {}
