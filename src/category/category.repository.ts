import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { ErrorMessages } from 'src/shared/messages/ErrorMessages';
import { Category, CategoryDocument } from './schema/category.schema';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async createCategory(CategoryDto: Category): Promise<Category> {
    try {
      const newCategory = new this.categoryModel({
        ...CategoryDto,
      });
      return await newCategory.save();
    } catch (error) {
      console.log(error.message);
      throw new Error(ErrorMessages.category.ERROR_CREATING_CATEGORY);
    }
  }

  async findAll() {
    try {
      const categories: Array<Category> = await this.categoryModel
        .find()
        .exec();

      return categories;
    } catch (error) {
      console.log(error.message);
      throw new Error(ErrorMessages.category.CATEGORIES_NOT_FOUND);
    }
  }

  async findById(id: string): Promise<Category | null> {
    try {
      return this.categoryModel.findById(id).exec();
    } catch (error) {
      throw new Error(ErrorMessages.category.CATEGORY_DOES_NOT_EXIST);
    }
  }

  async update(category: Category): Promise<Category | null> {
    try {
      return this.categoryModel
        .findByIdAndUpdate(category._id, category, { new: true })
        .exec();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      let category: Category | null = await this.categoryModel
        .findByIdAndDelete(id)
        .exec();

      if (!category) {
        throw new Error(ErrorMessages.category.ERROR_DELETING_CATEGORY);
      }

      return !!category;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
