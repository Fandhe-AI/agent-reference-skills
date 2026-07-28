# Migrate from UWP to the Windows App SDK

Overview of moving a C# or C++/WinRT UWP app to the Windows App SDK and WinUI 3, including why to migrate, high-level steps, and links to all migration topics.

## Signature / Usage

High-level manual migration steps:

```text
1. Create a new WinUI packaged desktop project (Create your first WinUI project).
   This can go into your project's existing solution.
2. Copy your XAML/UI code. In many cases you can simply change namespaces
   (for example, Windows.UI.* to Microsoft.UI.*).
3. Copy your app logic code. Some APIs need tweaks, such as Popup, Pickers,
   and SecondaryTiles.
```

Your existing UWP app continues to function as expected — migration is not forced. However, UWP is not receiving new platform investment, and Microsoft recommends migrating to take advantage of modern features in WinUI 3 and the Windows App SDK. The [.NET Upgrade Assistant](./upgrade-assistant.md) automates much of this for C# projects; AI-assisted migration (GitHub Copilot) is also available as a starting point.

## Options / Props

| Topic | Description |
|------|-------------|
| [Overall migration strategy](./overall-migration-strategy.md) | Considerations and strategies for approaching migration, and how to set up your dev environment. |
| [Mapping UWP features to the Windows App SDK](./feature-mapping.md) | Compares major feature areas (packaging, lifecycle, windowing, UI platform, resources, ...). |
| [What's supported](./what-is-supported.md) | Which UWP features are available, have alternatives, or aren't yet supported in WinUI 3. |
| [Mapping UWP APIs and libraries](./namespace-mapping.md) | Namespace/class/member mapping from UWP to Windows App SDK equivalents. |
| Feature area guides | applifecycle, windowing, threading, mrtcore, notifications, toast-notifications, background tasks, WinUI 3/UI. |
| [.NET Upgrade Assistant](./upgrade-assistant.md) | Automated tool for migrating a C# UWP project file to WinUI 3 / Windows App SDK. |

## Notes

- Before migrating, read [What's supported when migrating from UWP to WinUI](./what-is-supported.md) — if your app depends on an unsupported feature, consider postponing migration.
- If your UWP source is C++/CX, first see "Move to C++/WinRT from C++/CX" (outside this skill's scope) before migrating to the Windows App SDK.
- UWP apps migrating to the Windows App SDK can lose UWP's inherent app-container sandboxing; **Win32 App Isolation** restores similar sandboxing benefits with minimal code changes.
- This guidance covers moving from UWP XAML to Windows App SDK XAML (WinUI 3). Moving to a different UI framework (for example WPF) is out of scope for this migration guide.

## Related

- [Overall migration strategy](./overall-migration-strategy.md)
- [What's supported when migrating from UWP to WinUI](./what-is-supported.md)
- [Mapping UWP APIs to the Windows App SDK](./namespace-mapping.md)
- [Mapping UWP features to the Windows App SDK](./feature-mapping.md)
- [Migrate with the .NET Upgrade Assistant](./upgrade-assistant.md)
