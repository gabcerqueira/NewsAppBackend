import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { ErrorMessages } from 'src/shared/messages/ErrorMessages';
import { Tag, TagDocument } from './schema/tag.schema';
import { ItagRepository } from './interfaces/Itag.repository';

@Injectable()
export class TagRepository implements ItagRepository {
  constructor(@InjectModel(Tag.name) private tagModel: Model<TagDocument>) {}

  async create(tag: Tag): Promise<Tag> {
    try {
      const newCategory = new this.tagModel({
        ...tag,
      });
      return await newCategory.save();
    } catch (error) {
      console.log(error.message);
      throw new Error(ErrorMessages.tag.ERROR_CREATING_TAG);
    }
  }

  async findAll() {
    try {
      const categories: Array<Tag> = await this.tagModel.find().exec();

      return categories;
    } catch (error) {
      console.log(error.message);
      throw new Error(ErrorMessages.tag.TAG_DOES_NOT_EXIST);
    }
  }

  async findById(id: string): Promise<Tag | null> {
    try {
      return this.tagModel.findById(id).exec();
    } catch (error) {
      throw new Error(ErrorMessages.category.CATEGORY_DOES_NOT_EXIST);
    }
  }

  async update(tag: Tag): Promise<Tag | null> {
    try {
      return this.tagModel
        .findByIdAndUpdate(tag._id, tag, { new: true })
        .exec();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      let tag: Tag | null = await this.tagModel.findByIdAndDelete(id).exec();

      if (!tag) {
        throw new Error(ErrorMessages.category.ERROR_DELETING_CATEGORY);
      }

      return !!tag;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
