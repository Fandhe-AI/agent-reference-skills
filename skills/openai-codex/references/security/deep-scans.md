# Run a deep security scan

Run a deep scan when a more thorough review is needed and a longer runtime is acceptable. Deep scans search a repository more extensively and can reduce variability between runs.

## Signature / Usage

Conversation prompt (repository-wide):

```text
Use $codex-security:deep-security-scan to run a deep security scan of this repository.
```

Scoped to a folder in a monorepo:

```text
Use $codex-security:deep-security-scan to run a deep security scan of /absolute/path/to/repository/services/payments.
```

Desktop app: **Security** → **Scans** → **+ Scan** → choose repository/folder → **Codebase** → turn on **Deep scan**.

## Standard vs deep scan

| | Standard scan | Deep scan |
|---|---|---|
| Best for | First runs, routine review | More thorough review after a standard scan |
| Variability | Standard | Reduced |
| Runtime/resources | Lower | Higher |
| Pull requests/diffs | Use change-review workflow | Not supported; use change-review workflow instead |

## Options / Props

Configured via `~/.codex/codex-security/config.toml` (or `$CODEX_HOME/codex-security/config.toml`) under `[deep_scan]`:

| Name | Default | Description |
|------|---------|-------------|
| `workers` | `auto` | Concurrent discovery workers; positive integer or `"auto"` |
| `subagents` | `3` | Subagents each discovery worker may start; `0` disables them |
| `stop_after_no_new` | `6` | Stop discovery after this many consecutive runs with no new candidates |
| `max_discovery_runs` | `60` | Limit on discovery runs before moving to validation |

```toml
[deep_scan]
workers = 2
subagents = 0
stop_after_no_new = 3
max_discovery_runs = 10
```

## Notes

- Deep scans require delegated workers; if the runtime doesn't meet capability requirements, use a standard scan or retry later
- Lower config values reduce scan time/token use but may miss findings; config changes apply only to new deep scans
- For best scan quality, use `gpt-5.6-sol` with `xhigh` reasoning effort

## Related

- [Run a Codex Security scan](./scans.md)
- [Review code changes for security](./code-changes.md)
- [Fix and verify security findings](./fix-findings.md)
