import { createExpression } from '../../src/helpers';

const expressionsData = [
  {
    prop: 'a',
    rest: '',
    hint: 'css',
    expectedResult: '${({a}) => a && css`',
  },
  {
    prop: 'type',
    rest: ' == "button"',
    hint: '_css',
    expectedResult: '${({type}) => type == "button" && _css`',
  },
  {
    prop: 'theme',
    rest: ' === getCurrentTheme()',
    hint: '_css',
    expectedResult: '${({theme}) => theme === getCurrentTheme() && _css`',
  },
];

expressionsData.forEach(({ prop, rest, hint, expectedResult }, index) => {
  test(`expression #${index + 1}`, () => {
    const result = createExpression({ prop, rest }, hint);
    expect(result).toEqual(expectedResult);
  });
});
