---
source: https://docs.cloud.google.com/security-command-center/docs/how-to-security-marks-findings
---

# Annotate findings with security marks (Security Command Center)

Security marks are unique to Security Command Center and add business context (priority, access level, sensitivity classifications) to findings so you can search, select and filter them. Marks are visible in the Security Command Center API and the Google Cloud console. Applies to Standard-legacy, Standard, Premium, and Enterprise (Deprecated) tiers.

## Signature / Usage

### Selectively update one mark

Other security marks on the finding are untouched.

Adapted (not in the official docs): the help example wraps `testFinding` in backticks, which bash treats as command substitution, and its `--update-mask="marks.markKey1"` does not name the mark it sets (`key1`); the backticks are removed and the mask is `marks.key1`.

```bash
gcloud scc findings update-marks testFinding \
    --organization=123456 --source=5678 --security-marks="key1=v1" \
    --update-mask="marks.key1"
```

### Update all marks on a finding

Without `--update-mask`, all marks on the finding are overridden.

```bash
gcloud scc findings update-marks \
    projects/example-project/sources/5678/findings/testFinding \
    --security-marks="key1=v1,key2=v2"
```

### Filter findings by security mark

On the **Findings** page, add the `security_marks.marks` attribute to the query statement in the **Query editor**. For the mark key `stage` and the value `dev`, add this clause:

```text
AND security_marks.marks.stage="dev"
```

## Options / Props

| Item | Detail |
|---|---|
| Required role | Finding Security Marks Writer (`securitycenter.findingSecurityMarksWriter`) on your organization. Security Command Center roles can be granted at the organization, folder, or project level. |
| Query attribute | `security_marks.marks` |
| Example mark | key `incident-number`, value `1234` gives `mark.incident-number: 1234` |

## Notes

- As the source describes it (enforcement policies driven by marks are part of the deprecated Security Health Analytics use of security marks; see the muting note below): marks are processed during batch scans (twice daily for Premium and Enterprise, once every other day for Standard), not in real time; there can be a 12 to 24 hour delay before marks are processed and enforcement policies that resolve or reopen findings are applied.
- A mark added to a finding applies only to that specific finding, not to subsequent findings of the same type.
- Security marks on assets are separate from security marks on findings: a mark added to an asset isn't added automatically to findings for that asset. Asset marks: https://docs.cloud.google.com/security-command-center/docs/how-to-security-marks-assets.
- Without `--update-mask`, `update-marks` overrides all marks on the finding, and `--security-marks=""` deletes all of them (gcloud help). Use `--update-mask` for a selective change, and try a full override or deletion on a test finding first.
- Muting findings (individually or by mute rules) is the recommended method when you don't want to review findings for projects that are isolated or fall within acceptable business parameters. The source also mentions marks on assets that explicitly include or exclude monitored resources from specific detection policies (https://docs.cloud.google.com/security-command-center/docs/how-to-security-marks-assets#managing-policies); that use of security marks by Security Health Analytics is deprecated: it is available only in instances activated before June 26, 2023, and on or after April 15, 2025 marks can still be applied but no longer affect how Security Health Analytics processes assets. Use muting instead (see the deprecations page in the `scc-overview-tiers` category).
- Corrected from the official docs: the help example passed the finding ID wrapped in backticks and used `--update-mask="marks.markKey1"` while setting `key1`; the backticks were removed (bash runs them as command substitution) and the mask was changed to `marks.key1`, the `marks.KEY` form shown in the help's `--update-mask` description.
- The Security Command Center Enterprise service tier will shut down on May 21, 2027; organizations on it move to Premium on or after that date.
- Console steps (**Findings** page, **Set security marks**, **Add mark**) are omitted; see the source page. Managing marks through the API: https://docs.cloud.google.com/security-command-center/docs/how-to-api-add-manage-security-marks.
- The page https://docs.cloud.google.com/security-command-center/docs/how-to-security-marks now redirects to this page.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/scc/findings/update-marks (gcloud 593.0.0 help); with no `--location` the help says the request goes to the SCC V1 API.
- Source: https://docs.cloud.google.com/security-command-center/docs/how-to-security-marks-findings (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [how-to-build-findings-query-console.md](./how-to-build-findings-query-console.md)
- [how-to-mute-findings.md](./how-to-mute-findings.md)
- [review-manage-findings.md](./review-manage-findings.md)
