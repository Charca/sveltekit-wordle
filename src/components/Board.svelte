<script lang="ts">
  import type { Word } from '../types';
  import Row from './Row.svelte';

  export let currentWord: string = '';
  export let guesses: string[] = [];

  let words = new Array<Word>(6).fill({
    word: '',
    type: 'empty'
  });

  $: currentIndex = guesses.length;
  $: for (let [guess, i] of guesses) {
    words[i] = {
      word: guess,
      type: 'submitted'
    };
  }

  // Update the row with the current word
  $: words[currentIndex] = {
    word: currentWord,
    type: 'typing'
  };
</script>

<div class="board">
  {#each words as word, i}
    {#if i < 6}
      <Row {word} isCurrent={i === currentIndex} />
    {/if}
  {/each}
</div>

<style>
  .board {
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    grid-gap: 5px;
    padding: 10px;
    box-sizing: border-box;

    width: 350px;
    height: 420px;
  }
</style>
