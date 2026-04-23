import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    console.log("Payload in JWT Strategy: ", payload);
    return payload;
    // return {
    //   id: payload.id,
    //   role_id: payload.role_id,
    //   role_slug: payload.role_slug,
    //   department_id: payload.department_id,
    //   designation_id: payload.designation_id,
    //   is_active: payload.is_active,
    //   deleted_at: payload.deleted_at
    // };
  }
}
