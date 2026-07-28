# AppWindowPresenter

Base class that displays an app window using a pre-defined configuration appropriate for the type of window (`Microsoft.UI.Windowing.AppWindowPresenter`). A presenter is created by the system and applied to an `AppWindow` at creation time; each subclass provides a pre-defined configuration.

## Signature / Usage

```csharp
using Microsoft.UI.Windowing;

AppWindowPresenterKind kind = appWindow.Presenter.Kind;

// Switch back to the default presenter
appWindow.SetPresenter(AppWindowPresenterKind.Default);
OverlappedPresenter defaultPresenter = (OverlappedPresenter)appWindow.Presenter;
defaultPresenter.IsMaximizable = false;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Kind` | `AppWindowPresenterKind` (read-only) | The kind of presenter: `Default`, `Overlapped`, `CompactOverlay`, `FullScreen`. |

## Notes

- Derived classes: `OverlappedPresenter` (default), `CompactOverlayPresenter`, `FullScreenPresenter`.
- A presenter can be applied to only one window at a time; applying the same presenter instance to a second window throws.
- The default presenter instance persists for the lifetime of the `AppWindow`; re-apply it with `SetPresenter(AppWindowPresenterKind.Default)`.
- `AppWindow.SetPresenter` triggers the `AppWindow.Changed` event with `AppWindowChangedEventArgs.DidPresenterChange == true`.
- Package: `Microsoft.UI.Windowing` (Windows App SDK / WinUI 3).

## Related

- [AppWindow](./app-window.md)
- [OverlappedPresenter](./overlapped-presenter.md)
- [CompactOverlayPresenter](./compact-overlay-presenter.md)
- [FullScreenPresenter](./full-screen-presenter.md)
