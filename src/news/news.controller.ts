import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './schema/news.schema';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Módulo de notícias')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar notícia' })
  create(@Body() createNewsDto: News) {
    return this.newsService.create(createNewsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Recuperar todas as notícias' })
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recuperar notícia' })
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modificar notícia' })
  update(@Param('id') id: string, @Body() updateNewsDto: News) {
    return this.newsService.update(id, updateNewsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover notícia' })
  remove(@Param('id') id: string) {
    try {
      return this.newsService.remove(id);
    } catch (error) {
      throw Error(error);
    }
  }
}
