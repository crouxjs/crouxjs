/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-unresolved
const croux = require('crouxjs');

let app = croux(); // Needed for VS code intellisense

beforeEach(() => {
  app = croux();
});

test('Library is not undefined WHEN creating a new app instance', () => {
  expect(app.library).not.toBeUndefined();
});

test('Library is empty WHEN creating a new app instance', () => {
  expect(Object.keys(app.library)).toHaveLength(0);
});

test('Library has 1 command WHEN calling app.use([...]) once', () => {
  app.use('test', () => {});
  expect(Object.keys(app.library)).toHaveLength(1);
});

test('Library has 1 command WHEN calling app.use([...]) twice with the exact same command', () => {
  app.use('test', () => {});
  app.use('test', () => {});
  expect(Object.keys(app.library)).toHaveLength(1);
});

test('Library has 2 commands WHEN calling app.use([...]) twice using differents names', () => {
  app.use('start', () => {});
  app.use('stop', () => {});
  expect(Object.keys(app.library)).toHaveLength(2);
});

test('Library has 1 entry WHEN calling app.use([...]) twice names with same first keyword', () => {
  app.use('test start', () => {});
  app.use('test stop', () => {});
  expect(Object.keys(app.library.test)).toHaveLength(2);
});

test('Library has 2 sub-entries WHEN calling app.use([...]) twice names with same first keyword', () => {
  app.use('test start', () => {});
  app.use('test stop', () => {});
  expect(Object.keys(app.library.test)).toHaveLength(2);
});

test('Added command can be accessed AFTER calling app.use([...])', () => {
  app.use('test', () => {});
  expect(app.library).toHaveProperty('test');
});

test('use([...]) given callback can be executed FROM the library ', () => {
  app.use('test', () => 'Hello');
  expect(app.library.test()).toBe('Hello');
});

test('use([...]) given callback can be executed FROM the library ', () => {
  app.use('test start', () => 'Start');
  app.use('test stop', () => 'Stop');
  expect(app.library.test.start()).toBe('Start');
  expect(app.library.test.stop()).toBe('Stop');
});
