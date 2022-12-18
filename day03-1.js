const fs = require('fs');

fs.readFile('day03-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const priorities = {};

  alphabet.split('').forEach((type, index) => (priorities[type] = index + 1));

  const lines = data.split('\n');

  let priorityScore = 0;

  lines.forEach((line) => {
    const first = [];
    const second = [];
    const scored = [];

    line.split('').forEach((type, index) => {
      if (index < line.length / 2) {
        first.push(type);
      } else {
        second.push(type);
      }

      if (first.includes(type) && second.includes(type) && !scored.includes(type)) {
        priorityScore += priorities[type];

        scored.push(type);
      }
    });
  });

  console.log(priorityScore);
});
