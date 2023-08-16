import { Model } from 'mongoose';
import { PromotionInfo, Usuario } from '../model/user.model';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FilterType, FiltroUsuario } from '../model/filters.model';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL') private readonly userModel: Model<Usuario>,
  ) {}

  async findByUsername(username: string): Promise<Usuario | null> {
    return await this.userModel.findOne({
      username,
    });
  }

  async getUserById(userId: string): Promise<Usuario | null> {
    const result = await this.userModel
      .findOne({
        id: userId,
      })
      .exec();
    return result;
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return await this.userModel.findOne({
      email,
    });
  }

  async findAllUsers(): Promise<Usuario[]> {
    return await this.userModel.find().exec();
  }

  async filterUsers(filter: FiltroUsuario): Promise<Usuario[]> {
    const query = { $regex: new RegExp(filter.filter, 'i') };
    switch (filter.filterType) {
      case FilterType.area:
        return await this.userModel.find({ setor: query });
      case FilterType.name:
        return await this.userModel.find({ username: query });
      case FilterType.occupation:
        return await this.userModel.find({ 'currentJob.cargo': query });
      case FilterType.speciality:
        return await this.userModel.find(
          { [`especialidades.${filter.filter}`]: true },
          { [`especialidades.${filter.filter}`]: filter.filter },
        );
      default:
        return await this.userModel.find().exec();
    }
  }

  async promoteUser(promotionInfo: PromotionInfo) {
    const getDate = new Date().toISOString();
    const user = await this.userModel.findOne({ id: promotionInfo.userId });
    if (user == null) {
      return false;
    }
    const oldCurrentJob = {
      ...user.currentJob,
      dataFim: getDate,
    };
    const jobs = user.jobs ? [...user.jobs, oldCurrentJob] : [oldCurrentJob];
    const updated = await this.userModel
      .updateOne(
        { id: user.id },
        {
          ...user,
          jobs: jobs,
          currentJob: promotionInfo.newRole,
        },
      )
      .exec();
    return updated !== null || updated == true ? true : false;
  }

  async createUser(newUser: Usuario) {
    return this.userModel.create(newUser);
  }

  async updateUser(userToUpdate: Usuario) {
    const username = userToUpdate.username;
    const userUpdated = await this.userModel
      .findOneAndUpdate({ username }, userToUpdate)
      .exec();
    return userUpdated != null;
  }

  async deleteUser(userToDelete: string) {
    const userDeleted = this.userModel.findByIdAndDelete(
      { id: userToDelete },
      (err: any) => {
        if (err) {
          console.log(err);
          throw new InternalServerErrorException();
        }
      },
    );
    return userDeleted !== null || userDeleted == true ? true : false;
  }
}
