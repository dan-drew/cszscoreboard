export interface CacheOptions {
  useCache?: boolean
}

export abstract class Cache {
  private static cachedData?: {[key: string]: any}

  static get<T>(key: string): T | undefined
  static get<T>(key: string, defaultValue: T): T
  static get<T>(key: string, defaultValue?: T): T | undefined {
    if (key in this.data) return this.data[key] as T
    return defaultValue
  }

  static has(key: string) {
    return key in this.data
  }

  static set<T>(key: string, value: T) {
    this.data[key] = value
    this.save()
  }

  private static get data() {
    if (!this.cachedData) {
      const data = window.sessionStorage.getItem('cszMatch')
      this.cachedData = data ? JSON.parse(data) : {}
    }
    return this.cachedData!
  }

  private static save() {
    window.sessionStorage.setItem('cszMatch', JSON.stringify(this.cachedData!))
  }
}
