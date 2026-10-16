# Migration terminology for Windows desktop apps

Definitions of upgrade, migrate, port, and modernize, and where to start for each activity.

## Signature / Usage

```text
Upgrade   WPF on .NET Framework 4.8 -> WPF on .NET 8 (UI framework unchanged)
Migrate   WPF -> WinUI 3, or UWP -> WinUI 3 (UI framework / app model changes)
Port      .NET Framework class library -> .NET Standard, to run on .NET 8
Modernize add WinRT APIs / Windows App SDK / MSIX to an existing WPF app
```

## Options / Props

Definitions:

| Term | Definition | Example |
|------|------------|---------|
| Upgrade | Move an existing project to a newer version of the same platform without changing the app model or UI framework. | WPF on .NET Framework 4.8 → WPF on .NET 8. The project file format and NuGet dependencies change, but the UI framework remains WPF. |
| Migrate | Move an app from one UI framework or app model to another, typically rewriting portions of the UI layer. | WPF → WinUI 3, or UWP → WinUI 3. Namespaces, controls, and app lifecycle code change significantly. |
| Port | Adapt source code so it compiles and runs on a different runtime or operating system. Often a subset of upgrading or migrating. | Porting a .NET Framework class library to .NET Standard so it can run on .NET 8. |
| Modernize | Add modern platform features to an existing app without changing its UI framework. | Adding WinRT APIs, Windows App SDK features, or MSIX packaging to an existing WPF app. |

Where to start:

| What you want to do | Term | Where to start |
|---------------------|------|----------------|
| Move a WPF or WinForms app from .NET Framework to .NET 8+ | Upgrade | GitHub Copilot upgrade |
| Move a UWP app to Windows App SDK and WinUI 3 | Migrate | Migrate from UWP to the Windows App SDK |
| Rewrite a desktop app's UI in WinUI 3 | Migrate | Migrate WPF app patterns to WinUI 3 |
| Add Windows features to an existing WPF, WinForms, or Win32 app | Modernize | Modernize your desktop apps |
| Make a .NET Framework library available on .NET 8 | Port | .NET porting overview |
| Decide which approach is right for your app | — | Choose your migration path |

## Notes

- The activities can be combined: upgrade a WPF app from .NET Framework to .NET 8, then modernize with Windows App SDK features, and later migrate specific views to WinUI 3.
- Source: https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/migrate-to-windows-app-sdk/migration-terminology (en-us, fetched 2026-10-16). Source page last updated 2026-09-02.

## Related

- [Choose your migration path](./migration-decision-guide.md)
- [Modern Windows features for desktop apps](./modernize-overview.md)
- [Migration overview (UWP)](../uwp-migration/migration-overview.md)
