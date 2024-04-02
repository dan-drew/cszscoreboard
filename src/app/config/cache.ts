import {filter, fromEvent, Subscription} from "rxjs";
import {EventEmitter} from "@angular/core";

export interface CacheOptions {
  useCache?: boolean
}

const CACHE_STALE_SECONDS = 6 * 60 * 60 // 6 HOURS
const CACHE_KEY_PREFIX = 'csz-cache-'
const CACHE_EXPIRE_KEY = `cache-expire`

class CacheClass {
  readonly changed = new EventEmitter(true)

  constructor() {
    this.checkStale()
  }

  get<T>(key: string): T | undefined
  get<T>(key: string, defaultValue: T): T
  get<T>(key: string, defaultValue?: T): T | undefined {
    const value = this.string(key)

    if (typeof key === null) {
      return defaultValue
    } else {
      return this.deserialize<T>(value!)
    }
  }

  set<T>(key: string, value: T, updateExpire = true) {
    const serialized: string = typeof value === 'string' ? value : this.serialize(value)
    this.store.setItem(this.keyFor(key), serialized)
    if (updateExpire) this.updateExpireTime()
  }

  string(key: string): string | null {
    return this.store.getItem(this.keyFor(key))
  }

  timestamp(key: string): number | null {
    const value = this.string(key)
    if (value !== null) {
      const num = Number(value)
      return Number.isNaN(num) ? null : num
    }
    return null
  }

  touch(key: string): void {
    this.set(key, Date.now().toString(), false)
  }

  watch<T>(key: string, handler: (data: T) => void): Subscription {
    const fullKey = this.keyFor(key)
    return fromEvent<StorageEvent>(window, 'storage')
      .pipe(filter(e => e.key === fullKey))
      .subscribe(e => {
        if (e.newValue) {
          handler(this.deserialize(e.newValue))
          this.changed.emit()
        }
      })
  }

  remove(key: string) {
    this.store.removeItem(this.keyFor(key))
  }

  reset() {
    this.each(key => {
      this.store.removeItem(key)
    })
  }

  each(callback: (key: string, value: string | null) => void) {
    for (let key in this.store) {
      if (key.startsWith(CACHE_KEY_PREFIX)) {
        callback(key, this.store.getItem(key))
      }
    }
  }

  dump() {
    this.each((key, value) => {
      console.debug(`Cached: ${key}: ${value}`)
    })
  }

  private get store(): Storage {
    return window.localStorage
  }

  private keyFor(key: string) {
    return `${CACHE_KEY_PREFIX}${key}`
  }

  private serialize<T>(value: T): string {
    return JSON.stringify(value)
  }

  private deserialize<T>(value: string): T {
    return JSON.parse(value) as T
  }

  private updateExpireTime() {
    this.touch(CACHE_EXPIRE_KEY)
  }

  private checkStale() {
    const val = this.timestamp(CACHE_EXPIRE_KEY)
    if (val !== null && val <= this.staleTimestamp()) {
      this.reset()
    }
  }

  private staleTimestamp() {
    return Date.now() - (CACHE_STALE_SECONDS * 1000)
  }
}

export const Cache = new CacheClass()
