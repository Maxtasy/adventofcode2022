const fs = require('fs');

fs.readFile('day01-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const inventories = data.split('\n\n');

  const totals = inventories
    .map((inventory) => {
      const totalCalories = inventory
        .split('\n')
        .reduce((total, line) => (total += parseInt(line, 10)), 0);

      if (isNaN(totalCalories)) return 0;

      return totalCalories;
    })
    .sort();

  console.log(totals.slice(totals.length - 3).reduce((total, num) => (total += num), 0));
});
