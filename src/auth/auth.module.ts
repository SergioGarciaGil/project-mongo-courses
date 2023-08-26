import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from 'src/user/model/user.schema';
import { JwtStrategy } from './stratergy/jwt.stratergy';

@Module({
  imports: [
    JwtModule.registerAsync({//utilizamos esta funcion asincrona para que las variables de entorno pueda leerla
      useFactory: () => {
        console.log('_______', process.env.JWT_SECRET)
        return {
          signOptions: { expiresIn: '90d' },
          secret: process.env.JWT_SECRET,
        }
      }
    }),
    MongooseModule.forFeature(
      [
        { name: User.name, schema: UserSchema }
      ]
    )
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule { }
