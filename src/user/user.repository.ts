import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { hash } from 'bcrypt';
import { ErrorMessages } from 'src/shared/messages/ErrorMessages';
@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(userDto: User): Promise<User> {
    try {
      const { password } = userDto;
      const saltRounds = 10;
      const hashedPassword = await hash(password!, saltRounds);
      const newUser = new this.userModel({
        ...userDto,
        password: hashedPassword,
      });
      return await newUser.save();
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException(ErrorMessages.user.ERROR_CREATING_USER);
    }
  }

  async findAll() {
    try {
      const users: Array<User> = await this.userModel
        .find()
        .populate('userProfile')
        .exec();

      return users;
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException(ErrorMessages.user.USERS_NOT_FOUND);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).populate('userProfile').exec();
  }

  async update(userDto: User): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(userDto._id, userDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<boolean> {
    try {
      let user: User | null = await this.userModel.findByIdAndDelete(id).exec();

      if (!user) {
        throw new Error(ErrorMessages.user.ERROR_DELETING_USER);
      }

      return !!user;
    } catch (error) {
      throw new BadRequestException(error.message);
      return false;
    }
  }
}
