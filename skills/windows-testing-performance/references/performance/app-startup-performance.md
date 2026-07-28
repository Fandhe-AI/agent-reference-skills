# Best practices for WinUI app startup performance

Techniques for reducing startup time in a WinUI / Windows App SDK app: deferring work, minimizing the startup path, staged UI reveal, and efficient `Frame` navigation caching.

## Signature / Usage

```csharp
public partial class App : Application
{
    public static Window MainWindow { get; private set; } = null!;

    protected override void OnLaunched(LaunchActivatedEventArgs args)
    {
        base.OnLaunched(args);

        MainWindow = new MainWindow();
        MainWindow.Content = new LoadingPage();
        MainWindow.Activate();

        _ = InitializeAsync();
    }

    private async Task InitializeAsync()
    {
        await LoadInitialDataAsync();
        MainWindow.Content = new GameHomePage();
    }
}
```

## Options / Props

| Stage | Description |
|-------|-------------|
| Process launch | `Main` is called, `Application` object created (`InitializeComponent` parses `App.xaml`) |
| Window creation | `Application.OnLaunched` raised; app creates the main window, assigns content, calls `Activate` |
| Main page creation | Main page's `InitializeComponent` parses page XAML |
| Layout/render for first frame | Measure/arrange pass, `ApplyTemplate` on each control, render, first frame presented |

| Technique | Effect |
|-----------|--------|
| `x:Load` / `x:DeferLoadStrategy` | Delay creation of UI not needed for the first frame (trigger with `FindName`) |
| List/ItemsRepeater virtualization | Avoid up-front element creation cost for large collections |
| `Page.NavigationCacheMode` (`Required`/`Enabled`) + `Frame.CacheSize` | Avoid re-instantiating pages on `Frame.Navigate`/`GoBack` |
| Minimize managed assembly loads in startup path | CLR loads assemblies on first use; fewer/larger referenced assemblies reduce disk-load cost |

## Notes

- Measure Release builds on representative hardware; track cold and warm startup, and target time-to-first-interactive-frame rather than process-exit time.
- Startup is directly correlated with element count — budget roughly 1 ms per element created; item templates in `ListView`/`GridView` are the biggest multiplier.
- `Frame.BackStack` has no built-in size limit; keep navigation parameters small/serializable and trim the `BackStack` to control working set.
- Applies to WinUI 3 / Windows App SDK apps (`Microsoft.UI.Xaml.Application.OnLaunched`); UWP startup stages are conceptually similar but use different lifecycle APIs.

## Related

- [Optimize XAML loading](./optimize-xaml-loading.md)
- [Optimize ListView and GridView performance](./optimize-gridview-and-listview.md)
- [Keep the UI thread responsive](./keep-ui-thread-responsive.md)
