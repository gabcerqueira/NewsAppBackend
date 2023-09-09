import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schema/category.schema';
import { NewsService } from 'src/news/news.service';
import { NewsModule } from 'src/news/news.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    NewsModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, NewsService],
  exports: [CategoryRepository, CategoryService],
})
export class CategoryModule {}
