<script>
  import Keyboard from '../components/Keyboard.svelte';
  import Board from '../components/Board.svelte';
  import { solution } from '../stores';
  import { solutions, allWords } from '../words';
  import { onMount } from 'svelte';

  const MAX_GUESSES = 6;
  const WORD_LENGTH = 5;
  let currentWord = '';
  let guesses = [];
  let gameState = 'playing';
  let solutionWord = '';

  solution.subscribe((value) => {
    solutionWord = value;
    // console.log(solutionWord);
  });

  onMount(() => {
    const randomIndex = Math.floor(Math.random() * solutions.length);
    solution.set(solutions[randomIndex]);
  });

  function handleInput(event) {
    if (gameState !== 'playing') {
      return;
    }

    if (event.detail.key === 'Backspace') {
      currentWord = currentWord.slice(0, -1);
    } else if (currentWord.length < WORD_LENGTH) {
      currentWord += event.detail.key;
    }
  }

  function handleSubmit() {
    if (currentWord.length < WORD_LENGTH || gameState !== 'playing') {
      return;
    }

    if (!allWords.includes(currentWord)) {
      alert('Invalid word');
      return;
    }

    guesses = [...guesses, currentWord];

    if (currentWord === solutionWord) {
      gameState = 'won';

      setTimeout(() => {
        alert('YOU WON!');
      }, 100);
    }

    if (guesses.length === MAX_GUESSES) {
      gameState = 'lost';

      setTimeout(() => {
        alert('You lost! The word was ' + solutionWord.toUpperCase());
      }, 100);
    }

    currentWord = '';
  }
</script>

<main>
  <header>
    <h1>SvelteKit Wordle</h1>
  </header>
  <div class="board-container">
    <Board {currentWord} {guesses} />
  </div>
  <div class="keyboard-container">
    <Keyboard on:input={handleInput} on:submit={handleSubmit} />
  </div>
</main>

<style>
  :root {
    --green: #6aaa64;
    --darkendGreen: #538d4e;
    --yellow: #c9b458;
    --darkendYellow: #b59f3b;
    --lightGray: #d8d8d8;
    --gray: #86888a;
    --darkGray: #939598;

    --color-tone-1: #d7dadc;
    --color-tone-2: #818384;
    --color-tone-3: #565758;
    --color-tone-4: #3a3a3c;
    --color-tone-5: #272729;
    --color-tone-6: #1a1a1b;
    --color-tone-7: #121213;

    --color-present: var(--darkendYellow);
    --color-correct: var(--darkendGreen);
    --color-absent: var(--color-tone-4);
  }

  :global(html) {
    background-color: #1d1f25;
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    max-width: 500px;
    margin: 0 auto;
  }

  header {
    text-align: center;
  }

  .board-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
