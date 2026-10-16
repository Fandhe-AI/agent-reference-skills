# @commitlint/format

Format a lint Report into human-readable strings.

> https://commitlint.js.org/api/format

## Install

```sh
npm install --save @commitlint/format
```

## Types

```typescript
type Problem = {
  level: 0 | 1 | 2;
  name: string;
  message: string;
};

type Report = {
  results: ReportResult[];
};

type ReportResult = {
  errors: Problem[];
  warnings: Problem[];
};

type formatOptions = {
  /** Enable ANSI color output */
  color?: boolean; // default: true
  /** Signs for levels 0, 1, 2 */
  signs?: readonly [string, string, string]; // default: [' ', '⚠', '✖']
  /** Color names for levels 0, 1, 2 */
  colors?: readonly [string, string, string]; // default: ['white', 'yellow', 'red']
  /** Enable verbose output */
  verbose?: boolean; // default: false
  /** Append a help URL */
  helpUrl?: string;
  /** Use the legacy input output (single-line `⧗   input: <msg>`) */
  legacyOutput?: boolean;
};
```

## Function signature

```typescript
format(report?: Report = {}, options?: formatOptions = {}) => string[];
```

## Import

```javascript
import format from "@commitlint/format";
```

## Examples

### Empty call (no problems)

```javascript
format();
/*
[
  '\u001b[1m\u001b[32m✔\u001b[39m   found 0 problems, 0 warnings\u001b[22m'
]
*/
```

### Output without color

```javascript
format(
  {
    results: [
      {
        warnings: [
          {
            level: 0,
            name: "some-hint",
            message: "This will not show up as it has level 0",
          },
          {
            level: 1,
            name: "some-warning",
            message: "This will show up yellow as it has level 1",
          },
        ],
        errors: [
          {
            level: 2,
            name: "some-error",
            message: "This will show up red as it has level 2",
          },
        ],
      },
    ],
  },
  {
    color: false,
  },
);
/*
[
  '✖   This will show up red as it has level 2 [some-error]',
  '    This will not show up as it has level 0 [some-hint]',
  '⚠   This will show up yellow as it has level 1 [some-warning]',
  '✖   found 1 problems, 2 warnings'
]
*/
```

## Notes

- Since v21.0.0, the input message is printed on the line after `⧗   --- input ---`. `legacyOutput: true` restores the single-line `⧗   input: <msg>` (matches the implementation and tests of commit 40d7e36)
- `legacyOutput` is not documented in docs/api/format.md. Sources are `FormatOptions` in `@commitlint/types/src/format.ts` and commit 40d7e36
