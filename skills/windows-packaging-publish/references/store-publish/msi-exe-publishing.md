# MSI/EXE App Publishing

Publishing traditional Win32 installer apps (MSI or EXE) to the Microsoft Store, as a distinct track from MSIX packaging.

## Signature / Usage

1. Reserve the app name: Partner Center → **New product** → **EXE or MSI app** (rather than **MSIX or PWA app**), then check availability and reserve.
2. Follow the same submission checklist structure as MSIX (Pricing and availability, Properties, Age ratings, Packages, Store listings, Submission options).
3. Before final submission, use **Package validation pre-check** on the Manage Packages page (click **Run** next to the package) to validate against Store Policy section 10.2 Security ahead of full review.

## Options / Props

| Aspect | MSI/EXE specifics |
|---|---|
| Product type selection | **EXE or MSI app** at New product creation |
| Code signing | Installer must be Authenticode-signed by the developer before submission — the Store does **not** re-sign MSI/EXE files (unlike MSIX/AppX) |
| Package validation pre-check | Manual, on-demand validation run from Manage Packages page; re-running requires changing the package binary or silent install parameters |
| User permissions | Any user added to the developer account can submit/modify MSI/EXE apps; Partner Center role/permission restrictions do not currently apply to MSI/EXE apps |

## Notes

- Name reservation guidance: avoid trailing differentiators in the title (may be truncated), no emojis, must not infringe existing trademarks.
- The MSI/EXE submission flow largely mirrors the MSIX flow for Pricing and availability, Properties, Age ratings, and Store listings — see the MSIX-specific pages for shared field-level details.
- Certification process, resolve-submission-errors guidance, and package flights concepts apply similarly to MSI/EXE apps, with package-format specifics differing (installer executables rather than `.msix`/`.appx`).

## Related

- [Reserve App Name](./reserve-app-name.md)
- [Create App Submission](./create-app-submission.md)
- [App Certification Process](./app-certification-process.md)
- [Submission API MSI](./submission-api-msi.md)
