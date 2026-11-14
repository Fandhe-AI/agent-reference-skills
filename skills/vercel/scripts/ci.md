# CI

Enable and disable Vercel CI (beta), and list, inspect, view logs of, search, and rerun runs

Select the team that ran CI, or pass `--scope <team>`. Vercel CI is in beta, so features and settings may change. All subcommands support machine-readable output via `--format json` (`-F json`) or `--json`.

## Signature / Usage

### Investigating runs (list, details, failure logs)

```sh
vercel ci ls
vercel ci inspect
vercel ci logs --failed
```

### Enabling and disabling for a repository

Enable Vercel CI for the current Git repository (the repository must be connected to a project in the team, and not to a project in another team). If there are multiple Git remotes, choose one with `--remote` (required in non-interactive mode).

```sh
vercel ci enable
vercel ci enable --remote origin --scope your-team
```

Disable for the current GitHub repository (update the CLI first, and authenticate with `vercel login` or a token). Non-interactive mode returns JSON automatically, and `outcome` is `disabled` or `unchanged`.

```sh
vercel ci disable
vercel ci disable --remote upstream --scope your-team --non-interactive
```

### Listing runs

Shows runs for the current branch (alias `list`). `--status` is one of `queued` / `running` / `succeeded` / `failed` / `skipped`; `--limit` defaults to 20 (max 100).

```sh
vercel ci ls --branch main
vercel ci ls --all-branches --status failed
vercel ci ls --format json
```

### Run details

By default shows the current run for the commit. Find run IDs with `vercel ci ls`. `--wait` waits up to 10 minutes and exits with code 1 on failure (interrupting the wait does not cancel the run).

```sh
vercel ci inspect
vercel ci inspect your_run_id_here --attempt 1
vercel ci inspect --wait
```

### Fetching task logs

```sh
vercel ci logs --failed
vercel ci logs --task 'web#test' --level error --level fatal
vercel ci logs --grep ECONNRESET
vercel ci logs your_run_id_here --task 'web#build' --follow
```

Log levels are `trace` / `debug` / `command` / `info` / `warn` / `error` / `systemError` / `fatal`. `--failed` and `--follow` cannot be combined. `--follow` requires exactly one `--task`.

### Searching across recent runs

Defaults to the 20 most recent runs of the current branch (`--runs` is at most 50).

```sh
vercel ci grep ECONNRESET
vercel ci grep "out of memory" --all-branches --status failed --runs 50
```

### Rerunning a completed run

Without a run ID, selects the failed run for the current commit. For succeeded or skipped runs, specify the ID.

```sh
vercel ci rerun
vercel ci rerun your_run_id_here --wait
```

### JSON output

```sh
vercel ci inspect --json
vercel ci logs your_run_id_here --task 'web#build' --follow --json
```

## Notes

- Source: https://vercel.com/docs/cli/ci (fetched 2026-11-14)
