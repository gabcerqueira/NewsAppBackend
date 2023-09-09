import { BadRequestException, Injectable } from '@nestjs/common';
import { Category } from './schema/category.schema';
import { CategoryRepository } from './category.repository';
import { ErrorMessages } from 'src/shared/messages/ErrorMessages';
import { NewsService } from 'src/news/news.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly newsService: NewsService,
  ) {}

  async create(createCategoryDto: Category) {
    try {
      const category = new Category();

      //category.active = createCategoryDto.active;
      category.name = createCategoryDto.name;

      let createdCategory = await this.categoryRepository.createCategory(
        category,
      );

      return createdCategory;
    } catch (error) {
      throw new Error(ErrorMessages.category.ERROR_CREATING_CATEGORY);
    }
  }

  async findAll() {
    try {
      return await this.categoryRepository.findAll();
    } catch (error) {}
  }

  async findOne(id: string) {
    try {
      return await this.categoryRepository.findById(id);
    } catch (error) {}
  }

  async update(id: string, updateCategoryDto: Category) {
    try {
      let updatedCategory = await this.categoryRepository.update(
        updateCategoryDto,
      );

      return updatedCategory;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const hasAssociatedNews = await this.newsService.hasAssociatedNews(id);

      if (hasAssociatedNews) {
        throw new BadRequestException(
          ErrorMessages.category.CANNOT_DELETE_CATEGORY_WITH_NEWS,
        );
      }

      return await this.categoryRepository.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
