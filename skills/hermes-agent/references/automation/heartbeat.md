# Session Heartbeats

`/heartbeat` gives the current session one recurring instruction. Whenever the session is idle and the interval has elapsed, the prompt fires as a normal user turn in the same conversation, context and prompt cache.

## Signature / Usage

```text
/heartbeat every 10m Check the deployment and report meaningful changes
```

| Command | What it does |
|---------|--------------|
| `/heartbeat every <interval> <prompt>` | Set (or replace) the session's heartbeat. Intervals: `90s`, `10m`, `2h`, `1d` (minimum 60s). |
| `/heartbeat` or `/heartbeat status` | Show the heartbeat, interval, time to next fire. |
| `/heartbeat pause` | Stop firing without clearing. |
| `/heartbeat resume` | Resume (re-anchors the timer; no instant stale fire). |
| `/heartbeat clear` | Remove the heartbeat. |

`/hb` is an alias. Works on the CLI, TUI / Desktop app and gateway platforms (on Slack use `/hermes heartbeat ...`).

## Heartbeat vs cron

| | `/heartbeat` | `hermes cron` |
|---|---|---|
| Runs in | This conversation (full context) | A fresh isolated session per tick |
| Survives restart | State survives (SessionDB); gateway watches resume automatically | Yes, fully durable scheduler |
| How many | One per session | Unlimited |
| Best for | Watching something in this thread while you work | Standing jobs, reports, watchdogs, deliveries |

## Notes

- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/heartbeat (pinned to v0.22.2)
- Idle-only: never interrupts a running turn; fires at the next idle poll. A queued user message always takes priority.
- Missed ticks coalesce into one heartbeat turn; the timer re-anchors on every fire.
- Owned by the surface that set it: a heartbeat set from a messaging chat fires from the gateway even if the session is open in the TUI / Desktop app.
- Injected as an ordinary user message: no system-prompt mutation, no toolset change (cache-safe).
- State lives in `SessionDB.state_meta` keyed by `heartbeat:<session_id>` and follows context-compression session rotations. In the gateway, reset, switch or suspension of a conversation clears its heartbeat; resuming an archived conversation does not resurrect it. Firing requires the owning process (CLI session or gateway) to be running.
- Execution accounting: a due tick that ends before entering the agent runner is refunded; once the runner is entered, the fire counts even on failure. Not proof of a successful model response or delivery.
- Gateway quiet mode: a heartbeat turn may end with a bare `NO_REPLY` / `[SILENT]` marker and nothing is sent; no typing indicator, tool-progress or draft bubbles are posted. Approval prompts and failures stay visible.
- The injected prompt tells the agent to reply briefly and stop when nothing meaningful changed.

## Related

- [Cron Jobs](./cron.md)
- [Recurring Loops](./loops.md)
- [Persistent Goals](./goals.md)
