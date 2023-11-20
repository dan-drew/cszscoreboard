import { Injectable } from '@angular/core';
import {filter, interval, map, Observable, of, timer} from "rxjs";
import {Cache} from "../config/cache";
import {PlatformService} from "./platform.service";

@Injectable({
  providedIn: 'root'
})
export class HeartbeatService {
  private readonly CACHE_KEY = 'heartbeat'
  private readonly REFRESH_TIME = 2000
  private readonly STAGE_AGE = 2 * this.REFRESH_TIME
  private readonly MAX_STALE = 3

  private staleCount = 0

  constructor(
    private readonly platform: PlatformService
  ) {
  }

  start() {
    if (this.enabled) {
      interval(this.REFRESH_TIME).subscribe(() => {
        Cache.touch(this.CACHE_KEY)
      })
    }
  }

  stale(): Observable<null> {
    if (this.enabled) {
      return interval(this.REFRESH_TIME).pipe(
        filter(() => this.checkStale()),
        map(() => null)
      )
    } else {
      return of()
    }
  }

  /**
   * Returns true if heartbeat is stale
   */
  private checkStale(): boolean {
    const lastHeartbeat = Cache.timestamp(this.CACHE_KEY)
    if (lastHeartbeat) {
      const staleTime = Date.now() - this.STAGE_AGE
      if (lastHeartbeat <= staleTime) {
        if (++this.staleCount >= this.MAX_STALE) {
          Cache.set('heartbeat-stale', {
            message: `Stale heartbeat detected (${this.staleCount})`,
            staleTime,
            lastHeartbeat
          })
          return true;
        }
        console.warn('Detected stale heartbeat')
      } else {
        if (this.staleCount > 0) {
          console.info('New heartbeat detected')
        }
        this.staleCount = 0
        Cache.remove('heartbeat-stale')
      }
    }
    return false
  }

  private get enabled() {
    // TODO: Enable on web. Note this currently has issues when tabs sleep
    // and heartbeat not being updated
    return false
  }
}
