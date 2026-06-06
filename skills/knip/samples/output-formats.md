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

- JSON output structure: per-file objects with `file`, `owners`, `dependencies`, `devDependencies`, `exports`, `types`, `enumMembers`, `duplicates`
- `--reporter github-actions` produces inline annotations visible in pull request diff view
- Custom reporters receive a `ReporterOptions` object including `report`, `issues`, `counters`, `configurationHints`, `cwd`, `isProduction`
- Use a preprocessor (`--preprocessor ./preprocess.ts`) to transform results before the reporter receives them
