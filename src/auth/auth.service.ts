import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User, UserDocument } from 'src/user/model/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { encrypt } from './utils/handleBcrypt';
import { LoginAuthDto } from './dto/login-auth.dto.';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,

    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) { }

  public async login(loginAuthDto: LoginAuthDto) {
    const { password } = loginAuthDto

    const userExist = await this.userModel.findOne({ email: loginAuthDto.email })
    if (!userExist) throw new HttpException('No found', HttpStatus.NOT_FOUND);

    const isCheck = await compare(password, userExist.password);
    if (!isCheck) throw new HttpException('PASSWORD_INVALID', HttpStatus.CONFLICT)

    // Ocultar el campo de contraseña en el objeto userExist
    userExist.password = undefined;

    const payload = {
      id: userExist.id,
    }

    const token = this.jwtService.sign(payload)

    const data = {
      acces_token: token,
      userExist
    }

    return data
  }

  public async register(userBody: RegisterAuthDto) {
    const { password, ...user } = userBody
    const userParse = {
      ...user, password: await encrypt(password),
    }
    return this.userModel.create(userParse);
  }
}