/**
 * See docs/Guessing-Games.md
 */

import {GuessingGame} from "./guessing-game";

const FIVETHING_PROMPT = 'Activity\nSomething is something else\nAnother thing is too'
const SHOPPING_PROMPT = 'Product\nSomething is something else\nAnother thing is too'

const homeShopping = new GuessingGame(
  'Home Shopping Network',
  [3, 5],
  {
    style: 'list',
    labelTemplate: '{{}} Product',
    placeholderTemplate: SHOPPING_PROMPT,
    multiline: true,
    listName: 'Home Shopping'
  }
)

export const guessingGames: GuessingGame[] = Object.seal([
  new GuessingGame(
    '5 Things',
    5,
    {labelTemplate: '{{}} Thing', placeholderTemplate: FIVETHING_PROMPT, multiline: true}
  ),
  new GuessingGame(
    '3 Things',
    3,
    {labelTemplate: '{{}} Thing', placeholderTemplate: FIVETHING_PROMPT, multiline: true}
  ),
  homeShopping,
  homeShopping.asVs('shared'),
  new GuessingGame(
    'Chain Murder',
    [{label: 'Location'}, {label: 'Occupation'}, {label: 'Weapon'}],
    {style: 'labeled'}
  ),
  new GuessingGame(
    'Principal\'s Office',
    [{label: 'Crime'}, {label: 'Motive'}, {label: 'Accomplice'}],
    {style: 'labeled'}
  ),
  new GuessingGame(
    'Crime Story',
    [{label: 'Crime'}, {label: 'Motive'}, {label: 'Accomplice'}],
    {style: 'labeled'}
  ),
  new GuessingGame(
    'Dating Service',
    [{label: 'Adjective'}, {label: 'Noun'}, {label: 'Verb'}],
    {vs: 'vs', style: 'list'}
  ),
  new GuessingGame(
    'Sideline Debate',
    [{label: 'Verb'}, {label: 'Adjective'}, {label: 'Noun'}],
    {vs: 'vs', style: 'list'}
  ),
  new GuessingGame(
    'Playground Insults',
    [{label: 'Adjective'}, {label: 'Verb'}, {label: 'Noun'}],
    {vs: 'vs', style: 'list'}
  ),
  new GuessingGame(
    'Blitzkrieg',
    [{label: 'Answers', multiline: true, lines: 15}],
    {style: 'list'}
  ),
  new GuessingGame(
    'Guess! That! Thing!',
    [{label: 'Answers', multiline: true, lines: 10}],
    {style: 'list'}
  ),
  new GuessingGame(
    'Good Cop, Bad Cop',
    [{label: 'Cops', lines: 12, multiline: true}],
    {style: 'list'}
  ),
  new GuessingGame(
    'Hot Bell',
    [1, 20]
  ),
  new GuessingGame(
    'Press Conference',
    [{label: 'What'}, {label: 'Why'}, {label: 'With'}],
    {style: 'labeled'}
  )
].sort((x, y) => x.name.localeCompare(y.name)))
