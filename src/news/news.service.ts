import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './schema/news.schema';
import { NewsRepository } from './news.repository';
import { ErrorMessages } from 'src/shared/messages/ErrorMessages';

@Injectable()
export class NewsService {
  constructor(private readonly newsRepository: NewsRepository) {}
  async create(createNewsDto: News) {
    try {
      const news = new News();

      news.title = createNewsDto.title;
      news.subtitle = createNewsDto.subtitle;
      news.body = createNewsDto.body;
      news.images = createNewsDto.images;
      news.date = createNewsDto.date;
      news.source = createNewsDto.source;
      news.category = createNewsDto.category;
      //news.active = true;

      return await this.newsRepository.createNews(news);
    } catch (error) {}
  }

  async findAll() {
    try {
      return await this.newsRepository.findAll();
    } catch (error) {}
  }

  async findOne(id: string) {
    try {
      return await this.newsRepository.findById(id);
    } catch (error) {}
  }

  update(id: string, updateNewsDto: UpdateNewsDto) {
    return `This action updates a #${id} news`;
  }

  async remove(id: string) {
    try {
      return await this.newsRepository.remove(id);
    } catch (error) {
      throw error;
    }
  }

  async hasAssociatedNews(categoryId: string) {
    try {
      return !!(await this.newsRepository.hasAssociatedNewsFromCategory(
        categoryId,
      ));
    } catch (error) {}
  }
}
