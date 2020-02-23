import styled from 'styled-components';

export default styled.div`
  width: 300px;
  height: 200px;

  background: #ccc;
  border: 1px solid #aaa;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;

  @if center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @if positionX == 'left' {
    left: 0;
  }

  @if positionX == 'right' {
    right: 0;
  }

  @if positionY == 'top' {
    top: 0;
  }

  @if positionY == 'bottom' {
    bottom: 0;
  }
`;
