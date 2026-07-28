# Manage app state effectively

Saving and restoring application state in a Windows App SDK desktop app, which runs continuously (no automatic UWP-style suspend/resume/terminate lifecycle).

## Signature / Usage

```csharp
var appWindow = this.AppWindow;
appWindow.Closing += AppWindow_Closing;

void AppWindow_Closing(AppWindow sender, AppWindowClosingEventArgs args)
{
    SaveCurrentDocument();
    SaveWindowPosition();
}
```

## Options / Props

| API | Purpose |
|-----|---------|
| `Microsoft.UI.Windowing.AppWindow.Closing` (`AppWindowClosingEventArgs.Cancel`) | Cancellable shutdown hook — the WinUI 3 `Window.Closed` event does *not* support cancellation, so use this instead to prompt for unsaved changes |
| `Windows.Storage.ApplicationData.Current.LocalSettings` / `LocalFolder` | Packaged (MSIX) app storage for settings/data, requires package identity |
| `Environment.SpecialFolder.LocalApplicationData` | Storage location for unpackaged desktop apps (no package identity) |
| `PowerManager.EnergySaverStatusChanged` | Event to adapt state-saving/behavior based on energy saver state |

## Notes

- Desktop Windows App SDK apps do **not** automatically suspend/resume like UWP apps — implement state saving to guard against unexpected shutdowns, restarts, and power loss instead.
- Save state incrementally as the user works rather than only at shutdown, to reduce data-loss risk and spread I/O cost.
- Use a guard flag (e.g. `_isClosing`) when calling `this.Close()` from within the `Closing` handler to avoid re-entrancy, since `Close()` re-triggers the event.
- Use async I/O (`File.WriteAllTextAsync`, `FileStream` with `useAsync: true`) so state saves don't block the UI thread.

## Related

- [Optimize background activity](./optimize-background-activity.md)
- [Keep the UI thread responsive](./keep-ui-thread-responsive.md)
