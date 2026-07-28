# AppNotification

Represents an app notification (toast). Construct one directly from an XML payload, or build one with `AppNotificationBuilder.BuildNotification()`.

## Signature / Usage

```csharp
using Microsoft.Windows.AppNotifications;

var xmlPayload = "<toast><visual><binding template=\"ToastGeneric\"><text>Hello</text></binding></visual></toast>";
var notification = new AppNotification(xmlPayload);
notification.Tag = "tag001";
notification.Group = "group001";

AppNotificationManager.Default.Show(notification);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `AppNotification(String)` | constructor | Creates a new instance from a raw XML payload string. |
| `Id` | `UInt32` | Gets a unique, platform-generated identifier for the app notification. |
| `Tag` | `String` | Unique identifier used to identify a set of app notifications across groups. |
| `Group` | `String` | Unique identifier for an app notification group. |
| `Payload` | `String` | Gets the notification's XML payload. |
| `Priority` | `AppNotificationPriority` | Gets or sets the priority for the app notification. |
| `Expiration` | `DateTime` | Gets or sets the time after which the notification should not be displayed. |
| `ExpiresOnReboot` | `Boolean` | Whether the notification remains in Action Center after a reboot. |
| `Progress` | `AppNotificationProgressData` | Gets or sets progress information for the notification. |
| `SuppressDisplay` | `Boolean` | Whether the notification's pop-up UI is displayed on screen. |

## Notes

- Package: `Microsoft.Windows.AppNotifications` (Windows App SDK, WinRT).
- Typically not constructed directly; use `AppNotificationBuilder` to compose content, then call `BuildNotification()` to obtain an `AppNotification`.

## Related

- [AppNotificationManager](./app-notification-manager.md)
- [AppNotificationBuilder](./app-notification-builder.md)
- [Toast content schema](./toast-content-schema.md)
