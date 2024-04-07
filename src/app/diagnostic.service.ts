import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {fromEvent} from "rxjs";
import {StackLine, StackParser} from "./common/stack-parser";
import {SourceMapper} from "./common/source-mapper";
import {Router} from "@angular/router";


export interface ErrorInfo {
  time: string
  message: string
  file?: string
  line?: number
  stackLines?: StackLine[]
  stack?: string[]
}

interface Diagnostics {
  errors: ErrorInfo[]
}

/**
 * This service listens for errors and saves them in local storage for
 * later analysis. This hopefully handles the case where a problem occurs
 * during a show and for obvious reasons can't stop and debug on the spot
 * and will more than likely try to reload/restart the web app to get things
 * going asap.
 */
@Injectable({
  providedIn: 'root'
})
export class DiagnosticService implements ErrorHandler {
  private readonly STORAGE_KEY = '__diagnostics'
  private readonly RELOAD_KEY = '__diagnostics:reload'
  private readonly MAX_ERRORS = 40

  constructor(
    private readonly zone: NgZone,
    private readonly router: Router
  ) {
    window.addEventListener('error', it => this.logErrorEvent(it))
    window.addEventListener('unhandledrejection', it => this.logPromiseRejection(it))

    fromEvent<StorageEvent>(window, 'storage')
      .subscribe(e => this.onStorageEvent(e))
  }

  handleError(it: any) {
    const error = it as Error
    console.error('Unhandled Angular error:', error)
    this.logError({
      time: this.now(),
      message: error.message,
      stackLines: this.stack(error)
    })
  }

  logError(info: ErrorInfo) {
    this.zone.runOutsideAngular(() => {
      const doIt = async () => {
        const diagnostics = this.load()

        await this.processStackLines(info)
        diagnostics.errors.unshift(info)

        if (diagnostics.errors.length > this.MAX_ERRORS) {
          diagnostics.errors.length = this.MAX_ERRORS
        }

        this.save(diagnostics)
        this.showError()
      }

      doIt().finally()
    })
  }

  logErrorEvent(it: ErrorEvent) {
    this.logError({
      time: this.now(),
      message: it.message.trim(),
      file: it.filename,
      line: it.lineno,
      stackLines: this.stack(it.error)
    })
  }

  logPromiseRejection(it: PromiseRejectionEvent) {
    const error = this.error(it)
    const info: ErrorInfo = {
      time: this.now(),
      message: `Unhandled promise rejection: ${error?.message}` || 'Unhandled promise rejection',
      stackLines: this.stack(error)
    }
    this.logError(info)
  }

  stack(it: any): StackLine[] | undefined {
    const error = this.error(it)
    if (error?.stack) {
      return StackParser.parse(error)
    } else {
      return undefined
    }
  }

  get errors() {
    return this.load().errors
  }

  get hasErrors() {
    return this.errors.length > 0
  }

  requestReload() {
    localStorage.setItem(this.RELOAD_KEY, Date.now().toString())
    this.reload()
  }

  private load(): Diagnostics {
    return this.fromJson(localStorage.getItem(this.STORAGE_KEY))
  }

  private save(it: Diagnostics) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(it))
  }

  private fromJson(json: string | undefined | null): Diagnostics {
    return json ? JSON.parse(json) : {errors: []}
  }

  private now(): string {
    return new Date().toISOString()
  }

  private error(source: any): Error | undefined {
    if ('message' in source) return source as Error
    if ('reason' in source && 'message' in source.reason) return source.reason as Error
    return undefined
  }

  private onStorageEvent(e: StorageEvent) {
    switch (e.key) {
      case this.RELOAD_KEY:
        this.reload()
        break

      case this.STORAGE_KEY:
        this.onErrorsStored()
        break

      default:
      // Ignore
    }
  }

  private onErrorsStored() {
    if (this.hasErrors) this.showError()
  }

  private showError() {
    if (this.isMainWindow) {
      console.warn('Showing error', window.location.href)
      window.location.href = `${window.location.protocol}//${window.location.host}/error`
    }
  }

  private reload() {
    const currentLocation = window.location.href
    const newLocation = currentLocation.replace('/error', '')

    setTimeout(() => {
      // For live, just reload. For main window, send back to booth view
      if (currentLocation === newLocation) {
        window.location.reload()
      } else {
        window.location.href = newLocation
      }
    })
  }

  private get isMainWindow() {
    return this.router.url.indexOf('/live') < 0
  }

  private async processStackLines(info: ErrorInfo) {
    if (info.stackLines) {
      info.stack = (await SourceMapper.map(info.stackLines)).map(line => StackParser.toString(line))
      delete info.stackLines
    }
  }
}
