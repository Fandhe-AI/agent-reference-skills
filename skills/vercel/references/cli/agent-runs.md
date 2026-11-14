# vercel agent-runs

Read Agent Runs data from the terminal: find projects with activity, list runs, inspect run metadata, and read conversation traces.

## Signature / Usage

```bash
vercel agent-runs projects --scope my-team
vercel agent-runs list --scope my-team --project my-app
vercel agent-runs inspect run_1234567890 --scope my-team --project my-app
vercel agent-runs trace run_1234567890 --scope my-team --project my-app
```

```bash
vercel agent-runs projects --scope my-team --since 7d
vercel agent-runs list --query "checkout" --limit 20
vercel agent-runs list --project my-app --next "$NEXT_CURSOR" --json
vercel agent-runs trace run_1234567890 --json --max-field-length 0
vercel agent-runs trace run_1234567890 --next "$NEXT_CURSOR" --json
vercel agent-runs list --since 7d --until 1d
```

## Options / Props

Shared options (all four subcommands unless noted):

| Name | Description |
|------|-------------|
| `--environment <ENVIRONMENT>`, `-e` | Query `production` or `preview` (default: `production`) |
| `--since <TIME>`, `-s` | Start of the time window: ISO 8601 timestamp or relative value such as `1h` / `7d`. Without it, `list` and `projects` cover the last 12 hours |
| `--until <TIME>`, `-u` | End of the window; requires `--since`; defaults to now |
| `--project <NAME\|ID>`, `-p` | Override the linked project (`list`, `inspect`, `trace`) |
| `--json` | Print the API response as JSON to stdout |

`list` options:

| Name | Description |
|------|-------------|
| `--query <TEXT>`, `-q` | Search runs by title (`--search` is a deprecated alias) |
| `--limit <N>`, `-n` | Runs per page, up to 100 |
| `--next <CURSOR>` | Continue using the cursor from the previous response |

`trace` options:

| Name | Description |
|------|-------------|
| `--max-field-length <N>` | Limit individual string fields before formatting; default 8000, positive values capped at 50,000. `--json --max-field-length 0` outputs fields without CLI truncation |
| `--next <CURSOR>` | Fetch newer trace activity (cannot combine with `--previous`) |
| `--previous <CURSOR>` | Fetch older trace activity |

## Notes

- `list`, `inspect`, `trace` use the linked project unless `--project` is given; `projects` works at the team level. From an unlinked directory pass `--scope` for `projects`, and both `--scope` and `--project` for the others
- Cursors: JSON output exposes `pagination.next` / `pagination.previous`. Keep the same team, project, environment, and query (and run / time window for `trace`). The cursor preserves the time window, so omit `--since` / `--until` when continuing a `list`. A page can be empty and still provide a next cursor; restart without `--next` if the cursor is invalid or expired
- Markdown output of `trace` shortens displayed messages, reasoning, and tool inputs/outputs to 2,000 characters even with `--max-field-length 0`; use `--json` to retain omitted fields such as per-turn token usage. A trace page may contain only part of a conversation
- Without `--json`, `trace` renders recognized conversation turns as Markdown (also when piped); if no turns are found it prints JSON. Traces contain only the content Agent Runs collected (see trace sampling / content settings in the Agent Runs docs)
- Global options accepted: `--cwd`, `--debug`, `--global-config`, `--help`, `--local-config`, `--no-color`, `--non-interactive`, `--scope`, `--token`, `--version`
- Source: https://vercel.com/docs/cli/agent-runs (fetched 2026-11-14)

## Related

- [traces.md](./traces.md)
- [link.md](./link.md)
- [global-options.md](./global-options.md)
