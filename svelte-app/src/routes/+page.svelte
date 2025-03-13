<script lang="ts">
  import CardComponent from '../components/Card.svelte';
  import { Study, Card } from '$lib/ambient.svelte';

  let study = new Study([]);
  let mode = $state('registration');
  let material = $state('');
  let reading = $state('');
  let meaning = $state('');
  let readingElement: HTMLInputElement; 

  function startStudy() {
    const lines = material.split("\n");
    const cards = [];

    for (let i = 0; i + 2 < lines.length; i += 3) {
      const card = new Card(lines[i], lines[i + 1], lines[i + 2]);
      cards.push(card);
    }

    study = new Study(cards);
    mode = 'study';
  }

  function evaluateAnswer(e: KeyboardEvent) {
    if (e.key !== 'Enter') {
      return;
    }

    study.evaluateAnswer(reading, meaning);

    reading = '';
    meaning = '';
    readingElement.focus();
  }
</script>

<h1>Flashcards</h1>
{#if mode === 'registration'}
  <textarea class="material" rows="7" bind:value={material}></textarea>
  <button class="start" onclick={startStudy}>Start</button>
{:else if mode === 'study'}
  {#if study.card !== null}
    <CardComponent
      writing={study.card!.writing}
      reading={study.card!.reading}
      meaning={study.card!.meaning}
    />
  {/if}
  <input class="reading" type="text" bind:value={reading} bind:this={readingElement} />
  <input class="meaning" type="text" bind:value={meaning} onkeydown={evaluateAnswer} />
  <p class="progress">{study.cards.reduce<number>((sum, card) => sum + card.score, 0)}/{study.cards.length * study.maxScore}</p>
{/if}

<style>
  .material {
    resize: none;
  }

  .start {
    display: block;
  }
</style>
