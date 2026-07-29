# Notification listener (UserNotificationListener)

Lets an app access and interact with all of the user's notifications, including notifications sent by other apps — for scenarios like mirroring notifications to a companion device, reacting to other apps' notifications, or syncing notification state across devices. Requires the `User Notification Listener` app capability and user-granted access.

## Signature / Usage

```csharp
using Windows.UI.Notifications;
using Windows.UI.Notifications.Management;

// Get the listener and request access (must be called from the UI thread)
UserNotificationListener listener = UserNotificationListener.Current;
UserNotificationListenerAccessStatus accessStatus = await listener.RequestAccessAsync();

if (accessStatus == UserNotificationListenerAccessStatus.Allowed)
{
    // Get all current toast notifications from every app
    IReadOnlyList<UserNotification> notifs =
        await listener.GetNotificationsAsync(NotificationKinds.Toast);

    UserNotification notif = notifs[0];
    string appDisplayName = notif.AppInfo.DisplayInfo.DisplayName;

    NotificationBinding toastBinding =
        notif.Notification.Visual.GetBinding(KnownNotificationBindings.ToastGeneric);
    IReadOnlyList<AdaptiveNotificationText> textElements = toastBinding.GetTextElements();

    // Remove a specific notification once handled
    listener.RemoveNotification(notif.Id);
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `UserNotificationListener.Current` | static property | Gets the listener instance for the app. |
| `RequestAccessAsync()` | method | Prompts the user for permission; returns `Allowed`, `Denied`, or `Unspecified`. Once `Denied`, further calls return `Denied` instantly until the user re-enables access in Windows Settings. |
| `GetAccessStatus()` | method | Returns the current `UserNotificationListenerAccessStatus` without prompting; check before calling other listener APIs since access can be revoked at any time. |
| `GetNotificationsAsync(NotificationKinds)` | method | Returns the current `UserNotification` list; only `NotificationKinds.Toast` is currently supported. |
| `RemoveNotification(UInt32 notificationId)` | method | Removes the specified notification (by `UserNotification.Id`) from Notification Center. |
| `ClearNotifications()` | method | Removes all of the user's notifications across every app. Use with caution — clears notifications your app never displayed. |
| `NotificationChanged` | event | Raised in-process when a notification is added or dismissed while the app is running. |
| `UserNotificationChangedTrigger` | class (`Windows.ApplicationModel.Background`) | Background-task trigger fired on notification add/dismiss even when the app isn't running; register with the Windows App SDK `BackgroundTaskBuilder`. |
| `UserNotification.AppInfo` / `.CreationTime` / `.Id` / `.Notification` | properties | Source app info, creation time, notification ID, and the notification's `Notification` content (mirrors the sent toast's `Visual`/bindings/text elements). |

## Notes

- Namespace: `Windows.UI.Notifications.Management` (`UserNotificationListener`) plus `Windows.UI.Notifications` (`UserNotification`, `NotificationBinding`); used alongside `Microsoft.Windows.AppNotifications` for sending.
- Requires adding the `User Notification Listener` capability to the app package manifest; the user must separately grant access via `RequestAccessAsync` (revocable anytime in Windows Settings).
- If access is revoked, listener APIs silently fail (e.g. `GetNotificationsAsync` returns an empty list) rather than throwing.
- The background-task trigger reports only that something changed, not what changed — resync via `GetNotificationsAsync` and diff against locally tracked IDs.

## Related

- [AppNotificationManager](./app-notification-manager.md)
- [AppNotification collections](./app-notification-collections.md)
