# AI-assisted migration (UWP to WinUI 3)

Guidance for using an AI coding agent (for example GitHub Copilot) to automate a UWP-to-WinUI-3 migration, plus the API substitutions and gotchas an agent needs to be steered around because it was trained on UWP-era code.

## Signature / Usage

```powershell
# Install the agent plugin that automates the common substitutions
gh copilot plugin install winui@awesome-copilot
```

```text
Starter prompt for an AI agent (excerpt):

I'm migrating a UWP app to WinUI 3 using the Windows App SDK.
Apply these substitutions:
- Windows.UI.Xaml.* -> Microsoft.UI.Xaml.*
- CoreDispatcher / Dispatcher.RunAsync -> DispatcherQueue.TryEnqueue
- ApplicationView -> AppWindow + AppWindowTitleBar
- MessageDialog -> ContentDialog (set XamlRoot, not InitializeWithWindow)
- FileOpenPicker / FileSavePicker / FolderPicker -> add InitializeWithWindow
Do not use any Windows.UI.Xaml.* namespaces in new code.
Do not use CoreDispatcher -- use DispatcherQueue.
x:Bind defaults to Mode=OneTime. Add Mode=OneWay for any binding that should update at runtime.
Flag any APIs without a direct WinUI 3 equivalent rather than guessing.
```

## Options / Props

| UWP | WinUI 3 replacement | Notes |
|------|-------------|------|
| `Pivot` | `TabView`, `NavigationView` (top mode), or `RadioButtons` + visibility | `RadioButtons` is simplest for 2–3 fixed tabs; `TabView` for dynamic/closeable tabs. |
| `InkToolbar` (custom subclass) | `CommandBar` with `AppBarToggleButton` items | The built-in `InkToolbar` still exists, but custom subclassing patterns don't translate — rebuild with `CommandBar`. |
| `RadialController.CreateForCurrentView()` | `RadialControllerInterop.GetForWindow(hwnd)` | No direct 1:1 equivalent; requires window-handle interop. |
| `Win2D.uwp` (NuGet) | `Microsoft.Graphics.Win2D` (NuGet) | Package name changed only; `Microsoft.Graphics.Canvas.*` API surface is identical. |
| `Windows.UI.Input.Inking.*` | `Microsoft.UI.Input.Inking.*` | Namespace move only; `InkCanvas`/`InkPresenter` otherwise identical. |
| `PrintManager.GetForCurrentView()` | `PrintManagerInterop.GetForWindow(hwnd)` | Requires the window handle; omitting it throws `COMException`. `PrintDocument` rendering APIs (`Paginate`, `GetPreviewPage`, `AddPages`) are unchanged. |
| Custom `BindableBase`/`DelegateCommand` | `CommunityToolkit.Mvvm` `ObservableObject`/`RelayCommand`/`[ObservableProperty]` | NuGet package `CommunityToolkit.Mvvm`; replaces hand-rolled MVVM base classes. |

## Notes

- **`x:Bind` defaults to `OneTime` mode**, unlike `{Binding}` which defaults to `OneWay`. During migration, audit every `x:Bind` expression against a property that changes at runtime — a missing `Mode=OneWay`/`Mode=TwoWay` causes "UI doesn't update" bugs invisible at compile time.
- `InkStrokeContainer.SaveAsync()`/`LoadAsync()` still require `IRandomAccessStream`; bridge to `System.IO` streams via `MemoryStream.AsRandomAccessStream()`.
- App lifecycle (`Application.Current.Suspending`/`Resuming` → `Microsoft.Windows.AppLifecycle`) is **not** a simple substitution — treat it as a dedicated rewrite rather than an automated find/replace, unlike the other rows in this table.
- For the full namespace/member mapping table (not just the AI-agent quick-reference subset), see the namespace-mapping.md page in this category.

## Related

- [Mapping UWP APIs to the Windows App SDK](./namespace-mapping.md)
- [Mapping UWP features to the Windows App SDK](./feature-mapping.md)
