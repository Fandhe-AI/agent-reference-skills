# Overall migration strategy

Practical strategies and environment-setup steps for migrating a UWP app's source code to the Windows App SDK, and the value proposition for doing so.

## Signature / Usage

```text
1. Install the Windows App SDK VSIX (download from Windows App SDK downloads).
2. Create a new project — "WinUI Blank App (Packaged)" template
   (language: C#/C++, platform: Windows App SDK, project type: WinUI/Desktop).
   Solution Explorer shows two projects: one (Desktop), one (Package).
3. Migrate code with the least dependencies first — start from leaf
   classes/models with no dependents, and work outward, so you get a clean
   build after each piece instead of one giant leap.
4. Copy asset files as files. For source files, prefer copying the files
   themselves (via File Explorer) except App.xaml/App.xaml.cs, which must be
   merged with the target project's existing SDK-specific code.
5. Install the same NuGet packages that the source project depends on.
```

Terminology used throughout this migration guide: the UWP project being migrated is the *source* solution/project; the Windows App SDK project being created is the *target* solution/project.

## Options / Props

| Consideration | Notes |
|------|-------------|
| Why migrate | Latest UI platform (WinUI 3, WebView2), single API surface across desktop platforms, more frequent release cadence separate from Windows, consistent cross-version experience, .NET compatibility, backward-compatible to Windows 10 version 1809 (10.0; Build 17763), improved MSIX container runtime. |
| C++/WinRT file naming | `MainPage.h`/`MainPage.cpp` (UWP) rename to `MainPage.xaml.h`/`MainPage.xaml.cpp` (Windows App SDK). Add `#include "MyPage.g.cpp"` immediately after the page's own header include. |
| Renaming the target project | If the target project/namespace name differs from the source, search-and-replace the old namespace name across every copied file. |
| Most WinRT APIs usable | Most WinRT APIs work in Windows App SDK apps, except APIs with UWP-only UI dependencies, and APIs that require package identity (only supported in MSIX-packaged desktop apps). |

## Notes

- Applies to `Microsoft.UI.Xaml` (WinUI 3) desktop apps — do not confuse with `System.Windows` (WPF) or `System.Windows.Forms` (WinForms) migration guidance, which follows different patterns.
- Certain UI scenarios require tracking your main window object and using HWND-based interop APIs such as `IInitializeWithWindow::Initialize`, since UWP's window-implicit model doesn't carry over to Win32.
- Windows App SDK apps are one kind of desktop app; "Support for WinRT APIs in desktop apps" (outside this skill's scope) targets the broader union of desktop app kinds (.NET desktop, C/C++ Win32, Windows App SDK).

## Related

- [Migration overview](./migration-overview.md)
- [What's supported when migrating from UWP to WinUI](./what-is-supported.md)
- [Migrate with the .NET Upgrade Assistant](./upgrade-assistant.md)
