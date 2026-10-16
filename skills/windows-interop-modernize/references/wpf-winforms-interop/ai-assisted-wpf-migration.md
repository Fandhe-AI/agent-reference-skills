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
- DataGrid → CommunityToolkit.WinUI.Controls.DataGrid

Do not use any System.Windows.* namespaces in new code.
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
```

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
| `System.Windows.Input.*` | `Microsoft.UI.Input.*` |

**Controls**

| WPF | WinUI 3 | Notes |
| --- | --- | --- |
| `Window` | `Microsoft.UI.Xaml.Window` | Different API surface |
| `Grid`, `StackPanel`, `Canvas` | Unchanged | Same names |
| `TextBox`, `Button`, `CheckBox` | Unchanged | Same names, WinUI styling |
| `ListBox` / `ListView` | `ListView` | Use `ItemsView` for new code |
| `DataGrid` | `DataGrid` (CommunityToolkit) | Add `CommunityToolkit.WinUI.Controls.DataGrid` |
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
- This page's `DataGrid` row points to the CommunityToolkit package, whereas `wpf-vs-winui3.md` lists community `WinUI.TableView` / "none built-in"; the sources differ, so verify the package against current Windows App SDK / Toolkit versions before use.
- Distinct from WPF `System.Windows.*`: after migration no `System.Windows.*` namespaces should remain in new code.
- When replacing `{Binding}` with `{x:Bind}`, set an explicit mode: `x:Bind` defaults to `OneTime`, which doesn't update when a property changes, so add `Mode=OneWay` / `Mode=TwoWay` for properties that change at runtime (see `winforms-patterns-winui3.md` and `../uwp-migration/ai-assisted-migration.md`).
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/ai-assisted/migrate/wpf-to-winui (en-us, fetched 2026-10-16). Source page `ms.date` 2026-05-13. Project-file TFM and SDK version values are verbatim from the source.

## Related

- [wpf-vs-winui3.md](./wpf-vs-winui3.md)
- [copilot-modernization-guide.md](./copilot-modernization-guide.md)
- [wpf-window.md](./wpf-window.md)
- [wpf-basic-controls.md](./wpf-basic-controls.md)
