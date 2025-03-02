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
  const registrationInput = document.querySelector('.registration__input');

  sessionStorage.setItem('studyMaterial', registrationInput.value);

  location.href = '/study-session/';
}
