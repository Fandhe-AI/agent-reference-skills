# vercel schedules

Manage Vercel Schedules for the linked project: inspect, enable, disable, invoke any schedule, and create, update, delete dynamic schedules that target a queue topic. Beta.

## Signature / Usage

```bash
vercel schedules [subcommand]
```

```bash
vercel schedules create daily-cleanup --cron "0 2 * * *" --topic scheduled-cleanup
vercel schedules create send-reminder --at 2027-09-17T10:00 --timezone America/New_York --topic reminders
vercel schedules list --namespace jobs --limit 50
vercel schedules inspect daily-cleanup --json
vercel schedules executions list daily-cleanup --since 7d --until 1d --json
vercel schedules update daily-cleanup --cron "0 3 * * *"
vercel schedules enable daily-cleanup --for 2h
vercel schedules invoke daily-cleanup
vercel schedules delete daily-cleanup --yes
vercel schedules list --environment staging
vercel schedules enable cleanup --git-branch feature-x --for 2h
vercel schedules list --local
```

## Options / Props

### Subcommands

| Command | Description |
|---------|-------------|
| `list` | List schedules in a namespace |
| `inspect <name>` | Show a schedule |
| `create <name>` | Create a dynamic schedule |
| `update <name>` | Update a dynamic schedule |
| `executions list <name>` | List execution history |
| `enable <name>` | Enable a schedule |
| `disable <name>` | Disable a schedule |
| `invoke <name>` | Invoke a schedule immediately |
| `delete <name>` | Delete a schedule |

### Shared options

| Option | Description |
|--------|-------------|
| `--namespace <NAMESPACE>` | Schedule namespace. Defaults to `default` |
| `-e, --environment <ENVIRONMENT>` | Production or a custom environment by name or ID. Defaults to production |
| `--git-branch <BRANCH>` | Schedules of a Preview branch |
| `--user <USER>` | Schedules of CLI deployments by a Vercel user ID. Combine with `--git-branch` for branch-associated CLI deployments |
| `--json` | Output as JSON |
| `--local` | Use the running `vercel dev` session |

### create / update

| Option | Description |
|--------|-------------|
| `--cron <EXPRESSION>` | Cron expression for a recurring schedule. Can't combine with `--at` |
| `--at <DATETIME>` | Local date and time, `YYYY-MM-DDTHH:mm` or `YYYY-MM-DDTHH:mm:00`. Can't combine with `--cron` |
| `--timezone <TIMEZONE>` | IANA timezone. Defaults to UTC |
| `--jitter <MINUTES>` | Jitter window, 1 through 15 minutes. `update` also accepts `none` |
| `--topic <TOPIC>` | Queue topic to target (required for `create`) |
| `--payload <JSON>` | JSON payload up to 16 KB per queue message (8 KB with `--local`). `update` accepts `null` to remove it |

### list / executions list

| Option | Description |
|--------|-------------|
| `--limit <NUMBER>` | `list`: 1 through 100, default 20 |
| `--next <CURSOR>` | Pagination cursor |
| `-s, --since <TIME>` | `executions list`: start of range, ISO 8601 or relative (`7d`). Alone, end defaults to now |
| `-u, --until <TIME>` | `executions list`: end of range; requires `--since` |
| `--sort <asc\|desc>` | `executions list`: sort order |
| `--execution <ID>` | `executions list`: matches execution IDs containing the value |

### enable

| Option | Description |
|--------|-------------|
| `--for <DURATION>` | Enable for a duration such as `30m` or `5h` |
| `--until <TIME>` | Enable until an ISO 8601 time or Unix timestamp in milliseconds. Can't combine with `--for` |

## Notes

- Commands manage production schedules by default. `--environment` can't be combined with `--git-branch` or `--user`, and none of them with `--local`. `--git-branch` alone accepts a branch of the linked Git repository.
- Static and dynamic schedules can be listed, inspected, enabled, disabled, and invoked. Only dynamic schedules can be updated or deleted; edit project configuration and redeploy to change a static one.
- `get` is a supported alias for `inspect` but prints a deprecation warning.
- `--local` needs `vercel dev` running; no cloud login or project link. It can't combine with `--scope` or `--token`; use `--cwd` for another directory. `executions list` rejects `--local`.
- The shortest cron interval must be at least the jitter window. On Hobby, omit `--jitter` or set `15`, and cron schedules run at most once every 15 minutes. For `update` on Hobby only `15` and `none` are accepted; `none` keeps effective jitter at 15.
- An expression can change only within its type (cron to cron); delete and recreate to switch to a one-time expression.
- `executions list` defaults to the last 24 hours, descending, with a range up to 30 days. `--from` / `--to` (Unix ms) and `--execution-id` are deprecated; use `--since`, `--until`, `--execution`. An outcome is `unavailable` when no function request was recorded.
- `enable` with `--for`/`--until` sets `activeUntil`, after which the schedule becomes inactive. Without either, it stays active indefinitely and clears the end time. If already active indefinitely, disable it before enabling with an end time. `invoke` runs immediately without changing state or cadence.
- `delete` asks for confirmation unless `--yes`; `--yes` is required in non-interactive shells such as CI.
- Source: https://vercel.com/docs/cli/schedules (fetched 2026-11-14)

## Related

- [crons.md](./crons.md)
- [dev.md](./dev.md)
