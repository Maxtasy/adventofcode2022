const fs = require('fs');

const calculateScenicScore = (treesGrid, x, y) => {
  const gridWidth = treesGrid[0].length;
  const gridHeight = treesGrid.length;
  const treeHeight = treesGrid[y][x];

  let distanceLeft = 0;
  let distanceRight = 0;
  let distanceTop = 0;
  let distanceBottom = 0;

  // Check for distance left.
  for (let preX = x - 1; preX >= 0; preX -= 1) {
    distanceLeft += 1;

    if (treesGrid[y][preX] >= treeHeight) {
      break;
    }
  }

  // Check for distance right.
  for (let postX = x + 1; postX < gridWidth; postX += 1) {
    distanceRight += 1;

    if (treesGrid[y][postX] >= treeHeight) {
      break;
    }
  }

  // Check for distance top.
  for (let preY = y - 1; preY >= 0; preY -= 1) {
    distanceTop += 1;

    if (treesGrid[preY][x] >= treeHeight) {
      break;
    }
  }

  // Check for distance bottom.
  for (let postY = y + 1; postY < gridHeight; postY += 1) {
    distanceBottom += 1;

    if (treesGrid[postY][x] >= treeHeight) {
      break;
    }
  }

  return distanceLeft * distanceRight * distanceTop * distanceBottom;
};

fs.readFile('day08-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  let bestScenicScore = 0;

  const treesGrid = [];

  const lines = data.split('\n');

  lines.forEach((line, lineIndex) => {
    if (!line) return;

    treesGrid.push([]);

    const trees = line.split('');

    trees.forEach((tree) => {
      const height = parseInt(tree, 10);

      treesGrid[lineIndex].push(height);
    });
  });

  treesGrid.forEach((line, y) => {
    line.forEach((_, x) => {
      const scenicScore = calculateScenicScore(treesGrid, x, y);

      if (scenicScore > bestScenicScore) {
        bestScenicScore = scenicScore;
      }
    });
  });

  console.log(bestScenicScore);
});
