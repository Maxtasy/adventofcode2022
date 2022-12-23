const fs = require('fs');

const directionMap = {
  U: {
    x: 0,
    y: -1,
  },
  D: {
    x: 0,
    y: 1,
  },
  R: {
    x: 1,
    y: 0,
  },
  L: {
    x: -1,
    y: 0,
  },
};

fs.readFile('day09-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const visitedFields = {};
  const head = { x: 0, y: 0, previousPosition: { x: 0, y: 0 } };
  const tail = { x: 0, y: 0 };

  const lines = data.split('\n');

  lines.forEach((line) => {
    if (!line) return;

    const [direction, steps] = line.split(' ');

    for (let i = 0; i < parseInt(steps, 10); i += 1) {
      head.previousPosition.x = head.x;
      head.previousPosition.y = head.y;
      head.x += directionMap[direction].x;
      head.y += directionMap[direction].y;

      const distanceX = head.x - tail.x;
      const distanceY = head.y - tail.y;

      if (Math.abs(distanceX) > 1 || Math.abs(distanceY) > 1) {
        tail.x = head.previousPosition.x;
        tail.y = head.previousPosition.y;
      }

      const newTailLocationString = `${tail.x},${tail.y}`;

      if (!visitedFields[newTailLocationString]) {
        visitedFields[newTailLocationString] = 1;
      } else {
        visitedFields[newTailLocationString] += 1;
      }
    }
  });

  console.log(Object.keys(visitedFields).length);
});
