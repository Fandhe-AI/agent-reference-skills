# Pin to taskbar (how-to)

Task-focused guide for programmatically requesting that the user pin a Win32 or WinUI app to the taskbar, complementing the [TaskbarManager](./taskbar-manager.md) API reference with UX guidance and the Limited Access Feature (LAF) unlock check.

## Signature / Usage

```cpp
// 1. (Desktop apps only) verify TaskbarManager desktop support exists.
if (winrt::try_get_activation_factory<winrt::Windows::UI::Shell::TaskbarManager,
        winrt::Windows::UI::Shell::ITaskbarManagerDesktopAppSupportStatics>())
{
    // TaskbarManager desktop app support is available.
}
```

```csharp
// 2. Check whether the taskbar allows pinning right now.
bool isPinningAllowed = TaskbarManager.GetDefault().IsPinningAllowed;

// 3. Check whether the app is already pinned.
bool isPinned = await TaskbarManager.GetDefault().IsCurrentAppPinnedAsync();

// 4. Ask the user to pin (must run on the foreground UI thread, in response to user interaction).
if (isPinningAllowed && !isPinned)
{
    bool nowPinned = await TaskbarManager.GetDefault().RequestPinCurrentAppAsync();
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ITaskbarManagerDesktopAppSupportStatics` | marker interface | Check on the `TaskbarManager` activation factory to confirm desktop-app taskbar support is present before using the class from a Win32 app. |
| `TaskbarManager.IsPinningAllowed` | property | Whether the taskbar is present and currently allows pinning (can be disabled by group policy). |
| `TaskbarManager.IsCurrentAppPinnedAsync()` | method | Checks whether the app is already pinned, to avoid re-prompting. |
| `TaskbarManager.RequestPinCurrentAppAsync()` | method | Shows a confirmation dialog; returns `true` immediately if already pinned, `true` if the user approves, `false` if declined or not allowed. Must be called from the foreground UI thread. |
| LAF seed value `com.microsoft.windows.taskbar.pin` | registry check | `HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\AppModel\LimitedAccessFeatures\com.microsoft.windows.taskbar.pin` seed value `4096B239A7295B635C090E647E867B5707DA6AB6CB78340B01FE4E0C8F4953D4` — read this to determine whether `LimitedAccessFeatures.TryUnlockFeature` must be called before pin APIs on a given Windows build. |

## Notes

- Namespace: `Windows.UI.Shell` (WinRT), same namespace as [TaskbarManager](./taskbar-manager.md). **Requires Fall Creators Update**: target SDK 16299 / build 16299 or later.
- Taskbar Pinning is a Limited Access Feature (LAF) on some Windows versions; call `LimitedAccessFeatures.TryUnlockFeature` first unless the registry seed check shows it's unnecessary. The LAF restriction is being removed starting with KB5074105 (OS Builds 26200.7705 / 26100.7705).
- Pin requests are silently denied (no exception) unless: the app is in the foreground, has a Start menu entry, and (for the confirmation dialog) system notifications are enabled.
- UX guidance: don't use disruptive dialogs/flyouts to prompt pinning, don't ask if already pinned or unsupported, don't repeatedly prompt, don't call the API from an installer or without explicit user interaction.
- This how-to is UWP/WinUI/Win32-oriented; the underlying API is fully documented in [TaskbarManager](./taskbar-manager.md).

## Related

- [TaskbarManager](./taskbar-manager.md)
- [StartScreenManager](./start-screen-manager.md)
- [SecondaryTile](./secondary-tile.md)
