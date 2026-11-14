# Output Formats

Select a built-in reporter or write a custom one to consume knip results in any format.

```sh
# Default symbols output
knip

# Compact single-line-per-file output
knip --reporter compact

# JSON for scripting or downstream tools
knip --reporter json

# Markdown tables
knip --reporter markdown

# GitHub Actions PR annotations
knip --reporter github-actions

# SARIF 2.1.0 for code-scanning integrations
knip --reporter sarif --output-file knip.sarif

# Write a reporter's output to a file (Knip 6.44.0+); prefix the path with the reporter name when combining reporters
knip --reporter symbols --reporter json --output-file json=knip.json

# Circular dependencies as a tree view
knip --cycles --reporter cycles
```

Write a custom local reporter:

```typescript
// my-reporter.ts
import type { ReporterOptions } from 'knip';

export default async ({ issues }: ReporterOptions) => {
  for (const [filePath, fileIssues] of Object.entries(issues.files)) {
    console.log(filePath, fileIssues);
  }
};
```

```sh
knip --reporter ./my-reporter.ts
```

## Notes

- JSON reporter output is one line of JSON whose top level is an object with a single `issues` array; each element groups the issues of one file (`file`, optional `owners`, plus one array per enabled issue type)
- `--reporter github-actions` produces inline annotations visible in pull request diff view
- `--reporter sarif` emits SARIF 2.1.0; `--cycles --reporter cycles` shows circular dependencies as a multi-line tree
- `--output-file [reporter=]path` writes a reporter's output to a file instead of `stdout` (files have no ANSI color codes; parent directories are created)
- Custom reporters receive a `ReporterOptions` object including `report`, `issues`, `counters`, `configurationHints`, `cwd`, `isProduction`, `isShowProgress`, `options`, `write`; use `options.write` instead of `console.log` so `--output-file` is honored
- Source: https://knip.dev/features/reporters (knip@6.45.1 docs, retrieved 2026-11-14)
- Use a preprocessor (`--preprocessor ./preprocess.ts`) to transform results before the reporter receives them
