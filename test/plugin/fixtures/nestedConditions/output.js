import { css as _css2 } from "styled-components";
import { css as _css } from "styled-components";
styled.div`
  color: green;

  ${({ a }) =>
    a &&
    _css`
    color: grey;

    ${({ b }) =>
      b &&
      _css`
      color: red;

      ${({ c }) =>
        c === func(c) + "something" &&
        _css`
        display: block;
      `}
    `}
  `}
`;
styled.div`
  color: green;
  ${a}

  ${({ a }) =>
    a &&
    _css2`
    ${a}
    color: grey;
    ${a}

    ${({ b }) =>
      b &&
      _css2`
      ${a}
      color: red;
      ${a}

      ${({ c }) =>
        c === func(c) + "something" &&
        _css2`
        ${a}
        display: block;
        ${a}
      `}
      ${a}
    `}
    ${a}
  `}
  ${a}
`;
