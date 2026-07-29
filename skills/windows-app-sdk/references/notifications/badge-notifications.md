# Badge notifications

A badge conveys summary or status information specific to an app (e.g. unread mail count, connection status). Badges appear on the app's taskbar icon and start tile regardless of whether the app is running, and are either numeric (1-99) or one of a fixed set of system-provided glyphs. Custom badge images aren't supported.

## Signature / Usage

```csharp
using Microsoft.Windows.BadgeNotifications;

// Set a numeric badge
BadgeNotificationManager.Current.SetBadgeAsCount(20);

// Set a glyph badge
BadgeNotificationManager.Current.SetBadgeAsGlyph(BadgeNotificationGlyph.Alert);

// Clear the badge
BadgeNotificationManager.Current.ClearBadge();
```

```csharp
// Legacy UWP API (Windows.UI.Notifications), also usable from Windows App SDK apps
private void SetBadgeNumber(int num)
{
    // Get the blank badge XML payload for a badge number
    XmlDocument badgeXml =
        BadgeUpdateManager.GetTemplateContent(BadgeTemplateType.BadgeNumber);

    // Set the value of the badge in the XML to the number
    XmlElement badgeElement = badgeXml.SelectSingleNode("/badge") as XmlElement;
    badgeElement.SetAttribute("value", num.ToString());

    var badge = new BadgeNotification(badgeXml);
    var badgeUpdater = BadgeUpdateManager.CreateBadgeUpdaterForApplication();
    badgeUpdater.Update(badge);
}

// Clear a badge
BadgeUpdateManager.CreateBadgeUpdaterForApplication().Clear();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `BadgeNotificationManager.Current` | property | Gets the `BadgeNotificationManager` instance for the current app. |
| `BadgeNotificationManager.SetBadgeAsCount(UInt32)` | method | Applies a numeric badge (1-99; higher values render as `99+`) to the app's taskbar icon. |
| `BadgeNotificationManager.SetBadgeAsGlyph(BadgeNotificationGlyph)` | method | Applies a system-provided glyph badge to the app's taskbar icon. |
| `BadgeNotificationManager.ClearBadge()` | method | Removes the badge from the app's taskbar icon. |
| `BadgeNotificationGlyph` | enum | `None`, `Activity`, `Alarm`, `Alert`, `Attention`, `Available`, `Away`, `Busy`, `Error`, `NewMessage`, `Paused`, `Playing`, `Unavailable`. |
| Numeric badge (legacy XML) | `<badge value="1"/>` ... `<badge value="99"/>`, `<badge value="100"/>`+ | A number from 1-99 renders as-is; a value of 0 clears the badge; values above 99 render as an overflow indicator. |
| Glyph badge (legacy XML) | `<badge value="..."/>` | One of a fixed set: `none`, `activity`, `alarm`, `alert`, `attention`, `available`, `away`, `busy`, `error`, `newMessage`, `paused`, `playing`, `unavailable`. |
| `BadgeUpdateManager.GetTemplateContent(BadgeTemplateType)` | method | Returns a blank `XmlDocument` payload for `BadgeTemplateType.BadgeNumber` or `BadgeTemplateType.BadgeGlyph`. |
| `BadgeNotification(XmlDocument)` | constructor | Wraps the XML payload as a badge notification object (legacy API). |
| `BadgeUpdateManager.CreateBadgeUpdaterForApplication()` | method | Returns a `BadgeUpdater` for the current app (legacy API). |
| `BadgeUpdater.Update(BadgeNotification)` | method | Applies the badge (legacy API). |
| `BadgeUpdater.Clear()` | method | Clears the current badge (legacy API). |

## Notes

- `Microsoft.Windows.BadgeNotifications.BadgeNotificationManager` (available since Windows App SDK 1.7) is the Windows-App-SDK-native API — no XML payload required. Prefer it over the legacy API below for new code.
- The legacy APIs (`BadgeUpdateManager`, `BadgeNotification`, `BadgeUpdater`) are UWP `Windows.UI.Notifications` types, usable from Windows App SDK apps; not part of `Microsoft.Windows.AppNotifications` or `Microsoft.Windows.BadgeNotifications`.

## Related

- [Toast content schema](./toast-content-schema.md)
- [AppNotificationManager](./app-notification-manager.md)
