# MSIX on Windows 10 and Windows 11

Compares MSIX feature availability on Windows 10 (22H2, same feature support as 21H2) and Windows 11, with Windows 10 alternatives for Windows 11-only features.

## Signature / Usage

Set an accurate minimum OS in the manifest (the page recommends setting `MinVersion` in `TargetDeviceFamily` to the oldest Windows 10 build you support):

```text
TargetDeviceFamily MinVersion=<oldest supported Windows 10 build>
```

## Options / Props

| Feature | Windows 10 (22H2) | Windows 11 |
|---------|-------------------|------------|
| Core install / uninstall, `.appinstaller` support, Modification packages, PSF | Yes | Yes |
| Sideloading | Requires `AllowAllTrustedApps` policy or Developer Mode | Enabled by default |
| Windows services, external location, Hosted Apps, Package Integrity Enforcement (non-Store) | Yes (Windows 10 2004+) | Yes |
| Flexible virtualization, Start menu groups | Yes (Windows 10 21H1+) | Yes |
| Shared package containers, Legacy context menu (Shell extensions), Mutable package directories, MSIX Persistent Identity | Windows 11 only | Yes |
| Dynamic dependencies | Via Windows App SDK (`Mdd*` / bootstrapper); no OS-native API | Via Windows App SDK; OS-native API on Windows 11 22H2+ |

Windows 10 alternatives:

| Windows 11-only feature | Windows 10 alternative |
|-------------------------|------------------------|
| Shared package containers | Shared Win32 data location (`%ProgramData%`, named pipe) outside the container, or related packages in one bundle |
| Legacy context menu support | Package Support Framework, or deliver the extension through a separate Win32 installer |
| Mutable package directories | `ApplicationData.Current.LocalFolder` or a location outside the package |
| MSIX Persistent Identity | Store data outside the container (`%APPDATA%`, `%LOCALAPPDATA%` outside Packages, `%ProgramData%`) |

## Notes

- Windows 10 mainstream support ended October 14, 2025 (all non-LTSC). Windows 10 LTSC 2021 is supported until January 12, 2027.
- Windows 10 2004+: signed non-Store MSIX can generally be double-click installed; pre-2004 needs Developer Mode or `AllowAllTrustedApps`. Unsigned packages need extra trust configuration; policy can restrict installs.
- LTSC 2021 (build 19044, equivalent to 20H2) lacks flexible virtualization and Start menu groups.
- Known Windows 10 issue categories: registry virtualization edge cases, App Installer reliability with certain network configurations, Packaging Tool compatibility with some installer types; check open issues in microsoft/msix-packaging.
- Without Persistent Identity, `LocalState` data is deleted on uninstall.
- The page lists MSIX Packaging Tool, Advanced Installer, and Conveyor as packaging tools for Windows 10 targets.
- Recommendation: avoid Windows 11-only features if `MinVersion` targets Windows 10, test on Windows 10 specifically, and plan a Win10 EOL strategy.

## Related

- [MSIX Features and Supported Platforms](./supported-platforms.md)
- [Flexible Virtualization](./flexible-virtualization.md)
- [Package Support Framework](./package-support-framework.md)
- [Packaging Overview and Migrating from Legacy Installers](./migrate-from-legacy-installers.md)
