# AppNotificationBuilder

Provides a fluent API for constructing the XML payload that defines the content and behavior of an app notification, without hand-writing the toast XML schema.

## Signature / Usage

```csharp
using Microsoft.Windows.AppNotifications;
using Microsoft.Windows.AppNotifications.Builder;

var appNotification = new AppNotificationBuilder()
    .AddArgument("action", "NotificationClick")
    .AddArgument("exampleEventId", "1234")
    .SetAppLogoOverride(new System.Uri("ms-appx:///Assets/Square150x150Logo.png"), AppNotificationImageCrop.Circle)
    .AddText("This is text content for an app notification.")
    .AddButton(new AppNotificationButton("Perform action without launching app")
        .AddArgument("action", "BackgroundAction"))
    .SetScenario(AppNotificationScenario.Reminder)
    .BuildNotification();

AppNotificationManager.Default.Show(appNotification);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `AppNotificationBuilder()` | constructor | Initializes a new builder instance. |
| `AddArgument(String key, String value)` | method | Adds a key/value argument to the notification's XML payload, returned to the app when the notification (or an element without its own arguments) is invoked. |
| `AddText(String)` / `AddText(String, AppNotificationTextProperties)` | method | Adds a block of text, optionally with display/localization properties. Up to 3 top-level text elements are supported. |
| `AddButton(AppNotificationButton)` | method | Adds a button; buttons can carry their own `AddArgument` values distinct from the notification body's. |
| `AddTextBox(String id, ...)` | method | Adds a text box input to the notification. |
| `AddComboBox(AppNotificationComboBox)` | method | Adds a combo box (selection) input. |
| `AddProgressBar(AppNotificationProgressBar)` | method | Adds a progress bar element. |
| `SetScenario(AppNotificationScenario)` | method | Sets the scenario (`Default`, `Reminder`, `Alarm`, `IncomingCall`, `Urgent`), adjusting notification behavior (pre-expanded, persistent, looping audio, etc.) for a consistent experience. |
| `SetAppLogoOverride(Uri, [AppNotificationImageCrop], [String])` | method | Sets the image displayed on the left side of the notification, with optional cropping and alt text. |
| `SetHeroImage(Uri, [String])` | method | Sets a full-width featured image at the top of the notification. |
| `SetInlineImage(Uri, [AppNotificationImageCrop], [String])` | method | Sets an inline image after text elements. |
| `SetAttributionText(String, [String])` | method | Sets attribution text displayed at the bottom of the notification. |
| `SetAudioEvent(AppNotificationSoundEvent, [AppNotificationAudioLooping])` / `SetAudioUri(Uri, [AppNotificationAudioLooping])` | method | Configures the sound played when the notification is shown. |
| `MuteAudio()` | method | Requests the system mute any audio associated with the notification. |
| `SetDuration(AppNotificationDuration)` | method | Sets how long the notification is displayed. |
| `SetGroup(String)` / `SetTag(String)` | method | Sets the `group` / `tag` identifiers, used later for targeted removal. |
| `SetTimeStamp(DateTime)` | method | Sets a custom timestamp overriding the delivery time shown to the user. |
| `IsUrgentScenarioSupported()` | method | Returns whether the `Urgent` scenario is supported on the current device (Windows 10 Build 19041+). |
| `BuildNotification()` | method | Returns the built `AppNotification` object representing the XML payload. |

## Notes

- Package: `Microsoft.Windows.AppNotifications.Builder` (Windows App SDK, WinRT).
- `AppNotificationButton` (used with `AddButton`) has its own `AddArgument` method, chainable separately from the builder's own arguments.
- For raw XML instead of the builder API, see the toast content schema.

## Related

- [AppNotification](./app-notification.md)
- [AppNotificationManager](./app-notification-manager.md)
- [Toast content schema](./toast-content-schema.md)
- [Scheduled app notifications](./app-notification-scheduled.md)
- [App notification collections](./app-notification-collections.md)
