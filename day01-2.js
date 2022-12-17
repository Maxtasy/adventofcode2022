const fs = require('fs');

fs.readFile('day01-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  let mostCalories = [0, 0, 0];

  const inventories = data.split('\n\n');

  const sortedInventories = inventories
    .map((inventory) => {
      const totalCalories = inventory
        .split('\n')
        .reduce((total, line) => (total += parseInt(line, 10)), 0);

      if (totalCalories > mostCalories[0]) {
        mostCalories[0] = totalCalories;
        console.log(mostCalories);
      } else if (totalCalories > mostCalories[1]) {
        mostCalories[1] = totalCalories;
        console.log(mostCalories);
      } else if (totalCalories > mostCalories[2]) {
        mostCalories[2] = totalCalories;
        console.log(mostCalories);
      }

      if (isNaN(totalCalories)) return 0;

      return totalCalories;
    })
    .sort();

  console.log(mostCalories);

  console.log(mostCalories[0] + mostCalories[1] + mostCalories[2]);
});
