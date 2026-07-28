# StartScreenManager

Represents a Start screen manager object; used to query and request pinning of the app or its secondary tiles to the Start menu.

## Signature / Usage

```csharp
var startScreenManager = Windows.UI.StartScreen.StartScreenManager.GetDefault();

bool isTilePinned = await startScreenManager.ContainsSecondaryTileAsync(tile.TileId);
if (!isTilePinned)
{
    bool created = await tile.RequestCreateAsync();
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `StartScreenManager.GetDefault()` | static method | Gets the current Start screen manager for the calling app. |
| `GetForUser(User)` | static method | Gets the Start screen manager for a specific user. |
| `User` | property | The user associated with this Start screen manager. |
| `ContainsAppListEntryAsync(AppListEntry)` | method | Checks whether the app is currently pinned to Start. |
| `SupportsAppListEntry(AppListEntry)` | method | Checks whether the app can be pinned to Start at all. |
| `RequestAddAppListEntryAsync(AppListEntry)` | method | Requests to pin the app itself to Start; shows a confirmation dialog. Must be called on the UI thread on device families that require it. |
| `ContainsSecondaryTileAsync(String)` | method | Checks whether the specified secondary tile (by `TileId`) is pinned to Start. |
| `TryRemoveSecondaryTileAsync(String)` | method | Removes the specified secondary tile from Start without a confirmation prompt. |

## Notes

- Namespace: `Windows.UI.StartScreen` (WinRT), introduced Windows 10 Creators Update (1703/15063); `ContainsSecondaryTileAsync`/`TryRemoveSecondaryTileAsync` added in 1809/17763.
- Complements [SecondaryTile](./secondary-tile.md): `SecondaryTile.RequestCreateAsync`/`RequestDeleteAsync` show flyouts scoped to that specific tile instance, while `StartScreenManager` offers app-wide queries (`ContainsAppListEntryAsync`) and silent removal (`TryRemoveSecondaryTileAsync`).

## Related

- [SecondaryTile](./secondary-tile.md)
- [TaskbarManager](./taskbar-manager.md)
