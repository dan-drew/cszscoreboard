import {guessingGames} from "./guessing-games";
import {Guesses} from "./guesses";
import {GuessAnswers} from "./guess-answers";
import {Cache} from "./cache";

describe('guesses', function () {
  const $game = guessingGames.find(game => game.name === 'Crime Story')!
  let $guesses: Guesses

  beforeEach(() => {
    Cache.reset()
    $guesses = new Guesses({useCache: false})
  })

  afterEach(() => {
    Cache.reset()
  })

  describe('serialize', () => {
    it('saves to cache', () => {
      $guesses.game = $game
      $guesses.answers!.setAll(['one', 'two', 'three'])

      let data = Cache.get<any>('guesses')
      expect(data).toEqual({gameId: $game.id, selected: 0})
      data = Cache.get<any>('guess-all')
      expect(data).toEqual({answers: ['one', 'two', 'three']})
    })
  })

  describe('deserialize', () => {

    it('should load cached game', () => {
      Cache.set('guesses', {gameId: $game.id, selected: 0})
      Cache.set('guess-all', {answers: ['one', 'two', 'three']})
      Cache.dump()

      $guesses = new Guesses({useCache: true})

      expect($guesses.game).toBe($game)
      expect($guesses.answers?.at(0)).toEqual('one')
      expect($guesses.answers?.at(1)).toEqual('two')
      expect($guesses.answers?.at(2)).toEqual('three')
    })
  })

  describe('games', () => {
    guessingGames.forEach($game => {
      describe($game.name, () => {
        const $now = Date.now() - 1

        beforeEach(() => {
          $guesses.game = $game
        })

        afterEach(() => {
          $guesses.reset()
        })

        it('initializes answers', () => {
          expect($guesses.selected).toBe(0)
          if ($game.vs === 'vs') {
            expect($guesses.red).toBeDefined()
            expect($guesses.blue).toBeDefined()
            expect($guesses.answers).toBeUndefined()
          } else {
            expect($guesses.red).toBeUndefined()
            expect($guesses.blue).toBeUndefined()
            expect($guesses.answers).toBeDefined()
          }
        })

        it('should be changed', () => {
          expect($guesses.guessesChanged).toBeGreaterThan($now)
        })

        it('should have max answers', () => {
          expect($guesses.maxAnswers).toBe($game.guesses.length)
        })

        it('should have required answers', () => {
          expect($game.required).toBeGreaterThan(0)
        })

        describe('answers', () => {
          const $answers = new GuessAnswers('all', $game, {useCache: false})

          it('should be changed', () => {
            expect($answers.guessesChanged).toBeGreaterThan($now)
          })

          it('should return count', () => {
            expect($answers.count).toBe($game.required)
          })

          it('should return used', () => {
            expect($answers.used).toBe(0)
          })

          if ($game.guesses.length === 1 && $game.guesses[0].multiline) {
            it('should default multiline', () => {
              expect($answers.at(0)).toBeDefined()
            })
          }
        })
      })
    })
  })
})
