import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { SignInDto } from './dto/signIn.dto';
import { SkipAuth } from './decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @SkipAuth()
  @Post('login')
  signIn(@Body() info: SignInDto) {
    return this.authService.signIn(info.username, info.password);
  }
}
