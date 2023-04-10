import { DynamicModule, Module } from '@nestjs/common';
import { CacheModuleAsyncOptions, CacheModuleOptions } from './cache.interface';
import { CacheService } from './cache.service';
import { CACHE_PROVIDER } from './constants';

@Module({})
export class CacheModule {
  static register(options: CacheModuleOptions): DynamicModule {
    return {
      global: true,
      module: CacheModule,
      providers: [
        {
          provide: CACHE_PROVIDER,
          useValue: options,
        },
        CacheService,
      ],
      exports: [CacheService],
    };
  }

  static registerAsync(options: CacheModuleAsyncOptions): DynamicModule {
    return {
      global: true,
      module: CacheModule,
      imports: options.imports,
      providers: [
        {
          provide: CACHE_PROVIDER,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        CacheService,
      ],
      exports: [CacheService],
    };
  }
}
