# Mapping UWP features to the Windows App SDK

Compares major feature areas (packaging, lifecycle, windowing, UI platform, resources, .NET runtime, and more) between UWP and the Windows App SDK, to help plan a migration.

## Options / Props

| Feature | UWP | Windows App SDK (packaged apps) | Migration notes |
|------|-------------|------|------|
| Packaging | MSIX, app has identity | MSIX, app has identity | Stay on MSIX for trusted install/uninstall and identity-dependent APIs. |
| Container | App container: LowIL, brokered file system, no registry access | MSIX container: MediumIL, file system same as user (AppData writes virtualized), HKCU registry writes virtualized | Higher integrity level enables more functionality; be aware of virtualization when writing to HKCU/AppData. |
| Activation and instancing | Package identity + `CoreApplication` activation, single-instanced by default | Package identity, Main/WinMain + Windows App SDK activation, **multi-instanced by default** | Handle multi-instance behavior, or use `AppInstance` to manage instancing. |
| Lifecycle-managed | Suspend/resume | Power/state notifications | Use power/state change notifications to reduce system load. |
| Background tasks | InProc and OOP background tasks | Full-trust COM background task implementation | See [Background task migration strategy](./background-task-migration.md). |
| Windowing | `CoreWindow`, `AppWindow` (preview) | HWND, `AppWindow` v2 | Windowing behavior changed significantly. See [Windowing functionality migration](./windowing-migration.md). |
| Messaging | `CoreDispatcher` and `DispatcherQueue` | `DispatcherQueue`, WndProc | `DispatcherQueue` supports Win32 apps. See [Threading functionality migration](./threading-migration.md). |
| UI platform | System XAML, WebView, DirectX, others | WinUI, WebView2, DirectX, others | See [User interface migration](./winui3-ui-migration.md). |
| Text rendering | DirectWrite | DWriteCore | Enables latest DWrite features downlevel, decoupled from OS release schedule. |
| Resources | MRT | MRT Core | See [MRT to MRT Core migration](./mrtcore-migration.md). |
| .NET runtime | .NET Native / C# 7 | .NET 8+ / C# 12+ | .NET ReadyToRun compilation is not the same as .NET Native — evaluate performance tradeoffs (launch speed, RAM, install size). |
| 2D graphics | Win2D | Win2D for WinUI | Available as a NuGet package for WinUI 3. |
| Web authentication | `WebAuthenticationBroker` | `OAuth2Manager` | New API for OAuth 2.0 functionality. |
| Windows Runtime components | UWP WinRT component project templates | C++: "Windows Runtime Component (WinUI)" template. C#: C#/WinRT to author components in a .NET Class Library. | C#/WinRT now supports authoring Windows Runtime Components. |

## Notes

- This mapping supports moving from UWP XAML to Windows App SDK XAML (WinUI 3) — migrating instead to a different UI framework such as WPF (`System.Windows.Controls.*`) is a different migration path, outside this guide's scope.
- The **.NET Native → .NET 8+/C# 12+** row is the primary reference for ".NET Native からの移行": there is no direct successor to .NET Native's ahead-of-time model; ReadyToRun is the closest analog but has different performance characteristics that should be evaluated before migrating performance-sensitive apps.
- Activation/instancing defaults **invert** between platforms: UWP is single-instanced by default, Windows App SDK is multi-instanced by default — this is a common source of migration bugs if not addressed explicitly.

## Related

- [Migration overview](./migration-overview.md)
- [What's supported when migrating from UWP to WinUI](./what-is-supported.md)
- [Mapping UWP APIs to the Windows App SDK](./namespace-mapping.md)
- [Application lifecycle functionality migration](./applifecycle-migration.md)
- [Windowing functionality migration](./windowing-migration.md)
