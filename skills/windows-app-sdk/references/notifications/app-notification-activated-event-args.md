# AppNotificationActivatedEventArgs

Represents event args associated with an app activation triggered by an app notification (the notification body or one of its buttons was clicked).

## Signature / Usage

```csharp
using Microsoft.Windows.AppLifecycle;
using Microsoft.Windows.AppNotifications;

var activatedArgs = AppInstance.GetCurrent().GetActivatedEventArgs();

if (activatedArgs.Kind == ExtendedActivationKind.AppNotification)
{
    var notificationArgs = (AppNotificationActivatedEventArgs)activatedArgs.Data;
    var action = notificationArgs.Arguments.ContainsKey("action")
        ? notificationArgs.Arguments["action"]
        : "(none)";
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Argument` | `String` | Gets the text provided in the `arguments` attribute of the `action` element associated with the button that triggered activation. |
| `Arguments` | `IDictionary<String, String>` | Gets a dictionary of arguments set via `arguments` on the action element that triggered activation. |
| `UserInput` | `IDictionary<String, String>` | Gets a map of IDs and values for the input elements (text box / selection box) of the notification. |

## Notes

- Package: `Microsoft.Windows.AppNotifications` (Windows App SDK, WinRT).
- Obtain an instance by calling `Microsoft.Windows.AppLifecycle.AppInstance.GetActivatedEventArgs`, checking `AppActivationArguments.Kind` for `ExtendedActivationKind.AppNotification`, then casting `AppActivationArguments.Data`.
- When the app is not already running, Windows launches it via COM activation and the activation kind is reported as `Launch`, not `AppNotification`; in that case the notification arguments arrive through the `AppNotificationManager.NotificationInvoked` event instead, which must be registered (and `Register()` called) before checking `GetActivatedEventArgs`.
- Setting `activationType="background"` in the notification XML is ignored for desktop apps — the app must inspect the arguments itself and decide whether to show a window.

## Related

- [AppNotificationManager](./app-notification-manager.md)
- [AppNotificationBuilder](./app-notification-builder.md)
