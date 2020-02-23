import React from 'react';
import GlobalStyles from './GlobalStyles';
import Block from './Block';

function App() {
  return (
    <>
      <GlobalStyles />
      <Block center>center</Block>
      <Block positionX="left" positionY="top">top; left;</Block>
      <Block positionX="right" positionY="top">top; right;</Block>
      <Block positionX="left" positionY="bottom">bottom; left;</Block>
      <Block positionX="right" positionY="bottom">bottom; right;</Block>
    </>
  );
}

export default App;
