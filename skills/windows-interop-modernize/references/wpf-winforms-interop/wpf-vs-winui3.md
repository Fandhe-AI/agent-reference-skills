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
| `FlowDocumentReader` / `FlowDocumentScrollViewer` | `RichTextBlock` | Read-only rich text only. WinUI 3 doesn't implement the WPF `FlowDocument` model, so document navigation, pagination, and editing require separate design work |
| `PasswordBox` (`SecureString`) | `PasswordBox` | `SecureString` deprecated in .NET 5+; minimize how long credentials are held in memory using `ReadOnlySpan<char>` patterns |
| `WebBrowser` | `WebView2` | Chromium-based |

**XAML features**

| WPF feature | WinUI 3 approach |
|---|---|
| `DataTrigger` / `MultiTrigger` | Community Toolkit `Behaviors` (`DataTriggerBehavior`, `EventTriggerBehavior`) |
| `DynamicResource` | `ThemeResource` (auto light/dark/high-contrast) |
| `MultiBinding` / `PriorityBinding` | Functions in `x:Bind`: a WinUI value converter receives only one source value, so use an `x:Bind` function binding with multiple arguments and `Mode=OneWay`, or a computed view-model property. `PriorityBinding` fallback isn't automatic; implement it explicitly in that function or in the view model |
| `Style BasedOn`, implicit styles | Supported as-is |
| `AdornerLayer` | No equivalent; use a `Canvas`/`Grid` overlay |

**Threading & dispatch**

| WPF | WinUI 3 |
|---|---|
| `Dispatcher.Invoke` / `BeginInvoke` | `DispatcherQueue.TryEnqueue`; async form is `await DispatcherQueue.EnqueueAsync(...)` (Community Toolkit extension) |
| `Application.Current.Dispatcher` | `DispatcherQueue.GetForCurrentThread()`, captured on the UI thread |
| `BackgroundWorker` | `Task` / `CancellationToken` / `IProgress<T>` where they fit the workload; review cancellation, exception handling, progress reporting, and UI-thread access instead of a mechanical substitution |

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
| `PrintDialog` / `PrintDocument` | `PrintManager` (a desktop app must obtain `PrintManager` for its window through the desktop interop API) |

**Developer tooling**

| WPF tooling | WinUI 3 status |
|---|---|
| XAML Designer (Design tab) | Not yet supported; use XAML Hot Reload |
| Blend for Visual Studio | Limited support: can open WinUI 3 projects, XAML Document Outline works, Design view is not available |

## Notes

- Assess gaps before migrating: the lack of a first-party `DataGrid`, `Ribbon`, adorner layer, WPF document model (`FlowDocument`), and WinUI 3 design surface can require architecture or product decisions rather than API substitutions. Prototype representative screens and high-risk integrations before estimating. If a required capability has no acceptable equivalent, keep that workflow in WPF, modernize it in place, or defer the UI migration.
- An AI assistant is an optional review aid only: verify every suggestion against current WinUI 3 documentation, and build and test generated changes (binding, threading, window ownership, accessibility, localization, packaging). It can't supply missing platform features.

- Every WPF type above is in `System.Windows.*`; every WinUI 3 equivalent is in `Microsoft.UI.Xaml.*` / `Microsoft.UI.Dispatching.*` / `Microsoft.UI.Windowing.*`. They are never interchangeable at the assembly level even when names match (e.g. `Button`, `Window`, `Style`).
- The Visual Studio XAML Designer (Design tab) does not support WinUI 3 projects; use XAML Hot Reload instead.
- A full UI-framework migration to WinUI 3 is a separate effort from adding Windows App SDK features to an existing WPF/WinForms app — see `windows-app-sdk-existing-project.md` for the latter (no XAML framework change required).

## Related

- [wpf-window.md](./wpf-window.md)
- [wpf-basic-controls.md](./wpf-basic-controls.md)
- [wpf-styles-templates.md](./wpf-styles-templates.md)
- [windows-app-sdk-existing-project.md](./windows-app-sdk-existing-project.md)
- [winforms-patterns-winui3.md](./winforms-patterns-winui3.md)
- [ai-assisted-wpf-migration.md](./ai-assisted-wpf-migration.md)
- [migration-decision-guide.md](../migration-planning/migration-decision-guide.md)
