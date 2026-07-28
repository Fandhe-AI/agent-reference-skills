# System.Windows.Application

`System.Windows.Application` (namespace `System.Windows`) encapsulates a WPF app: it manages the application-level XAML resources, tracks all open windows, and controls startup/shutdown behavior. Defined in `App.xaml` / `App.xaml.cs` by default.

## Signature / Usage

```xaml
<!-- App.xaml -->
<Application x:Class="WpfApp.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             StartupUri="MainWindow.xaml">
    <Application.Resources>
    </Application.Resources>
</Application>
```

```csharp
// App.xaml.cs — explicit startup instead of StartupUri
using System.Windows;

namespace WpfApp
{
    public partial class App : Application
    {
        private void Application_Startup(object sender, StartupEventArgs e)
        {
            var window = new MainWindow();
            window.Show();
        }
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `StartupUri` | `Uri` | XAML file to instantiate and show automatically at startup |
| `MainWindow` | `Window` | First window instantiated becomes the main window automatically |
| `Windows` | `WindowCollection` | All currently open windows managed by the application |
| `ShutdownMode` | `ShutdownMode` | `OnLastWindowClose` (default), `OnMainWindowClose`, `OnExplicitShutdown` |
| `Resources` | `ResourceDictionary` | App-scoped resources (styles, brushes, templates) available to all windows |

## Notes

- Handle `Startup`, `Exit`, `Activated`, `Deactivated` events for app-level lifecycle logic.
- This is `System.Windows.Application` (WPF). Do not confuse with the WinForms static `System.Windows.Forms.Application` class (`Application.Run`, `Application.EnableVisualStyles`) or WinUI 3's `Microsoft.UI.Xaml.Application` (`App.OnLaunched`).

## Related

- [wpf-window.md](./wpf-window.md)
- [winforms-application-run.md](./winforms-application-run.md)
- [wpf-vs-winui3.md](./wpf-vs-winui3.md)
