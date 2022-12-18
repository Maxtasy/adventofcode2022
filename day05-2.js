const fs = require('fs');

fs.readFile('day05-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const lines = data.split('\n');

  const stacks = [
    ['H', 'T', 'Z', 'D'],
    ['Q', 'R', 'W', 'T', 'G', 'C', 'S'],
    ['P', 'B', 'F', 'Q', 'N', 'R', 'C', 'H'],
    ['L', 'C', 'N', 'F', 'H', 'Z'],
    ['G', 'L', 'F', 'Q', 'S'],
    ['V', 'P', 'W', 'Z', 'B', 'R', 'C', 'S'],
    ['Z', 'F', 'J'],
    ['D', 'L', 'V', 'Z', 'R', 'H', 'Q'],
    ['B', 'H', 'G', 'N', 'F', 'Z', 'L', 'D'],
  ];

  lines.forEach((line) => {
    if (!line.startsWith('move')) return;

    const lineParts = line.split(' ');

    const count = parseInt(lineParts[1], 10);
    const from = parseInt(lineParts[3], 10) - 1;
    const to = parseInt(lineParts[5], 10) - 1;

    const containers = stacks[from].slice(-count);

    stacks[from] = stacks[from].slice(0, -count);
    stacks[to] = stacks[to].concat(containers);
  });

  let result = '';

  stacks.forEach((stack) => {
    result += stack.pop();
  });

  console.log(result);
});
