import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { GetUser, GetAdmin } from '../auth/decorator/user.decorator';
import { Auth } from '../auth/guard/jwt.guard';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Auth()
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/all')
  getAll(@Query('searchTerm') searchTerm?: string | Types.ObjectId) {
    return this.userService.getAll(searchTerm);
  }

  @Get(':_id')
  byId(@Param('_id') _id: Types.ObjectId) {
    return this.userService.byId(_id);
  }

  @Get('/me')
  getMe(@GetUser() user: any) {
    return this.userService.byId(user._id);
  }

  @HttpCode(200)
  @Put('/update/:_id')
  async updateProfile(@Param('_id') _id: Types.ObjectId, @Body() dto: UserDto) {
    return this.userService.updateProfile(_id, dto);
  }
}
