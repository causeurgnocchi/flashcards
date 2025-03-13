class Study {
  cards: Card[] = $state([]);
  card: Card | null = $state(null);
  maxScore: number;

  constructor(cards: Card[], maxScore = 2) {
    this.cards = cards;
    this.card = cards[Math.floor(Math.random() * cards.length)];
    this.maxScore = maxScore;
  }

  get pending() {
    return this.cards.filter((c) => c.score <= this.maxScore);
  }

  evaluateAnswer(reading: string, meaning: string): boolean {
    if (reading === this.card!.reading && meaning.toLowerCase() === this.card!.meaning.toLowerCase()) {
      this.card!.score += 1;

      if (this.pending.length === 0) {
        this.card = null;

        return true;
      }

      if (this.pending.length === 1 && this.pending[0].equals(this.card!)) {
        return true;
      }

      const other = this.pending.filter((c) => !c.equals(this.card!));
      const randomIndex = Math.floor(Math.random() * other.length);

      this.card = other[randomIndex]; 

      return true;
    }

    this.card!.score = 0;

    return false;
  }
}

class Card {
  writing: string;
  reading: string;
  meaning: string;
  score: number = $state(0);

  constructor(writing: string, reading: string, meaning: string) {
    this.writing = writing;
    this.reading = reading;
    this.meaning = meaning;
    this.score = 0;
  }

  equals(other: Card) {
    switch(true) {
      case this.writing === other.writing:
      case this.reading === other.reading:
      case this.meaning === other.meaning:
        return true;
      default:
        return false;
    }
  }
}

export { Study, Card };