# SecondaryTile

Creates, enumerates, and manages a secondary tile pinned to the Start menu (in addition to the app's own primary tile).

## Signature / Usage

```csharp
var tile = new Windows.UI.StartScreen.SecondaryTile(
    "myTileId5391",
    "Display name",
    "myActivationArgs",
    new Uri("ms-appx:///Assets/Square150x150Logo.png"),
    TileSize.Default);

// WinUI 3 / desktop apps must associate the tile with an owner HWND before
// any call that displays UI (RequestCreateAsync, RequestDeleteAsync, ...).
var hWnd = WinRT.Interop.WindowNative.GetWindowHandle(this);
WinRT.Interop.InitializeWithWindow.Initialize(tile, hWnd);

bool isPinned = await tile.RequestCreateAsync();
```

```csharp
// Unpin an existing tile
if (SecondaryTile.Exists(tileId))
{
    var toBeDeleted = new SecondaryTile(tileId);
    WinRT.Interop.InitializeWithWindow.Initialize(toBeDeleted, hWnd);
    bool isDeleted = await toBeDeleted.RequestDeleteAsync();
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `SecondaryTile(String, String, String, Uri, TileSize)` | constructor | Creates a tile with `TileId`, `DisplayName`, `Arguments`, logo URI, and size. |
| `TileId` | property | Unique identifier for the tile within the package (required for create/delete). |
| `DisplayName` | property | Name shown on the tile and in its tooltip. |
| `Arguments` | property | App-defined string passed back to the app on tile activation. |
| `RoamingEnabled` | property | Whether the tile roams via the user's Microsoft account (default `true` since Windows 8.1). |
| `VisualElements` | `SecondaryTileVisualElements` | Background color, foreground text, and tile images (replaces several deprecated top-level properties). |
| `Exists(String)` | static method | Checks whether a tile with the given `TileId` is pinned. |
| `RequestCreateAsync()` / `RequestCreateAsync(Point)` | method | Shows the "Pin to Start" flyout and creates the tile if the user confirms. |
| `RequestDeleteAsync()` | method | Shows the "Unpin from Start" flyout and removes the tile if confirmed. |
| `UpdateAsync()` | method | Updates properties of an already-pinned tile. |
| `FindAllAsync()` / `FindAllForPackageAsync()` | static method | Enumerates existing secondary tiles for the app / package. |
| `VisualElementsRequested` | event | Fired on `RequestCreateAsync`. |

## Notes

- Namespace: `Windows.UI.StartScreen` (WinRT).
- **In a desktop app (WinUI 3, WPF, WinForms), before calling any method that displays UI you must initialize the `SecondaryTile` object with the owner window's HWND** via `WinRT.Interop.InitializeWithWindow.Initialize(tile, hWnd)` (C#) or `IInitializeWithWindow::Initialize` (C++/WinRT) — otherwise Windows doesn't know where to draw the confirmation dialog and the call fails. This is the same HWND-initialization pattern used by `DataTransferManager`/sharing.
- Desktop apps must be MSIX-packaged (Desktop Bridge) to pin secondary tiles.
- To also pin the tile to the taskbar, pass it to `TaskbarManager.RequestPinSecondaryTileAsync`.

## Related

- [StartScreenManager](./start-screen-manager.md)
- [TaskbarManager](./taskbar-manager.md)
- [DataTransferManager](./data-transfer-manager.md)
