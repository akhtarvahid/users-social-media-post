import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserInput, UpdateUserInput } from './user.graphql';
import { v4 as uuid } from 'uuid';
import { USER_EXIST, USER_NOT_FOUND } from 'src/constant';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getUser(id: string): Promise<UserEntity> {
    const found = await this.userRepository.findOne({ id });
    if (!found)
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    else return found;
  }

  async createUser(createUserInput: CreateUserInput): Promise<UserEntity> {
    const user = this.userRepository.create({
      id: uuid(),
      ...createUserInput,
    });

    const users = await this.getUsers();
    const userExist = users.find(({ email }) => email === createUserInput.email);
    if(userExist) {
      throw new ConflictException(USER_EXIST);
    }

    return this.userRepository.save(user);
  }

  async updateUser(id: string, updateUserInput: UpdateUserInput): Promise<UserEntity> {
     const { firstName, lastName, workAt, locatedAt, designation } = updateUserInput;
     let user = await this.getUser(id);
     user = {
       ...user,
       firstName,
       lastName,
       locatedAt,
       workAt,
       designation
     }
     await this.userRepository.save(user);
     return user;
  }

  async deleteUser(id: string) {
    const found = await this.getUser(id);
    if (found) this.userRepository.delete({ id });

    return { message: `Successfully deleted user of ${found.id}` };
  }
}
