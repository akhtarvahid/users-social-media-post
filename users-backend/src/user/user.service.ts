import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserInput, UpdateUserInput } from './user.graphql';
import { v4 as uuid } from 'uuid';

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
      throw new HttpException("User doesn't not found!", HttpStatus.NOT_FOUND);
    else return found;
  }

  async createUser(createUserInput: CreateUserInput): Promise<UserEntity> {
    const user = this.userRepository.create({
      id: uuid(),
      ...createUserInput,
    });

    return this.userRepository.save(user);
  }

  async updateUser(id: string, updateUserInput: UpdateUserInput): Promise<UserEntity> {
     const { firstName, lastName, workAt, designation } = updateUserInput;
     const user = await this.getUser(id);
     user.firstName = firstName;
     user.lastName = lastName;
     user.workAt = workAt;
     user.designation = designation;
     await this.userRepository.save(user);
     return user;
  }

  async deleteUser(id: string) {
    const found = await this.getUser(id);
    if (found) this.userRepository.delete({ id });

    return { message: `Successfully deleted user of ${found.id}` };
  }
}
