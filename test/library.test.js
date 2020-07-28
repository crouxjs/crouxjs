/* eslint-disable no-undef */
// eslint-disable-next-line import/no-unresolved
const croux = require('crouxjs');

let app;

beforeEach(() => {
  app = croux();
});

test('Library is empty WHEN creating a new app instance', () => {
  expect(Object.keys(app.library)).toHaveLength(0);
});

test('Add one command to the library WHEN calling app.use([...]) once', () => {
  app.use('test', () => {});
  expect(Object.keys(app.library)).toHaveLength(1);
});

test('Added command can be accessed AFTER calling app.use([...])', () => {
  app.use('test', () => {});
  expect(app.library).toHaveProperty('test');
});

test('use([...]) given callback can be executed FROM the library ', () => {
  app.use('test', () => 'Hello');
  expect(app.library).toHaveProperty('test');
  const result = app.library.test();
  expect(result).toBe('Hello');
});
