export interface StackLine {
  text: string
  file?: string
  line?: number
  column?: number
}

export class StackParser {
  private static readonly LINE_PATTERN = /^(?<text>.*)\s+\((?<file>.+)\)/
  private static readonly POSITION_PATTERN = /:(?<line>\d+)(?::(?<column>\d+))?$/

  private constructor() {
  }

  static parse(stackOrError: string | any): StackLine[] {
    let stack: string

    if (typeof stackOrError === 'string') {
      stack = stackOrError
    } else {
      if (stackOrError.stack) {
        stack = stackOrError.stack
      } else {
        return []
      }
    }

    const lines = stack.split(/\s*[\r\n]+\s+at\s+/)
    lines.shift() // Remove heading line
    return lines.map(line => this.parseLine(line))
  }

  static parseLine(line: string): StackLine {
    const match = line.match(this.LINE_PATTERN)

    if (match) {
      let {text, file} = match.groups!
      const pos = file.match(this.POSITION_PATTERN)
      const { line, column} = pos?.groups || {}

      if (pos) {
        file = file.substring(0, pos.index)
      }

      return { text, file, line: this.toNumber(line), column: this.toNumber(column) }
    } else {
      return { text: line }
    }
  }

  static toString(line: StackLine): string {
    return `${line.text} (${line.file}:${line.line})`
  }

  private static toNumber(val: string | undefined): number | undefined {
    return val ? Number(val) : undefined
  }
}
