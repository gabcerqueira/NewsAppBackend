import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubtagService } from './subtag.service';
import { Subtag } from './schema/subtag.schema';

@Controller('subtag')
export class SubtagController {
  constructor(private readonly subtagService: SubtagService) {}

  @Post()
  create(@Body() createSubtagDto: Subtag) {
    return this.subtagService.create(createSubtagDto);
  }

  @Get()
  findAll() {
    return this.subtagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subtagService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubtagDto: Subtag) {
    return this.subtagService.update(id, updateSubtagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subtagService.remove(id);
  }
}
