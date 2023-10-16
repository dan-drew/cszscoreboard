import { Injectable } from '@angular/core';
import {filter, interval, map, Observable, timer} from "rxjs";
import {Cache} from "../config/cache";

@Injectable({
  providedIn: 'root'
})
export class HeartbeatService {
  private readonly CACHE_KEY = 'heartbeat'
  private readonly REFRESH_TIME = 2000
  private readonly MAX_AGE = this.REFRESH_TIME * 2

  constructor() {
  }

  start() {
    interval(this.REFRESH_TIME).subscribe(() => {
      Cache.touch(this.CACHE_KEY)
    })
  }

  stale(): Observable<null> {
    return interval(this.REFRESH_TIME).pipe(
      filter(() => this.checkStale()),
      map(() => null )
    )
  }

  /**
   * Returns true if heartbeat is stale
   */
  private checkStale(): boolean {
    const last = Cache.timestamp(this.CACHE_KEY)
    if (last) {
      const staleTime = Date.now() - this.MAX_AGE
      if (last <= staleTime) return true;
    }
    return false
  }
}
