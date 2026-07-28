# Upload App Packages

The **Packages** page of the app submission process: uploading package files and configuring device family availability, gradual rollout, and mandatory updates.

## Signature / Usage

Drag-and-drop or browse to upload `.msix`, `.msixupload`, `.msixbundle`, `.appx`, `.appxupload`, and/or `.appxbundle` files. Packages can also be copied in from an existing package flight. After upload, the **Device family availability** table shows which packages are ranked/offered to which Windows 10/11 device families.

## Options / Props

| Feature | Description |
|---|---|
| Device family availability | Checkboxes per device family (Desktop, Xbox, Holographic, Team, IoT); Xbox unchecked by default for Universal packages |
| Gradual package rollout | Roll out an update to a percentage of existing customers first; percentage adjustable or haltable without a new submission |
| Mandatory update | Set a date/time forcing update via `Windows.Services.Store` APIs (requires targeting Windows 10 version 1607+) |
| Redundant package detection | Warns and offers to remove packages made obsolete by higher-versioned replacements |
| Package ranking | Multiple packages for the same device family are ranked by version number; highest applicable version is delivered first |

## Notes

- Validation errors block the submission until the package is removed, fixed, and re-uploaded; warnings do not block submission.
- Xbox launch requires a neutral or x64 package compiled with Windows SDK 14393+ to be the highest-ranked package applicable to Xbox.
- Device family selections apply only to new acquisitions — existing customers keep the app and continue receiving updates even if their device family is later unchecked.
- `.xap` package versions are not considered for ranking; remove old `.xap` files explicitly to migrate customers.

## Related

- [App Package Requirements](./app-package-requirements.md)
- [Create App Submission](./create-app-submission.md)
- [Gradual Package Rollout](./gradual-package-rollout.md)
- [Package Flights](./package-flights.md)
