# Run Codex with an NFS home directory

When Linux hosts share a Codex home (`~/.codex` by default) over NFS, they can corrupt a SQLite database opened in WAL mode at the same time. Migrate the shared home for interactive work; keep each host's Codex home or SQLite directory on local disk for independent batch jobs.

## Signature / Usage

```sh
codex migrate-nfs-db
```

Steps for an existing NFS home:

1. Check the shared home: run `codex --version` on every host (including any SSH backend) with a build that includes `codex migrate-nfs-db` (Codex CLI 0.166.0 is cited). All hosts must use the same SQLite directory, and a file lock held on one host must block a conflicting lock on the other (ask the storage administrator; otherwise keep SQLite local). Do not set or change the SQLite home or log directory during migration.
2. Stop Codex on every host: end turns, close app and CLI, stop remote app servers, background daemons, and scheduled jobs. Stop the daemon with `codex app-server daemon stop`; avoid restarts by disabling auto start.
3. Run `codex migrate-nfs-db` on just one Linux host per shared Codex home, as the home owner.
4. Resume a conversation from another host as the same user (for example `codex --no-daemon resume`) and confirm the last turn is there.

```toml
[features]
daemon_auto_start = false
```

### Move diagnostic logs to local disk (optional)

```toml
log_dir = "/var/local/codex/alice/logs"
```

### Enforce the journal mode across a fleet

Stop all clients first. In `/etc/codex/requirements.toml`:

```toml
unsafe_enforce_sqlite_journal_mode = true
```

### Independent batch jobs

```sh
CODEX_HOME="/mnt/nfs/codex/jobs/job-1234" \
CODEX_SQLITE_HOME="/var/local/codex/jobs/job-1234" \
  codex exec "Summarize this repository's build steps."
```

## Options / Props

| Name | Where | Description |
| --- | --- | --- |
| `daemon_auto_start` | `[features]` in `config.toml` | Set `false` so the CLI does not start the background daemon again. |
| `--no-daemon` | CLI flag | Skip the daemon for one session; also bypasses an already running daemon. |
| `log_dir` | user `config.toml` | Absolute path for new diagnostic logs; older logs stay in place. |
| `unsafe_enforce_sqlite_journal_mode` | `/etc/codex/requirements.toml` | Migrates existing WAL databases automatically when users open Codex on NFS; applies to every user on the host. |
| `--staging-dir` | `codex migrate-nfs-db` | Host-local directory with enough space, as an absolute path, when local staging space is insufficient. |
| `CODEX_HOME` / `CODEX_SQLITE_HOME` | environment | Per-job durable Codex home (rollouts under `$CODEX_HOME/sessions/`) and host-local SQLite directory. A managed or configured `sqlite_home` takes precedence over `CODEX_SQLITE_HOME`. |

## Notes

- The Codex app and terminal UI use a SQLite index (also storing goals and memory-processing state). Codex normally uses WAL mode on local disk, which processes on different hosts cannot share. On Linux NFS, Codex creates new databases in rollback-journal mode (`DELETE`, file locks). Migrate existing WAL databases before opening them from another host.
- Conversation events in `rollout-*.jsonl` files can already live on NFS (one writer per rollout); migration leaves them in place.
- A concurrent writer during migration can corrupt the database and lose goal or memory changes; session rollouts cannot restore all database state.
- If the command reports `Skipped logs database`, a logs database on local disk needs no action; if on NFS, confirm `DELETE` journal mode or move it to local disk. A managed `sqlite_home` keeps the logs database in the required directory even when `log_dir` is set.
- Output per database: `Migrated database:` and `WAL backup:`, or `Already in DELETE mode:`. `No databases found.` means check the effective SQLite directory for the home owner. Verify group permissions / extended access rules after migration.
- Error `cannot open source database exclusively` means the lock could not be taken (another client can cause it on local disk too). On Linux, `findmnt -T "$DB_PATH"` reporting `nfs` or `nfs4` points to NFS locking.
- Recovery after a failed migration: keep other clients stopped, save the error, database path, and backup path (originals plus sidecar files together; backups end with `_wal_migration_backup`), rerun on the same host after fixing lock or space errors, and work from copies for integrity errors. SQLite-only state such as goals needs an intact database. The page also shows a read-only recovery session using a temporary local `CODEX_HOME` / `CODEX_SQLITE_HOME` with `codex --no-daemon --sandbox read-only`.
- Batch jobs: `codex exec --ephemeral` skips saving a resumable session (use `-o` for the final response or `--json` for events).
- Source: https://learn.chatgpt.com/docs/environments/network-file-systems (retrieved 2026-11-14).

## Related

- [Cloud environment](./cloud-environment.md)
- [Local environment](./local-environment.md)
