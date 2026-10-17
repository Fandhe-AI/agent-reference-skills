# State DB Recovery

How Hermes recovers `state.db` when the FTS index or the file itself is corrupt. `sessions` and `messages` are the canonical transcript; `messages_fts*` tables and their sync triggers are derived search indexes.

## Signature / Usage

Explicit repair (stop every process that can open the profile database first):

```bash
hermes gateway stop
HERMES_HOME="$HOME/.hermes" hermes sessions repair --check-only
HERMES_HOME="$HOME/.hermes" hermes sessions repair
```

Verify after repair:

```bash
HERMES_HOME="$HOME/.hermes" hermes sessions repair --check-only
sqlite3 "$HOME/.hermes/state.db" \
  "SELECT key, value FROM state_meta WHERE key = 'fts_stale';"
sqlite3 "$HOME/.hermes/state.db" \
  "SELECT type, name FROM sqlite_master WHERE name IN
   ('messages_fts_insert','messages_fts_update','messages_fts_delete')
   ORDER BY name;"
sqlite3 "$HOME/.hermes/state.db" \
  "SELECT 'sessions', COUNT(*) FROM sessions
   UNION ALL SELECT 'messages', COUNT(*) FROM messages;"
```

The marker query should return no row, expected FTS triggers should be present, and canonical row counts must not decrease.

## Notes

- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/state-db-recovery (pinned to v0.22.2)
- Live FTS corruption: `SessionDB` records the durable `fts_stale` marker, removes FTS sync triggers in the same transaction, retries canonical writes without derived-index sinks, and serves searches via a `LIKE` fallback. The failing live operation never runs `FTS5('rebuild')`; a later `SessionDB` open may rebuild under the cross-process admission lock. If the guarded rebuild cannot run, `hermes doctor` reports the explicit repair command.
- Live file corruption (bare `SQLITE_CORRUPT` / `SQLITE_NOTADB` with no FTS provenance): the handle is quarantined (`StateDbCorruptError`): the failing write propagates, later writes fail immediately, the handle never reopens after `close()`, and `close()` skips its explicit WAL checkpoint. On Python 3.12+ SQLite's last-connection checkpoint is also disabled (`SQLITE_DBCONFIG_NO_CKPT_ON_CLOSE`); on 3.11 copy `state.db`, `state.db-wal` and `state.db-shm` together before restarting anything.
- Gateway and agent flush paths send pending transcripts to `sessions/<id>.jsonl` and the gateway `pending_messages/` spool instead of the retry queue. The quarantine is per process. Do not run `hermes doctor --fix` while the gateway is up.
- Recovery from a corrupt file:

```bash
hermes gateway stop
HERMES_HOME="$HOME/.hermes" hermes sessions recover --source "$HOME/.hermes/state.db" --inspect-only
# if recoverable:
HERMES_HOME="$HOME/.hermes" hermes sessions recover --source "$HOME/.hermes/state.db" --output "$HOME/recovered-state.db"
```

  or restore the newest snapshot from `state-snapshots/`.
- `sessions repair` creates a SQLite backup by default and uses a guarded snapshot-and-promotion path. Do not copy `state.db`, `state.db-wal` and `state.db-shm` independently with `cp`; they are one live SQLite image.
- If repair fails, preserve both the live database and the reported backup; never delete canonical rows to make a derived-index error disappear.

## Related

- [Session Storage](./session-storage.md)
- [Gateway Session Lifecycle](./gateway-session-lifecycle.md)
