# PushNotificationChannel

Represents a push notification channel — the HTTP endpoint (URI) that a cloud service uses to send WNS push notifications to a specific app instance on a specific device.

## Signature / Usage

```cpp
auto result = co_await PushNotificationManager::Default().CreateChannelAsync(remoteId);

if (result.Status() == PushNotificationChannelStatus::CompletedSuccess)
{
    auto channelUri = result.Channel().Uri();
    auto channelExpiry = result.Channel().ExpirationTime();
    // send channelUri to your cloud service
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Uri` | `Uri` | Gets the URI representing the push notification channel; send this to your cloud service. |
| `ExpirationTime` | `DateTime` | Gets the expiration time of the channel, after which a new channel must be requested. |
| `Close()` | method | Closes the channel; a new channel must be requested with `CreateChannelAsync` afterward. |

## Notes

- Package: `Microsoft.Windows.PushNotifications` (Windows App SDK, WinRT).
- Obtained as the `Channel` property of a `PushNotificationCreateChannelResult`, returned by `PushNotificationManager.CreateChannelAsync`.
- Channel URIs expire after 30 days — request (and re-send to the backend) a fresh channel on every app launch rather than caching a previous one.

## Related

- [PushNotificationManager](./push-notification-manager.md)
- [PushNotificationReceivedEventArgs](./push-notification-received-event-args.md)
