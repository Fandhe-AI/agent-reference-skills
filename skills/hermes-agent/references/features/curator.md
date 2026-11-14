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
hermes curator lock <skill> | unlock <skill>   # the agent may not change a locked skill
hermes curator adopt <skill> | adopt --all-unmanaged [--dry-run | --yes]
hermes curator list-unmanaged
hermes curator restore <skill> | list-archived | archive <skill>
hermes curator prune [--days N]
hermes curator ledger [--skill <name> --limit 50]
hermes curator purge [--days N] [--dry-run]
```

The same subcommands are available as `/curator` inside a running session.

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

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `curator.enabled` | boolean | `true` | — |
| `curator.interval_hours` | number | `168` | 7 days |
| `curator.min_idle_hours` | number | `2` | — |
| `curator.stale_after_days` | number | `14` | — |
| `curator.archive_after_days` | number | `30` | — |
| `curator.consolidate` | boolean | `false` | LLM umbrella-building pass, opt-in |
| `curator.prune_builtins` | boolean | `false` | Also archive unused bundled built-ins (hub skills always exempt) |
| `curator.archive_ttl_days` | number | `0` | `0` = never purge |
| `curator.backup.enabled` | boolean | `true` | — |
| `curator.backup.keep` | number | `2` | — |
| `auxiliary.curator.provider` | string | `openrouter` | — |
| `auxiliary.curator.model` | string | `google/gemini-3-flash-preview` | — |
| `auxiliary.curator.timeout` | number | `600` | — |
| `skills.ledger` | boolean | `true` | — |
| `skills.ledger_max_bytes` | number | `5242880` | `0` = never auto-maintain |

## Notes

- Triggered by an inactivity check (CLI start, gateway housekeeping which also covers a local Desktop since it attaches to the gateway, `hermes serve` / `hermes dashboard` hourly timer for e.g. a remote Desktop connection), not cron. The first observation seeds `last_run_at` and defers the first real pass by one `interval_hours`.
- Phase 1 (deterministic): unused for `stale_after_days` becomes `stale`; unused for `archive_after_days` is archived. Pinned skills and skills referenced by any cron job (even paused) are skipped; never-used skills are not archived before they are `stale_after_days` old.
- Phase 2 (LLM consolidation, off by default): the forked agent keeps, patches, merges into umbrella skills, or archives (via `skill_manage action=delete` with `absorbed_into`). Treats skills as full packages including `references/`, `templates/`, `scripts/`, `assets/`.
- Only skills marked `created_by: "agent"` or `agent_created: true` in `~/.hermes/skills/.usage.json` are managed (set only by the background review fork). Foreground-created skills (`created_by: learn`) and hand-written skills are unmanaged until `hermes curator adopt`. Adoption does not reset the inactivity clock and refuses bundled, hub-installed, external, and protected built-in skills.
- Pinning blocks curator transitions and `skill_manage(action="delete")`; patches and edits still work. Only agent-created skills can be pinned. To protect a hand-authored skill from agent changes, lock it instead.
- Locking (`hermes curator lock <skill>` / `unlock`; Desktop: Capabilities -> Skills lock switch; `hermes curator status` lists locked skills) stops the agent from changing a skill at all while it stays readable, listed, auto-loadable and usable. It applies in normal turns, cron jobs, subagents, the background review and the curator pass, even under `--yolo`: `skill_manage` refuses `patch` / `edit` / `write_file` / `remove_file` / `delete` (single-op and batch); `write_file` and `patch` refuse any path inside the skill directory; `terminal` refuses commands that write there (redirections, `tee`, `cp` / `mv` / `rm` / `touch` / `mkdir` / `chmod`, `sed -i` / `perl -i`, `git` changes, archive extraction, inline `python -c` / `bash -c` naming it, including after a `cd`), while reading and running its scripts keep working. The curator never archives a locked skill, and the agent cannot unlock it (`terminal` refuses `hermes curator unlock`; `skills/.usage.json` is protected while any skill is locked). The flag is `"locked": true` in `~/.hermes/skills/.usage.json`, per profile (`hermes -p work curator lock <skill>`); any skill that resolves in the profile can be locked (hand-written, agent-created, bundled, hub-installed); `lock` refuses an unresolvable name.
- A lock is a policy check, not a sandbox: a script that writes into the skill through its own logic, or `execute_code`, is not inspected. A corrupt `.usage.json` makes background passes refuse (fail closed) while normal turns proceed; repair it or run `hermes curator unlock <skill>` to rewrite it. It does not stop `hermes update` / `hermes skills update` from refreshing an unmodified bundled or hub skill, and your own editor / the Desktop skill editor edits are never gated. Pin does not guard your own edits either.
- Whole-run snapshots are tar.gz at `~/.hermes/skills/.curator_backups/<utc-iso>/skills.tar.gz`, taken before consolidation passes; rollback itself first snapshots as `pre-rollback to <target-id>`.
- Audit ledger `~/.hermes/skills/.curator_ledger.jsonl` records actor (`curator` / `agent` / `user`), action, evidence and before/after sha256 manifests; blobs under `~/.hermes/.curator_backups/blobs/`. Single-entry rollback fails closed.
- Usage telemetry in `.usage.json` (`use_count`, `view_count`, `patch_count`, timestamps, `state`, `pinned`, `locked`, `archived_at`); bundled and hub skills are excluded.
- Per-run reports: `~/.hermes/logs/curator/<timestamp>/run.json` and `REPORT.md`. With no candidates the report shows `Model: (not resolved)`, which is not an error.
- Legacy `curator.auxiliary.{provider,model}` still works but is deprecated in favor of `auxiliary.curator`.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/curator (pinned to v0.23.1)

### Migration (v0.22 -> v0.23)

- v0.22.2 said pinned skills are off-limits to both the curator and the agent's `skill_manage`; v0.23.1 narrows this: `skill_manage` refuses only **delete** on a pinned skill (edits and patches still go through). Use `hermes curator lock` to block agent changes entirely.

## Related

- [Skills](./skills.md)
- [Memory](./memory.md)
