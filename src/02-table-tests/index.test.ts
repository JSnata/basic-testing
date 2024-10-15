import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 3, action: Action.Add, expected: 4},
    { a: 1, b: 3, action: Action.Subtract, expected: -2 },
    { a: 2, b: 3, action: Action.Multiply, expected: 6},
    { a: 6, b: 2, action: Action.Divide, expected: 3 },
    { a: 6, b: 3, action: Action.Exponentiate, expected: 216 },
    { a: 6, b: 3, action: 'add', expected: null },
    { a: '5', b: '3', action: 'add', expected: null }
];

describe('simpleCalculator', () => {
  it.each(testCases)("should perform basic mathematical operations", ({a, b, action, expected}) => {
   const result = simpleCalculator({a, b, action});
   expect(result).toBe(expected);
  })
});
