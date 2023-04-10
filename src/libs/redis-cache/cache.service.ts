import { Inject, Injectable } from '@nestjs/common';
import Redis, { Cluster } from 'ioredis';
import { CACHE_PROVIDER } from './constants';
import { CacheModuleOptions } from './cache.interface';

@Injectable()
export class CacheService {
  private readonly cache: Redis | Cluster;

  constructor(@Inject(CACHE_PROVIDER) options: CacheModuleOptions) {
    if (Array.isArray(options)) {
      this.cache = new Cluster(options, {
        dnsLookup: (address, callback) => callback(null, address),
        scaleReads: 'slave',
        enableReadyCheck: true,
        retryDelayOnClusterDown: 300,
        retryDelayOnFailover: 1000,
        // slotsRefreshTimeout: 20000,
        clusterRetryStrategy: (times: any) => Math.min(times * 1000, 10000),
        showFriendlyErrorStack: true,
        redisOptions: {
          autoResubscribe: true,
          autoResendUnfulfilledCommands: true,
        },
      });
    } else {
      this.cache = new Redis({
        host: options.host,
        port: options.port,
      });
    }
  }

  get(key: string): Promise<string> {
    return this.cache.get(key);
  }

  set(key: string, value: string, ttl: number): Promise<'OK'> {
    return this.cache.set(key, value, 'EX', ttl);
  }

  del(key: string): Promise<number> {
    return this.cache.del(key);
  }
}
