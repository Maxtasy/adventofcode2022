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

  for (let i = 0; i < lines.length; i += 3) {
    if (!lines[i]) break;

    const first = lines[i].split('');
    const second = lines[i + 1].split('');
    const third = lines[i + 2].split('');

    alphabet.split('').forEach((type) => {
      if (first.includes(type) && second.includes(type) && third.includes(type)) {
        priorityScore += priorities[type];
      }
    });
  }

  console.log(priorityScore);
});
