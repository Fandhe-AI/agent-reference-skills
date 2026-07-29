# FocusSessionManager

`Windows.UI.Shell.FocusSessionManager` detects whether Windows 11's Focus feature (Do Not Disturb, silenced icon flashing/badge notifications) is currently active, so an app can reduce its own distracting behavior (auto-playing GIFs, animations, sounds) while a Focus session is running.

## Signature / Usage

```csharp
private void UpdateStatusBar(string message)
{
    var focusActive = false;
    if (Windows.UI.Shell.FocusSessionManager.IsSupported)
    {
        var manager = Windows.UI.Shell.FocusSessionManager.GetDefault();
        focusActive = manager.IsFocusActive;
    }

    if (!focusActive)
    {
        statusTextBlock.Text = message;
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `IsSupported` | static property → `bool` | Whether `FocusSessionManager` is supported on the current device. Check before reading any other member. |
| `GetDefault()` | static method → `FocusSessionManager` | Returns the manager instance for the current app. |
| `IsFocusActive` | property → `bool` | Whether a Focus session is currently active on the device. |
| `IsFocusActiveChanged` | event | Raised when the device's Focus session state changes; read `sender.IsFocusActive` in the handler for the new value. |

## Notes

- Namespace: `Windows.UI.Shell` — a Windows OS API surface documented alongside Windows App SDK's app-lifecycle-and-system-services features, not a `Microsoft.Windows.*` Windows App SDK type.
- Always gate access behind `IsSupported`; the API is unavailable on devices/OS versions that don't have the Focus feature.
- Unregister `IsFocusActiveChanged` when no longer needed, the same as other Windows Runtime events.

## Related

- [PowerManager](./power-manager.md)
