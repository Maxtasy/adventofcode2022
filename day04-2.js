const fs = require('fs');

fs.readFile('day04-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const lines = data.split('\n');

  let overlapCount = 0;

  lines.forEach((line) => {
    if (!line) return;

    const lineParts = line.split(',');
    const first = lineParts[0].split('-').map((numberString) => parseInt(numberString, 10));
    const second = lineParts[1].split('-').map((numberString) => parseInt(numberString, 10));

    if (
      (second[0] >= first[0] && second[0] <= first[1]) ||
      (second[1] >= first[0] && second[1] <= first[1]) ||
      (first[0] >= second[0] && first[0] <= second[1]) ||
      (first[1] >= second[0] && first[1] <= second[1])
    ) {
      overlapCount += 1;
    }
  });

  console.log(overlapCount);
});
