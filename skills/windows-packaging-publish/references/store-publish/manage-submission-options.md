# Manage Submission Options (MSIX)

The optional Submission options page of the MSIX submission flow: publishing hold options, notes for certification testers, restricted-capability justification, and notification audience.

## Signature / Usage

Configured as a step within the app submission flow in Partner Center, after packages and Store listing are set but before final review.

## Options / Props

| Section | Purpose |
|---|---|
| Publishing hold options | Choose whether to publish automatically as soon as certification passes, hold until manually published, or start publishing on a specific future date (≥24h out) |
| Notes for certification | Free-text info for certification testers: test account credentials, steps to access hidden features, background-audio verification steps, region-based behavior differences, what changed in an update |
| Restricted capabilities | Required justification (why the capability is needed and how it's used) when a package declares a restricted capability; reviewed manually by certification testers |
| Submission notification audience | Add/remove Developer or Manager role account members who receive publishing status emails and Action Center notifications, in addition to the account owner |

## Notes

- Publishing hold options default to publishing as soon as certification passes (respecting any dates already set in the Pricing and availability Schedule section).
- Certification notes are read by a real person — keep instructions clear and succinct; link out for detailed docs rather than pasting long text.
- If a required service/test account is unavailable during review, the submission may fail certification.
- Declaring a restricted capability without approval fails certification; approval generally carries forward to future updates unless new capabilities are added.
- The developer account owner is always notified and cannot be removed from the notification audience; add-ons inherit the parent product's audience and can't be managed separately.

## Related

- [Create App Submission](./create-app-submission.md)
- [App Certification Process](./app-certification-process.md)
- [Resolve Submission Errors](./resolve-submission-errors.md)
