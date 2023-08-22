import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/user.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name, schema: UserSchema
      }
    ])
  ],

  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
