# MSIX Containerization Overview

MSIX isolates apps from the rest of the system using OS-level virtualization rather than a general-purpose container technology — there is no VM and no separate OS image. Windows redirects an app's file system and registry activity at runtime while the app still runs as a native Windows process.

## Signature / Usage

- Install files are placed in a protected location (`C:\Program Files\WindowsApps\`) the app cannot modify at runtime.
- Reads are served from the package's virtual file system (VFS), so the app sees itself as installed to traditional locations (e.g. `C:\Program Files\`).
- Writes are redirected to per-user locations Windows manages, keeping install files untouched and app state separate from app binaries.
- Packaged apps run at one of two trust levels: **full trust (medium integrity)** — same permissions as a standard desktop app; default for apps converted with the MSIX Packaging Tool and for most WinUI 3 desktop apps — or **AppContainer (partial trust)** — strict isolation where the process can only access explicitly granted resources. UWP apps always run in an AppContainer; desktop apps opt in via the app manifest.

## Options / Props

| Benefit | Description |
|---------|-------------|
| Clean uninstall | Windows tracks all app state separately; uninstall removes all app files, registry entries, and system changes with no leftover artifacts (user-created files are preserved) |
| Reliable updates | App binaries are read-only at runtime; updates replace the package atomically and can be rolled back |
| No registry pollution | Registry writes go to a per-user virtual hive, not `HKEY_LOCAL_MACHINE` |
| Security isolation | AppContainer apps are restricted to explicitly granted resources, limiting the impact of a compromised process |
| Integrity enforcement | Windows detects tampering with package files at runtime and blocks launch/triggers repair |

## Notes

- Virtualization is not uniform: writes to package install files are always blocked; writes to system locations (e.g. `C:\Windows\`) are blocked for AppContainer apps; writes to user profile locations (e.g. `AppData`) are redirected to per-package locations for AppContainer apps, or pass through for full-trust apps.
- Shared package containers (enterprise-only, requires administrative privileges) let a defined set of packages share a merged view of each other's virtual file system/registry — e.g. a main app and a customization package.
- Starting in Windows 11, apps can opt specific folders/registry keys out of virtualization ("flexible virtualization"), making those locations visible to other apps and persisting them across uninstall.

## Related

- [What is MSIX?](./msix-overview.md)
- [MSIX Package Structure](./package-structure.md)
