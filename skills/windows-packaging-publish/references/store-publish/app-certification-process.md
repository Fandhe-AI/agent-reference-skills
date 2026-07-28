# App Certification Process

The pipeline a submission goes through after clicking **Submit to the Store**: preprocessing, certification testing, release, and publishing.

## Signature / Usage

Stages: **Preprocessing** (package queued, basic error checks) → **Certification** (security/malware scan, Windows App Certification Kit technical compliance, content/policy compliance review) → **Release** (per Schedule/Publishing hold settings) → **Publishing** (Microsoft digitally signs the package) → **In the Store**.

## Options / Props

| Stage | What happens | Typical duration |
|---|---|---|
| Preprocessing | Package validity checks | Immediate to minutes |
| Certification | Security scan, WACK technical compliance, content/policy review | Up to 3 business days |
| Release | Publishing begins per Schedule / Publishing hold options | Minutes |
| Publishing | Microsoft signs the package with its certificate | A few minutes |
| In the Store | Listing visible to customers | ~15 minutes after publishing completes (varies by region) |

## Notes

- A failed certification produces a report indicating which test failed or which Store Policy was violated; a new submission must be created after fixing the issue to re-enter certification.
- Once publishing has started, the submission can no longer be canceled or have its release date changed.
- Microsoft performs post-publish spot checks; policy violations found later can result in app removal.
- Running the Windows App Certification Kit locally before submission is strongly recommended to catch technical-compliance failures early.

## Related

- [Create App Submission](./create-app-submission.md)
- [Resolve Submission Errors](./resolve-submission-errors.md)
