# Toast content schema (ToastContent)

Describes the XML content model behind app notifications (toasts): visuals (text/images/groups), actions (buttons/inputs), audio, and header. `AppNotificationBuilder` generates this XML; this schema is the reference for hand-authoring raw XML (e.g. for cloud-sourced push toasts).

## Signature / Usage

```xml
<toast scenario="reminder">
  <visual>
    <binding template="ToastGeneric">
      <text>Notification text.</text>
      <text>Secondary line of text.</text>
      <image placement="appLogoOverride" hint-crop="circle" src="Assets/Square150x150Logo.png"/>
    </binding>
  </visual>
  <actions>
    <input id="reply" type="text" placeHolderContent="Type a reply"/>
    <action content="Send" arguments="action=send" activationType="background"/>
  </actions>
</toast>
```

## Options / Props

| Element / Property | Type | Description |
|------|------|-------------|
| `ToastContent.Launch` | string | Passed to the app when activated by tapping the toast body; app-defined format. |
| `ToastContent.Visual` | `ToastVisual` (required) | The visual portion (text/images/groups). |
| `ToastContent.Actions` | `IToastActions` | Custom actions: buttons, inputs, context menu items. |
| `ToastContent.Audio` | `ToastAudio` | Sound played when the notification is received. |
| `ToastContent.Scenario` | `ToastScenario` | `Default`, `Reminder`, `Alarm`, `IncomingCall` — adjusts persistence/audio behavior. |
| `ToastContent.Header` | `ToastHeader` | Groups multiple notifications together in Notification Center. |
| `ToastVisual.BindingGeneric` | `ToastBindingGeneric` (required) | The generic binding: text, images, adaptive content. |
| `ToastBindingGeneric.Children` | `AdaptiveText` \| `AdaptiveImage` \| `AdaptiveGroup` \| `AdaptiveProgressBar` | Body content; up to 3 top-level text elements. |
| `ToastGenericAppLogo` | element | Overrides the app logo image (left side); `HintCrop`: `None` \| `Circle`. |
| `ToastGenericHeroImage` | element | Full-width featured image at the top of the toast. |
| `ToastGenericAttributionText` | element | Attribution text at the bottom of the toast. |
| `AdaptiveProgressBar` | element | Progress bar with `Title`, `Value` (0.0-1.0 or indeterminate), `ValueStringOverride`, `Status`. Desktop only. |
| `ToastActionsCustom.Inputs` | `ToastTextBox` \| `ToastSelectionBox` (up to 5) | User input controls. |
| `ToastActionsCustom.Buttons` | `ToastButton` \| `ToastButtonSnooze` \| `ToastButtonDismiss` (up to 5) | Action buttons. |
| `ToastButton.Arguments` | string (required) | App-defined arguments returned to the app when the button is clicked. |
| `ToastButton.ActivationType` | `ToastActivationType` | `Foreground` (default), `Background`, or `Protocol`. |
| `ToastAudio.Src` / `Loop` / `Silent` | uri / bool / bool | Custom sound, looping, or muting. Only `ms-appx` / `ms-resource` URIs supported. |
| `ToastHeader.Id` / `Title` / `Arguments` | string | Groups notifications sharing the same header `Id` under one clickable heading; only `Id` determines grouping, `Title`/`Arguments` shown come from the most recent notification in the group. |

## Notes

- Reference: `Microsoft.Windows.AppNotifications.Builder.AppNotificationBuilder` produces this XML programmatically; prefer the builder for local notifications and reserve raw XML for cloud-sourced (WNS) push toasts. `AppNotificationBuilder` has no `SetHeader` method, so headers require hand-authoring the `<header>` XML element and passing it to the `AppNotification` constructor directly.
- Cloud-sourced push toasts are sent with header `X-WNS-Type: wns/toast`, `Content-Type: text/xml`, and this XML as the request body.
- Clicking a header raises `NotificationInvoked` with the header's `Arguments`, but doesn't clear the notifications under it; headers also don't change the per-app 20-notification cap or FIFO eviction. For grouping notifications under a separate app-like title/icon instead of a heading, see app notification collections (`ToastCollection`).

## Related

- [AppNotificationBuilder](./app-notification-builder.md)
- [AppNotification](./app-notification.md)
- [PushNotificationManager](./push-notification-manager.md)
- [App notification collections](./app-notification-collections.md)
