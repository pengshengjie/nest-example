import { Controller, Get, Post, Redirect } from '@nestjs/common';
import { SkipAuth } from 'src/auth/decorator';

@Controller('sort-url')
export class SortUrlController {
  // @SkipAuth()
  // @Redirect()
  // @Get()
  // get() {
  //   return {
  //     url: 'https://juejin.cn/post/7307470097663934491',
  //     statusCode: 302,
  //   };
  // }

  @SkipAuth()
  @Redirect()
  @Get(':url')
  get() {
    return {
      url: 'https://www.baidu.com',
      statusCode: 302,
    };
  }

  @SkipAuth()
  @Post('create')
  createUrl() {
    return {
      url: 'https://www.baidu.com',
      statusCode: 302,
    };
  }
}
