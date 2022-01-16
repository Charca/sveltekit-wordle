export function checkGuess(solution: string, guess: string): number[] {
  return guess.split('').reduce((acc, letter, idx) => {
    // letter in the right place
    if (letter === solution[idx]) {
      return [...acc, 2];
    }

    const idxInSolution = solution.indexOf(letter);
    const hasBeenGuessed = guess[idxInSolution] === solution[idxInSolution];

    // letter somewhere else in the word and has not been guessed in the right place already
    // (for repeated letters)
    // TODO: There is a bug here: try solution 'color', guess 'roomb'. The second `o` should be a 1.
    if (idxInSolution !== -1 && !hasBeenGuessed) {
      return [...acc, 1];
    }

    // letter not in the word
    return [...acc, 0];
  }, []);
}
