# Codex Security cloud setup

Walks through the five-step process from initial access to reviewed findings and remediation pull requests in Codex Security cloud.

## Signature / Usage

Prerequisite: Codex cloud must already be set up.

1. **Access and environment** — confirm workspace access to Codex Security cloud and that the target repository is available in Codex cloud. Check/create an environment at `https://chatgpt.com/codex/settings/environments`.
2. **New security scan** — go to `https://chatgpt.com/codex/security/scans/new`, select GitHub organization, repository, branch, environment, and a **history window** (longer windows = more context but longer backfill).
3. **Initial scans can take a while** — Codex Security runs a commit-level security pass across the selected history window first; initial backfill can take a few hours for larger repositories or longer windows.
4. **Review scans and improve the threat model** — after the initial scan finishes, open the scan and review/update the generated threat model to match architecture, trust boundaries, and business context (see [Improving the threat model](./threat-model.md)).
5. **Review findings and patch** — use **Recommended Findings** (top-10 evolving list) or **All Findings** (sortable/filterable table); create a PR directly from a finding detail page.

## Notes

- Codex Security scans repositories from newest commits backward first
- Finding detail pages include description, metadata, contextual reasoning, code excerpts, call-path/data-flow context, and validation steps/output

## Related

- [Codex Security](./overview.md)
- [Codex Security cloud FAQ](./cloud-faq.md)
- [Improving the threat model](./threat-model.md)
