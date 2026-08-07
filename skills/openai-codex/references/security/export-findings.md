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
