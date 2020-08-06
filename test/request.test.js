/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-unresolved
const croux = require('crouxjs');

describe('Requests testing, fields, methods, all of it', () => {
  let app = croux(); // Needed for VS code intellisense

  beforeEach(() => {
    app = croux();
  });

  test('Request is not empty AFTER calling simple command', () => {
    app.use('test', (req) => {
      expect(req).toBeDefined();
      expect(Object.keys(req)).toBeDefined();
      expect(Object.keys(req).length).toBeGreaterThan(0);
    });
    app.library.request('test');
  });

  test('Request:raw is indeed the raw given command', () => {
    const rawCommand = 'test raw given command @arg0';
    app.use(rawCommand, (req) => {
      expect(req).toBeDefined();
      expect(req.raw).toBeDefined();
      expect(req.raw).toStrictEqual(rawCommand);
    });
    app.library.request(rawCommand);
  });

  test('Request:params is indeed an array of given command arguments', () => {
    const rawCommand = 'test raw given command @arg0';
    app.use(rawCommand, (req) => {
      expect(req).toBeDefined();
      expect(req.params).toBeDefined();
      expect(req.params).toHaveLength(5);
    });
    app.library.request(rawCommand);
  });

  test('Request:params is indeed an array of given badly written command arguments', () => {
    const rawCommand = 'test   raw   given  command @arg0';
    app.use(rawCommand, (req) => {
      expect(req).toBeDefined();
      expect(req.params).toBeDefined();
      expect(req.params).toHaveLength(5);
    });
    app.library.request(rawCommand);
  });
});
