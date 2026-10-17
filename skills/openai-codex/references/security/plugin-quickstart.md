# Codex Security plugin quickstart

Install the Codex Security plugin, run your first read-only scan, and review the result in Codex (desktop app or CLI).

## Signature / Usage

Install (desktop app): open **Plugins**, search for **Codex Security**, install, then open **Security** in the sidebar.

Install (CLI):

```bash
codex
```

Then `/plugins` → search **Codex Security** → **Install plugin** → `/new` to start a new chat for the repository.

Run a scan (CLI conversation prompt):

```text
Run a Codex Security scan on this repository.
```

For best scan quality, use `gpt-5.6-sol` with `xhigh` reasoning effort.

## What the scan creates

- `report.md` — primary readable entry point
- `findings/<slug>/` — detailed vulnerability reports and PoC files, when available
- `hardening/` — structural hardening guidance, when available
- `scan-manifest.json`, `findings.json`, `coverage.json` — structured data for automation

## Run your first scan (desktop app) and interpret the result

- Desktop app: select **Security** > **Scans** > **+ Scan**; select an existing repository or another folder; choose **Codebase**, leave **Deep scan** off, and select the entire repository or one folder (confirm the branch and revision); choose the model and reasoning effort and open **Additional context** only to describe an attack vector, security-sensitive area, or repository detail; select **Start scan** and follow the scan phases in the workbench (**View activity** inspects the Codex task); open the completed scan to inspect findings, coverage, and report artifacts (**Findings** across scans, **Repositories** for scan history). If **Security** doesn't appear in the sidebar, confirm **Codex** is selected and the plugin is enabled, update the app and plugin, and check whether your workspace administrator allows the plugin.
- CLI: after the prompt, Codex runs the scan in the terminal without a setup workspace; keep the task running until Codex reports completion. If Codex identifies a configuration limitation, review it and the exact proposed change before approving a configuration update. Review the terminal summary, then open the generated `report.md`.
- Interpret the result: check the target and revision first, then which areas were reviewed and which deferred. A completed scan can still have coverage gaps and a review with no findings hasn't necessarily ruled out every vulnerability. For a finding read the source evidence, attacker prerequisites, validation (which can use source analysis without a reproducer), and remaining uncertainty.
- Choose your next workflow: configure scope and security context (scans.md), review a code change (code-changes.md), fix and verify a finding (fix-findings.md), or track it in an issue (export-findings.md). In the desktop app completed scans remain in **Scans**; in Codex CLI use the scan directory reported in the conversation, and keep it together when sharing or archiving so the report's links keep working.

## Notes

- This page covers the plugin in the desktop app / Codex CLI; for connected GitHub repositories in Codex cloud, see [Codex Security cloud setup](./cloud-setup.md)
- The hosted desktop-app catalog and public Codex CLI marketplace can offer different plugin versions — check the [plugin changelog](./plugin-changelog.md) before relying on a feature

## Related

- [Use the Codex Security workbench](./workbench.md)
- [Run a Codex Security scan](./scans.md)
- [Run a deep security scan](./deep-scans.md)
- [Review code changes for security](./code-changes.md)
