import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Cache } from '@nestjs/cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private cacheManager: Cache,
  ) {}

  async signIn(username: string, pass: string) {
    const users = await this.usersService.findUserByName(username);
    if (!users || !users.length || !users[0]) {
      throw new UnauthorizedException('username not find');
    }
    const user = users[0];
    if (user.password !== pass) {
      throw new UnauthorizedException('password error');
    }

    const payload = { username: user.username, userId: user.id };
    const access_token = await this.jwtService.signAsync(payload);
    await this.cacheManager.set(
      `${user.id}-${user.username}-token`,
      access_token,
      { ttl: 1000 * 60 * 60 },
    );
    return {
      access_token,
      userId: user.id,
      username: user.username,
    };
  }
}
