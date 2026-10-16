# Export and track security findings

Use a completed Codex Security scan for two handoffs: **Export** creates a portable JSON, CSV, or SARIF file; **Track findings** prepares selected findings as Linear/GitHub/Jira issues or a private draft GitHub Security Advisory (with duplicate check and approval gate). Neither changes the sealed scan bundle.

## Signature / Usage

Export prompt:

```text
Export the findings from [completed scan directory] as [JSON, CSV, or SARIF]. Do not modify the sealed scan bundle or upload its contents.
```

Track findings (Linear):

```text
Use $codex-security:track-findings to prepare finding [finding ID] from [completed scan directory] for the Linear team [team] and project [project, if any]. Check for duplicates and show me the exact issue title, body, metadata, and destination. Do not create or update anything until I approve that payload.
```

Track findings (private draft GitHub Security Advisory):

```text
Use $codex-security:track-findings to prepare finding [finding ID] from [completed scan directory] as a private draft GitHub Security Advisory in [owner/repository]. Verify the sealed source revision, repository, affected paths, package metadata, and duplicate state. Show me the exact advisory payload, authenticated GitHub CLI identity, and disclosure warnings. Do not create anything until I approve that payload.
```

## Options / Props

| Format | Use it for |
|--------|-------------|
| JSON | Preserve sealed structured findings for tools/scripts |
| CSV | Review findings and local triage state in a spreadsheet |
| SARIF | Send findings to tools supporting the SARIF interchange format |

## Additional details

- Export: in the desktop app open a completed scan from **Security** > **Scans** and use its artifact links to inspect `report.md`, `findings.json`, `scan-manifest.json`, `coverage.json`, or a SARIF report when present; **Markdown report** opens `report.md` in your configured external editor. If another tool needs the complete scan context keep the original `scan-manifest.json`, `findings.json`, and `coverage.json` together. Available artifact links and export formats depend on your Codex surface and installed plugin version (check plugin-changelog.md before using a format in automation).
- GitHub issue prompt: `Use $codex-security:track-findings to prepare finding [finding ID] from [completed scan directory] for GitHub repository [owner/repository]. Check open and closed issues for duplicates and show me the exact issue title, body, metadata, repository visibility, and authenticated transport. Do not create or update anything until I approve that payload.`
- Jira prompt: `Use $codex-security:track-findings to prepare finding [finding ID] from [completed scan directory] for Jira project [project key] as [issue type]. Check for duplicates and show me the exact issue summary, description, metadata, and destination. Do not create or update anything until I approve that payload.`
- Draft advisories don't batch, update, publish, or close advisories; use a private issue destination when the source doesn't meet the requirements. Sensitive findings should go to a private destination; creating an issue in an internal or public GitHub repository requires an explicit visibility warning and approval of the complete content; treat a draft advisory description as eventually public and remove credentials, private evidence, and unnecessary exploit details. Approval happens in the Codex conversation (no separate screen in the Security workbench).
- Review the proposed write: confirm the finding ID and fingerprint came from the intended sealed scan; the provider, exact destination, and live visibility; the duplicate outcome (`create`, `reuse`, `update`, `blocked`); the complete title, body, source locations, and metadata (remove exploit detail the destination shouldn't expose); approve only that exact payload (a changed destination, visibility, finding set, or body needs a new preview).
- Verify the tracked item: after approval Codex rechecks the sealed source, destination, access, and duplicate state; for a batch it processes findings one at a time and stops at the first uncertain result; creation, update, or reuse is complete only after Codex reads the exact issue back and verifies its binding identifiers and content. Keep the returned canonical URL with your triage record and continue with fix-findings.md when the owner accepts the item for remediation.

## Notes

- `$codex-security:track-findings` accepts one validated finding or an explicitly selected batch of up to 25 from the same sealed scan; one provider/destination per run; a private draft GitHub Security Advisory accepts only one finding
- Draft advisories require: a finding from a sealed `git_revision` scan, verified public canonical source repository, and administrator access
- Jira tracking requires the Atlassian Rovo plugin; reusing an issue needs read access, creating/updating needs read+write
- Review the proposed write before approval: finding ID/fingerprint, exact destination and visibility, duplicate outcome (`create`/`reuse`/`update`/`blocked`), and complete title/body/metadata
- After approval, Codex rechecks source/destination/access/duplicate state and verifies by reading the created item back
- Exporting does not upload findings to a code-scanning service

## Related

- [Fix and verify security findings](./fix-findings.md)
- [Run a Codex Security scan](./scans.md)
