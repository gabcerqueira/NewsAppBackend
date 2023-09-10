import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './schema/category.schema';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Módulo de categorias')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Criar categoria' })
  create(@Body() createCategoryDto: Category) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Recuperar todas as categorias' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recuperar categoria' })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modificar uma categoria' })
  update(@Param('id') id: string, @Body() updateCategoryDto: Category) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma categoria' })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
