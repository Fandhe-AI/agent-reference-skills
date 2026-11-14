# Import scanner findings into Daybreak

Import findings into Daybreak Defense Factory by connecting a scanner (Wiz, Snyk Open Source, Endor Labs) or uploading a report; Daybreak assesses them against your code and can share eligible results with your team.

## Signature / Usage

Open **Settings → Integrations** (or **Import** from **Findings**). CLI import of a saved export (the official page describes these flags in prose only, without a code block).

Adapted (not in the official docs): the flags named in the prose are assembled into two complete commands.

```text
codex-security publish findings --to local --dry-run
codex-security publish findings --to cloud --dry-run --format json
```

Inspect the preview before removing `--dry-run` and confirming. A cloud preview contacts Daybreak and needs a file-backed ChatGPT login. A `privateImport` entry saves to your private inbox; entries in `requests` publish to the listed repository environments.

## Options / Props

| Scanner | Connection | Per-read limit |
| --- | --- | --- |
| Wiz | Sign in and approve. Select package vulnerabilities in a project, or a saved view filtered to one container repository and images. | 5,000 occurrences per filtered project or view, up to 100 pages of 50, within 32 MiB. |
| Snyk Open Source | Snyk US-01 API token with REST read access to organization, projects, issues. | 10,000 package issues per project, up to 100 pages of 100; original pages plus converted report within 8 MiB. |
| Endor Labs | US namespace, API key and secret (expiring read-only key scoped to the namespace, child namespaces disabled). | 5,000 findings per project preview, pages up to 100, 32 MiB read budget. |

| Upload | File |
| --- | --- |
| Wiz | Complete package vulnerability report in Detailed JSON, or one native finding per line (JSON Lines). In Wiz **Vulnerability Findings**: **Save as → Report**, choose **Repository Branch**, **JSON**, **Detailed**; enter the exporting tenant ID. |
| Snyk Open Source | Issues Detail CSV from one organization. |
| Endor Labs | Native Finding JSON from `endorctl` for the namespace, with original finding UUIDs and any pagination completed. |

Choices when saving an upload: **Save without assessment** / **Save privately**; **Import and assess privately**; or **Also publish Reportable findings** (starts unchecked) then **Import and publish reportable findings**.

## Notes

- Assessment needs scanner evidence and the repository commit; sharing also needs an environment where you can publish findings. The finding count includes findings that can't be assessed. Confirming a shared destination authorizes assessment and publication of eligible **Reportable** results there; people with destination access can read the assessment and source evidence. A confirmation can authorize up to 100 destination environments.
- Commits: Daybreak uses the scanner's reported revision when verifiable; Snyk without a commit can offer a fallback; for Wiz findings needing a checkout enter the full 40-character SHA. Per review: up to 10,000 scanner occurrences / 10,000 rows with verified targets (list plus revisions within 512 KiB); 16 or 100 Wiz findings assigned a checkout depending on picker. Captured report and evidence total at most 32 MiB.
- Upload limits: file and expanded contents each 32 MiB (also for gzip); Snyk CSV and Wiz JSON Lines up to 10,000 data rows; a single JSON finding over 1 MiB can be rejected; Snyk CSV header within 32,768 chars, field 131,072, logical row 1,048,576.
- Automatic sharing needs a Reportable assessment, a scanner-reported severity, and an authorized destination; the original report stays private. **Stop automatic sharing** in **Activity** halts future publication.
- Reopen imports via **My recent imports** or from a row in **Scans**; **Assess** a private finding (outcomes **Reportable**, **Deferred**, **Suppressed**, **Not applicable**) and **Publish to shared findings** to share. Disconnecting a scanner stops new reads but saved imports remain.
- Repeat imports: unchanged IDs and evidence from the same Endor/Wiz connection and project can reuse the private observation; a new connected Snyk import captures new observations; identical Snyk CSV uploads reuse accepted rows; duplicate scanner IDs within one report are flagged. Published matches in the same repository and environment merge evidence under **Observations**.
- Source: https://learn.chatgpt.com/docs/security/scanner-imports (retrieved 2026-11-14).

- Adapted from the official docs: the two preview commands are assembled from the page's prose; the page shows no code block.

## Related

- [Review findings and fixes in Daybreak](./daybreak-findings-and-fixes.md)
- [Set up Daybreak Defense Factory](./daybreak-setup.md)
- [Codex Security CLI reference](./cli-reference.md)
- [Triage a backlog](./triage-backlog.md)
