# Session Storage Recovery

What to do when Hermes reports that another process still holds an old copy of the session database's write-ahead log, and what the files beside `state.db` are. Hermes keeps each profile's conversations in one SQLite file, `state.db`, with sidecars `state.db-wal` and `state.db-shm`. The refusal exists so nothing is lost.

## Signature / Usage

```bash
hermes gateway stop          # add -p <profile> for a named profile
hermes doctor                # add -p <profile> for a named profile
hermes sessions recover --source ~/.hermes/state.db --inspect-only
```

Fix in three steps: (1) quit every Hermes process on that profile (Desktop app, gateway, dashboard via `hermes dashboard --stop`, cron, custom services); (2) run `hermes doctor` until no `PID N (command)` holder is listed; (3) start Hermes again (one process first) and resend your message.

## Options / Props

| File or directory | What it is | What to do |
|---|---|---|
| `state.db-wal`, `state.db-shm` | SQLite's live write-ahead log and shared-memory index | Leave alone; they shrink at the next checkpoint |
| `state.db.retired-wal-<timestamp>-<pid>/` | Capture of the log copy a refusing process held, plus `manifest.json` | Keep; attach to a bug report if recent conversations are missing |
| `state.db.pre-update-emergency-<timestamp>.bak` | Snapshot taken by the Desktop updater | Keep for a while; restore only with every process stopped, `hermes sessions recover --source <file> --inspect-only` first |
| `state.db.corrupt.<timestamp>.bak`, `*.malformed-backup` | Copies of a damaged file | Do not restore over `state.db`; safe to delete once normal |
| `state-snapshots/` | Quick snapshots from `hermes update` and `hermes backup` | Restore with every process stopped |

## Notes

- Do not run `hermes doctor --fix` while processes are running; do not delete `state.db-wal` or `state.db-shm` (the log holds committed conversations not yet in `state.db`); do not copy `state.db` alone (use `hermes backup` or `hermes sessions recover`); do not ask the agent to fix it (same store, same refusal).
- `hermes sessions optimize`, `optimize-storage`, and `prune` rewrite the store and refuse while another process holds the database. `--dry-run` is never blocked; `--force` runs anyway and should be used only when the listed processes are idle.
- If every process is stopped, doctor lists no holder, and Hermes still refuses, the file may be damaged: `--inspect-only` never modifies the file; follow the command it prints or restore the newest snapshot from `state-snapshots/`.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/session-storage-recovery (pinned to v0.22.2)

## Related

- [sessions.md](./sessions.md)
- [docker.md](./docker.md)
