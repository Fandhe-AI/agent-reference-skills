<!-- source: https://code.claude.com/docs/en/scheduled-tasks / last verified: 2026-08-07 -->

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
| `CronList` | List tasks with IDs, schedules, prompts |
| `CronDelete` | Cancel by 8-char task ID |

| Comparison | Cloud (Routines) | Desktop | `/loop` |
|---|---|---|---|
| Runs on | Anthropic cloud | Your machine | Your machine |
| Requires machine on | No | Yes | Yes |
| Requires open session | No | No | Yes |
| Access to local files | No (fresh clone) | Yes | Yes |
| Minimum interval | 1 hour | 1 minute | 1 minute |

`loop.md` locations (first found wins): `.claude/loop.md` (project) > `~/.claude/loop.md` (user); replaces the default `/loop` maintenance prompt; ignored when a prompt is given on the command line; truncated beyond 25,000 bytes.

## Notes

- A session holds up to 50 scheduled tasks. All times interpreted in local timezone.
- Jitter: recurring tasks fire up to 30 min after scheduled time (or up to half the interval for sub-hourly jobs); one-shot tasks at `:00`/`:30` fire up to 90s early. Pick a non-`:00`/`:30` minute for exact timing.
- Recurring tasks expire automatically 7 days after creation (fires once more, then deletes itself); for longer-lived scheduling use [Routines](./routines.md) or Desktop scheduled tasks.
- Tasks only fire while Claude Code is idle (not mid-response); no catch-up for missed fires. Starting a fresh conversation clears session-scoped tasks; `--resume`/`--continue` restores unexpired ones.
- Disable entirely with `CLAUDE_CODE_DISABLE_CRON=1`.
- On Amazon Bedrock / Claude Platform on AWS / Google Cloud's Agent Platform / Microsoft Foundry, a prompt with no interval runs on a fixed 10-minute schedule instead of dynamic, and `loop.md` isn't read.

## Related

- [routines.md](./routines.md)
