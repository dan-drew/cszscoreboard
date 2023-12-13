import {ErrorHandler, Injectable} from '@angular/core';

interface ErrorInfo {
  time: string
  message: string
  file?: string
  line?: number
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
  private readonly MAX_ERRORS = 40

  constructor() {
    window.addEventListener('error', it => this.logErrorEvent(it))
    window.addEventListener('unhandledrejection', it => this.logPromiseRejection(it))
  }

  handleError(it: any) {
    const error = it as Error
    console.error('Unhandled Angular error:', error)
    this.logError({
      time: this.now(),
      message: error.message,
      stack: this.stack(error)
    })
  }

  logError(info: ErrorInfo) {
    const diagnostics = this.load()
    diagnostics.errors.unshift(info)
    if (diagnostics.errors.length > this.MAX_ERRORS) {
      diagnostics.errors.length = this.MAX_ERRORS
    }
    this.save(diagnostics)
  }

  logErrorEvent(it: ErrorEvent) {
    this.logError({
      time: this.now(),
      message: it.message,
      file: it.filename,
      line: it.lineno,
      stack: this.stack(it.error)
    })
  }

  logPromiseRejection(it: PromiseRejectionEvent) {
    const error = this.error(it)
    const info: ErrorInfo = {
      time: this.now(),
      message: `Unhandled promise rejection: ${error?.message}` || 'Unhandled promise rejection',
      stack: this.stack(error)
    }
    this.logError(info)
  }

  stack(it: any): string[] | undefined {
    const error = this.error(it)
    if (error?.stack) {
      const stack = error.stack.split(/\s*[\r\n]+\s+at\s+/)
      stack.shift()
      return stack
    } else {
      return undefined
    }
  }

  private load(): Diagnostics {
    const result = localStorage.getItem('__diagnostics')
    return result ? JSON.parse(result) : {errors: []}
  }

  private save(it: Diagnostics) {
    localStorage.setItem('__diagnostics', JSON.stringify(it))
  }

  private now(): string {
    return new Date().toISOString()
  }

  private error(source: any): Error | undefined {
    if ('message' in source) return source as Error
    if ('reason' in source && 'message' in source.reason) return source.reason as Error
    return undefined
  }
}
