import {StackParser} from "./stack-parser";

function throwError() {
  throw new Error('This is an error!')
}

describe('StackParser', () => {
  describe('parse', () => {
    it('parses a stack', () => {
      try {
        throwError()
      } catch (error) {
        const result = StackParser.parse(error)
        expect(result.length).toBeGreaterThan(1)
        result.forEach(line => {
          expect(line.text).toBeDefined()
          expect(line.file).toBeDefined()
          expect(line.line).toBeDefined()
        })
      }
    })
  })
})
