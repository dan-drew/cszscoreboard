import {guessingGames} from "./guessing-games";
import {Guesses} from "./guesses";
import {GuessAnswers} from "./guess-answers";

describe('guesses', function () {
  let $guesses = new Guesses({useCache: false})

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

        it('should default multiline', () => {
          if ($game.guesses.length === 1 && $game.guesses[0].multiline) {
            expect($answers.at(0)).toBeDefined()
          }
        })
      })
    })
  })
})
