import {Cache, CacheOptions} from "./cache";

export abstract class Cacheable<CacheType, InitDataType = any> {
  protected constructor(
    private readonly cacheKey: string,
    {useCache = false}: CacheOptions = {},
    initData?: InitDataType
  ) {
    if (useCache && Cache.has(cacheKey)) {
      const data = Cache.get<CacheType>(cacheKey)!
      this.deserialize(data)
    } else {
      this.init(initData)
    }
  }

  cache() {
    Cache.set<CacheType>(this.cacheKey, this.serialize())
  }

  protected abstract init(data?: InitDataType): void
  protected abstract serialize(): CacheType
  protected abstract deserialize(data: CacheType): void
}
