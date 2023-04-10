import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from './libs/redis-cache/cache.module';
import { useFactoryForRegisterAsync } from './libs/redis-cache/utils';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: useFactoryForRegisterAsync,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
