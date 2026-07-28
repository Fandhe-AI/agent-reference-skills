# Badge notifications

A badge conveys summary or status information specific to an app (e.g. unread mail count, connection status). Badges appear on the app's taskbar icon and start tile regardless of whether the app is running, and are either numeric (1-99) or one of a fixed set of system-provided glyphs. Custom badge images aren't supported.

## Signature / Usage

```csharp
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
| Numeric badge | `<badge value="1"/>` ... `<badge value="99"/>`, `<badge value="100"/>`+ | A number from 1-99 renders as-is; a value of 0 clears the badge; values above 99 render as an overflow indicator. |
| Glyph badge | `<badge value="..."/>` | One of a fixed set: `none`, `activity`, `alarm`, `alert`, `attention`, `available`, `away`, `busy`, `error`, `newMessage`, `paused`, `playing`, `unavailable`. |
| `BadgeUpdateManager.GetTemplateContent(BadgeTemplateType)` | method | Returns a blank `XmlDocument` payload for `BadgeTemplateType.BadgeNumber` or `BadgeTemplateType.BadgeGlyph`. |
| `BadgeNotification(XmlDocument)` | constructor | Wraps the XML payload as a badge notification object. |
| `BadgeUpdateManager.CreateBadgeUpdaterForApplication()` | method | Returns a `BadgeUpdater` for the current app. |
| `BadgeUpdater.Update(BadgeNotification)` | method | Applies the badge. |
| `BadgeUpdater.Clear()` | method | Clears the current badge. |

## Notes

- APIs (`BadgeUpdateManager`, `BadgeNotification`, `BadgeUpdater`) are UWP `Windows.UI.Notifications` types, usable from Windows App SDK apps; not part of `Microsoft.Windows.AppNotifications`.

## Related

- [Toast content schema](./toast-content-schema.md)
- [AppNotificationManager](./app-notification-manager.md)
