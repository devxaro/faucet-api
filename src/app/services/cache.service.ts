import NodeCache from 'node-cache';
import {Service} from 'typedi';
import {TCache} from '../schemas/cache.schema';

@Service()
export class CacheService {
  readonly store;

  constructor() {
    this.store = new NodeCache({checkperiod: 10});
  }

  set(key: string, value: any, ttl: number) {
    return this.store.set(key, value, ttl);
  }

  get(key: string) {
    return this.store.get(key);
  }

  multipleSet(data: TCache[]) {
    this.store.mset(data);
  }

  keys() {
    return this.store.keys();
  }

  getTtl(key: string) {
    return this.store.getTtl(key);
  }

  has(key: string) {
    return this.store.has(key);
  }
}
