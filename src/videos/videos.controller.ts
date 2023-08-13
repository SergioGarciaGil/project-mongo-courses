import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiConsumes, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { Express } from 'express';
import { storage } from 'src/utils/media.handle';

@ApiTags('videos')
@Controller('videos')
export class VideosController {
  @Post('upload')
  @ApiBody({
    required: true,
    type: "multipart/form-data",
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @ApiOperation({ summary: 'Subir imagen' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Imagen cargada exitosamente' })
  @UseInterceptors(FileInterceptor('file', { storage }))
  async handleUpload(@UploadedFile() file: Express.Multer.File) {
    console.log(file); // Esto mostrará la información del archivo en la consola


  }
}
