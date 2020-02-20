import generate from '@babel/generator';
import { parse } from '@babel/parser';
import { addNamed } from '@babel/helper-module-imports';
import { findConditionalBlocks, createExpression } from './helpers';

export default function ({ types: t }) {
  return {
    name: 'styled-props-conditions',

    visitor: {
      TaggedTemplateExpression(path) {
        const { quasis } = path.node.quasi;
        const quasisRaws = quasis.map(({ value }) => value.raw);
        const conditionalBlocks = findConditionalBlocks(quasisRaws);
        const replaceData = [];

        if (!conditionalBlocks.length) return;

        const cssHint = addNamed(path, 'css', 'styled-components');

        conditionalBlocks.forEach((conditionalBlock) => {
          const {
            blockStart, blockEnd, bodyStart, chunkStart, chunkEnd, condition,
          } = conditionalBlock;

          replaceData.push(
            {
              quasiIndex: chunkEnd,
              start: blockEnd,
              del: 0,
              str: '`',
            },
            {
              quasiIndex: chunkStart,
              start: blockStart,
              del: bodyStart - blockStart + 1,
              str: createExpression(condition, cssHint.name),
            },
          );
        });

        const sortedArray = replaceData.sort(
          (a, b) => b.quasiIndex - a.quasiIndex || b.start - a.start,
        );

        sortedArray.forEach(({ quasiIndex, start, del, str }) => {
          const arr = [...quasisRaws[quasiIndex]];

          arr.splice(start, del, str);

          quasisRaws[quasiIndex] = arr.join('');
        });

        quasisRaws.forEach((raw, index) => {
          path.node.quasi.quasis[index] = t.templateElement({ raw });
        });

        const { code } = generate(path.node);
        const { expression } = parse(code).program.body[0];

        path.replaceWith(expression);
      },
    },
  };
}
