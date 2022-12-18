const fs = require('fs');

const pointsMap = {
  AX: 3, // Rock vs. Scissors (3): Loss (0)
  AY: 4, // Rock vs. Rock (1): Tie (3)
  AZ: 8, // Rock vs. Paper (2): Win (6)
  BX: 1, // Paper vs. Rock (1): Loss (0)
  BY: 5, // Paper vs. Paper (2): Tie (3)
  BZ: 9, // Paper vs. Scissors (3): Win (6)
  CX: 2, // Scissors vs. Paper (2): Loss (0)
  CY: 6, // Scissors vs. Scissors (3): Tie (3)
  CZ: 7, // Scissors vs. Rock (1): Win (6)
};

fs.readFile('day02-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const lines = data.split('\n');

  const totalScore = lines.reduce((total, line) => {
    if (!line) return total;

    const [opponentSymbol, mySymbol] = line.split(' ');

    const roundScore = pointsMap[`${opponentSymbol}${mySymbol}`];

    return (total += roundScore);
  }, 0);

  console.log(totalScore);
});
