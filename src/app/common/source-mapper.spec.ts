import {SourceMapper} from "./source-mapper";
import {StackLine, StackParser} from "./stack-parser";


describe('SourceMapper', () => {
  const $error = new Error('This is bad!')
  let $stack: StackLine[]

  beforeEach(() => {
    $stack = StackParser.parse($error)
  })

  describe('map', () => {
    it('should map stack', async () => {
      const result = await SourceMapper.map($stack)
    })
  })
})
