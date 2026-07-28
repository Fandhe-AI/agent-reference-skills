# WPF vs. WinUI 3: API and Pattern Differences

WPF (`System.Windows.*`) and WinUI 3 (`Microsoft.UI.Xaml.*`) share XAML syntax and many concepts (resource dictionaries, styles, data binding, dependency properties), but are separate frameworks with separate assemblies. This page maps common WPF patterns to their WinUI 3 equivalents for planning a migration or coexistence strategy.

## Signature / Usage

```text
System.Windows.Window            -> Microsoft.UI.Xaml.Window          (windowing via AppWindow, not subclassing)
System.Windows.Controls.Button   -> Microsoft.UI.Xaml.Controls.Button
System.Windows.Threading.Dispatcher -> Microsoft.UI.Dispatching.DispatcherQueue
```

## Options / Props

**Controls without a one-to-one mapping**

| WPF control | WinUI 3 equivalent | Notes |
|---|---|---|
| `DataGrid` | none built-in | Community `WinUI.TableView`, or evaluate community projects |
| `Ribbon` | `CommandBar` / `CommandBarFlyout` | Community Toolkit Labs also has an experimental `Ribbon` |
| `StatusBar` | `InfoBar` + custom layout | No direct status-bar control |
| `FlowDocumentReader` / `FlowDocumentScrollViewer` | `RichTextBlock` | Read-only rich text only |
| `PasswordBox` (`SecureString`) | `PasswordBox` | `SecureString` deprecated in .NET 5+ |
| `WebBrowser` | `WebView2` | Chromium-based |

**XAML features**

| WPF feature | WinUI 3 approach |
|---|---|
| `DataTrigger` / `MultiTrigger` | Community Toolkit `Behaviors` (`DataTriggerBehavior`, `EventTriggerBehavior`) |
| `DynamicResource` | `ThemeResource` (auto light/dark/high-contrast) |
| `MultiBinding` / `PriorityBinding` | Multi-value converter, or `x:Bind` with a computed view-model property |
| `Style BasedOn`, implicit styles | Supported as-is |
| `AdornerLayer` | No equivalent; use a `Canvas`/`Grid` overlay |

**Threading & dispatch**

| WPF | WinUI 3 |
|---|---|
| `Dispatcher.Invoke` / `BeginInvoke` | `DispatcherQueue.TryEnqueue` |
| `Application.Current.Dispatcher` | `DispatcherQueue.GetForCurrentThread()`, captured on the UI thread |
| `BackgroundWorker` | `Task` / `async`-`await` |

**App model & lifecycle**

| WPF | WinUI 3 |
|---|---|
| `Application.Startup` / `Exit` | `App.OnLaunched` / `Window.Closed` |
| `Application.Current.MainWindow` | App-held `Window` instance/property |
| `Window` subclassing for chrome | `AppWindow` customization (title bar, presenter modes) |
| `SystemParameters` | `DisplayArea` / `UISettings` |

**Resources & localization**

| WPF | WinUI 3 |
|---|---|
| `.resx` | `.resw` + `ResourceLoader` |
| `x:Static` | `x:Bind` to a static/singleton property |
| `MergedDictionaries` | Supported as-is |
| — | `ResourceDictionary.ThemeDictionaries` (per-theme resources, no WPF equivalent) |

**Printing**

| WPF | WinUI 3 |
|---|---|
| `PrintDialog` / `PrintDocument` | `PrintManager` |

## Notes

- Every WPF type above is in `System.Windows.*`; every WinUI 3 equivalent is in `Microsoft.UI.Xaml.*` / `Microsoft.UI.Dispatching.*` / `Microsoft.UI.Windowing.*`. They are never interchangeable at the assembly level even when names match (e.g. `Button`, `Window`, `Style`).
- The Visual Studio XAML Designer (Design tab) does not support WinUI 3 projects; use XAML Hot Reload instead.
- A full UI-framework migration to WinUI 3 is a separate effort from adding Windows App SDK features to an existing WPF/WinForms app — see `windows-app-sdk-existing-project.md` for the latter (no XAML framework change required).

## Related

- [wpf-window.md](./wpf-window.md)
- [wpf-basic-controls.md](./wpf-basic-controls.md)
- [wpf-styles-templates.md](./wpf-styles-templates.md)
- [windows-app-sdk-existing-project.md](./windows-app-sdk-existing-project.md)
