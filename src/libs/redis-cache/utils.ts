import { CacheModuleOptions } from './cache.interface';

export const useFactoryForRegisterAsync = (): CacheModuleOptions => {
  if (
    process.env.REDIS_CLUSTER_HOSTS &&
    process.env.REDIS_CLUSTER_HOSTS.length
  ) {
    const hostArray: string[] = process.env.REDIS_CLUSTER_HOSTS.split(',');
    const hostPorts = [];
    hostArray.forEach((item: any) => {
      const value = item.trim();
      const hostPort = value.split(':');

      hostPorts.push({
        host: hostPort[0],
        port: parseInt(hostPort[1]),
      });
    });

    return hostPorts;
  } else {
    return {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT as unknown as number,
    };
  }
};
