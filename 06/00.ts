let num = 10;

function add(a: number, b: number) {
  return a + b;
}

function logMessage(message: string | null) {
  if (message) {
    message;
  }
}

const foo = {
  x: [1, 2, 3],
  bar: {
    name: 'Fred',
  },
};

function restOfPath(path: string) {
  return path.split('/').slice(1).join('/');
}
