export const a = 1;

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
