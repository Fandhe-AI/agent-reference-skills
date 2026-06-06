# Production Mode

Analyze only production code by excluding test files, config files, and devDependencies.

```sh
knip --production
```

Mark patterns as production-only with the `!` suffix:

```json
{
  "entry": ["src/index.ts!"],
  "project": ["src/**/*.ts!", "!src/test-helpers/**!"]
}
```

Strict mode adds workspace isolation and peer dependency checks:

```sh
knip --production --strict
```

## Notes

- Append `!` to glob patterns to mark them as production-only; `--production` then analyzes only those patterns
- `--strict` implies `--production` and additionally verifies workspace isolation and reports `peerDependencies`
- The production run does not replace the default run; run both separately to get complete coverage
- Exclude type-related issues in production mode: `knip --production --exclude types`
