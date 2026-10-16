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
knip --reporter sarif > knip.sarif

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
- Custom reporters receive a `ReporterOptions` object including `report`, `issues`, `counters`, `configurationHints`, `cwd`, `isProduction`
- Use a preprocessor (`--preprocessor ./preprocess.ts`) to transform results before the reporter receives them
