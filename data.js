/* Demo flashcard data — estructura: WORD-EXPRESSION, MEANING, EXPLANATION, SYNONYMS, EXAMPLE_SENTENCE, IPA */
const DEMO_CARDS = [
  {
    expression:  "Break the ice",
    meaning:     "To do or say something to relieve tension",
    explanation: "Used when someone does something to make people feel more comfortable in a social situation.",
    synonyms:    "Warm up, ease the tension, get the ball rolling",
    example:     "He told a joke to break the ice at the beginning of the meeting.",
    ipa:         "/breɪk ðə aɪs/"
  },
  {
    expression:  "Hit the nail on the head",
    meaning:     "To say or do exactly the right thing",
    explanation: "Used to say that someone has described a situation or problem perfectly.",
    synonyms:    "Be spot on, be exactly right, nail it",
    example:     "You hit the nail on the head with that analysis — that's exactly the problem.",
    ipa:         "/hɪt ðə neɪl ɒn ðə hɛd/"
  },
  {
    expression:  "Under the weather",
    meaning:     "Feeling slightly ill or unwell",
    explanation: "An informal way to say you are not feeling well, often used for minor illnesses.",
    synonyms:    "Not feeling well, feeling off, out of sorts",
    example:     "I'm feeling a bit under the weather today, so I'll work from home.",
    ipa:         "/ˈʌndər ðə ˈwɛðər/"
  },
  {
    expression:  "Bite the bullet",
    meaning:     "To endure a painful situation bravely",
    explanation: "To face a difficult or unpleasant situation with courage and get it done.",
    synonyms:    "Face the music, tough it out, grin and bear it",
    example:     "I hate going to the dentist, but I bit the bullet and made an appointment.",
    ipa:         "/baɪt ðə ˈbʊlɪt/"
  },
  {
    expression:  "Spill the beans",
    meaning:     "To reveal secret information accidentally",
    explanation: "To tell people something that was supposed to be kept secret.",
    synonyms:    "Let the cat out of the bag, give it away, blow the secret",
    example:     "Don't spill the beans about the surprise party — she doesn't know yet!",
    ipa:         "/spɪl ðə biːnz/"
  },
  {
    expression:  "Once in a blue moon",
    meaning:     "Very rarely; not very often",
    explanation: "Something that happens extremely infrequently. A blue moon refers to a second full moon in a calendar month.",
    synonyms:    "Rarely, seldom, hardly ever, once in a while",
    example:     "I only eat fast food once in a blue moon.",
    ipa:         "/wʌns ɪn ə bluː muːn/"
  },
  {
    expression:  "Cost an arm and a leg",
    meaning:     "To be very expensive",
    explanation: "Used to describe something that costs a lot of money, more than expected.",
    synonyms:    "Cost a fortune, be pricey, be overpriced",
    example:     "That new electric car costs an arm and a leg, but it's worth it.",
    ipa:         "/kɒst ən ɑːm ænd ə lɛɡ/"
  },
  {
    expression:  "The ball is in your court",
    meaning:     "It is your turn to take action or make a decision",
    explanation: "Used to tell someone that it is now their responsibility to do something or make a choice.",
    synonyms:    "Your move, up to you, your call",
    example:     "I've made my offer — the ball is in your court now.",
    ipa:         "/ðə bɔːl ɪz ɪn jɔːr kɔːrt/"
  },
  {
    expression:  "Bite off more than you can chew",
    meaning:     "To try to do more than you are able to handle",
    explanation: "Taking on too much responsibility or too many tasks at once.",
    synonyms:    "Overcommit, take on too much, overextend yourself",
    example:     "Taking four courses while working full-time is biting off more than you can chew.",
    ipa:         "/baɪt ɒf mɔːr ðæn juː kæn tʃuː/"
  },
  {
    expression:  "Kill two birds with one stone",
    meaning:     "To accomplish two things with a single action",
    explanation: "Solving two problems or completing two tasks at the same time with one effort.",
    synonyms:    "Accomplish two things at once, be efficient, multitask",
    example:     "I'll drop the package off on my way to the gym — kill two birds with one stone.",
    ipa:         "/kɪl tuː bɜːrdz wɪð wʌn stoʊn/"
  },
  {
    expression:  "Get out of hand",
    meaning:     "To become impossible to control",
    explanation: "A situation that has gone beyond what is manageable or acceptable.",
    synonyms:    "Get out of control, spiral, go too far",
    example:     "The party got out of hand when the neighbors called the police.",
    ipa:         "/ɡɛt aʊt əv hænd/"
  },
  {
    expression:  "Burn the midnight oil",
    meaning:     "To work or study late into the night",
    explanation: "To stay up very late working hard, referring to the old practice of burning oil lamps at night.",
    synonyms:    "Work late, pull an all-nighter, stay up late",
    example:     "She was burning the midnight oil to finish the report before the deadline.",
    ipa:         "/bɜːrn ðə ˈmɪdnaɪt ɔɪl/"
  }
];
