import {TraceMap, originalPositionFor} from "@jridgewell/trace-mapping";
import {StackLine} from "./stack-parser";


export class SourceMapper {
  private static mappers = new Map<string, SourceMapper>()
  private tracer?: TraceMap
  private canTrace = true

  constructor(private readonly sourceName: string) {
  }

  static async mapLine(line: StackLine): Promise<StackLine> {
    if (line.file && line.file.endsWith('.js')) {
      return (await this.mapperFor(line.file!).map([line]))[0]
    } else {
      return line
    }
  }

  static async map(lines: StackLine[]): Promise<StackLine[]> {
    const result: StackLine[] = []

    for (const $line of lines) {
      result.push(await this.mapLine($line))
    }

    return result
  }

  private static mapperFor(file: string): SourceMapper {
    let mapper = this.mappers.get(file)

    if (!mapper) {
      mapper = new SourceMapper(file)
      this.mappers.set(file, mapper)
    }

    return mapper
  }

  async map(lines: StackLine[]): Promise<StackLine[]> {
    const tracer = await this.initTracer()

    if (tracer) {
      return lines.map<StackLine>(line => {
        const result = originalPositionFor(
          tracer,
          {
            column: line.column || 0,
            line: line.line!
          }
        )

        return {
          text: result.name || line.text,
          file: result.source || line.file || 'unknown',
          line: result.line || line.line || 0
        }
      })
    } else {
      return lines
    }
  }

  private async initTracer() {
    if (this.canTrace && !this.tracer) {
      try {
        const mapData = await this.load(`/${this.sourceName}.map`)
        this.tracer = new TraceMap(JSON.parse(mapData))
      } catch (e) {
        console.warn(`Could not load source maps for ${this.sourceName}`, e)
        this.canTrace = false
      }
    }

    return this.tracer
  }

  private load(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const request = new XMLHttpRequest()
        const url = this.sourceUrl()

        console.debug(`Loading source map ${url}`)

        request.open('GET', url)
        request.responseType = 'text'

        request.onload = () => {
          console.debug(`Got source map response: ${request.status} ${request.statusText}`)

          if (request.readyState === request.DONE) {
            if (request.status === 200) {
              resolve(request.responseText)
            } else {
              reject(new Error(request.statusText))
            }
          }
        }

        function handleError(ev: ProgressEvent) {
          console.debug(`Got source map error: ${ev}`)
          reject(ev)
        }

        request.onerror = handleError
        request.onabort = handleError
        request.send()
      } catch (err) {
        reject(err)
      }
    })
  }

  private sourceUrl() {
    if (this.sourceName.startsWith('http')) {
      return this.sourceName + '.map'
    } else {
      return `${window.location.protocol}//${window.location.host}/${this.sourceName}.map`
    }
  }
}
