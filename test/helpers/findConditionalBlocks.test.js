import { findConditionalBlocks } from '../../src/helpers';

const itToMatchSnapshot = (message, chunks) => {
  it(message, () => {
    const result = findConditionalBlocks(chunks);
    expect(result).toMatchSnapshot();
  });
};

describe('with no conditional blocks', () => {
  describe('no conditions', () => {
    itToMatchSnapshot('no chunks');
    itToMatchSnapshot('empty chunks', []);
    itToMatchSnapshot('single chunk', ['color: red']);
    itToMatchSnapshot('multiple chunks', ['a', '{ b }', '{ if a }']);
  });
  describe('incorrect conditions', () => {
    describe('single chunk', () => {
      itToMatchSnapshot('no condition body', ['@if']);
      itToMatchSnapshot('no brace', ['@if a']);
      itToMatchSnapshot('no matching brace', ['@if a {']);
      itToMatchSnapshot('incorrect keyword', ['@ifs a {}']);
      itToMatchSnapshot('without identifier', ['@if + {}']);
      itToMatchSnapshot('operator before identifier', ['@if + a {}']);
    });
    describe('multiple chunks', () => {
      itToMatchSnapshot('keyword in multiple chunks', ['@i', 'f']);
      itToMatchSnapshot('no brace', ['@if', 'a']);
      itToMatchSnapshot('no matching brace', ['@if', ' a ', '{']);
      itToMatchSnapshot('incorrect keyword', ['@ifs', ' a ', '{']);
      itToMatchSnapshot('without identifier', ['@if', ' + ', '{}']);
      itToMatchSnapshot('operator before identifier', ['@if', ' + a ', '{}']);
      itToMatchSnapshot('correct but in multiple chunks', ['@if ', ' a ', '{}']);
    });
  });
});

describe('with conditional blocks', () => {
  describe('single chunk', () => {
    describe('without body', () => {
      itToMatchSnapshot('simple prop', [
        '@if a {}',
      ]);
      itToMatchSnapshot('prop with operations', [
        '@if a + 1 {}',
      ]);
      itToMatchSnapshot('complex condition', [
        '@if b === [1, 2].join(" ") {}',
      ]);
      itToMatchSnapshot('multiple blocks', [`
        @if a {}
        @if a === b {}
      `]);
    });
    describe('with body', () => {
      itToMatchSnapshot('simple prop', [
        '@if a { color: red; }',
      ]);
      itToMatchSnapshot('prop with operations', [`
        @if variable !== a + b * 2  {
          background: white;
        }
      `]);
      itToMatchSnapshot('complex condition', [`
        @if b == func("ab") + func(["a", "b"].join("")) {
          color: white;
        }
      `]);
      itToMatchSnapshot('nested blocks', [`
        @if a {
          color: red;

          @if b === "text" {
            color: green;
          }
        }
      `]);
    });
  });
  describe('multiple chunks', () => {
    itToMatchSnapshot('simple prop', [
      '@if a {',
      '  color: red',
      '}',
    ]);
    itToMatchSnapshot('complex condition', [
      '@if variable === "text" {',
      '  color: red',
      '  background: white',
      '}',
    ]);
    itToMatchSnapshot('multiple blocks', [
      '@if b {',
      '  color: red',
      '}',
      '',
      'display: block;',
      '',
      '@if type === "default" {',
      '  color: red',
      '  display: inline-block',
      '}',
    ]);
    itToMatchSnapshot('nested blocks', [
      '@if b {',
      '  color: red',
      '  @if a === b {',
      '    @if c { color: red; }',
      `    color: green;
         }
      `,
      '',
      '}',
    ]);
  });
});
