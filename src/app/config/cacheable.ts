import {Cache, CacheOptions} from "./cache";
import {EventEmitter} from "@angular/core";
import {Subscription} from "rxjs";

/**
 * Base class for cacheable data classes
 *
 * IMPORTANT!!!!
 * Do NOT initialize instance variables in the class definition as they run AFTER
 * the base constructor and will override any values set in `init()` or `construct()`.
 * Instead, do all default initialization in the derived `init()` method.
 */
export abstract class Cacheable<CacheType, InitDataType = any> {
  readonly changed = new EventEmitter<void>(true)
  private watcher?: Subscription
  private _noCache: boolean = true

  protected constructor(
    private readonly cacheKey: string,
    {useCache = false}: CacheOptions = {},
    initData?: InitDataType
  ) {
    const data = useCache ? Cache.get<CacheType>(cacheKey) : null
    this.construct(initData)

    if (data) {
      this.noCache(() => {
        console.debug('Loading cache', cacheKey, data)
        this.deserialize(data)
      })
    } else {
      this.noCache(() => {
        this.init(initData)
      })
      this.cache()
    }

    // Note this assumes that cacheable objects are singletons and
    // we don't need to worry about cleaning up this subscription
    this.watcher = Cache.watch<CacheType>(cacheKey, data => {
      this.noCache(() => {
        console.debug('Loading cache', cacheKey, data)
        this.deserialize(data)
      })
      this.changed.emit()
    })
  }

  destroy() {
    this.watcher?.unsubscribe()
    delete this.watcher
  }

  protected cache(block?: () => void) {
    if (block) {
      // Silence caching during block then cache when done
      this.noCache(block)
    }

    if (!this._noCache) {
      const data = this.serialize()
      console.debug('Saving cache', this.cacheKey, data)
      Cache.set<CacheType>(this.cacheKey, data)
    }
  }

  private noCache(op: () => void) {
    try {
      this._noCache = true
      op()
    } finally {
      this._noCache = false
    }
  }

  /**
   * Initialize subclass variables needed by first init or deserialize.
   *
   * This is required due to the order in which instance members are initialized.
   * Subclass members will not be initialized until after base class constructor
   * is completed so if those variables are needed on first load then initilaize
   * them here instead.
   */
  protected construct(_data?: InitDataType): void {
  }

  protected abstract init(data?: InitDataType): void

  protected abstract serialize(): CacheType

  protected abstract deserialize(data: CacheType): void
}
