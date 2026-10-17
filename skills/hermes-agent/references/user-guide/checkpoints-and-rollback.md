# Checkpoints and /rollback

Hermes can snapshot your project before destructive operations (file tools and destructive terminal commands) into a shared shadow git store and restore it with `/rollback`. Checkpoints are opt-in as of v2.

## Signature / Usage

```bash
hermes chat --checkpoints
```

```yaml
checkpoints:
  enabled: true
```

In-session commands:

| Command | Description |
|---------|-------------|
| `/rollback` | List all checkpoints with change stats |
| `/rollback <N>` | Restore to checkpoint N, keeping your hand-edits (also undoes last chat turn) |
| `/rollback <N> --all` | Full restore, overwrites your hand-edits too |
| `/rollback diff <N>` | Preview diff between checkpoint N and current state |
| `/rollback <N> <file>` | Restore a single file from checkpoint N |

Store management from the shell:

| Command | Description |
|---------|-------------|
| `hermes checkpoints` / `status` / `list` | Show total size, project count, per-project breakdown |
| `hermes checkpoints prune` | Force a sweep: delete orphans/stale, GC, enforce size cap |
| `hermes checkpoints clear` | Delete the entire checkpoint base (asks first) |
| `hermes checkpoints clear-legacy` | Delete only the `legacy-*` archives from v1 migration |

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `checkpoints.enabled` | bool | `false` | Master switch (opt-in) |
| `checkpoints.max_snapshots` | int | `20` | Max checkpoints per project |
| `checkpoints.max_total_size_mb` | int | `500` | Hard cap on total store size; oldest commits dropped |
| `checkpoints.max_file_size_mb` | int | `10` | Skip any single file larger than this |
| `checkpoints.auto_prune` | bool | `true` | Background sweep deleting projects whose `last_touch` is older than `retention_days` |
| `checkpoints.retention_days` | int | `7` | Retention for auto-prune |
| `checkpoints.min_interval_hours` | int | `24` | Minimum interval between auto-prune runs (`.last_prune` marker) |

```yaml
checkpoints:
  enabled: false
  max_snapshots: 20
  max_total_size_mb: 500
  max_file_size_mb: 10
  auto_prune: true
  retention_days: 7
  min_interval_hours: 24
```

## Notes

- Triggers: `write_file`, `patch`, and destructive terminal commands (`rm`, `rmdir`, `cp`, `install`, `mv`, `sed -i`, `truncate`, `dd`, `shred`, output redirects, `git reset`/`clean`/`checkout`). At most one checkpoint per directory per turn.
- Storage: one shared bare git repo at `~/.hermes/checkpoints/store/` (per-project refs `refs/hermes/<project-hash>`, indexes, `projects/<hash>.json`); the real project `.git` is never touched. v1 per-project shadow repos are moved to `legacy-<timestamp>/` on first v2 run.
- `/rollback <N>` verifies the commit, takes a pre-rollback snapshot, restores only files Hermes itself wrote (agent-write ledger; changed-since files are skipped and listed), and undoes the last conversation turn. An empty ledger falls back to full restore.
- Nested git repositories are stored as gitlinks and not captured; a rollback whose checkpoint contains gitlinks is refused before changing files.
- Container terminal backends (`docker`, `singularity`, `modal`, `daytona`, `vercel_sandbox`, container plugins): no checkpoints are taken and diff/restore are refused (list still works). Local and SSH backends are unaffected.
- Guards: git missing from `PATH` disables checkpoints; root `/` and `$HOME` skipped; directories over 50,000 files skipped; no-change snapshots skipped; snapshot failures never block tools.
- `.checkpoints.lock` coordinates processes; do not remove it while Hermes runs.

## Related

- [git-worktrees.md](./git-worktrees.md)
