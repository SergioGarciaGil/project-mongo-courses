import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './model/courses.shemes';
import { User, UserDocument } from 'src/user/model/user.schema';

@Injectable()
export class CoursesService {

  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {

  }

  async create(createCourseDto: CreateCourseDto) {

    try {
      await this.courseModel.create(createCourseDto)
    } catch (error) {
      throw new BadRequestException('error')
    }
    return { message: "successful creation" }
  }

  findAll() {
    return `This action returns all courses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
