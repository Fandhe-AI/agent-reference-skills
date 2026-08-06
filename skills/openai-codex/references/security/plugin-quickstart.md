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

## Notes

- This page covers the plugin in the desktop app / Codex CLI; for connected GitHub repositories in Codex cloud, see [Codex Security cloud setup](./cloud-setup.md)
- The hosted desktop-app catalog and public Codex CLI marketplace can offer different plugin versions — check the [plugin changelog](./plugin-changelog.md) before relying on a feature

## Related

- [Use the Codex Security workbench](./workbench.md)
- [Run a Codex Security scan](./scans.md)
- [Run a deep security scan](./deep-scans.md)
- [Review code changes for security](./code-changes.md)
