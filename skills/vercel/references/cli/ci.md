# vercel ci

Enable or disable repositories for Vercel CI (Beta) and inspect, read logs of, search, or rerun CI runs.

## Signature / Usage

```bash
vercel ci ls
vercel ci inspect
vercel ci logs --failed
```

```bash
vercel ci enable
vercel ci enable --remote origin --scope your-team
vercel ci disable --remote upstream --scope your-team --non-interactive
vercel ci ls --all-branches --status failed
vercel ci inspect your_run_id_here --attempt 1
vercel ci logs --task 'web#test' --level error --level fatal
vercel ci grep "out of memory" --all-branches --status failed --runs 50
vercel ci rerun your_run_id_here --wait
```

## Options / Props

### enable / disable

| Option | Description |
|--------|-------------|
| `--remote <NAME>` | Select an existing Git remote without the picker. Required with multiple remotes in non-interactive mode |
| `--json` | `disable` only: write the repository settings and an `outcome` of `disabled` or `unchanged`. Also accepts `--format json` |

### ls (alias list)

| Option | Description |
|--------|-------------|
| `--branch <name>` | Runs for this branch. Defaults to the current branch |
| `--all-branches` | Runs across every branch. Can't combine with `--branch` or `--commit` |
| `--commit <sha>` | Filter by commit on the current or selected branch |
| `--status <status>` | `queued`, `running`, `succeeded`, `failed`, or `skipped` |
| `--limit <number>` | Results per page. Default 20, max 100 |
| `--next <cursor>` | Next page, using a cursor from the previous response |

### inspect [run]

| Option | Description |
|--------|-------------|
| `--attempt <number>` | Specific attempt. Defaults to the latest |
| `--wait` | Wait up to 10 minutes for completion; exits `1` if the run fails. Stopping the wait doesn't cancel the run |

### logs [run]

| Option | Description |
|--------|-------------|
| `--failed` | Only failed tasks. Can't combine with `--follow` |
| `--task <name>` | Select a task such as `web#test`. Repeatable |
| `--level <level>` | Filter by log level. Repeatable |
| `--grep <text>` | Match text in log lines across the run, ignoring case |
| `--attempt <number>` | Specific attempt. Defaults to the latest |
| `--limit <number>` | Maximum tasks. Default 10, max 25 |
| `--follow`, `-f` | Stream one task's logs. Requires one `--task`. JSON output uses JSON Lines |

### grep \<text\>

| Option | Description |
|--------|-------------|
| `--branch <name>` | Branch to search. Defaults to the current branch |
| `--all-branches` | Search every branch. Can't combine with `--branch` |
| `--status <status>` | Filter by the latest attempt's status |
| `--runs <number>` | Maximum recent runs to search. Default 20, max 50. The search may stop early; the CLI reports incomplete results |
| `--level <level>` | Same log levels as `logs`. Repeatable |

## Notes

- Vercel CI is in Beta. Use Vercel CLI 64.3.1 or later. Run from a GitHub repository with an `origin` remote, or pass `--remote <NAME>` when enabling or disabling.
- `enable`: the repository must connect to a project on the selected team and to no projects on other teams. With one remote the CLI selects it; with several it prompts. Re-running leaves settings unchanged.
- `disable`: update Vercel CLI first; sign in with `vercel login` or pass `--token`. Non-interactive mode returns JSON automatically. Pass `--remote` for JSON or non-interactive use with multiple remotes.
- `inspect` and `logs` without a run ID use the current commit. `rerun [run]` starts a new attempt of a finished run; without an ID it selects a failed run for the current commit, and succeeded or skipped runs need an ID. `rerun --wait` waits up to 10 minutes and exits `1` if the new attempt fails.
- Log levels: `trace`, `debug`, `command`, `info`, `warn`, `error`, `systemError`, `fatal`.
- Every subcommand accepts `--format json` (`-F json`) or `--json`.
- Source: https://vercel.com/docs/cli/ci (fetched 2026-11-14)

## Related

- [global-options.md](./global-options.md)
- [login.md](./login.md)
