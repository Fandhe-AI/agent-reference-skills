# Migrate a WPF App to WinUI 3 (AI-assisted)

Use the `winui-wpf-migration` AI skill to port a WPF app to WinUI 3, updating XAML namespaces, controls, and project structure. WPF uses `System.Windows.*` while WinUI 3 uses `Microsoft.UI.Xaml.*`; many controls and windowing APIs need targeted substitutions rather than search-and-replace.

## Signature / Usage

```powershell
gh copilot plugin install winui@awesome-copilot
```

Starter prompt:

```text
I'm migrating a WPF app to WinUI 3 using the Windows App SDK.

Apply these substitutions:
- System.Windows.* → Microsoft.UI.Xaml.*
- Dispatcher.Invoke / BeginInvoke → DispatcherQueue.TryEnqueue
- Window.WindowState → AppWindow with OverlappedPresenter
- PresentationSource → WinRT.Interop.WindowNative.GetWindowHandle
- DynamicResource for system colors → ThemeResource
- {Binding} → {x:Bind} where possible (compile-time binding)
- ListBox → ListView or ItemsView
- TabControl → TabView
- WebBrowser → WebView2
- DataGrid → no first-party WinUI 3 DataGrid; flag it and choose a grid control (e.g. evaluate WinUI.TableView) instead of assuming a package

Do not use any System.Windows.* namespaces in new code, except System.Windows.Input.ICommand (projected type in C# WinUI 3).
Do not use Dispatcher.Invoke — use DispatcherQueue.TryEnqueue.
Flag APIs without a direct WinUI 3 equivalent rather than guessing.
```

Project file changes:

```xml
<!-- Before (WPF) -->
<TargetFramework>net10.0-windows</TargetFramework>
<UseWPF>true</UseWPF>

<!-- After (WinUI 3) -->
<TargetFramework>net10.0-windows10.0.19041.0</TargetFramework>
<WindowsSdkPackageVersion>10.0.19041.31</WindowsSdkPackageVersion>
<UseWinUI>true</UseWinUI> <!-- added; not in the source snippet -->
```

(The `UseWinUI` line is an addition to the source snippet; see Notes.)

```powershell
dotnet add package Microsoft.WindowsAppSDK
```

## Options / Props

**Namespaces**

| WPF | WinUI 3 |
| --- | --- |
| `System.Windows.*` | `Microsoft.UI.Xaml.*` |
| `System.Windows.Controls.*` | `Microsoft.UI.Xaml.Controls.*` |
| `System.Windows.Media.*` | `Microsoft.UI.Xaml.Media.*` |
| `System.Windows.Data.*` | `Microsoft.UI.Xaml.Data.*` |
| `System.Windows.Input.*` | `Microsoft.UI.Input.*` (`ICommand` stays `System.Windows.Input.ICommand`) |

**Controls**

| WPF | WinUI 3 | Notes |
| --- | --- | --- |
| `Window` | `Microsoft.UI.Xaml.Window` | Different API surface |
| `Grid`, `StackPanel`, `Canvas` | Unchanged | Same names |
| `TextBox`, `Button`, `CheckBox` | Unchanged | Same names, WinUI styling |
| `ListBox` / `ListView` | `ListView` | Use `ItemsView` for new code |
| `DataGrid` | No first-party control | Evaluate community options (e.g. `WinUI.TableView`); see Notes |
| `TabControl` | `TabView` | Different API |
| `Menu` / `MenuItem` | `MenuBar` / `MenuBarItem` | |
| `ToolBar` | `CommandBar` | |
| `RichTextBox` | `RichEditBox` | |
| `WebBrowser` | `WebView2` | Different API, async |

**Threading**

| WPF | WinUI 3 |
| --- | --- |
| `Dispatcher.Invoke(...)` | `DispatcherQueue.TryEnqueue(...)` |
| `Dispatcher.BeginInvoke(...)` | `DispatcherQueue.TryEnqueue(DispatcherQueuePriority.Low, ...)` |
| `Application.Current.Dispatcher` | `this.DispatcherQueue` |

**Windowing and DPI**

