import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheService } from './libs/redis-cache/cache.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject() private readonly cacheService: CacheService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    await this.cacheService.set('hello', 'World', 100);
    return this.appService.getHello();
  }
}
