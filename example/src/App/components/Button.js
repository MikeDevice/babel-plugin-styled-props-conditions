import styled from 'styled-components';

export default styled.button`
  padding: 7px 10px;
  border: 1px solid #ccc;
  background: none;

  line-height: 1.5;
  font-family: inherit;
  font-size: 14px;

  cursor: pointer;

  &:hover {
    background-color: #eee;
  }

  &:active {
    background-color: #ddd;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 3px 1px #bbb;
  }
`;
