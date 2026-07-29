# Distribute a Win32 App Through the Store

Guidance for bringing an existing Win32 app (built with Windows App SDK, WPF, WinForms, Electron, Qt, etc.) or an unpackaged web app into the Microsoft Store, comparing the two available onboarding options.

## Signature / Usage

Two distribution options, both submitted through the same Partner Center flow as any other app:

1. **Package as MSIX** via Desktop Bridge (Visual Studio packaging project, a third-party installer solution, or the MSIX Packaging Tool from an existing MSI/EXE/ClickOnce/App-V installer), then validate with the Windows App Certification Kit.
2. **Bring the unmodified installer as-is** — submit a link to the existing `.msi`/`.exe` installer with no repackaging.

## Options / Props

| Feature | Packaged (MSIX) | Unpackaged (Win32/MSI/EXE) |
|---|---|---|
| Hosting | Free, provided by Microsoft | Publisher hosts the installer and bears the cost |
| Commerce (payments, in-app, subscriptions, licensing) | Microsoft Store commerce or a 3rd-party platform | Own or 3rd-party commerce platform only |
| Code signing | Free, Store re-signs the package | Publisher must sign with a CA cert in the Microsoft Trusted Root Program |
| Auto-updates | OS checks for updates every 24 hours | App is responsible for its own auto-update mechanism |
| S mode support | Supported | Not supported |
| Private/restricted publishing | Available | Not available |
| Package flighting | Available | Not available |
| Deep Windows integration (Share dialog, launch from Store, etc.) | Yes | No |

## Notes

- Unpackaged installer submission has been allowed since June 2021; requirements: must be a `.msi` or `.exe`, must be a fully offline installer, the binary at the shared URL must remain unchanged after submission, and it must install only the product the user intends.
- A web app that is currently distributed unpackaged from a website can transition to a Store package using the same MSIX-packaging option described here.

## Related

- [MSI/EXE App Publishing](./msi-exe-publishing.md)
- [App Certification Process](./app-certification-process.md)
- [Submission API MSI](./submission-api-msi.md)
- [Choose a Distribution Path](../deployment/choose-distribution-path.md)
