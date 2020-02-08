styled.div`
  @i {
    color: green;
  }
  @iff {
    color: green;
  }

  @if{
    color: green;
  }

  @if + {
    color: green;
  }
  @if + a {
    color: green;
  }

  @if ${a} {
    color: green;
  }
  @if a === ${a} {
    color: green;
  }
  @if ${a} + ${b} {
    color: green;
  }
`;
