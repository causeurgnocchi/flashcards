class StudySession {
  constructor(deck, mistakes, index) {
    this.deck = deck;
    this.mistakes = mistakes;
    this.index = index;
  }

  evaluateAnswer(givenAnswer) {
    const expectedAnswer = this.deck[this.index].reading;

    if (givenAnswer === expectedAnswer) {
      return new StudySession(
        this.deck,
        this.mistakes,
        this.index + 1,
      )
    }

    return new StudySession(
      this.deck,
      this.mistakes.some((m) => m.equals(expectedAnswer))
        ? this.mistakes
        : this.mistakes.concat(givenAnswer),
      this.index,
    )
  }

  get currentCard() {
    return this.deck[this.index];
  }
}

class Card {
  constructor(writing, reading, meaning) {
    this.writing = writing;
    this.reading = reading;
    this.meaning = meaning;
  }

  equals(other) {
    return this.writing === other.writing
      && this.reading === other.reading
      && this.meaning === other.meaning
  }
}

function startStudySession() {
  const registrationSection = document.querySelector('.registration');
  const registrationInput = document.querySelector('.registration__input');
  const lines = registrationInput.value.split('\n');
  const deck = [];

  for (let i = 0; i < lines.length; i += 3) {
    const card = new Card(lines[i], lines[i + 1], lines[i + 2]);
    deck.push(card);
  }

  registrationSection.classList.add('hidden');

  const studySession = new StudySession(deck, [], 0);
  const studySessionSection = document.querySelector('.study-session');
  studySessionSection.classList.remove('hidden');

  const frontWriting = document.querySelector('.current-card__front-writing');
  frontWriting.textContent = studySession.currentCard.writing;

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      const cardFront = document.querySelector('.current-card__front');
      const cardBack = document.querySelector('.current-card__back');
      cardFront.classList.add('hidden');
      cardBack.classList.remove('hidden');
    }
  };

  const readingInput = document.querySelector('.study-session__input--reading');
  const meaningInput = document.querySelector('.study-session__input--meaning');
  readingInput.addEventListener('keydown', keyDownHandler);
  meaningInput.addEventListener('keydown', keyDownHandler);
}