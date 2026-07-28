# TaskbarManager

Provides methods for pinning the current app (or a secondary tile) to the Windows taskbar.

## Signature / Usage

```csharp
// Check whether pinning is available and not already done
bool isPinningAllowed = TaskbarManager.GetDefault().IsPinningAllowed;
bool isPinned = await TaskbarManager.GetDefault().IsCurrentAppPinnedAsync();

if (isPinningAllowed && !isPinned)
{
    // Must be called from a foreground UI thread in response to explicit user interaction.
    bool nowPinned = await TaskbarManager.GetDefault().RequestPinCurrentAppAsync();
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `TaskbarManager.GetDefault()` | static method | Returns the `TaskbarManager` for the current process. |
| `IsSupported` | property | Whether the taskbar is present on this device (desktop only). |
| `IsPinningAllowed` | property | Whether pinning to the taskbar is currently allowed (can be disabled by group policy). |
| `IsCurrentAppPinnedAsync()` | method | Checks whether the current app is already pinned. |
| `RequestPinCurrentAppAsync()` | method | Shows a confirmation dialog and pins the current app if the user approves. Must run on the foreground UI thread and the app must be in the foreground. |
| `IsAppListEntryPinnedAsync(AppListEntry)` / `RequestPinAppListEntryAsync(AppListEntry)` | method | Same as above but for a specific `AppListEntry` (e.g. a multi-entry app). |
| `IsSecondaryTilePinnedAsync(String)` / `RequestPinSecondaryTileAsync(SecondaryTile)` / `TryUnpinSecondaryTileAsync(String)` | method | Pin/unpin a `SecondaryTile` to the taskbar (Limited Access Feature on some Windows versions). |

## Notes

- Namespace: `Windows.UI.Shell` (WinRT), introduced Windows 10 Fall Creators Update (1809/16299).
- Taskbar pinning is a **Limited Access Feature (LAF)** on some Windows versions — call `LimitedAccessFeatures.TryUnlockFeature` first, or check the registry seed value described in the official guide, before calling the pin APIs; the restriction is being phased out starting with certain 2026 builds.
- Requirements enforced at call time (no exception if unmet, the request is silently denied): the app must be in the foreground, must have a Start menu entry, and system notifications must be enabled for the confirmation dialog to show.
- For a Win32 desktop app, verify `ITaskbarManagerDesktopAppSupportStatics` exists on the `TaskbarManager` activation factory before using the class.

## Related

- [SecondaryTile](./secondary-tile.md)
- [StartScreenManager](./start-screen-manager.md)
