# System.Windows.Window

WPF's `Window` class (namespace `System.Windows`) provides the ability to create, configure, show, and manage the lifetime of windows and dialog boxes in WPF apps. It is the primary container of a WPF UI and is distinct from `System.Windows.Forms.Form` (WinForms) and `Microsoft.UI.Xaml.Window` (WinUI 3).

## Signature / Usage

```xaml
<!-- MainWindow.xaml -->
<Window x:Class="WpfApp.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="My Application"
        Height="300" Width="400"
        WindowStartupLocation="CenterScreen">
    <StackPanel VerticalAlignment="Center" HorizontalAlignment="Center">
        <TextBlock Text="Hello, WPF!" FontSize="24" Margin="10"/>
        <Button Content="Close" Click="CloseButton_Click" Padding="10"/>
    </StackPanel>
</Window>
```

```csharp
// MainWindow.xaml.cs
using System.Windows;

namespace WpfApp
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void CloseButton_Click(object sender, RoutedEventArgs e) => this.Close();
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Title` | `string` | Text displayed in the title bar |
| `WindowState` | `WindowState` | `Normal`, `Minimized`, or `Maximized` |
| `WindowStartupLocation` | `WindowStartupLocation` | `Manual`, `CenterScreen`, `CenterOwner` (default) |
| `Owner` | `Window` | The window that owns this window; ties activation/close/minimize behavior together |
| `ShowInTaskbar` | `bool` | Whether the window has a taskbar button |
| `Topmost` | `bool` | Whether the window stays above the normal z-order |
| `SizeToContent` | `SizeToContent` | `Manual`, `Width`, `Height`, `WidthAndHeight` — auto-size to content |
| `ResizeMode` | `ResizeMode` | `NoResize`, `CanMinimize`, `CanResize`, `CanResizeWithGrip` |
| `WindowStyle` | `WindowStyle` | `None`, `SingleBorderWindow`, `ThreeDBorderWindow`, `ToolWindow` |

## Notes

- `Show()` opens a modeless window; `ShowDialog()` opens a modal window and returns a `bool?` result.
- `Application.StartupUri` (set in `App.xaml`) automatically instantiates and shows the first window; alternatively handle `Application.Startup` and call `new Window1().Show()`.
- Lifecycle events fire in order: `SourceInitialized` → `Activated` → `Loaded` → `ContentRendered`; closing fires `Closing` (cancelable via `CancelEventArgs.Cancel`) then `Closed`.
- This is `System.Windows.Window` (WPF). It is unrelated to `Microsoft.UI.Xaml.Window` (WinUI 3) and `System.Windows.Forms.Form` (WinForms) — see `wpf-vs-winui3.md` for the WinUI 3 windowing equivalent (`AppWindow`).

## Related

- [wpf-application.md](./wpf-application.md)
- [wpf-xaml-overview.md](./wpf-xaml-overview.md)
- [wpf-vs-winui3.md](./wpf-vs-winui3.md)
