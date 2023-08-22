import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './model/courses.shemes';
import { User, UserSchema } from 'src/user/model/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Course.name, schema: CourseSchema },
        { name: User.name, schema: UserSchema }
      ]
    )
  ],

  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule { }
