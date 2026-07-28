# App Package Requirements (MSIX)

Requirements for preparing MSIX/AppX packages for Microsoft Store submission: package types, signing, format limits, and version numbering.

## Signature / Usage

Package types: **App Package** (`.msix`/`.appx`, single architecture), **App Bundle** (`.msixbundle`/`.appxbundle`, multi-architecture), **App Package Upload File** (`.msixupload`/`.appxupload`, Store-submission-only, includes crash-analytics symbol file). Visual Studio's packaging tools generate these automatically; manual builds require crafting an XML package manifest per the AppxManifest schema.

## Options / Props

| Property | Requirement |
|---|---|
| Package size | 25 GB maximum per `.msix`/`.appx`/`.msixbundle`/`.appxbundle` |
| Block map hash algorithm | SHA2-256 |
| Version number (Windows 10/11) | Fourth segment reserved for Store use, must be 0 at build time; other segments 0–65535, first segment cannot be 0 |
| Code signing | Not required to be CA-rooted — the Store re-signs MSIX/AppX with a Microsoft certificate after certification |
| MSI/EXE signing | Must be Authenticode-signed by the developer before submission (Store does not re-sign) |
| Supported languages | 100+ language codes; app must support at least one from the supported list |

## Notes

- Recommended upload artifact for UWP apps is `.msixupload`/`.appxupload` rather than the raw `.msix`/`.msixbundle`.
- The Store always delivers the highest-versioned package applicable to a customer's device; multiple packages can share a version number only if their architectures differ.
- Rolling back to a previous package version for new acquisitions is done by submitting a new submission with the older package re-uploaded and the bad one removed; existing customers on the bad version are unaffected until a higher-versioned fix is submitted.
- Run the Windows App Certification Kit before submitting to catch manifest problems early.
- Sideloading/enterprise distribution outside the Store requires self-signing with your own code-signing certificate (SignTool) — this is distinct from Store-submission signing.

## Related

- [Upload App Packages](./upload-app-packages.md)
- [Create App Submission](./create-app-submission.md)
- [App Certification Process](./app-certification-process.md)
