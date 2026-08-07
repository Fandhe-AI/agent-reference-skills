# CLI Commands

## Signature / Usage

```bash
vitest run --coverage.enabled
```

Filter by filename: `vitest foobar`
Line number targeting (v3+): `vitest basic/foo.test.ts:10`

## Options / Props

Commands:

| Command | Description |
|---------|-------------|
| `vitest` | Default: watch mode in dev, run mode in CI |
| `vitest run` | Single run without watching |
| `vitest watch` | Run in watch mode (alias: `vitest dev`) |
| `vitest bench` | Run benchmark tests only |
| `vitest related <files>` | Run only tests related to the given source files |
| `vitest list` | Print the list of matching tests |
| `vitest init <name>` | Set up project configuration |
| `vitest typecheck` | Run type tests |

Main flags:

| Flag | Description |
|------|-------------|
| `--run` | Disable watch mode |
| `--reporter <name>` | Specify reporter (`default`, `verbose`, `dot`, `json`, `junit`, `tap`, `tree`, `blob`, `github-actions`, `minimal`, etc.) |
| `--coverage.enabled` | Enable coverage collection |
| `--ui` | Enable the UI |
| `-u` / `--update` | Update snapshots |
| `--changed` | Run only tests related to changed files |
| `--bail <n>` | Stop the run after n test failures |
| `--passWithNoTests` | Exit successfully even with no tests |
| `--globals` | Inject the API into the global scope |
| `--environment <name>` | Specify the runtime environment (default: `node`) |
| `-t` / `--testNamePattern <pattern>` | Run only tests matching the pattern |
| `-w` / `--watch` | Enable watch mode |
| `--project <name>` | Run only the specified project(s) (repeatable, wildcards supported, `!pattern` to exclude) |
| `--shard <index>/<count>` | Shard the test suite (e.g. `--shard=1/3`) |
| `--tagsFilter <expr>` | Filter tests by tag (`&&`, `\|\|`, `!` supported) |
| `--listTags` | List available tags |
| `--strictTags` | Treat undefined tags as an error |
| `--browser.enabled` | Enable browser mode |

## Notes

- Common usage:

```bash
# single run (for CI)
vitest run

# run with coverage
vitest run --coverage.enabled

# update snapshots
vitest run -u

# specific tests only
vitest run -t "should handle errors"

# only tests related to changed files
vitest run --changed

# lint-staged integration
vitest related src/utils.ts --run

# specific projects only
vitest run --project unit --project e2e

# sharding (CI parallelization)
vitest run --shard=1/3

# filter by tag
vitest run --tagsFilter "unit && !slow"
```

- Watch mode keyboard shortcuts:

| Key | Action |
|-----|--------|
| `a` | Rerun all tests |
| `f` | Rerun failed tests only |
| `u` | Update snapshots |
| `p` | Filter by filename |
| `t` | Filter by test name |
| `q` | Quit |

## Related

- [Config](./config.md)
- [Coverage](./coverage.md)
- [Snapshot](./snapshot.md)
