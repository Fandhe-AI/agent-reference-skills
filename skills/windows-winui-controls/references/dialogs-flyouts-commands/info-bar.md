# InfoBar

An inline, non-intrusive notification for app-wide status messages. Unlike a dialog or flyout, an `InfoBar` takes up space in the layout like any other child element instead of floating on top of content.

## Signature / Usage

```xaml
<InfoBar x:Name="SubscriptionExpiringNotification"
    Severity="Warning"
    Title="Your subscription is expiring in 3 days."
    Message="Renew your subscription to keep all functionality" />
```

```csharp
UpdateAvailableNotification.IsOpen = true;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| IsOpen | bool | Shows/hides the bar (default `false`) |
| Severity | InfoBarSeverity | `Informational` (default), `Success`, `Warning`, `Error` — sets status color, icon, and assistive-tech settings |
| Title / Message | string | Header and body text |
| IsClosable | bool | Whether the close ('X') button is shown (default `true`) |
| IsIconVisible | bool | Whether the severity/custom icon is shown |
| IconSource | IconSource | Custom icon overriding the severity default |
| Background | Brush | Custom background color overriding the severity default |
| ActionButton | ButtonBase | An additional `Button` or `HyperlinkButton` action, styled automatically |
| Content | object | Custom XAML content shown on its own line below the rest of the bar |

## Events

| Name | Description |
|------|-------------|
| Closing | Occurs when the bar starts to close; supports `Cancel` and deferral to keep it open pending an async action |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from the JS `@ark-ui/react` / `@chakra-ui/react` Alert/Toast components.
- Updating properties (e.g. `Message`, `Severity`) on an already-open `InfoBar` does not raise a screen-reader notification; close and reopen the bar to announce changes to assistive technology.
- Use `ContentDialog` instead when the app must block further interaction until the user responds; use `Flyout` for non-persistent, contextual info; use `TeachingTip` for a transient teaching moment.

## Related

- [ContentDialog](./content-dialog.md)
- [TeachingTip](./teaching-tip.md)
- [InfoBadge](./info-badge.md)
