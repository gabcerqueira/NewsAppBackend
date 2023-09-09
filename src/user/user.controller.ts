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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: User) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: User) {
    return this.userService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('rateNews')
  rateNews(@Body() rateNewsDto: RateNewsDto) {
    return this.userService.rateNews(rateNewsDto);
  }

  @Post('clickNews')
  clickNews(@Body() clickNewsDto: ClickNewsDto) {
    return this.userService.clickNews(clickNewsDto);
  }

  @Post('addReadingTime')
  addReadingTime(@Body() readingTimeDto: ReadingTimeDto) {
    return this.userService.addReadingTime(readingTimeDto);
  }

  @Post('selectCategories')
  selectCategories(@Body() categories: SelectCategoriesDto) {
    return this.userService.selectCategories(categories);
  }
}
