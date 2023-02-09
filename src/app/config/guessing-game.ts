interface GuessAnswer {
  name: string
  placeholder?: string
  optional?: boolean
}

export interface GuessingGame {
  // Unique ID
  id: string
  // Display name for settings and slides
  name: string
  // Combine labelled answers on a single slide
  singleSlide?: boolean
  // Show label on each slide
  showLabels?: boolean
  answers: GuessAnswer[]
}

const FIVETHING_PROMPT = 'Activity where something is something else and another thing is too'
const SHOPPING_PROMPT = 'Product where something is something else and another thing is too'

export const guessingGames: GuessingGame[] = [
  {
    id: '5things',
    name: '5 Things',
    answers: [
      { name: 'First Thing', placeholder: FIVETHING_PROMPT, optional: true  },
      { name: 'Second Thing', placeholder: FIVETHING_PROMPT, optional: true  },
      { name: 'Third Thing', placeholder: FIVETHING_PROMPT, optional: true  },
      { name: 'Fourth Thing', placeholder: FIVETHING_PROMPT, optional: true  },
      { name: 'Fifth Thing', placeholder: FIVETHING_PROMPT, optional: true  }
    ]
  },
  {
    id: 'home-shopping',
    name: 'Home Shopping Network',
    answers: [
      { name: 'First Thing', placeholder: SHOPPING_PROMPT, optional: true  },
      { name: 'Second Thing', placeholder: SHOPPING_PROMPT, optional: true  },
      { name: 'Third Thing', placeholder: SHOPPING_PROMPT, optional: true  },
      { name: 'Fourth Thing', placeholder: SHOPPING_PROMPT, optional: true  },
      { name: 'Fifth Thing', placeholder: SHOPPING_PROMPT, optional: true  }
    ]
  },
  {
    id: 'chain-murder',
    name: 'Chain Murder',
    singleSlide: true,
    answers: [
      { name: 'Location' },
      { name: 'Occupation' },
      { name: 'Weapon' }
    ]
  },
  {
    id: 'principals-office',
    name: "Principal's Office",
    showLabels: true,
    answers: [
      { name: 'Crime' },
      { name: 'Motive' },
      { name: 'Accomplice' }
    ]
  },
  {
    id: 'crime-scene',
    name: "Crime Scene",
    showLabels: true,
    answers: [
      { name: 'Crime' },
      { name: 'Motive' },
      { name: 'Accomplice' }
    ]
  },
  {
    id: 'generic',
    name: "Other",
    answers: [
      { name: 'Answer 1', optional: true },
      { name: 'Answer 2', optional: true },
      { name: 'Answer 3', optional: true },
      { name: 'Answer 4', optional: true },
      { name: 'Answer 5', optional: true }
    ]
  }
]
