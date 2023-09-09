import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { ErrorMessages } from 'src/shared/messages/ErrorMessages';
import { IsubtagRepository } from './interfaces/IsubtagRepository';
import { Subtag, SubtagDocument } from './schema/subtag.schema';

@Injectable()
export class SubtagRepository implements IsubtagRepository {
  constructor(
    @InjectModel(Subtag.name) private subtagModel: Model<SubtagDocument>,
  ) {}

  async create(subtag: Subtag): Promise<Subtag> {
    try {
      const newSubtag = new this.subtagModel({
        ...subtag,
      });
      return await newSubtag.save();
    } catch (error) {
      console.log(error.message);
      throw new Error(ErrorMessages.subtag.ERROR_CREATING_SUBTAG);
    }
  }

  async findAll() {
    try {
      const subtags: Array<Subtag> = await this.subtagModel.find().exec();

      return subtags;
    } catch (error) {
      console.log(error.message);
      throw new Error(ErrorMessages.subtag.SUBTAG_DOES_NOT_EXIST);
    }
  }

  async findById(id: string): Promise<Subtag | null> {
    try {
      return this.subtagModel.findById(id).exec();
    } catch (error) {
      throw new Error(ErrorMessages.subtag.SUBTAG_DOES_NOT_EXIST);
    }
  }

  async update(subtag: Subtag): Promise<Subtag | null> {
    try {
      return this.subtagModel
        .findByIdAndUpdate(subtag._id, subtag, { new: true })
        .exec();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      let tag: Subtag | null = await this.subtagModel
        .findByIdAndDelete(id)
        .exec();

      if (!tag) {
        throw new Error(ErrorMessages.subtag.ERROR_DELETING_SUBTAG);
      }

      return !!tag;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
