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
import { DeliversDto } from './delivers.dto';
import { DeliversService } from './delivers.service';

@Auth()
@Controller('delivers')
export class DeliversController {
  constructor(private deliversService: DeliversService) {}

  @Get('/all')
  getAll(@Query('searchTerm') searchTerm?: string | Types.ObjectId) {
    return this.deliversService.getAll(searchTerm);
  }

  @Get(':_id')
  byId(@Param('_id') _id: Types.ObjectId) {
    return this.deliversService.getById(_id);
  }

  @Post('/add')
  addOne(@Body() dto: DeliversDto) {
    return this.deliversService.addOne(dto);
  }

  @Put('/edit/:_id')
  @HttpCode(200)
  edit(@Param('_id') _id: Types.ObjectId, @Body() dto: DeliversDto) {
    return this.deliversService.editOne(_id, dto);
  }

  @Put('/delete/:_id')
  delete(@Param('_id') _id: Types.ObjectId) {
    return this.deliversService.deleteOne(_id);
  }

  @Put('/complete/:_id')
  complete(@Param('_id') _id: Types.ObjectId) {
    return this.deliversService.completeOne(_id);
  }
}
