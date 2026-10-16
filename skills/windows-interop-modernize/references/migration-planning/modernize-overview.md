# Modern Windows features for desktop apps

Overview of adopting modern Windows features in an existing WPF, Windows Forms, or Win32 app without a rewrite, via WinRT APIs, the Windows App SDK, and MSIX packaging or package identity.

## Signature / Usage

```text
Modernization approaches (adopt incrementally, no UI framework change):
1. Windows Runtime (WinRT) APIs in the Windows SDK   -> configure the project to call WinRT APIs first
2. Windows App SDK NuGet package                      -> call its APIs alongside existing code
3. MSIX packaging / package identity                  -> installer replacement, or identity for an unpackaged app
```

## Options / Props

| Approach | Details |
|----------|---------|
| Windows Runtime APIs | App notifications, the share contract, Bluetooth, and more are exposed via WinRT APIs, callable directly from WPF, Windows Forms, and C++ Win32 apps. First step: configure the project to use WinRT APIs ("Call Windows Runtime APIs in desktop apps"). |
| Windows App SDK | Ships many modern platform features; usable in an existing app without changing the UI framework. These APIs use the WinRT API model, so the project must also be configured for WinRT APIs. See "Use the Windows App SDK in an existing project". |
| Package with MSIX | Replaces the current installer: modern install, clean uninstall, automatic updates, package identity. Separate from modernizing code — a WPF/WinForms/Win32 app can be MSIX-packaged without source changes. |
| Features requiring package identity | Background tasks, app extensions, sharing targets, Windows AI Foundry APIs, file associations, startup tasks. To keep the current installer, grant identity to an unpackaged app ("sparse package" / "packaging with external location"). |

Common features listed in the source (non-comprehensive): Windows AI Foundry, background tasks, Cross Device People API, Share options, DWriteCore, MRT Core, Widgets, Credential locker, Cryptography, Fingerprint biometrics, OAuth 2.0, Smart cards.

## Notes

- Not covered by this page: updating to a newer .NET version or Visual Studio tooling. For .NET start with "GitHub Copilot modernization for .NET"; for C++ start with the "Microsoft C++ porting and upgrading guide".
- For a larger modernization effort, or new features as separate modules, build new components with WinUI 3 and the Windows App SDK (the recommended path for new development).
- Source: https://learn.microsoft.com/en-us/windows/apps/desktop/modernize/ (en-us, fetched 2026-10-16).
- Source is `MicrosoftDocs/windows-dev-docs` at commit `a3812316d9d6678be4e526ffb4b1c4f3958d956d` (`ms.date: 04/27/2026`).

## Related

- [Choose your migration path](./migration-decision-guide.md)
- [Migration terminology](./migration-terminology.md)
- [Windows App SDK in an existing project](../wpf-winforms-interop/windows-app-sdk-existing-project.md)
- [WinRT APIs in WPF / WinForms](../wpf-winforms-interop/winrt-apis-in-wpf-winforms.md)
