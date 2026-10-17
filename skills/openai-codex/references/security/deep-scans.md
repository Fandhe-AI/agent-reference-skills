# Run a deep security scan

A deep scan runs multiple independent standard scans over the same repository or folder and combines their findings. Use it when you want repeated review and can allow for the additional runtime and token use. Start with a standard scan to check that the scope and security context match your goal; repeated review can find issues missed by an earlier pass but doesn't guarantee complete detection or identical results between runs.

## Signature / Usage

Conversation prompt (repository-wide):

```text
Use $codex-security:deep-security-scan to run a deep security scan of this repository.
```

Scoped to a folder in a monorepo (replace "this repository" with the path to its folder):

```text
Use $codex-security:deep-security-scan to run a deep security scan of /absolute/path/to/repository/services/payments.
```

Desktop app: open **Security** > **Scans** and select **+ Scan**, choose a repository or folder, select **Codebase**, turn on **Deep scan** (the scan reviews the entire selected repository or folder), choose the model and reasoning effort, optionally add threat-model or deployment context under **Additional context**, then select **Start scan**.

## Standard vs deep scan

| | Standard scan | Deep scan |
|---|---|---|
| Review | One standard scan | Multiple standard scans with combined findings |
| Use it for | A first scan or a review of a defined scope | Additional independent reviews of that scope |
| Scope | Repository or folder | Repository or folder |
| Changes (PRs/diffs) | Use the change-review workflow | Not supported (deep scans don't accept diff targets) |

## Options / Props

Configure deep-scan runtime in `~/.codex/codex-security/config.toml` (or `$CODEX_HOME/codex-security/config.toml`) under `[deep_scan]`; configuration changes apply to new deep scans only:

| Name | Default | Description |
|------|---------|-------------|
| `workers` | `4` | Independent standard-scan workers allowed to run at the same time (legacy `"auto"` also resolves to `4`) |
| `subagents` | `3` | Subagents each worker may start; `0` disables them |
| `stop_after_no_new` | `4` | Stop after this many consecutive completed worker scans produce no new findings |
| `stop_after_consecutive_errors` | `3` | Stop after this many consecutive worker errors |
| `max_discovery_runs` | `40` | Limit on independent standard-scan runs before aggregation |
| `max_time_hours` | `96` | Limit worker execution to a positive number of hours up to `96`; fractions allowed (requires plugin version `0.1.19` or later) |

```toml
[deep_scan]
workers = 2
subagents = 0
stop_after_no_new = 3
max_discovery_runs = 10
max_time_hours = 1.5
```

## Notes

- For the best scan quality use `gpt-5.6-sol` with `xhigh` reasoning effort (as stated on the current official page).
- Deep scan workers inherit your selected model and reasoning settings; each worker runs a complete standard scan and Codex Security aggregates the completed results. Follow the saved scan from **Scans**, or select **View activity** to inspect its Codex task.
- When the time limit expires, unfinished workers stop, completed scan results are kept and aggregated into the final report; if no worker finishes source review before the deadline, the report records partial coverage.
- Lower values can reduce scan time and token use but may miss findings.
- Review the result: deep scans use the same saved scan details and complete scan directory as standard scans (open in **Scans** or review in **Findings**); `report.md` links to detailed vulnerability reports or structural hardening guidance when requested (keep any linked `findings/` and `hardening/` directories with the report). Review the coverage summary before the findings: check deferred surfaces and remaining proof gaps. For a finding you accept continue with fix-findings.md; to review a PR, commit, branch range, or local patch use code-changes.md.
- Earlier revisions of this page listed older defaults (`workers = "auto"`, `stop_after_no_new = 6`, `max_discovery_runs = 60`) and said deep scans require delegated workers with a capability check; the current official page documents the defaults above.

## Related

- [Run a Codex Security scan](./scans.md)
- [Review code changes for security](./code-changes.md)
- [Fix and verify security findings](./fix-findings.md)
- [Codex Security plugin changelog](./plugin-changelog.md)
