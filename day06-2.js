const fs = require('fs');

const allUnique = (array) => {
  const encounteredItems = [];

  array.forEach((item) => {
    if (!encounteredItems.includes(item)) {
      encounteredItems.push(item);
    }
  });

  return array.length === encounteredItems.length;
};

fs.readFile('day06-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const sequence = [];

  let subroutine = 0;

  const lines = data.split('\n');
  const communicationArray = lines[0].split('');

  for (let i = 0; i < communicationArray.length; i += 1) {
    sequence.push(communicationArray[i]);

    subroutine += 1;

    if (sequence.length < 15) continue;

    sequence.shift();

    if (allUnique(sequence)) {
      break;
    }
  }

  console.log(subroutine);
});
