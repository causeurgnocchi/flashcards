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
    const input = document.querySelector('.registration__input');
    const lines = input.value.split('\n');
    const deck = [];

    for (let i = 0; i < lines.length; i += 3) {
        const card = new Card(lines[i], lines[i + 1], lines[i + 2]);
        deck.push(card);
    }

    const studySession = new StudySession(deck, [], 0);

    const registrationSection = document.querySelector('.registration');
    const studySessionSection = document.querySelector('.study-session');

    registrationSection.classList.add('hidden');
    studySessionSection.classList.remove('hidden');

    const writing = document.querySelector('.current-card__writing');
    const reading = document.querySelector('.current-card__reading');
    const meaning = document.querySelector('.current-card__meaning');

    writing.textContent = studySession.currentCard.writing;
    reading.textContent = studySession.currentCard.reading;
    meaning.textContent = studySession.currentCard.meaning;
}
