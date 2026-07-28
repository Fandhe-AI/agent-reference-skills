# Choose a Distribution Path

Compares the available Windows app distribution paths so you can pick code signing cost, update mechanics, enterprise manageability, and discoverability that fit your app.

## Signature / Usage

Distribution paths at a glance:

| Path | Best for | Auto-update | Distributed via Store |
| --- | --- | --- | --- |
| Microsoft Store (MSIX) | Consumer/business apps, broad reach | Built-in | Yes |
| Microsoft Store (MSI/EXE installer) | Existing Win32 apps with own installer | Manual (app handles it) | Yes |
| PWA | Web apps / web-based experiences | Via Store or browser | Yes |
| MSIX sideload (enterprise) | Internal LOB apps via Intune/ConfigMgr | Via App Installer file or MDM | No |
| MSIX direct download (ISV) | Commercial apps sold from own site | Via `.appinstaller` file | No |
| Packaging with external location | Existing installer needing Windows features | Own existing mechanism | Via MSI/EXE Store submission |
| Unpackaged WinUI 3 | Niche: no MSIX capability, max simplicity | Manual only | Via MSI/EXE Store submission |

## Options / Props

| Path | Code signing | Enterprise MDM |
| --- | --- | --- |
| Microsoft Store (MSIX) | Free — Store re-signs the package | Via Intune with Company Portal |
| Microsoft Store (MSI/EXE) | Publisher must sign with a cert chaining to the Microsoft Trusted Root Program | Via Intune with Company Portal |
| MSIX sideload (enterprise) | Azure Artifact Signing (formerly Trusted Signing), or self-signed + Intune cert profile | Native |
| MSIX direct download (ISV) | CA-trusted cert required (Azure Artifact Signing recommended) | Limited |

## Notes

- For most developers, the Microsoft Store is the recommended path — Microsoft re-signs and hosts MSIX submissions.
- The `ms-appinstaller:` URI protocol (one-click browser install) is disabled by default since December 2023; link directly to the `.appinstaller` file instead.
- ClickOnce is **not supported for WinUI 3 apps** — use MSIX with `.appinstaller` for WinUI 3 direct distribution.
- `winget` adds command-line discoverability (`winget install <app>`) on top of any of these distribution paths; it doesn't replace the underlying method.

## Related

- [App Installer file overview](./app-installer-file-overview.md)
- [Gradual package rollout](./gradual-package-rollout.md)
- [Deploy MSIX apps with Microsoft Intune](./enterprise-deployment-intune.md)
