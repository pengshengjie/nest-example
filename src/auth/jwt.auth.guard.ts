import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { jwtConstants } from './auth.module';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Cache } from '@nestjs/cache-manager';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private cachemanager: Cache,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const needSkipAuth = this.reflector.get<boolean>(
      'skip-auth',
      context.getHandler(),
    );
    if (needSkipAuth) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('not find token');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      const key = `${payload.userId}-${payload.username}-token`;

      const redisToken = await this.cachemanager.get(key);
      if (redisToken !== token) {
        throw new UnauthorizedException('token被注销 ' + redisToken);
      }
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException('token error ' + error.message);
    }
    return true;
  }

  extractTokenFromHeader(request: Request) {
    const [type, toekn] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? toekn : undefined;
  }
}
