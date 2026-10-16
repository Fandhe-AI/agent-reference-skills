# Test Filtering

Narrow which tests run: by file name, test name, line number, tags, or in-file `.only` / `.skip` / `.todo`.

## Signature / Usage

```bash
vitest basic                              # file name filter
vitest -t "handles empty input"           # test name (regex) filter
vitest utils -t "handles empty input"     # combined
vitest basic/foo.test.ts:10               # line number
vitest --tags-filter=frontend             # tags
```

```ts
import { describe, it } from 'vitest'

describe.only('suite', () => {})
it.skip('skipped test', () => {})
it.todo('unimplemented test')
```

## Options / Props

| Filter | Behavior |
|--------|----------|
| `vitest <pattern>` | Runs files whose path contains the string |
| `-t` / `--testNamePattern` | Regex against the full name: describe names and test name joined with `' > '` (e.g. `math > adds`) |
| `file.test.ts:LINE` | Runs the test containing that line; needs the full file name with extension (relative or absolute); several allowed separated by spaces; ranges (`:10-25`) unsupported |
| `--tags-filter` | Tag expression, see Test Tags |
| `.only` | Skips all unmarked tests in the file |
| `.skip` | Disables test/suite but still reported |
| `.todo` | Placeholder without body, shown in the report |

## Notes

- `-t`, `--tags-filter`, `.only`, `.skip` apply per test file, so Vitest still runs each file to discover matches. Pass a file path with the filter, or use `--experimental.preParse` (parses files to discover names without executing them):

```bash
vitest --experimental.preParse -t "handles empty input"
```

- By default Vitest fails the run if `.only` is found when `process.env.CI` is set (option `allowOnly`). The `no-focused-tests` ESLint rule (also in oxlint) catches it earlier.

## Related

- [Test Tags](./test-tags.md)
- [CLI](./cli.md)
- [Test API](../api/test-api.md)
