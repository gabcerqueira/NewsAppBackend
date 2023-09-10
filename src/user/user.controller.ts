import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { RateNewsDto } from './dto/rateNewsDto';
import { ClickNewsDto } from './dto/clickNews';
import { ReadingTimeDto } from './dto/readingTime';
import { SelectCategoriesDto } from './dto/categoriesDto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IuserController } from './interfaces/Iuser.controller';
import { SanitizedUser } from './dto/sanitizedUser';

@ApiTags('Módulo de usuários')
@Controller('user')
export class UserController implements IuserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Criar usuário' })
  create(@Body() createUserDto: User) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Recuperar todos os usuários' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recuperar usuário' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modificar usuário' })
  update(@Param('id') id: string, @Body() updateUserDto: User) {
    return this.userService.update(updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover usuário' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('rateNews')
  @ApiOperation({ summary: 'Avaliar notícia' })
  rateNews(@Body() rateNewsDto: RateNewsDto) {
    return this.userService.rateNews(rateNewsDto);
  }

  @Post('clickNews')
  @ApiOperation({ summary: 'Acessar notícia' })
  clickNews(@Body() clickNewsDto: ClickNewsDto) {
    return this.userService.clickNews(clickNewsDto);
  }

  @Post('addReadingTime')
  @ApiOperation({ summary: 'Adicionar tempo de leitura de notícia' })
  addReadingTime(@Body() readingTimeDto: ReadingTimeDto) {
    return this.userService.addReadingTime(readingTimeDto);
  }

  @Post('selectCategories')
  @ApiOperation({ summary: 'Selecionar categorias' })
  selectCategories(@Body() categories: SelectCategoriesDto) {
    return this.userService.selectCategories(categories);
  }
}
