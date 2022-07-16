import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUserRepository } from 'user/interfaces/user.interfaces';
import { UserDocument } from 'user/models/user.schema';
import { CreateUserDto } from 'user/dtos/create-user.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
  ) {}

  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async findByUsername(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username }).exec();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async save(user: CreateUserDto): Promise<UserDocument> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }
}
