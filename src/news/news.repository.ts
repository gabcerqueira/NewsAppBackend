import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { ErrorMessages } from 'src/shared/messages/ErrorMessages';
import { News, NewsDocument } from './schema/news.schema';

@Injectable()
export class NewsRepository {
  constructor(@InjectModel(News.name) private newsModel: Model<NewsDocument>) {}

  async createNews(NewsDto: News): Promise<News> {
    try {
      const newNews = new this.newsModel({
        ...NewsDto,
      });
      return await newNews.save();
    } catch (error) {
      console.log(error.message);
      throw new Error(ErrorMessages.news.ERROR_CREATING_NEWS);
    }
  }

  async findAll() {
    try {
      const news: Array<News> = await this.newsModel
        .find()
        .populate('category')
        .exec();

      return news;
    } catch (error) {
      console.log(error.message);
      throw new Error(ErrorMessages.news.NEWS_NOT_FOUND);
    }
  }

  async findById(id: string): Promise<News | null> {
    try {
      return this.newsModel.findById(id).populate('category').exec();
    } catch (error) {
      throw new Error(ErrorMessages.news.NEWS_DOES_NOT_EXIST);
    }
  }

  async update(news: News): Promise<News | null> {
    try {
      return this.newsModel
        .findByIdAndUpdate(news._id, news, { new: true })
        .exec();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      let category: News | null = await this.newsModel
        .findByIdAndDelete(id)
        .exec();

      if (!category) {
        throw new Error(ErrorMessages.news.ERROR_DELETING_NEWS);
      }

      return !!category;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async hasAssociatedNewsFromCategory(categoryId: string) {
    try {
      return this.newsModel.exists({ category: categoryId });
    } catch (error) {}
  }
}
