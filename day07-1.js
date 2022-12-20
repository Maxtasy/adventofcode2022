const fs = require('fs');

class File {
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }
}

class Directory {
  constructor(parent, name) {
    this.parent = parent;
    this.name = name;
    this.files = [];
    this.subDirectories = [];
    this.size = 0;
  }

  addSize(size) {
    this.size += size;

    if (this.parent) {
      this.parent.addSize(size);
    }
  }

  addFile(name, size) {
    this.files.push(new File(name, size));

    this.addSize(size);
  }

  addDirectory(name) {
    const newSubDirectory = new Directory(this, name);

    this.subDirectories.push(newSubDirectory);

    return newSubDirectory;
  }

  openDirectory(name) {
    return this.subDirectories.find((subDirectory) => subDirectory.name === name);
  }

  getRecursiveSizes() {
    let total = 0;

    if (this.size <= 100000) {
      total += this.size;
    }

    this.subDirectories.forEach((subDirectory) => {
      total += subDirectory.getRecursiveSizes();
    });

    return total;
  }
}

fs.readFile('day07-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  let rootDirectory;
  let currentDirectory;

  const lines = data.split('\n');

  lines.forEach((line) => {
    if (!line || line === '$ ls') return;

    // Handle changing directory.
    if (line.startsWith('$ cd')) {
      const [, , directoryName] = line.split(' ');

      if (directoryName === '..') {
        currentDirectory = currentDirectory.parent;
      } else if (directoryName === '/') {
        rootDirectory = new Directory(null, directoryName);
        currentDirectory = rootDirectory;
      } else {
        currentDirectory = currentDirectory.openDirectory(directoryName);
      }

      return;
    }

    const lineParts = line.split(' ');

    // Handle new directory.
    if (lineParts[0] === 'dir') {
      currentDirectory.addDirectory(lineParts[1]);
    } else {
      const size = parseInt(lineParts[0], 10);
      const fileName = lineParts[1];

      currentDirectory.addFile(fileName, size);
    }
  });

  console.log(rootDirectory.getRecursiveSizes());
});
