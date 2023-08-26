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
    const { password } = loginAuthDto;

    // Busca un usuario en la base de datos por su dirección de correo electrónico
    const userExist = await this.userModel.findOne({ email: loginAuthDto.email });
    if (!userExist) throw new HttpException('No found', HttpStatus.NOT_FOUND);

    // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
    const isCheck = await compare(password, userExist.password);
    if (!isCheck) throw new HttpException('PASSWORD_INVALID', HttpStatus.CONFLICT);

    // Oculta el campo de contraseña en el objeto userExist
    userExist.password = undefined;

    // Crea un objeto payload que contiene el ID del usuario
    const payload = {
      id: userExist.id,
    };

    // Genera un token JWT (JSON Web Token) utilizando el servicio jwtService
    const token = this.jwtService.sign(payload);

    // Crea un objeto de respuesta que contiene el token JWT y los datos del usuario
    const data = {
      acces_token: token,
      userExist,
    };

    // Devuelve el objeto de respuesta
    return data;
  }

  public async register(userBody: RegisterAuthDto) {
    const { password, ...user } = userBody;

    // Encripta la contraseña antes de almacenarla en la base de datos
    const userParse = {
      ...user,
      password: await encrypt(password), // Utiliza la función encrypt para encriptar la contraseña
    };

    // Crea un nuevo usuario en la base de datos
    return this.userModel.create(userParse);
  }
}
