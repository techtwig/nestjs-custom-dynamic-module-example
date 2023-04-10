import { FactoryProvider, ModuleMetadata } from '@nestjs/common';

interface RedisModuleOptions {
  host: string;
  port: number;
}

export type ClusterRedisModuleOptions = Array<RedisModuleOptions>;
export type CacheModuleOptions = RedisModuleOptions | ClusterRedisModuleOptions;

export type CacheModuleAsyncOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<CacheModuleOptions>, 'useFactory' | 'inject'>;
