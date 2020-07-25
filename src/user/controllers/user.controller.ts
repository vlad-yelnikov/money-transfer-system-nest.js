import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Controller('/api/users')
export class userController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllAction(@Query() query): Promise<User[]> {
    return this.userService.findAll(query);
  }

  @Get(':id')
  getOneAction(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  createAction(@Body() createDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createDto.name;
    return this.userService.create(user);
  }

  @Put(':id')
  async updateAction(
    @Param('id') id: string,
    @Body() updateDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userService.findOne(id);
    if (user === undefined) {
      throw new NotFoundException(`User with such ${id} does not exist`);
    }
    user.name = updateDto.name;
    return this.userService.update(user);
  }

  @Delete(':id')
  deleteAction(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
