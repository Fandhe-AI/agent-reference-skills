# security

Codex Security (vulnerability-scanning product family: desktop-app plugin, CLI/SDK `@openai/codex-security`, and Codex Security cloud). This is distinct from Codex's built-in approvals / sandbox / network controls, which are covered in the `security-automation` category.

| Name | Description | Path |
|------|-------------|------|
| Codex Security | Product overview across desktop app, CLI/SDK, and cloud | [overview.md](./overview.md) |
| Codex Security cloud setup | Five-step cloud onboarding: access, environment, scan, threat model, findings | [cloud-setup.md](./cloud-setup.md) |
| Codex Security cloud FAQ | What Codex Security cloud is, the analysis pipeline, validation | [cloud-faq.md](./cloud-faq.md) |
| Improving the threat model | Editing the repo-specific `project overview` that tunes scan context | [threat-model.md](./threat-model.md) |
| Codex Security plugin quickstart | Install the plugin, run a first read-only scan (desktop app / CLI) | [plugin-quickstart.md](./plugin-quickstart.md) |
| Use the Codex Security workbench | Scans / Findings / Repositories views in the desktop app | [workbench.md](./workbench.md) |
| Run a Codex Security scan | Standard scan of a repository or scoped folder | [scans.md](./scans.md) |
| Run a deep security scan | Slower, more thorough repository/folder review | [deep-scans.md](./deep-scans.md) |
| Review code changes for security | Diff-scoped review of PRs, commits, or local changes | [code-changes.md](./code-changes.md) |
| Triage a backlog | Read-only static triage of existing findings against the repo | [triage-backlog.md](./triage-backlog.md) |
| Fix and verify security findings | Turn an accepted finding into a verified patch | [fix-findings.md](./fix-findings.md) |
| Export and track security findings | JSON/CSV/SARIF export and Linear/GitHub/Jira/advisory tracking | [export-findings.md](./export-findings.md) |
| Write vulnerability reports | Self-contained per-vulnerability Markdown reports | [vulnerability-reports.md](./vulnerability-reports.md) |
| Propose security hardening | Evidence-backed structural/architectural hardening options | [security-hardening.md](./security-hardening.md) |
| Codex Security plugin changelog | Plugin version history and notable changes | [plugin-changelog.md](./plugin-changelog.md) |
| Codex Security CLI quickstart | Install, sign in, run a first terminal scan | [cli-quickstart.md](./cli-quickstart.md) |
| Codex Security CLI reference | Full command, flag, artifact, and exit-code reference | [cli-reference.md](./cli-reference.md) |
| Codex Security CLI FAQ | Common questions about scans, findings, coverage, cost | [cli-faq.md](./cli-faq.md) |
| Run bulk security scans | GitHub discovery or CSV-driven resumable campaigns | [cli-bulk-scans.md](./cli-bulk-scans.md) |
| Run Codex Security in CI | GitHub Actions workflow, SARIF upload, severity policy | [cli-ci.md](./cli-ci.md) |
| Codex Security TypeScript SDK | Programmatic scans, targets, results, and error handling | [sdk.md](./sdk.md) |
