# babel-plugin-styled-props-conditions

[![Build Status](https://travis-ci.org/MikeDevice/babel-plugin-styled-props-conditions.svg?branch=master)](https://travis-ci.org/MikeDevice/babel-plugin-styled-props-conditions)
[![Coverage Status](https://coveralls.io/repos/github/MikeDevice/babel-plugin-styled-props-conditions/badge.svg?branch=master)](https://coveralls.io/github/MikeDevice/babel-plugin-styled-props-conditions?branch=master)

A plugin for Babel that provides another syntax for getting access to [styled-components](https://styled-components.com) props.

## Syntax
```
@if <prop_name> [<javascript code>] {
  <styles>
}
```

## Example

```js
styled.button`
  display: block;

  @if primary {
    padding: 0 10px;

    color: white;
    background-color: grey;
  }

  @if theme === 'light' {
    color: black;
    background-color: white;
  }

  @if theme === 'dark' {
    color: white;
    background-color: black;
  }
`
```

Instead of

```js
styled.button`
  display: block;

  ${({primary}) => primary && css`
    padding: 0 10px;

    color: white;
    background-color: grey;
  `}

  ${({theme}) => theme === 'light' && css`
    color: black;
    background-color: white;
  `}

  ${({theme}) => theme === 'dark' && css`
    color: white;
    background-color: black;
  `}
`
```
