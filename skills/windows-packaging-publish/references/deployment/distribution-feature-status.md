# Current Status of Windows App Distribution Features

Documents Windows app distribution features that have changed, have known limitations, or behave differently than their documentation may suggest. The source page states "Last reviewed: August 2026".

## Signature / Usage

Switch a Visual Studio-generated `.appinstaller` file to the 2021 schema so `ShowPrompt` and `UpdateBlocksActivation` take effect:

```xml
<!-- Change this: -->
<AppInstaller xmlns="http://schemas.microsoft.com/appx/appinstaller/2017/2" ...>

<!-- To this: -->
<AppInstaller xmlns="http://schemas.microsoft.com/appx/appinstaller/2021" ...>
```

## Options / Props

| Item | Status |
| --- | --- |
| `ms-appinstaller:?source=` URI protocol | Disabled by default since December 2023 (App Installer 1.21.3421.0, released December 12, 2023, in response to abuse by the Emotet malware campaign, CVE-2021-43890 exploitation pattern). Consumer devices: disabled. Enterprise IT-managed devices: can be re-enabled via Group Policy. |
| `.appinstaller` schema versions | Visual Studio generates the 2017/2 schema by default. `ShowPrompt` and `UpdateBlocksActivation` are not supported in 2017/2 (silently ignored at runtime) and supported in 2021. Basic update on launch works in both. The status page table marks `HoursBetweenUpdateChecks` as not supported in 2017/2, which conflicts with the Auto-update and repair page (see Notes). |
| SmartScreen reputation | EV certificates no longer grant instant bypass (behavior changed in 2024). Reputation accumulates from file hash and publisher certificate reputation. |
| MSIX on Windows 10 vs Windows 11 | Shared package containers, mutable package directories, and MSIX persistent identity are Windows 11-only and not backported. Dynamic dependencies are supported on Windows 10 via the Windows App SDK (`Mdd*` APIs / bootstrapper); Windows 11 adds an OS-native implementation. Windows 10 mainstream support ended October 14, 2025. |
| `MsixPackaging@1` Azure DevOps task | Uses outdated dependencies (MSBuild 4.8.4161.0 instead of 16+, built against Node 16, end-of-life September 2023); can fail in modern pipelines. Workaround: use MSBuild directly, or GitHub Actions with `microsoft/setup-msbuild`. |

## Notes

- Workarounds for the disabled protocol: link directly to the `.appinstaller` file (users download and double-click; recommended for non-enterprise), or publish to the Microsoft Store. For enterprise re-enablement set the Group Policy `EnableMSAppInstallerProtocol` to Enabled via the DesktopAppInstaller CSP; the policy value `Disabled` means "the setting is not configured" (double-negative).
- SmartScreen: all non-Store, non-Microsoft-signed binaries can show a prompt on first download until reputation is established; signing releases with the same identity lets certificate reputation carry forward; unsigned files rebuild reputation for every new hash.
- Cross-page note: the Auto-update and repair apps page states the 2017/2 schema supports `HoursBetweenUpdateChecks` but not `ShowPrompt` / `UpdateBlocksActivation`; this status page lists `HoursBetweenUpdateChecks` as unsupported in 2017/2. Treat the dedicated Auto-update page as primary for that attribute.
- Source: https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/distribution-feature-status, last updated 2026-08-24 (ms.date).

## Related

- [App Installer auto-update and repair](./app-installer-auto-update-repair.md)
- [App Installer security features](./app-installer-security-features.md)
- [Choose a distribution path](./choose-distribution-path.md)
