# Curator

Background maintenance pass for agent-created skills. It tracks usage, moves long-unused skills through `active -> stale -> archived`, and can run an LLM consolidation review. It never auto-deletes; archival into `~/.hermes/skills/.archive/` is recoverable.

## Signature / Usage

```bash
hermes curator status         # last run, counts, pinned list, LRU top 5
hermes curator run            # prune-only unless curator.consolidate: true
hermes curator run --consolidate
hermes curator run --background
hermes curator run --dry-run  # preview only
hermes curator backup [--reason "before-refactor"]
hermes curator rollback [--list | --id <ts> | -y | <entry-id>]
hermes curator pause | resume
hermes curator pin <skill> | unpin <skill>
hermes curator adopt <skill> | adopt --all-unmanaged [--dry-run | --yes]
hermes curator list-unmanaged
hermes curator restore <skill> | list-archived | archive <skill>
hermes curator prune [--days N]
hermes curator ledger [--skill <name> --limit 50]
hermes curator purge [--days N] [--dry-run]
```

The same subcommands are available as `/curator` inside a running session.

## Options / Props

```yaml
curator:
  enabled: true
  interval_hours: 168          # 7 days
  min_idle_hours: 2
  stale_after_days: 14
  archive_after_days: 30
  consolidate: false           # LLM umbrella-building pass, opt-in
  prune_builtins: false        # also archive unused bundled built-ins (hub skills always exempt)
  archive_ttl_days: 0          # 0 = never purge
  backup:
    enabled: true
    keep: 2
auxiliary:
  curator:
    provider: openrouter
    model: google/gemini-3-flash-preview
    timeout: 600
skills:
  ledger: true
  ledger_max_bytes: 5242880    # 0 = never auto-maintain
```

## Notes

- Triggered by an inactivity check (CLI start, gateway housekeeping, Desktop / `hermes serve` hourly timer), not cron. The first observation seeds `last_run_at` and defers the first real pass by one `interval_hours`.
- Phase 1 (deterministic): unused for `stale_after_days` becomes `stale`; unused for `archive_after_days` is archived. Pinned skills and skills referenced by any cron job (even paused) are skipped; never-used skills are not archived before they are `stale_after_days` old.
- Phase 2 (LLM consolidation, off by default): the forked agent keeps, patches, merges into umbrella skills, or archives (via `skill_manage action=delete` with `absorbed_into`). Treats skills as full packages including `references/`, `templates/`, `scripts/`, `assets/`.
- Only skills marked `created_by: "agent"` or `agent_created: true` in `~/.hermes/skills/.usage.json` are managed (set only by the background review fork). Foreground-created skills (`created_by: learn`) and hand-written skills are unmanaged until `hermes curator adopt`. Adoption does not reset the inactivity clock and refuses bundled, hub-installed, external, and protected built-in skills.
- Pinning blocks curator transitions and `skill_manage(action="delete")`; patches and edits still work. Only agent-created skills can be pinned.
- Whole-run snapshots are tar.gz at `~/.hermes/skills/.curator_backups/<utc-iso>/skills.tar.gz`, taken before consolidation passes; rollback itself first snapshots as `pre-rollback to <target-id>`.
- Audit ledger `~/.hermes/skills/.curator_ledger.jsonl` records actor (`curator` / `agent` / `user`), action, evidence and before/after sha256 manifests; blobs under `~/.hermes/.curator_backups/blobs/`. Single-entry rollback fails closed.
- Usage telemetry in `.usage.json` (`use_count`, `view_count`, `patch_count`, timestamps, `state`, `pinned`, `archived_at`); bundled and hub skills are excluded.
- Per-run reports: `~/.hermes/logs/curator/<timestamp>/run.json` and `REPORT.md`. With no candidates the report shows `Model: (not resolved)`, which is not an error.
- Legacy `curator.auxiliary.{provider,model}` still works but is deprecated in favor of `auxiliary.curator`.

## Related

- [Skills](./skills.md)
- [Memory](./memory.md)
