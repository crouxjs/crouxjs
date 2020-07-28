const croux = require('crouxjs');

test('Library is empty at the beginning', () => {
  const app = croux();
  expect(Object.keys(app.library)).toHaveLength(0);
});

test('Add one command to the library when calling croux.use([...]) once', () => {
  const app = croux();
  app.use('test', () => {});
  expect(Object.keys(app.library)).toHaveLength(1);
});

test('Added command can be accessed in the library when using croux.use([...])', () => {
  const app = croux();
  app.use('test', () => {});
  expect(app.library).toHaveProperty('test');
});

test('use([...]) given callback can be executed', () => {
  const app = croux();
  app.use('test', () => 'Hello');
  expect(app.library).toHaveProperty('test');
  const result = app.library.test();
  expect(result).toBe('Hello');
});
