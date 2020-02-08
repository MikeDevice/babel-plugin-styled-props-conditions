export const findMatchingBrace = (chunks = []) => {
  if (!chunks.length || !chunks[0] || chunks[0][0] !== '{') return;

  let bracesCounter = 0;
  let chunkIndex;
  let charIndex;

  chunks.every((chunk, _chunkIndex) => {
    chunkIndex = _chunkIndex;

    Array.from(chunk).every((char, _charIndex) => {
      charIndex = _charIndex;

      switch (char) {
        case '{':
          bracesCounter += 1;
          break;

        case '}':
          bracesCounter -= 1;
          break;

        default:
          break;
      }

      return bracesCounter;
    });

    return bracesCounter;
  });

  if (bracesCounter === 0) {
    return { chunkIndex, charIndex };
  }
};

const parseCondition = (str) => {
  const matchResult = str.match(/^[_a-z]\w*/i);

  // There is no need to check variable 'matchResult' to being truthy
  // because this function is a helper function that is called only from
  // 'findConditionalBlocks' helper function and that function guarantees
  // to pass here the correct 'str' paramether

  const [prop] = matchResult;
  const { input } = matchResult;

  return {
    prop,
    rest: input.slice(prop.length),
  };
};

export const findConditionalBlocks = (chunks = []) => {
  const conditionalBlocks = [];

  chunks.forEach((chunk, chunkIndex) => {
    const matchResults = Array.from(chunk.matchAll(/@if(\s+[_a-z][^{]*){/gi));

    matchResults.forEach((result) => {
      const [match, condition] = result;
      const { index, input } = result;
      const bodyStartIndex = index + match.length - 1;

      const subChunks = chunks.slice(chunkIndex);
      subChunks[0] = input.slice(bodyStartIndex);

      const matchingBrace = findMatchingBrace(subChunks);
      const parsedCondition = parseCondition(condition.trim());

      if (matchingBrace && parsedCondition) {
        conditionalBlocks.push({
          chunkStart: chunkIndex,
          chunkEnd: chunkIndex + matchingBrace.chunkIndex,

          blockStart: index,
          blockEnd: matchingBrace.chunkIndex === 0
            ? matchingBrace.charIndex + bodyStartIndex
            : matchingBrace.charIndex,

          condition: parsedCondition,
          bodyStart: bodyStartIndex,
        });
      }
    });
  });

  return conditionalBlocks;
};

export const createExpression = ({ prop, rest }, hint) =>
  `\${({${prop}}) => ${prop}${rest} && ${hint}\``;
