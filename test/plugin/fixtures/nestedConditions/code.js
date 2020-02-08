styled.div`
  color: green;

  @if a {
    color: grey;

    @if b {
      color: red;

      @if c === func(c) + 'something' {
        display: block;
      }
    }
  }
`;

styled.div`
  color: green;
  ${a}

  @if a {
    ${a}
    color: grey;
    ${a}

    @if b {
      ${a}
      color: red;
      ${a}

      @if c === func(c) + 'something' {
        ${a}
        display: block;
        ${a}
      }
      ${a}
    }
    ${a}
  }
  ${a}
`;