| WPF | WinUI 3 |
| --- | --- |
| `Window.WindowState` | `AppWindow.Presenter` (use `OverlappedPresenter`) |
| `SystemParameters.WorkArea` | `DisplayArea.GetFromWindowId(...)` |
| `PresentationSource.FromVisual()` | `WinRT.Interop.WindowNative.GetWindowHandle(window)` |

**Data binding**

| WPF | WinUI 3 |
| --- | --- |
| `INotifyPropertyChanged` | Unchanged |
| `ObservableCollection<T>` | Unchanged |
| `{Binding}` | `{x:Bind}` preferred (compile-time) |
| `DependencyProperty` | Unchanged |
| `IValueConverter` | Unchanged |

**Resources and styles**

| WPF | WinUI 3 |
| --- | --- |
| `ResourceDictionary` | Unchanged |
| `StaticResource` | Unchanged |
| `DynamicResource` | `{ThemeResource}` for system colors |
| `SystemColors.WindowBrush` | `{ThemeResource SystemFillColorSolidNeutralBrush}` |

## Notes

- APIs that don't migrate directly (tell the agent to flag these rather than guess): WPF `Adorner` layer (no WinUI 3 equivalent); `FlowDocument` / `DocumentViewer` (use `RichEditBox` for editable content, no viewer equivalent); `Viewport3D` (use Win2D or DirectX interop); air-space / HWND hosting (use `SwapChainPanel` or Win32 interop patterns).
- Deviation from the source: the source prompt and Controls table name `CommunityToolkit.WinUI.Controls.DataGrid`, but no NuGet package with that ID is published (as of 2026-10-16). The Windows Community Toolkit v7 package is `CommunityToolkit.WinUI.UI.Controls.DataGrid`, and `wpf-patterns-winui3` (see `wpf-vs-winui3.md`) states WinUI 3 has no first-party DataGrid and suggests evaluating community options such as `WinUI.TableView`. The prompt and table above were changed to a grid-selection step instead of a fixed package.
- Distinct from WPF `System.Windows.*`: after migration no `System.Windows.*` namespaces should remain in new code, except `ICommand` (see the exception below).
- Deviation from the source: the source prompt forbids all `System.Windows.*` and maps `System.Windows.Input.*` wholesale, but in C# WinUI 3 `ICommand` is projected as `System.Windows.Input.ICommand` (see `../csharp-winrt/net-mappings-of-winrt-types.md`). The prompt and Namespaces table above therefore carry an `ICommand` exception; map other input types individually.
- Deviation from the source: the source's project-file snippet omits `<UseWinUI>true</UseWinUI>`, which a WinUI 3 project also needs for XAML compilation (see `../uwp-migration/upgrade-assistant.md`); it was added to the After example. Alternatively, create a new project from a WinUI 3 template and port code into it.
- `Dispatcher.Invoke` blocks until the delegate completes, whereas `DispatcherQueue.TryEnqueue` only queues it and returns `false` if enqueueing fails. Where callers depend on completion or ordering, await the work with the Community Toolkit `DispatcherQueue.EnqueueAsync(...)` extension (per `wpf-patterns-winui3`, see `wpf-vs-winui3.md`), run directly when already on the UI thread (`DispatcherQueue.HasThreadAccess`, see `../uwp-migration/threading-migration.md`), and handle a `false` return.
- When replacing `{Binding}` with `{x:Bind}`, set an explicit mode: `x:Bind` defaults to `OneTime`, which doesn't update when a property changes, so add `Mode=OneWay` / `Mode=TwoWay` for properties that change at runtime (see `winforms-patterns-winui3.md` and `../uwp-migration/ai-assisted-migration.md`).
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/ai-assisted/migrate/wpf-to-winui (en-us, fetched 2026-10-16). Source page `ms.date` 2026-05-13. Project-file TFM and SDK version values are verbatim from the source (the `UseWinUI` line, DataGrid line, and `ICommand` exception are modifications noted above).

## Related

- [wpf-vs-winui3.md](./wpf-vs-winui3.md)
- [copilot-modernization-guide.md](./copilot-modernization-guide.md)
- [wpf-window.md](./wpf-window.md)
- [wpf-basic-controls.md](./wpf-basic-controls.md)
