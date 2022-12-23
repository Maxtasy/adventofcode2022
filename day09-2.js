const fs = require('fs');

fs.readFile('day09-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  class Knot {
    constructor(x, y) {
      this.x = x;
      this.y = y;

      this.visitedFields = [];

      this.storeVisitedField();
    }

    move(direction) {
      switch (direction) {
        case 'R':
          this.x += 1;

          break;
        case 'L':
          this.x -= 1;

          break;
        case 'U':
          this.y -= 1;

          break;
        case 'D':
          this.y += 1;

          break;
        case 'UR':
          this.x += 1;
          this.y -= 1;

          break;
        case 'DR':
          this.x += 1;
          this.y += 1;

          break;
        case 'UL':
          this.x -= 1;
          this.y -= 1;

          break;
        case 'DL':
          this.x -= 1;
          this.y += 1;

          break;

        default:
          break;
      }
    }

    storeVisitedField() {
      const fieldString = `${this.x},${this.y}`;

      if (!this.visitedFields.includes(fieldString)) {
        this.visitedFields.push(fieldString);
      }
    }
  }

  class Rope {
    constructor(length) {
      this.head = new Knot(0, 0);
      this.knots = [];

      for (let i = 0; i < length - 1; i += 1) {
        this.knots.push(new Knot(0, 0));
      }
    }

    move(direction, steps) {
      for (let step = 0; step < steps; step += 1) {
        this.head.move(direction);

        this.knots.forEach((knot, index) => {
          const previousKnot = index === 0 ? this.head : this.knots[index - 1];
          const direction = this.determineMoveDirection(previousKnot, knot);

          if (direction) {
            knot.move(direction);
            knot.storeVisitedField();
          }
        });
      }
    }

    determineMoveDirection(previousKnot, knot) {
      let distanceX = 0;
      let distanceY = 0;
      let verticalDirection = '';
      let horizontalDirection = '';

      if (previousKnot.x > knot.x) {
        distanceX = Math.abs(previousKnot.x - knot.x);
      }

      if (previousKnot.x < knot.x) {
        distanceX = Math.abs(knot.x - previousKnot.x) * -1;
      }

      if (previousKnot.y > knot.y) {
        distanceY = Math.abs(previousKnot.y - knot.y);
      }

      if (previousKnot.y < knot.y) {
        distanceY = Math.abs(knot.y - previousKnot.y) * -1;
      }

      if (Math.abs(distanceY) > 1 && distanceY > 0) {
        verticalDirection = 'D';

        if (Math.abs(distanceX) > 0 && distanceX > 0) {
          horizontalDirection = 'R';
        } else if (Math.abs(distanceX) > 0 && distanceX < 0) {
          horizontalDirection = 'L';
        }
      } else if (Math.abs(distanceY) > 1 && distanceY < 0) {
        verticalDirection = 'U';

        if (Math.abs(distanceX) > 0 && distanceX > 0) {
          horizontalDirection = 'R';
        } else if (Math.abs(distanceX) > 0 && distanceX < 0) {
          horizontalDirection = 'L';
        }
      }

      if (Math.abs(distanceX) > 1 && distanceX > 0) {
        horizontalDirection = 'R';

        if (Math.abs(distanceY) > 0 && distanceY > 0) {
          verticalDirection = 'D';
        } else if (Math.abs(distanceY) > 0 && distanceY < 0) {
          verticalDirection = 'U';
        }
      } else if (Math.abs(distanceX) > 1 && distanceX < 0) {
        horizontalDirection = 'L';

        if (Math.abs(distanceY) > 0 && distanceY > 0) {
          verticalDirection = 'D';
        } else if (Math.abs(distanceY) > 0 && distanceY < 0) {
          verticalDirection = 'U';
        }
      }

      return `${verticalDirection}${horizontalDirection}`;
    }
  }

  const rope = new Rope(10);

  const lines = data.split('\n');

  lines.forEach((line) => {
    if (!line) return;

    const [direction, steps] = line.split(' ');

    rope.move(direction, parseInt(steps, 10));
  });

  console.log(rope.knots[rope.knots.length - 1].visitedFields.length);
});
