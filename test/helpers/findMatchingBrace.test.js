import { findMatchingBrace } from '../../src/helpers';

const itToBeFalsy = (message, chunks) => {
  it(message, () => {
    expect(findMatchingBrace(chunks)).toBeFalsy();
  });
};

const itToMatchBrace = (message, chunks, [chunk, char]) => {
  it(message, () => {
    const { chunkIndex, charIndex } = findMatchingBrace(chunks);

    expect(chunkIndex).toBe(chunk);
    expect(charIndex).toBe(char);
  });
};

describe('incorrect args', () => {
  itToBeFalsy('without args');
  itToBeFalsy('empty chunks', []);
  itToBeFalsy('single but empty chunk', ['']);
  itToBeFalsy('chunk started not with "{"', ['test']);
});

describe('correct args', () => {
  describe('without matching braces', () => {
    describe('plain', () => {
      itToBeFalsy('single chunk', ['{']);
      itToBeFalsy('multiple chunks', ['{', 'a + b']);
    });
    describe('nested', () => {
      itToBeFalsy('single chunk', ['{ a + b { c } a + {}']);
      itToBeFalsy('multiple chunks', ['{ a', '{ a }']);
    });
  });

  describe('with matching braces', () => {
    describe('plain', () => {
      itToMatchBrace('single chunk', ['{ a }'], [0, 4]);
      itToMatchBrace('multiple chunks', ['{', 'a', '}'], [2, 0]);
    });
    describe('nested', () => {
      itToMatchBrace('single chunk', ['{ a { b + { a } } }'], [0, 18]);
      itToMatchBrace('multiple chunks', ['{ a', '{', '{ a }', '} b }'], [3, 4]);
    });
    describe('extra braces after', () => {
      itToMatchBrace('single chunk', ['{ a { b } } c }'], [0, 10]);
      itToMatchBrace('multiple chunks', ['{', 'a', '{ b c }} b', '}'], [2, 7]);
    });
  });
});
