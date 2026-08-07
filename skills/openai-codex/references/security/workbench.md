# Use the Codex Security workbench

The Security workbench brings scans, findings, and repositories together in the Codex desktop app. Codex performs scan analysis in a regular task, while the workbench keeps results available on return.

## Signature / Usage

Install and enable the [Codex Security plugin](./plugin-quickstart.md), then select **Security** in the desktop-app sidebar.

Start a scan: **Scans** → **+ Scan** → select repository/folder → choose **Codebase** (full or deep scan) or **Changes** (Git-backed diff review; deep scan unavailable) → choose model/reasoning effort → optionally add **Additional context** → **Start scan**.

For best scan quality, use `gpt-5.6-sol` with `xhigh` reasoning effort.

## Views

| View | Purpose |
|------|---------|
| Scans | Start scans, follow progress (`View activity` opens the underlying Codex task), review saved results |
| Findings | Inspect issues and evidence across completed scans; `Summary` and `Patch` tabs |
| Repositories | Browse repositories/folders, scan history, latest revision, open findings |

## Notes

- The **Findings** tab shows findings from saved Codex Security scans only; imported tickets belong to the separate [backlog triage workflow](./triage-backlog.md)
- Scans can also be started from a regular Codex conversation; they still appear in **Scans**

## Related

- [Codex Security plugin quickstart](./plugin-quickstart.md)
- [Run a Codex Security scan](./scans.md)
- [Run a deep security scan](./deep-scans.md)
- [Fix and verify security findings](./fix-findings.md)
