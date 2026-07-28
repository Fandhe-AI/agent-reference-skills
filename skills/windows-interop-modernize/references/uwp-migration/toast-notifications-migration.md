# App notifications (toast) from UWP to WinUI migration

Migration guidance for local app notifications ("toast notifications"). Sending and managing notification content is unchanged from UWP — only **activation handling** differs, moving from `App.OnActivated` to `AppNotificationManager` + `App.OnLaunched`.

## Signature / Usage

```csharp
// App.xaml.cs in a WinUI app — register before any activation-args retrieval
protected override void OnLaunched(Microsoft.UI.Xaml.LaunchActivatedEventArgs args)
{
    m_window = new MainWindow();

    // Register for NotificationInvoked *before* calling Register(), otherwise a new
    // process is launched to handle the notification instead of this one.
    AppNotificationManager notificationManager = AppNotificationManager.Default;
    notificationManager.NotificationInvoked += NotificationManager_NotificationInvoked;
    notificationManager.Register();

    var activatedArgs = Microsoft.Windows.AppLifecycle.AppInstance.GetCurrent().GetActivatedEventArgs();
    if (activatedArgs.Kind != ExtendedActivationKind.AppNotification)
    {
        LaunchAndBringToForegroundIfNeeded();
    }
    else
    {
        HandleNotification((AppNotificationActivatedEventArgs)activatedArgs.Data);
    }
}
```

```csharp
// Building and sending notification content with AppNotificationBuilder
using Microsoft.Windows.AppNotifications;
using Microsoft.Windows.AppNotifications.Builder;

var builder = new AppNotificationBuilder()
    .AddText("Send a message.")
    .AddTextBox("textBox")
    .AddButton(new AppNotificationButton("Send").AddArgument("action", "sendMessage"));

AppNotificationManager.Default.Show(builder.BuildNotification());
```

## Options / Props

| Category | UWP | WinUI (Windows App SDK) |
|------|-------------|------|
| Foreground activation entry point | `App.OnActivated` | `App.OnLaunched` |
| Background activation entry point | Handled separately as a background task | Same as foreground — `App.OnLaunched`; use `AppInstance.GetActivatedEventArgs` to decide full launch vs. handle-and-quit |
| Window activation | Window automatically foregrounded on activation | App must explicitly bring the window to the foreground (e.g. `ShowWindow`/`SetForegroundWindow` via P/Invoke) |
| Content-building API | `ToastContentBuilder` (Windows Community Toolkit) | `AppNotificationBuilder` (Microsoft.Windows.AppNotifications.Builder), or raw XML |
| Sending | `ToastNotification` | `AppNotificationManager.Show` |

## Notes

- "Toast notification" is being phased out in favor of "app notification" in documentation — both terms refer to the same Windows feature.
- `Package.appxmanifest` needs `xmlns:com`/`xmlns:desktop` namespace declarations, a `desktop:Extension` for `windows.toastNotificationActivation` with your activator CLSID, and (MSIX) a matching `com:Extension` COM server registration with `Arguments="----AppNotificationActivated:"` so relaunch is recognized as notification-driven.
- Do not mix Windows Community Toolkit (`ToastNotificationManagerCompat`) and Windows App SDK (`AppNotificationManager`) APIs in the same app — pick one activation path.
- Always dispatch UI-affecting work (showing/foregrounding a window) inside `DispatcherQueue.TryEnqueue` from within the notification-invoked handler.

## Related

- [Application lifecycle functionality migration](./applifecycle-migration.md)
- [Push notifications functionality migration](./push-notifications-migration.md)
