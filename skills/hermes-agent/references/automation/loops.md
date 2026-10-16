# Recurring Loops

`/loop` re-runs a prompt (or a slash command) on a recurring cadence inside the current session. Each wakeup is a real agent turn that reads current state fresh. Hermes' take on Claude Code's `/loop` (the `/proactive` alias also works).

## Signature / Usage

```text
/loop 5m check the deploy status and tell me if it's live yet
/loop 10m /recap
/loop 2m poll CI --times 30
/loop 5m watch the queue --until queue depth reaches zero
/loop keep an eye on the migration and summarize progress
```

| Command | What it does |
|---------|--------------|
| `/loop [interval] <prompt> [--times N] [--until <cond>]` | Start (or replace) the loop for this session. First wakeup fires immediately. |
| `/loop` or `/loop status` | Show cadence, ticks fired, time to next wakeup. |
| `/loop pause` | Stop firing without losing the loop. |
| `/loop resume` | Pick it back up. |
| `/loop stop` | End the loop. |
| `/proactive ...` | Alias for `/loop`. |

## Cadence modes

- **Fixed interval**: `30s`, `5m`, `2h`, `1h30m`.
- **Self-paced**: omit the interval. Starts at the floor (1 minute by default); while replies stop changing it backs off exponentially (2m, 4m, 8m ... up to 15 minutes by default); a changed reply snaps it back to the floor. Change detection is a local digest comparison (timestamps ignored).

## Stop conditions

| Condition | How |
|-----------|-----|
| Agent decides it's done | Ends its reply with `LOOP_COMPLETE` on its own line. |
| Run cap | `--times N`. |
| Evidence-based | `--until <condition>`; the same auxiliary judge as `/goal` checks each reply. If ruled unachievable the loop pauses with the reason (fail-open on judge errors). |
| You | `/loop stop` or `/loop pause`. |
| Backstop budget | `loops.max_ticks` (default 100) pauses the loop; `0` = unlimited. |

## Configuration

```yaml
# ~/.hermes/config.yaml
loops:
  min_interval_seconds: 30       # floor for fixed intervals
  max_ticks: 100                 # backstop budget (0 = unlimited)
  self_paced_floor_seconds: 60   # self-paced starting cadence
  self_paced_ceiling_seconds: 900  # self-paced max backoff
```

## Notes

- Works on the CLI, TUI (`hermes --tui`), web dashboard chat, desktop app and every gateway platform. On messaging platforms the gateway fires wakeups between your messages.
- Desktop/dashboard: a session with an active `/loop` (or `/heartbeat`) is exempt from the disconnected-session reaper; the backend process itself must keep running.
- An active `/goal` owns the session: loop wakeups defer while a goal is driving, and resume when the goal finishes, pauses, or parks on a wait barrier. A real user message always wins.
- A wakeup is a normal user-role turn (no system-prompt mutation); in the gateway its output is posted without quoting the message that set the loop.
- State persists per session, survives `/resume` and compression. One loop per session; a new `/loop` replaces the old one.
- Ctrl+C on a wakeup turn pauses the loop (`/loop resume` to continue).
- Token cost scales with cadence: every tick is a full agent turn.
- `--until` judge routes through the `goal_judge` auxiliary task (`auxiliary.goal_judge.*`).

| | `/loop` | `/goal` | cron |
|---|---|---|---|
| Trigger | Timer (or self-paced) | Judge verdict after each turn | Schedule, outside any session |
| Lives in | Current session | Current session | Own session per run |
| Best for | Polling, monitoring, periodic re-runs | One objective, iterate until done | Unattended long-horizon schedules |

## Related

- [Persistent Goals](./goals.md)
- [Cron Jobs](./cron.md)
- [Session Heartbeats](./heartbeat.md)
