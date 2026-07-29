# Scheduled app notifications (ScheduledToastNotification)

Schedules an app notification to appear at a future time, regardless of whether the app is running when it fires. Built with `AppNotificationBuilder` for content, then delivered through the `Windows.UI.Notifications` scheduling APIs rather than `AppNotificationManager.Show`.

## Signature / Usage

```csharp
using Microsoft.Windows.AppNotifications.Builder;
using Windows.UI.Notifications;
using Windows.Data.Xml.Dom;

var payload = new AppNotificationBuilder()
    .AddArgument("action", "viewItemsDueToday")
    .AddText("ASTR 170B1")
    .AddText("You have 3 items due today!")
    .BuildNotification()
    .Payload;

var doc = new XmlDocument();
doc.LoadXml(payload);

var scheduledNotification = new ScheduledToastNotification(doc, DateTimeOffset.Now.AddSeconds(10));
scheduledNotification.Tag = "18365";
scheduledNotification.Group = "ASTR 170B1";

ToastNotificationManager.CreateToastNotifier().AddToSchedule(scheduledNotification);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ScheduledToastNotification(XmlDocument, DateTimeOffset)` | constructor | Wraps the XML payload with the delivery time. |
| `ScheduledToastNotification.Tag` / `.Group` | string | Composite primary key for the scheduled notification, used later to find and cancel/replace it. |
| `ToastNotificationManager.CreateToastNotifier()` | method | Returns the `ToastNotifier` used to schedule/cancel notifications for the app. |
| `ToastNotifier.AddToSchedule(ScheduledToastNotification)` | method | Queues the notification for delivery at its specified time. |
| `ToastNotifier.GetScheduledToastNotifications()` | method | Returns all currently pending scheduled notifications for the app. |
| `ToastNotifier.RemoveFromSchedule(ScheduledToastNotification)` | method | Cancels a pending scheduled notification before it fires. |

## Notes

- Namespace: `Windows.UI.Notifications` (scheduling) used alongside `Microsoft.Windows.AppNotifications.Builder` (content).
- Scheduled notifications have a 5-minute delivery window; if the machine is off for longer than that at the scheduled time, the notification is dropped. For guaranteed delivery use a time-triggered background task instead.
- `AppNotificationBuilder` itself has no schedule method — build the payload, then wrap it in a `ScheduledToastNotification` for delivery.

## Related

- [AppNotificationBuilder](./app-notification-builder.md)
- [AppNotification collections](./app-notification-collections.md)
- [Toast content schema](./toast-content-schema.md)
