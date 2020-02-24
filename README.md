# babel-plugin-styled-props-conditions

[![Build Status](https://travis-ci.org/MikeDevice/babel-plugin-styled-props-conditions.svg?branch=master)](https://travis-ci.org/MikeDevice/babel-plugin-styled-props-conditions)
[![Coverage Status](https://coveralls.io/repos/github/MikeDevice/babel-plugin-styled-props-conditions/badge.svg?branch=master)](https://coveralls.io/github/MikeDevice/babel-plugin-styled-props-conditions?branch=master)

A plugin for Babel that provides another syntax for getting access to [styled-components](https://styled-components.com) props.

## Installation

```sh
$ npm install --save-dev babel-plugin-styled-props-conditions
```

## Usage
Add `babel-plugin-styled-props-conditions` to plugins list in your `.babelrc`:

```json
{
  "plugins": ["babel-plugin-styled-props-conditions"]
}
```

## Syntax

```
@if <prop_name> [<javascript code>] {
  <styles>
}
```

## How it works
This plugin search for Tagged Templates Literals containing conditional blocks written with syntax described above. When blocks are found the plugin replaces them with `${expression}` blocks.

### Input

```
@if <prop_name> [<javascript code>] {
  <styles>
}
```

### Output

```
${({ <prop_name> }) => <prop_name> [<javascript code>] && css`
  <styles>
`}
```

## Examples
* [Boolean conditions](#boolean-conditions).
* [Conditions with expressions](#conditions-with-expressions).
* [Nested conditions](#nested-conditions).
* [Example in real project](#example-in-real-project).

### <a id="boolean-conditions"></a> Example #1: Boolean conditions

```js
styled.button`
  @if primary {
    color: green;
  }

  @if secondary {
    color: grey;
  }
`
```

Instead of

```js
import { css } from 'styled-components';

styled.button`
  ${({ primary }) => primary && css`
    color: green;
  `}

  ${({ secondary }) => secondary && css`
    color: grey;
  `}
`
```

### <a id="conditions-with-expressions"></a> Example #2: Conditions with expressions

```js
styled.button`
  @if theme == 'light' {
    color: black;
    background-color: white;
  }

  @if theme == 'dark' {
    color: white;
    background-color: black;
  }

  @if theme == getCurrectTheme() {
    color: ${getColor()};
  }
`
```

Instead of

```js
import { css } from 'styled-components';

styled.button`
  ${({ theme }) => theme == 'light' && css`
    color: black;
    background-color: white;
  `}

  ${({ theme }) => theme == 'dark' && css`
    color: white;
    background-color: black;
  `}

  ${({ theme }) => theme == getCurrectTheme() && css`
    color: ${getColor()};
  `}
`
```

### <a id="nested-conditions"></a> Example #3: Nested conditions

```js
styled.button`
  @if primary {
    @if theme == 'light' {
      color: black;
      background-color: white;
    }

    @if theme == 'dark' {
      color: white;
      background-color: black;
    }
  }
`
```

Instead of
```js
import { css } from 'styled-components';

styled.button`
  ${({ primary }) => primary && css`
    ${({ theme }) => theme == 'light' && css`
      color: black;
      background-color: white;
    `}

    ${({ theme }) => theme == 'dark' && css`
      color: white;
      background-color: black;
    `}
  `}
`
```

### <a id="example-in-real-project"></a> Example in real project

Check the [example](example) folder to see how this plugin works in the real project.

## Linting styles
To make `@if` keyword as known to stylelint, add

```json
"ignoreAtRules": ["/^if$/"]
```

option to `at-rule-no-unknown` rule in `.stylelintrc`, like so:

```json
{
  "rules": {
    "at-rule-no-unknown": [true, {
      "ignoreAtRules": ["/^if$/"]
    }]
  }
}
```
