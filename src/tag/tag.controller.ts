import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TagService } from './tag.service';

import { Tag } from './schema/tag.schema';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Módulo de Tags')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @ApiOperation({ summary: 'Criar Tag' })
  create(@Body() createTagDto: Tag) {
    return this.tagService.create(createTagDto);
  }

  @Get()
  @ApiOperation({ summary: 'Recuperar todas as tags' })
  findAll() {
    return this.tagService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recuperar tags' })
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modificar tag' })
  update(@Param('id') id: string, @Body() updateTagDto: Tag) {
    return this.tagService.update(id, updateTagDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover tag' })
  remove(@Param('id') id: string) {
    return this.tagService.remove(id);
  }
}
