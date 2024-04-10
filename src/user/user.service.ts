import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument, User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel
      .find({
        _id: id,
      })
      .exec();
  }

  findUserByName(name: string): Promise<UserDocument[]> {
    return this.userModel
      .find({
        username: name,
      })
      .exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne(
      {
        _id: id,
      },
      updateUserDto,
    );
  }

  remove(id: string) {
    return this.userModel.deleteOne({
      _id: id,
    });
  }
}
