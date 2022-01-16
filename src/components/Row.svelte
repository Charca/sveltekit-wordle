<script lang="ts">
  import type { Word } from '../types';
  import { checkGuess } from '../utils/checkGuess';
  import { solution } from '../stores';

  export let word: Word;
  export let isCurrent = false;

  let solutionWord = '';

  solution.subscribe((value) => {
    solutionWord = value;
  });

  function getLetters(word: Word) {
    let letters = new Array<string>(5).fill('');
    let lettersWithData = [];
    for (let i = 0; i < word.word.length; i++) {
      letters[i] = word.word[i];
    }

    if (!isCurrent && word.type !== 'empty') {
      const letterCodes = checkGuess(solutionWord, word.word);
      lettersWithData = letters.map((letter, index) => ({
        letter,
        className:
          letterCodes[index] === 2 ? 'correct' : letterCodes[index] === 1 ? 'present' : 'absent'
      }));
    } else {
      lettersWithData = letters.map((letter) => ({
        letter,
        className: !letter || word.type === 'empty' ? 'empty' : 'tbd'
      }));
    }

    return lettersWithData;
  }

  $: letters = getLetters(word);
</script>

<div class="row">
  {#each letters as l}
    <div class={'tile ' + l.className}>{l.letter}</div>
  {/each}
</div>

<style>
  .row {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 5px;
  }

  .tile {
    width: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    line-height: 2rem;
    font-weight: bold;
    vertical-align: middle;
    box-sizing: border-box;
    color: var(--tile-text-color);
    text-transform: uppercase;
    user-select: none;
  }

  .tile.correct {
    background-color: var(--color-correct);
  }

  .tile.present {
    background-color: var(--color-present);
  }

  .tile.absent {
    background-color: var(--color-absent);
  }

  .tile.empty {
    border: 2px solid var(--color-tone-4);
  }

  .tile.tbd {
    border: 2px solid var(--color-tone-3);
  }
</style>
