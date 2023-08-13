import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiTags } from '@nestjs/swagger';
import { SlugPipe } from './pipes/slug/slug.pipe';
import { title } from 'process';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    try {

      return this.coursesService.create(createCourseDto);
    } catch (error) {
      throw new HttpException('Forbidden,', HttpStatus.FORBIDDEN)
    }
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  getDetail(@Param('id', new SlugPipe()) title: string) {
    console.log('___newPipoe___', title)
    return this.coursesService.findOne(1);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
