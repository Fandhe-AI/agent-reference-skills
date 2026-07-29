# AppNotificationManager

Provides APIs for managing app notifications, including showing and removing notifications in Notification Center (Action Center in Windows 10), updating notification progress, and registering/unregistering for app notification invocations. Get an instance via the `Default` property.

## Signature / Usage

```csharp
using Microsoft.Windows.AppNotifications;
using Microsoft.Windows.AppNotifications.Builder;

// Register for activation before calling AppInstance.GetActivatedEventArgs
AppNotificationManager.Default.NotificationInvoked += OnNotificationInvoked;
AppNotificationManager.Default.Register();

var notification = new AppNotificationBuilder()
    .AddText("Notification text.")
    .BuildNotification();

AppNotificationManager.Default.Show(notification);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Default` | `AppNotificationManager` (static property) | Gets the default (singleton) instance of the class. |
| `Setting` | `AppNotificationSetting` (property) | Gets the app notification setting status for the app (enabled or the mechanism through which it's disabled). |
| `Register()` / `Register(String, Uri)` | method | Registers the app to receive `NotificationInvoked` events when the user interacts with an app notification. |
| `Unregister()` | method | Unregisters the app from receiving `NotificationInvoked` events. |
| `UnregisterAll()` | method | Cleans up all registration-related data; app notifications stop functioning until `Register` is called again. |
| `Show(AppNotification)` | method | Displays the specified `AppNotification` in Action Center. Fails silently for elevated (admin) apps. |
| `GetAllAsync()` | method | Gets all app notifications for the calling app currently displayed in Action Center. |
| `RemoveByTagAsync(String)` | method | Asynchronously removes all app notifications with the specified `tag` identifier. |
| `RemoveByTagAndGroupAsync(String, String)` | method | Asynchronously removes all app notifications with the specified `tag` and `group` identifiers. |
| `RemoveByGroupAsync(String)` | method | Asynchronously removes all app notifications with the specified `group` identifier. |
| `RemoveByIdAsync(UInt32)` | method | Asynchronously removes the app notification with the specified ID. |
| `RemoveAllAsync()` | method | Asynchronously removes all app notifications for the app. |
| `UpdateAsync(AppNotificationProgressData, String, [String])` | method | Updates the progress data for app notifications matching the given tag (and optional group). |
| `IsSupported()` | method | Gets a boolean indicating whether the push notification APIs are supported for the calling app. |
| `NotificationInvoked` | event | Raised when an app notification for the app is invoked through user interaction. |

## Notes

- Package: `Microsoft.Windows.AppNotifications` (Windows App SDK, WinRT). Distinct from `System.Windows.Controls` (WPF), the JS `@ark-ui/react` / `@chakra-ui/react` APIs, and Jetpack Compose.
- `AppNotificationManager` depends on the Singleton package; self-contained (unpackaged) apps have extra deployment considerations (additional MSIX packages).
- You must call `Register` before `Microsoft.Windows.AppLifecycle.AppInstance.GetActivatedEventArgs`, and you must register `NotificationInvoked` handlers before calling `Register` to avoid a `COMException` at runtime.
- App notifications aren't supported for elevated (admin) apps; `Show` fails silently in that case.

## Related

- [AppNotification](./app-notification.md)
- [AppNotificationBuilder](./app-notification-builder.md)
- [AppNotificationActivatedEventArgs](./app-notification-activated-event-args.md)
- [Notification listener](./notification-listener.md)
