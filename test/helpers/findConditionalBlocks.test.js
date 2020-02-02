import { findConditionalBlocks } from '../../src/helpers';

const itNoBlocks = (message, chunks) => {
  it(message, () => {
    const result = findConditionalBlocks(chunks);
    expect(result).toEqual([]);
  });
};

describe('with no conditional blocks', () => {
  describe('no conditions', () => {
    itNoBlocks('no chunks');
    itNoBlocks('empty chunks', []);
    itNoBlocks('single chunk', ['color: red']);
    itNoBlocks('multiple chunks', ['a', '{ b }', '{ if a }']);
  });
  describe('incorrect conditions', () => {
    describe('single chunk', () => {
      itNoBlocks('no condition body', ['@if']);
      itNoBlocks('no brace', ['@if a']);
      itNoBlocks('no matching brace', ['@if a {']);
      itNoBlocks('incorrect keyword', ['@ifs a {}']);
      itNoBlocks('without identifier', ['@if + {}']);
      itNoBlocks('operator before identifier', ['@if + a {}']);
    });
    describe('multiple chunks', () => {
      itNoBlocks('keyword in multiple chunks', ['@i', 'f']);
      itNoBlocks('no brace', ['@if', 'a']);
      itNoBlocks('no matching brace', ['@if', ' a ', '{']);
      itNoBlocks('incorrect keyword', ['@ifs', ' a ', '{']);
      itNoBlocks('without identifier', ['@if', ' + ', '{}']);
      itNoBlocks('operator before identifier', ['@if', ' + a ', '{}']);
      itNoBlocks('correct but in multiple chunks', ['@if ', ' a ', '{}']);
    });
  });
});
