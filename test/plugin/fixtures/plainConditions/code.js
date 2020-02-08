styled.div`
  @if a {
    color: green;
  }

  @if a == 'text' {
    color: green;
  }

  @if a === ['t', 'e', 'x', 't'].join('') {
    color: green;
  }
`;

styled.button`
  ${a}

  @if a {
    ${a + b}

    color: green;

    ${(props) => props.func()}
  }
`;
