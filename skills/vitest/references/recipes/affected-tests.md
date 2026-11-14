# Running Only Affected Tests

Select only the tests that a change can affect instead of running the whole suite. Vitest has two flags that differ in one question: changed compared to what?

## Signature / Usage

```sh
vitest run --changed              # uncommitted changes, staged and unstaged
vitest run --changed HEAD~1       # the last commit and uncommitted changes
vitest run --changed origin/main  # everything on this branch
```

```sh
vitest run --since-last-run
```

```md
- After a change, run `vitest run --since-last-run` to test only what the change affects.
- Before you finish, run `vitest run` once for the whole suite.
```

## Options / Props

| You want to run the tests affected by... | Use |
|------------------------------------------|-----|
| a branch, before opening or updating a pull request | `--changed origin/main` |
| the commits you are about to push | `--changed <upstream>` |
| your uncommitted edits, in a Git repository | `--changed` or `--since-last-run` |
| your edits since you last ran the tests, committed or not | `--since-last-run` |
| edits in a directory without Git, or with a history you do not control | `--since-last-run` |

## Notes

- `--changed` compares the working tree with a Git reference: Vitest asks Git for the changed files, then runs the test files that import them, directly or through other modules. The reference is the baseline, so the same command gives the same selection until the baseline moves. It requires a Git repository, and a change that is committed and merged stops being "changed".
- `--since-last-run` (v5.1.0, experimental) compares every file a test loaded with the time of the test's last run. The first run runs every test and records the files each test loaded (dynamic imports, mocks, setup files, snapshot files); later runs rerun a test when one of its files is newer or deleted, or when the test has no record. A test file that failed in its last run also runs again until it passes. Each run updates the records of the tests it ran. Git is not involved. The records live in the cache; `vitest run --clearCache` deletes them.
- `--changed` fits a baseline shared with other people (the same reference on every machine and in CI); `--since-last-run` fits the baseline of your own last run.
- AI coding agents run tests after almost every edit, often in a container or temporary worktree and in a new process per command. `--changed` is empty right after a commit and needs a repository; `--since-last-run` covers exactly the edits since the previous run, and the first command in a fresh environment is a full run that builds the records.
- The records cannot see a file that no test loaded during the last run (a new `.env` file, a new `__mocks__` file) or modification times set in the past by a checkout or an unpacked archive; a final full run covers both.
- Source: https://vitest.dev/guide/recipes/affected-tests (Vitest v5.1.0)

## Related

- [CLI](../guide/cli.md)
- [Config](../guide/config.md)
- [Filtering](../guide/filtering.md)
