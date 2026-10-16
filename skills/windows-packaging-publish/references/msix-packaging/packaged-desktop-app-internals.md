# How Packaged Desktop Apps Run on Windows

Deep dive into OS behavior for packaged desktop apps: app types, install location, file system and registry virtualization, VFS folders, and uninstallation.

## Signature / Usage

App type and trust level are declared on the manifest `Application` element:

```xml
<Application ...
  uap10:RuntimeBehavior="packagedClassicApp"
  uap10:TrustLevel="appContainer">
</Application>
```

## Options / Props

| Attribute | Value | Meaning |
|-----------|-------|---------|
| `uap10:RuntimeBehavior` | `packagedClassicApp` | WinUI 3 apps (Windows App SDK) and Desktop Bridge (Centennial) apps |
| | `win32App` | Other Win32 apps, including apps packaged with external location |
| | `windowsApp` | UWP apps (not covered by this topic) |
| `uap10:TrustLevel` | `mediumIL` | Full trust app |
| | `appContainer` | Runs in a lightweight app container |

Common file system operations:

| Operation | Result |
|-----------|--------|
| Read or enumerate a well-known Windows folder | Dynamic merge of the package `VFS\<well_known_folder>` with the system counterpart |
| Write under AppData | Windows 10 1903+: new files/folders under Local, Local\Microsoft, Roaming, Roaming\Microsoft, Roaming\Microsoft\Windows\Start Menu\Programs go to a per-user, per-package private location; opens check the private location first, then real AppData; deletes allowed with permission. Earlier: copy on write to a per-user, per-app location |
| Write inside the package | Not allowed (read-only) |
| Write outside the package | Allowed if the user has permissions |

Packaged VFS locations (under `<package_root>\VFS\`):

| System location | VFS folder | Architectures |
|-----------------|------------|---------------|
| FOLDERID_SystemX86 | `SystemX86` | x86, amd64 |
| FOLDERID_System | `SystemX64` | amd64 |
| FOLDERID_ProgramFilesX86 | `ProgramFilesX86` | x86, amd64 |
| FOLDERID_ProgramFilesX64 | `ProgramFilesX64` | amd64 |
| FOLDERID_ProgramFilesCommonX86 | `ProgramFilesCommonX86` | x86, amd64 |
| FOLDERID_ProgramFilesCommonX64 | `ProgramFilesCommonX64` | amd64 |
| FOLDERID_Windows | `Windows` | x86, amd64 |
| FOLDERID_ProgramData | Common `AppData` | x86, amd64 |
| System32\catroot, catroot2, drivers\etc, driverstore, logfiles, spool | `AppVSystem32Catroot`, `AppVSystem32Catroot2`, `AppVSystem32DriversEtc`, `AppVSystem32Driverstore`, `AppVSystem32Logfiles`, `AppVSystem32Spool` | x86, amd64 |

Common registry operations:

| Operation | Result |
|-----------|--------|
| Read or enumerate HKLM\Software | Dynamic merge of the package hive (`registry.dat`) with the system hive |
| Writes under HKCU | Copy on write to a per-user, per-app private location |
| Writes inside the package | Not allowed |
| Writes outside the package | Allowed if the user has permissions |

## Notes

- The purpose of packaging is to grant package identity at runtime; the virtualization behaviors below apply only to virtualized (appContainer-style) apps.
- Install is per-user. Default location is `C:\Program Files\WindowsApps\<package_full_name>`; package files are read-only and locked down, and Windows prevents launching tampered apps. Default package volume can be changed; not all packages are staged in a volume (Visual Studio can register a development layout directly).
- Single storage with hard links: identical files across MSIX packages are stored once; downloads are in 64Kb blocks so only differing increments are fetched.
- Only keys under HKLM\Software are part of the package; HKCU keys are not. All registry writes are kept during upgrade and deleted only on full removal.
- There is no VFS folder for the user's AppData.
- Uninstall removes everything under the install folder plus redirected AppData and registry writes captured during packaging.
- Source page last updated 09/30/2026 (ms.date).

## Related

- [MSIX AppContainer Apps](./msix-appcontainer-apps.md)
- [Flexible Virtualization](./flexible-virtualization.md)
- [Prepare to Package a Desktop App](./prepare-desktop-app-for-packaging.md)
- [MSIX Containerization Overview](./msix-containerization-overview.md)
