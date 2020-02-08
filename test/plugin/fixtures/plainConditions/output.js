import { css as _css2 } from "styled-components";
import { css as _css } from "styled-components";
styled.div`
  ${({ a }) =>
    a &&
    _css`
    color: green;
  `}

  ${({ a }) =>
    a == "text" &&
    _css`
    color: green;
  `}

  ${({ a }) =>
    a === ["t", "e", "x", "t"].join("") &&
    _css`
    color: green;
  `}
`;
styled.button`
  ${a}

  ${({ a }) =>
    a &&
    _css2`
    ${a + b}

    color: green;

    ${props => props.func()}
  `}
`;
