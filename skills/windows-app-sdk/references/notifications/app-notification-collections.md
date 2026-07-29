# App notification collections (ToastCollection)

Groups an app's notifications in Notification Center under a separate title and icon, as if each collection were its own app — e.g. one collection per chat group in a messaging app. For a lighter-weight grouping under the app's own notifications, see the toast header (`ToastHeader`) in the toast content schema.

## Signature / Usage

```csharp
using Windows.UI.Notifications;

// Create a collection (display name, icon, and launch argument)
var collection = new ToastCollection(
    "MyToastCollection",
    "Work Email",
    "NavigateToWorkEmailInbox",
    new Uri("ms-appx:///Assets/workEmail.png"));

await ToastNotificationManager.GetDefault()
    .GetToastCollectionManager()
    .SaveToastCollectionAsync(collection);

// Send a notification into the collection
var payload = new Microsoft.Windows.AppNotifications.Builder.AppNotificationBuilder()
    .AddText("Adam sent a message to the group")
    .BuildNotification()
    .Payload;

var doc = new Windows.Data.Xml.Dom.XmlDocument();
doc.LoadXml(payload);
var toast = new ToastNotification(doc);

var notifier = await ToastNotificationManager.GetDefault()
    .GetToastNotifierForToastCollectionIdAsync("MyToastCollection");
notifier.Show(toast);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ToastCollection(String id, String displayName, String launchArgs, Uri icon)` | constructor | Defines a collection's identity, title, click-through launch argument, and icon shown in Notification Center. |
| `ToastCollectionManager.SaveToastCollectionAsync(ToastCollection)` | method | Creates a new collection, or updates an existing one (same `id`, new field values). |
| `ToastCollectionManager.FindAllToastCollectionsAsync()` | method | Lists all collections created by the app. |
| `ToastCollectionManager.RemoveToastCollectionAsync(String id)` | method | Deletes a collection and every notification it contains. |
| `ToastNotificationManagerForUser.GetToastNotifierForToastCollectionIdAsync(String id)` | method | Returns a `ToastNotifier` scoped to the collection, used to `Show` notifications into it. |
| `ToastNotificationManager.GetHistoryForToastCollectionAsync(String id)` | method | Returns the `ToastNotificationHistory` for the collection, for `Remove(tag, group)` / `Clear()` of its notifications. |

## Notes

- Namespace: `Windows.UI.Notifications` (`ToastCollection`, `ToastCollectionManager`), used alongside `Microsoft.Windows.AppNotifications.Builder` for content.
- Removing a collection (`RemoveToastCollectionAsync`) also removes every notification inside it from Notification Center.

## Related

- [AppNotificationBuilder](./app-notification-builder.md)
- [Scheduled app notifications](./app-notification-scheduled.md)
- [Toast content schema](./toast-content-schema.md)
