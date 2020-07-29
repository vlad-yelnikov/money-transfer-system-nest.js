import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { QueryUserDTO } from './dto/query.user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(query: QueryUserDTO): Promise<User[]> {
    const { take, order, sort, page, size, name } = query;
    let sortOrder = {};
    let filter = {};
    if (sort) {
      sortOrder = { [sort]: order };
    }
    if (name) {
      filter = { name: name };
    }
    const skip = (page - 1) * size;
    return this.userRepository.find({
      where: filter,
      take,
      order: sortOrder,
      skip,
    });
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  update(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
