# Multiple windows

Shows app content in secondary windows while sharing the same UI thread/dispatcher across each window (`Window` + `AppWindow` + `WindowId`).

## Signature / Usage

```csharp
// App.xaml.cs
public static Dictionary<WindowId, Window> ActiveWindows { get; set; } = new();

// MainPage.xaml.cs
private Window CreateWindow()
{
    Window newWindow = new Window();
    newWindow.AppWindow.Resize(new SizeInt32(1200, 800));
    newWindow.Title = "Window " + newWindow.AppWindow.Id.Value.ToString();
    TrackWindow(newWindow);
    return newWindow;
}

private void TrackWindow(Window window)
{
    window.Closed += (s, e) => App.ActiveWindows.Remove(window.AppWindow.Id, out window);
    App.ActiveWindows.Add(window.AppWindow.Id, window);
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Window()` (constructor) | — | Creates a new secondary window; instantiate directly or subclass with a `.xaml` file. |
| `Window.Content` | `UIElement` | Set to a `Frame`/`Page`, or any XAML content, before `Activate()`. |
| `Window.Activate()` | method | Shows the newly created window. |
| `WindowId` | struct | Unique key for tracking `Window` instances (e.g., in a `Dictionary<WindowId, Window>`). |
| `XamlRoot.ContentIslandEnvironment.AppWindowId` | property | Retrieves the current page's `WindowId` (use in `Loaded`, not the constructor). |

## Notes

- There is no built-in way to retrieve a `Window` instance from elsewhere in the app unless you keep a reference — track instances in a static `Dictionary<WindowId, Window>` keyed by `Window.AppWindow.Id`.
- Get the current window's `WindowId` inside a page's `Loaded` event handler (not the constructor) so that `XamlRoot` is non-null.
- A common use case is tab tear-out (`TabView`), which also uses `WindowId` to track windows.
- Package: `Microsoft.UI.Xaml` / `Microsoft.UI.Windowing` (Windows App SDK / WinUI 3).

## Related

- [Microsoft.UI.Xaml.Window](./xaml-window.md)
- [WindowId](./window-id.md)
- [AppWindow](./app-window.md)
