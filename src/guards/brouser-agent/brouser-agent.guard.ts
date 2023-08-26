import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Injectable()
//un gurdian que nest passport nos provee aplicando la estrategia
export class JwtGuardGuard extends AuthGuard('jwt') {

}
