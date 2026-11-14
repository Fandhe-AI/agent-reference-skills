<!-- source: https://code.claude.com/docs/en/scheduled-tasks / last verified: 2026-11-14 -->

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
| MCP servers | Connectors configured per task | Config files and connectors | Inherits from session |
| Permission prompts | Auto mode by default | Configurable per task | Inherits from session |
| Minimum interval | 1 hour | 1 minute when Claude sets it, 1 hour in the forms | 1 minute |
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
- Disable entirely with `CLAUDE_CODE_DISABLE_CRON=1`: `CronCreate` and `/loop` become unavailable and scheduled tasks stop firing. While the project's `.claude/scheduled_tasks.json` holds tasks, `CronList` and `CronDelete` stay available.
- Skills as the loop prompt (e.g. `/loop 20m /review-pr 1234`): a scheduled fire only runs skills Claude may invoke on its own. These reach Claude as plain text instead of executing: built-in commands (`/permissions`, `/model`, `/clear`), skills with `disable-model-invocation: true` (including bundled `/verify`), skills withheld by `skillOverrides` or a `Skill` deny rule, and MCP prompts such as `/mcp__github__list_prs`.
- Seconds are rounded up to the nearest minute; intervals that don't map to a clean cron step (`7m`, `90m`) are rounded to the nearest one that does and Claude says what it picked. Supported units: `s`, `m`, `h`, `d`.
- Stopping: a self-paced loop stops with `Esc` while waiting (or `Ctrl+C` while idle, except in an attached background session); a fixed-interval loop or any task created by asking Claude must be cancelled by asking Claude (`Esc` / `Ctrl+C` don't stop it). In self-paced mode Claude can end the loop itself by calling `ScheduleWakeup` with `stop: true`. Detaching from an attached background session with `Ctrl+C` twice on an empty prompt keeps a self-paced loop running (requires v2.1.295+); press `Esc` first to stop it.
- Cron syntax: standard 5-field (`minute hour day-of-month month day-of-week`) with `*`, single values, steps, ranges, lists; day-of-week `0`/`7` = Sunday; `L`, `W`, `?` and name aliases (`MON`, `JAN`) unsupported; when both day-of-month and day-of-week are constrained a date matches if either matches (vixie-cron).
- Limitations: a restored recurring task doesn't fire for runs missed while the session wasn't running; `--resume` / `--continue` doesn't restart background Bash commands and monitors; with feature-flag fetching off, tasks kept across sessions are stored in `.claude/scheduled_tasks.json` (a symlinked `.claude` or file makes scheduling error; copied files in another folder such as a new worktree are listed but not run). In a background session a self-paced loop stops if its next wakeup comes due while the process isn't running.
- In a session where the Monitor tool is available, Claude may use it for a dynamic `/loop` schedule instead of polling.
- 2.1.325: scheduled tasks and `/loop` ask before running a skill that declares `allowed-tools` or hooks; add `Skill(name)` to `permissions.allow` to run it unattended.
- 2.1.325: "Always allow" in Desktop, IDE and SDK hosts offers a rule alone only when saving it would allow that command again, so a scheduled task that relied on one can now wait for you.
- 2.1.319: self-paced `/loop` now ends when a turn finishes without rescheduling; set `CLAUDE_CODE_LOOP_KEEPALIVE=1` to keep the old behavior. The current official page still describes a fallback wakeup about 20 minutes later; the changelog is newer and the discrepancy is left as published.
- 2.1.319: `/loop` confirmations in cloud sessions note that a timer stops with its container, with an offer of a loop that survives.
- Source: https://code.claude.com/docs/en/scheduled-tasks.md (retrieved 2026-11-14)
- Source: https://code.claude.com/docs/en/changelog.md (2.1.319, 2.1.325, retrieved 2026-11-14)
- Dynamically chosen intervals and the built-in maintenance prompt work on every provider (Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform, Microsoft Foundry included) and with feature-flag fetching turned off; on those providers, or with fetching off, both require v2.1.248+.

## Related

- [routines.md](./routines.md)
