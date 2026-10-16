# Windows Forms Patterns and Their WinUI 3 Equivalents

Maps Windows Forms controls, data-binding patterns, application lifecycle concepts, and incremental migration decisions to WinUI 3. The mappings are starting points, not automated substitutions.

## Signature / Usage

```xml
<TextBlock Text="{x:Bind ViewModel.Customer.Name, Mode=OneWay}" />
<TextBox Text="{x:Bind ViewModel.Name, Mode=TwoWay}" />
```

## Options / Props

**Control and pattern mapping**

| Windows Forms | WinUI 3 starting point | Notes |
| --- | --- | --- |
| `Form` | `Window` | A `Window` hosts XAML content and isn't a control in the page's visual tree. |
| `Panel` with absolute positioning | `Grid`, `StackPanel`, or another adaptive panel | Use `Canvas` only when absolute coordinates are intrinsic to the scenario. |
| `FlowLayoutPanel` | `StackPanel` or a wrapping layout | Choose based on whether items must wrap. |
| `TableLayoutPanel` | `Grid` | Use row and column definitions with fixed, automatic, or proportional sizing. |
| `DataGridView` | No first-party equivalent | Use a list control for simple records or evaluate a supported third-party grid. Don't use the older UWP Community Toolkit DataGrid. |
| `ListBox` | `ListView` or `ItemsView` | Both display selectable collections; compare their interaction and layout models. |
| `Label` | `TextBlock` | Use an associated header or accessible name for form fields. |
| `TextBox`, `ComboBox`, `Button`, `CheckBox`, `RadioButton` | Controls with the same names | APIs and styling differ even when names match. |
| `MenuStrip` | `MenuBar` | Use `MenuFlyout` for contextual menus. |
| `StatusStrip` | A status area composed with layout controls | Use `InfoBar` for important, actionable status messages rather than as a permanent status strip. |
| `TabControl` | `TabView` | Useful for multiple open records or documents. |
| `ToolTip` | `ToolTipService` | Don't put essential information only in a tooltip. |
| `BindingSource` | A view model, collection, and XAML binding | `ObservableCollection<T>` reports collection changes; item properties need their own change notification. |
| `ErrorProvider` | App-defined validation presentation | WinUI 3 doesn't provide a complete equivalent. |
| `BackgroundWorker` | Asynchronous I/O or `Task.Run` for CPU-bound work | `async` doesn't move CPU work off the UI thread. Marshal UI updates through `DispatcherQueue` only when execution is on another thread. |
| `MessageBox.Show` | `ContentDialog` | Set the dialog's `XamlRoot` before showing it. |
| `OpenFileDialog` and `SaveFileDialog` | Windows App SDK or Windows Runtime picker APIs | Some APIs require a window identifier or HWND initialization. |
| `NotifyIcon` | Win32 notification-area integration or a supported library | Windows App SDK doesn't include a first-party tray-icon control. |
| `ProgressBar` | `ProgressBar` or `ProgressRing` | Prefer determinate progress when the app can calculate completion. |
| `DateTimePicker` | `DatePicker` and `TimePicker` | Compose them when the workflow needs both values. |
| `NumericUpDown` | `NumberBox` | Configure validation and acceptable ranges for the business rule. |
| `SplitContainer` | A resizable layout implementation | A `Grid` supplies layout, but not a draggable splitter by itself. |
| `WebBrowser` | `WebView2` | Review initialization, navigation, origin, and message-handling security. |

**Data binding**

| Scenario | Windows Forms | WinUI 3 |
| --- | --- | --- |
| Display a property | `nameLabel.Text = customer.Name;` | `<TextBlock Text="{x:Bind ViewModel.Customer.Name, Mode=OneWay}" />` |
| Edit a property | `DataBindings.Add(...)` | `<TextBox Text="{x:Bind ViewModel.Name, Mode=TwoWay}" />` |
| Display a collection | Set `DataSource` | Bind `ItemsSource` to a collection |
| Report changes | `INotifyPropertyChanged` or reset bindings | `INotifyPropertyChanged` on the bound object |

**Main differences**

| Area | Windows Forms | WinUI 3 |
| --- | --- | --- |
| UI definition | Generated designer code | Visual tree in XAML connected to C# |
| Layout | Coordinates, anchoring, docking, layout panels | `Grid`, `StackPanel`, other XAML panels |
| Binding | Property assignment / `BindingSource` | Declarative `x:Bind` and `Binding`; code-behind or incremental MVVM |
| Application model | Windows Forms app model | `Application`, `Window`, pages, Windows App SDK lifecycle and deployment |
| Rendering and theming | WinForms rendering | Fluent Design resources; responds to Windows themes, text scale, input modes |

## Notes

- Startup: the generated WinUI 3 project provides the entry point and creates an `App` instance; `App.OnLaunched` typically creates and activates the first `Window`. Use `Frame` navigation for page-based experiences, `ContentDialog` for short modal interactions, and additional `Window` instances for independent top-level views.
- Avoid starting fallible asynchronous work in a view-model constructor (it can't be awaited or report failure cleanly); load data from `Loaded`, a navigation callback, or an explicit initialization command.
- Set an explicit `x:Bind` mode. The default is `OneTime`, which doesn't update when a property changes.
- MVVM is useful for substantial state, commands, or testable business behavior, but isn't mandatory.
- A native `TableView` control for grid-style data is in preview in the experimental channel of the Windows App SDK (WinUI Gallery 3.0). Experimental APIs aren't supported for production.
- There is no need to rewrite a working Windows Forms app solely to adopt a newer UI framework. WinUI XAML Islands can host selected WinUI controls inside an existing Windows Forms app, keeping both UI frameworks in one process (adds initialization, threading, focus, input, and deployment work).
- Incremental migration steps: identify a bounded workflow; separate business and data-access logic from WinForms controls; add automated tests; rebuild with WinUI layout patterns rather than copying coordinates; test accessibility, text scaling, theming, deployment, failure recovery; decide how old and new components communicate.
- An AI assistant can inventory designer code and draft mappings, but its output is not a verified control-for-control conversion; build and test it.
- Distinct from `System.Windows.Forms.*` (WinForms) APIs: WinUI 3 types live in `Microsoft.UI.Xaml.*`. See `winforms-form-control.md` for the WinForms side.
- Source: https://learn.microsoft.com/en-us/windows/apps/get-started/line-of-business/migrate-winforms-patterns (en-us, fetched 2026-10-16). Source page `ms.date` 2026-10-13.

## Related

- [winforms-form-control.md](./winforms-form-control.md)
- [wpf-vs-winui3.md](./wpf-vs-winui3.md)
- [windows-app-sdk-existing-project.md](./windows-app-sdk-existing-project.md)
- [wpf-winforms-hosting.md](./wpf-winforms-hosting.md)
