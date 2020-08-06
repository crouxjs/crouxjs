const utils = require('../dist/utils');

describe('Array Equals', () => {
  test('Equals is false WHEN first array || second array == undefined', () => {
    expect(utils.arrayEquals(undefined, [])).toBeFalsy();
    expect(utils.arrayEquals([], undefined)).toBeFalsy();
  });
  test('Equals is false WHEN first array || second array has more elements', () => {
    expect(utils.arrayEquals([0], [])).toBeFalsy();
    expect(utils.arrayEquals([], [0])).toBeFalsy();
  });
  test('Equals is true WHEN both arrays are empty', () => {
    expect(utils.arrayEquals([], [])).toBeTruthy();
  });
  test('Equals is false WHEN first array || second array has more elements', () => {
    expect(utils.arrayEquals([0], [])).toBeFalsy();
    expect(utils.arrayEquals([], [0])).toBeFalsy();
  });
  test('Equals is false WHEN arrays are differents', () => {
    expect(utils.arrayEquals([0], [1])).toBeFalsy();
    expect(utils.arrayEquals([0, 1], [1, 0])).toBeFalsy();
    expect(utils.arrayEquals([0], ['0'])).toBeFalsy();
  });
  test('Equals is true WHEN arrays are equals (insane)', () => {
    expect(utils.arrayEquals([0], [0])).toBeTruthy();
    expect(utils.arrayEquals([0, 1], [0, 1])).toBeTruthy();
    expect(utils.arrayEquals(['a'], ['a'])).toBeTruthy();
  });
});
