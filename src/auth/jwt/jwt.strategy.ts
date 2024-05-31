// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtConfig } from './jwt.config';
import { User } from '../../user/entities/user.entity'; // Adjust the import based on your entity location
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
  ) {
  constructor(
    // Inject the dependencies that you need to validate the JWT token and perform authorization
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: any): Promise<User> {
    // Perform additional validation or fetching user from the database
    const user = await this.userRepository.findOne({
        where: { email: payload.email },
      } as FindOneOptions<User>);
       // Adjust based on your user entity structure
    if (!user) {
      throw new UnauthorizedException();
    }
    delete user.password
    return user;
  }
}
