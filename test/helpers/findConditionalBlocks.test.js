import { findConditionalBlocks } from '../../src/helpers';

const itHasNoBlocks = (message, chunks) => {
  it(message, () => {
    const result = findConditionalBlocks(chunks);
    expect(result).toEqual([]);
  });
};

const itHasBlocks = (message, chunks, expectedResult) => {
  it(message, () => {
    const result = findConditionalBlocks(chunks);
    expect(result).toEqual(expectedResult);
  });
};

describe('with no conditional blocks', () => {
  describe('no conditions', () => {
    itHasNoBlocks('no chunks');
    itHasNoBlocks('empty chunks', []);
    itHasNoBlocks('single chunk', ['color: red']);
    itHasNoBlocks('multiple chunks', ['a', '{ b }', '{ if a }']);
  });
  describe('incorrect conditions', () => {
    describe('single chunk', () => {
      itHasNoBlocks('no condition body', ['@if']);
      itHasNoBlocks('no brace', ['@if a']);
      itHasNoBlocks('no matching brace', ['@if a {']);
      itHasNoBlocks('incorrect keyword', ['@ifs a {}']);
      itHasNoBlocks('without identifier', ['@if + {}']);
      itHasNoBlocks('operator before identifier', ['@if + a {}']);
    });
    describe('multiple chunks', () => {
      itHasNoBlocks('keyword in multiple chunks', ['@i', 'f']);
      itHasNoBlocks('no brace', ['@if', 'a']);
      itHasNoBlocks('no matching brace', ['@if', ' a ', '{']);
      itHasNoBlocks('incorrect keyword', ['@ifs', ' a ', '{']);
      itHasNoBlocks('without identifier', ['@if', ' + ', '{}']);
      itHasNoBlocks('operator before identifier', ['@if', ' + a ', '{}']);
      itHasNoBlocks('correct but in multiple chunks', ['@if ', ' a ', '{}']);
    });
  });
});

describe('with conditional blocks', () => {
  describe('single chunk', () => {
    describe('without body', () => {
      itHasBlocks('simple prop', ['@if a {}'], [
        {
          chunkStart: 0,
          chunkEnd: 0,
          blockStart: 0,
          blockEnd: 7,
          bodyStart: 6,
          condition: { prop: 'a', rest: '' },
        },
      ]);
      itHasBlocks('prop with operations', ['@if a + 1 {}'], [
        {
          chunkStart: 0,
          chunkEnd: 0,
          blockStart: 0,
          blockEnd: 11,
          bodyStart: 10,
          condition: { prop: 'a', rest: ' + 1' },
        },
      ]);
      itHasBlocks('complex condition', ['@if b === [1, 2].join(" ") {}'], [
        {
          chunkStart: 0,
          chunkEnd: 0,
          blockStart: 0,
          blockEnd: 28,
          bodyStart: 27,
          condition: { prop: 'b', rest: ' === [1, 2].join(" ")' },
        },
      ]);
      itHasBlocks(
        'multiple blocks',
        [
          `
            @if a {}
            @if a === b {}
          `,
        ],
        [
          {
            chunkStart: 0,
            chunkEnd: 0,
            blockStart: 13,
            blockEnd: 20,
            bodyStart: 19,
            condition: { prop: 'a', rest: '' },
          },
          {
            chunkStart: 0,
            chunkEnd: 0,
            blockStart: 34,
            blockEnd: 47,
            bodyStart: 46,
            condition: { prop: 'a', rest: ' === b' },
          },
        ],
      );
    });
    describe('with body', () => {
      itHasBlocks(
        'simple prop',
        [
          '@if a { color: red; }',
        ],
        [
          {
            chunkStart: 0,
            chunkEnd: 0,
            blockStart: 0,
            blockEnd: 20,
            bodyStart: 6,
            condition: { prop: 'a', rest: '' },
          },
        ],
      );
      itHasBlocks(
        'prop with operations',
        [
          '@if variable !== a + b * 2  { background: white; }',
        ],
        [
          {
            chunkStart: 0,
            chunkEnd: 0,
            blockStart: 0,
            blockEnd: 49,
            bodyStart: 28,
            condition: { prop: 'variable', rest: ' !== a + b * 2' },
          },
        ],
      );
      itHasBlocks(
        'complex condition',
        [
          '@if b == func("ab") + func(["a", "b"].join("")) { color: white; }',
        ],
        [
          {
            chunkStart: 0,
            chunkEnd: 0,
            blockStart: 0,
            blockEnd: 64,
            bodyStart: 48,
            condition: { prop: 'b', rest: ' == func("ab") + func(["a", "b"].join(""))' },
          },
        ],
      );
      itHasBlocks(
        'nested blocks',
        [
          `@if a {
            color: red;

            @if b === "text" {
              color: green;
            }
          }`,
        ],
        [
          {
            chunkStart: 0,
            chunkEnd: 0,
            blockStart: 0,
            blockEnd: 116,
            bodyStart: 6,
            condition: { prop: 'a', rest: '' },
          },
          {
            chunkStart: 0,
            chunkEnd: 0,
            blockStart: 45,
            blockEnd: 104,
            bodyStart: 62,
            condition: { prop: 'b', rest: ' === "text"' },
          },
        ],
      );
    });
  });
});
