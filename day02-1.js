const fs = require('fs');

const pointsMap = {
  X: 1,
  Y: 2,
  Z: 3,
  AX: 3,
  AY: 6,
  AZ: 0,
  BX: 0,
  BY: 3,
  BZ: 6,
  CX: 6,
  CY: 0,
  CZ: 3,
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

    const roundScore = pointsMap[mySymbol] + pointsMap[`${opponentSymbol}${mySymbol}`];

    return (total += roundScore);
  }, 0);

  console.log(totalScore);
});
