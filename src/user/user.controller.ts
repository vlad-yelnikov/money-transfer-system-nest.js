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
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { QueryUserDTO } from './dto/query.user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('/api/users')
export class userController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllAction(@Query() query: QueryUserDTO): Promise<User[]> {
    return this.userService.findAll(query);
  }

  @Get(':id')
  getOneAction(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @ApiBody({ type: UserDto })
  @Post()
  createAction(@Body() createDto: UserDto): Promise<User> {
    const user = new User();
    user.name = createDto.name;
    return this.userService.create(user);
  }

  @ApiBody({ type: UserDto })
  @Put(':id')
  async updateAction(
    @Param('id') id: string,
    @Body() updateDto: UserDto,
  ): Promise<User> {
    const user = await this.userService.findOne(id);
    if (user === undefined) {
      throw new NotFoundException(`User with id(${id}) does not exist`);
    }
    user.name = updateDto.name;
    return this.userService.update(user);
  }

  @Delete(':id')
  deleteAction(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
