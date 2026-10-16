# Choose your migration path

Guide for deciding how to bring an existing WPF, WinForms, or Win32 desktop app forward: upgrade in place, modernize in place, or move to WinUI 3. You don't have to migrate to WinUI 3.

## Signature / Usage

```text
Path 1  Upgrade in place    .NET Framework -> modern .NET (currently .NET 10 LTS), keep WPF/WinForms
Path 2  Modernize in place  add Windows App SDK / WinRT APIs / MSIX to the existing app
Path 3  Move to WinUI 3     UI framework, namespaces, controls, app lifecycle change

Common sequence: upgrade -> modernize -> migrate individual views to WinUI 3
```

## Options / Props

Three paths:

| Path | What changes | Best for | Risk level |
|------|--------------|----------|------------|
| Upgrade in place | Runtime (.NET Framework → modern .NET), project file format, some NuGet packages | Apps that work well today and need long-term .NET support, performance improvements, or modern .NET APIs | Low–Medium |
| Modernize in place | Nothing — add Windows App SDK, WinRT APIs, or MSIX packaging to the existing app | Apps that need specific platform features (notifications, widgets, AI) without changing the UI framework | Low |
| Move to WinUI 3 | UI framework, namespaces, controls, app lifecycle model | Apps whose UI layer needs a refresh — port views incrementally or start a new project | Medium–High |

Decision criteria:

| Criterion | Upgrade in place | Modernize in place | Move to WinUI 3 |
|-----------|------------------|--------------------|-----------------|
| Project size (10+ projects) | Automated tooling handles multi-project solutions | No project restructuring needed | Requires per-project migration planning |
| .NET Framework dependencies | Primary goal is to move off .NET Framework | N/A — app stays on current runtime | Must upgrade to modern .NET first |
| WCF or ASMX services | Requires CoreWCF migration | No impact on service layer | Same WCF migration required |
| COM interop | Test thoroughly — most COM interop works on modern .NET | No changes needed | Most COM interop works; some WinRT APIs require HWND initialization |
| Third-party UI controls (Telerik, DevExpress, Syncfusion) | Most vendors support modern .NET | No UI changes | Vendors must offer WinUI 3 versions — check compatibility |
| Team capacity | Low–Medium — GitHub Copilot upgrade can assist, but review dependencies and validate | Low — incremental, no deadline | High — requires UI development and testing |
| Visual Studio XAML Designer | Supported for WPF on modern .NET | Supported | Not yet available for WinUI 3 |
| Long-term .NET support | Gains LTS support and performance | .NET Framework 4.8 is supported but receives only security fixes | WinUI 3 runs on modern .NET (.NET 6 or later) |

Common migration blockers:

| Blocker | Impact | Mitigation |
|---------|--------|------------|
| WCF services | WCF server is not available on modern .NET. WCF client is available via System.ServiceModel packages. | Migrate server-side WCF to CoreWCF or gRPC. Client-side WCF works on modern .NET. |
| ASMX web services | ASMX is not available on modern .NET. | Replace with ASP.NET Core Web API or minimal API endpoints. |
| `System.Configuration` (app.config) | `ConfigurationManager` works on modern .NET via a compatibility NuGet package, but does not support all features. | For new code, use the Options pattern with `appsettings.json`. Migrate existing settings incrementally. |
| COM interop | Most COM interop works on modern .NET. Apartment threading or registration-free COM scenarios need testing. | Test COM-dependent features early. Use ComWrappers for new interop code. |
| Third-party UI controls | Vendors may not yet support WinUI 3. Most support modern .NET for WPF and WinForms. | Check vendor docs for modern .NET and WinUI 3 support before starting. |
| Visual Basic projects | VB is supported for WPF and WinForms on modern .NET, but the GitHub Copilot upgrade workflow doesn't fully support VB projects. | Follow the manual WPF or Windows Forms upgrade guidance and validate each project. |

## Notes

- Paths are not mutually exclusive.
- The "WCF or ASMX services" row in the decision table applies to server-side implementations: a WCF client keeps working on modern .NET via the System.ServiceModel packages (no CoreWCF needed); a WCF server moves to CoreWCF or gRPC; an ASMX server is replaced with ASP.NET Core Web API or minimal API endpoints rather than CoreWCF (see Common migration blockers).
- WPF and WinForms are fully supported on modern .NET and continue to receive feature updates.
- A C# WinUI 3 app requires modern .NET and can't target .NET Framework: upgrade first (Path 1), then migrate the UI. A C++/WinRT WinUI 3 app doesn't require .NET.
- Win32 or C++ desktop UI: the docs support modernization in place and selected Windows App SDK adoption, but provide no end-to-end Win32 UI migration guide.
- Framework entry points: UWP → "Migrate from UWP to the Windows App SDK"; WPF → "Migrate WPF app patterns to WinUI 3"; Windows Forms → "Windows Forms patterns and their WinUI 3 equivalents".
- Source: https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/migrate-to-windows-app-sdk/migration-decision-guide (en-us, fetched 2026-10-16). Source page last updated 2026-10-14.

## Related

- [Migration terminology](./migration-terminology.md)
- [Modern Windows features for desktop apps](./modernize-overview.md)
- [Overall migration strategy (UWP)](../uwp-migration/overall-migration-strategy.md)
- [WPF vs WinUI 3](../wpf-winforms-interop/wpf-vs-winui3.md)
