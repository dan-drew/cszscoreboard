import {GuessAnswers} from "./guess-answers";
import {GuessingGame} from "./guessing-game";

describe('guess-answers', function() {
  describe('list game', function() {
    const $game = new GuessingGame(
      'list',
      [{label: 'list', lines: 12, multiline: true}],
      {style: 'list'}
    )
    const $answers = new GuessAnswers('all', $game, {useCache: false})

    it('should have one answer', () => {
      expect($game.required).toEqual(1)
      expect($answers.count).toEqual(1)
      expect($answers.used).toEqual(0)
      expect($answers.at(0)).toBeDefined()
    })
  })

  describe('labeled game', function() {
    const $game = new GuessingGame(
      'labeled',
      [{label: 'one'}, {label: 'two'}, {label: 'three'}],
      {style: 'labeled'}
    )
    const $answers = new GuessAnswers('all', $game, {useCache: false})

    it('should have labeled answers', function() {
      expect($answers.count).toEqual(3)
      $answers.set(1, 'hello')
      expect($answers.value).toEqual(['', 'hello', ''])
    })
  })

  describe('variable game', function() {
    const $game = new GuessingGame(
      'variable',
      [2, 10]
    )
    const $answers = new GuessAnswers('all', $game, {useCache: false})

    it('should initialize with minimum answers plus extra', function() {
      expect($answers.count).toEqual(2)
      expect($answers.value).toEqual(['', ''])
    })

    it('should should grow', function() {
      $answers.set(2, 'hello')
      expect($answers.count).toEqual(3)
      expect($answers.value).toEqual(['', '', 'hello'])
    })
  })
})
