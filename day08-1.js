const fs = require('fs');

const isTreeVisible = (treesGrid, x, y) => {
  const gridWidth = treesGrid[0].length;
  const gridHeight = treesGrid.length;
  const treeHeight = treesGrid[y][x];

  let visibleLeft = true;
  let visibleRight = true;
  let visibleTop = true;
  let visibleBottom = true;

  // Check for visibility left.
  for (let preX = 0; preX < x; preX += 1) {
    if (treesGrid[y][preX] >= treeHeight) {
      visibleLeft = false;

      break;
    }
  }

  // Check for visibility right.
  for (let postX = x + 1; postX < gridWidth; postX += 1) {
    if (treesGrid[y][postX] >= treeHeight) {
      visibleRight = false;

      break;
    }
  }

  // Check for visibility top.
  for (let preY = 0; preY < y; preY += 1) {
    if (treesGrid[preY][x] >= treeHeight) {
      visibleTop = false;

      break;
    }
  }

  // Check for visibility bottom.
  for (let postY = y + 1; postY < gridHeight; postY += 1) {
    if (treesGrid[postY][x] >= treeHeight) {
      visibleBottom = false;

      break;
    }
  }

  return visibleLeft || visibleRight || visibleTop || visibleBottom;
};

fs.readFile('day08-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  let visibleTrees = 0;

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
      if (isTreeVisible(treesGrid, x, y)) {
        visibleTrees += 1;
      }
    });
  });

  console.log(visibleTrees);
});
