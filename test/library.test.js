/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-unresolved
const croux = require('crouxjs');

describe('Library testing', () => {
  let app = croux(); // Needed for VS code intellisense

  beforeEach(() => {
    app = croux();
  });

  test('Library is not undefined WHEN creating a new app instance', () => {
    expect(app.library).toBeDefined();
  });

  test('Library is empty WHEN creating a new app instance', () => {
    expect(app.library.size()).toHaveLength(0);
  });

  test('Library has 1 command WHEN calling app.use([...]) once', () => {
    app.use('test', () => {});
    expect(app.library.size()).toHaveLength(1);
  });

  test('Library has 1 command WHEN calling app.use([...]) twice with the exact same command', () => {
    app.use('test', () => {});
    app.use('test', () => {});
    expect(app.library.size()).toHaveLength(1);
  });

  test('Library has 2 commands WHEN calling app.use([...]) twice using differents names', () => {
    app.use('start', () => {});
    app.use('stop', () => {});
    expect(app.library.size()).toHaveLength(2);
  });

  test('Library has 1 entry WHEN calling app.use([...]) twice names with same first keyword', () => {
    app.use('test start', () => {});
    app.use('test stop', () => {});
    expect(app.library.size()).toHaveLength(1);
  });
});

describe('App use & library requests', () => {
  let app = croux(); // Needed for VS code intellisense

  beforeEach(() => {
    app = croux();
  });

  test('Library is defined WHEN creating a new app instance', () => {
    expect(app.library).toBeDefined();
  });

  test('Added command can be accessed AFTER calling app.use([...])', () => {
    app.use('test', () => 'Hello');
    expect(app.library.request('test')).toBeDefined();
  });

  test('use([...]) given callback can be executed FROM the library ', () => {
    app.use('test', () => 'Hello');
    expect(app.library.request('test')).toBe('Hello');
  });

  test('use([...]) given callback can be executed FROM the library', () => {
    app.use('test start', () => 'Start');
    app.use('test stop', () => 'Stop');
    expect(app.library.request('test start')).toBe('Start');
    expect(app.library.request('test stop')).toBe('Stop');
  });

  test('AsyncExec effectly give promise WHEN calling an app.use([...]) command', async () => {
    app.use('test', async () => {
      await app.asyncExec('echo hello', { silent: true }).then(
        (data) => {
          // Needed because stupid fuck return '\n'
          data = data.split('\r')[0];
          expect(data).toBeDefined();
          expect(data).toEqual('hello');
        },
        (error) => {
          console.error(error);
        }
      );
    });
    await app.library.request('echo hello');
  });
});
