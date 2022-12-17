const fs = require('fs');

fs.readFile('day01-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  let mostCalories = 0;

  const inventories = data.split('\n\n');

  inventories.map((inventory) => {
    const totalCalories = inventory
      .split('\n')
      .reduce((total, line) => (total += parseInt(line, 10)), 0);

    if (totalCalories > mostCalories) {
      mostCalories = totalCalories;
    }

    return totalCalories;
  });

  console.log(mostCalories);
});
