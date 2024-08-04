import { LRUCache } from "lru-cache";
import type { Cache, CacheEntry, CachifiedOptions } from "@epic-web/cachified";
import {
  cachified as baseCachified,
  totalTtl,
  verboseReporter,
} from "@epic-web/cachified";

const lruInstance = new LRUCache<string, CacheEntry>({ max: 1000 });

const lru: Cache = {
  set(key, value) {
    const ttl = totalTtl(value?.metadata);
    return lruInstance.set(key, value, {
      ttl: ttl === Infinity ? undefined : ttl,
      start: value?.metadata?.createdTime,
    });
  },
  get(key) {
    return lruInstance.get(key);
  },
  delete(key) {
    return lruInstance.delete(key);
  },
};

export function cachified<Value>(
  options: Omit<CachifiedOptions<Value>, "cache">,
) {
  return baseCachified({
    cache: lru,
    ...options,
  }, verboseReporter());
}
