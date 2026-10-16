<!-- source: https://code.claude.com/docs/en/scheduled-tasks / last verified: 2026-10-17 -->

# Scheduled tasks (/loop)

Run a prompt repeatedly on an interval, poll for status, or set a one-time reminder within an open Claude Code session, using `/loop` and the cron scheduling tools (`CronCreate`/`CronList`/`CronDelete`). Session-scoped: tasks live in the current conversation and stop when a new one starts.

## Signature / Usage

```text
/loop 5m check if the deployment finished and tell me what happened
/loop check whether CI passed and address any review comments   # Claude picks the interval
/loop                                                            # built-in maintenance prompt
/loop 20m /review-pr 1234                                        # re-run a skill each iteration

remind me at 3pm to push the release branch
in 45 minutes, check whether the integration tests passed
```

## Options / Props

| What you provide | Example | Behavior |
|---|---|---|
| Interval + prompt | `/loop 5m check the deploy` | Fixed-schedule cron job |
| Prompt only | `/loop check the deploy` | Claude chooses delay (1min–1h) each iteration based on observation |
| Neither | `/loop` | Built-in maintenance prompt (or project/user `loop.md`), dynamically scheduled |

| Tool | Purpose |
|---|---|
| `CronCreate` | Schedule a task: 5-field cron expression, prompt, recurring or one-shot |
| `CronList` | List tasks with IDs, schedules, next run times (v2.1.299+), prompts |
| `CronDelete` | Cancel by 8-char task ID |

| Comparison | Cloud (Routines) | Desktop | `/loop` |
|---|---|---|---|
| Runs on | Anthropic cloud | Your machine | Your machine |
| Requires machine on | No | Yes | Yes |
| Requires open session | No | No | Yes |
| Access to local files | No (fresh clone) | Yes | Yes |
| Minimum interval | 1 hour | 1 minute | 1 minute |
| Customizable schedule | Via `/schedule` in the CLI | Yes | Yes |

`loop.md` locations (first found wins): `.claude/loop.md` (project) > `~/.claude/loop.md` (user); replaces the default `/loop` maintenance prompt; ignored when a prompt is given on the command line; truncated beyond 25,000 bytes.

## Notes

- A session holds up to 50 scheduled tasks. All times interpreted in local timezone.
- Jitter: a recurring task starts each run late by up to half the gap to the next run, at most 30 minutes, except `*/5 * * * *` (what `/loop 5m` creates), which isn't delayed and starts 15 seconds early (4 min 45 s after the previous run). One-shot tasks scheduled at `:00`/`:30` run up to 90 seconds early; pick another minute for exact timing (e.g. `3 9 * * *`).

  | Schedule | When each run starts |
  | --- | --- |
  | Every 5 minutes (`*/5 * * * *`) | 4 minutes 45 seconds after the previous run |
  | Every 10 minutes | 0 to 5 minutes late |
  | Every 30 minutes | 0 to 15 minutes late |
  | Every hour, or less often such as daily | 0 to 30 minutes late |
- Recurring tasks expire automatically 7 days after creation (fires once more, then deletes itself); for longer-lived scheduling use [Routines](./routines.md) or Desktop scheduled tasks.
- Tasks only fire while Claude Code is idle (not mid-response); no catch-up for missed fires. Starting a fresh conversation clears session-scoped tasks; `--resume`/`--continue` restores unexpired ones, except one-shot tasks whose scheduled time has passed; a self-paced `/loop` isn't restored (run `/loop` again). Backgrounding the session carries `/loop` tasks over to a background session.
- Disable entirely with `CLAUDE_CODE_DISABLE_CRON=1`.
- Dynamically chosen intervals and the built-in maintenance prompt work on every provider (Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform, Microsoft Foundry included) and with feature-flag fetching turned off; on those providers, or with fetching off, both require v2.1.248+.

## Related

- [routines.md](./routines.md)
