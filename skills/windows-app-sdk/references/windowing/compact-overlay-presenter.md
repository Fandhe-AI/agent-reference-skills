# CompactOverlayPresenter

Displays an app window using a CompactOverlay (picture-in-picture) configuration (`Microsoft.UI.Windowing.CompactOverlayPresenter`) — an always-on-top window of fixed size with a 16:9 aspect ratio.

## Signature / Usage

```csharp
using Microsoft.UI.Windowing;

appWindow.SetPresenter(CompactOverlayPresenter.Create());

var presenter = (CompactOverlayPresenter)appWindow.Presenter;
presenter.InitialSize = CompactOverlaySize.Medium;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `InitialSize` | `CompactOverlaySize` | Initial size (`Small` default, `Medium`, `Large`) when entering CompactOverlay mode. |
| `Kind` | `AppWindowPresenterKind` (read-only, inherited) | Always `CompactOverlay`. |

**Methods**: `Create()` — creates a new instance.

## Notes

- You can call `AppWindow.Resize` to override the default 16:9 aspect ratio and set any desired size.
- Package: `Microsoft.UI.Windowing` (Windows App SDK / WinUI 3).

## Related

- [AppWindowPresenter](./app-window-presenter.md)
- [FullScreenPresenter](./full-screen-presenter.md)
- [OverlappedPresenter](./overlapped-presenter.md)
