import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerInterceptor } from 'src/utils/logger/logger.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/utils/media.handle';

@ApiTags('videos')
@UseInterceptors(LoggerInterceptor)
@Controller('videos')

export class VideosController {
  constructor(private readonly videosService: VideosService) { }

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto);
  }

  @Post('upload')
  @ApiOperation({ summary: 'Subir imagen' })
  @ApiConsumes('multipart/form-data')

  @UseInterceptors(FileInterceptor('avatar', { storage })) // 'avatar' debe coincidir con el nombre del campo en la solicitud
  async handleUpload(@UploadedFile() file: Express.Multer.File) {
    console.log(file); // Esto mostrará la información del archivo en la consola

  }


  @Get()
  findAll() {
    return this.videosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }
}
