# PushNotificationReceivedEventArgs

Provides data for the `PushNotificationManager.PushReceived` event, raised when a raw or toast push notification is delivered to the app by WNS.

## Signature / Usage

```cpp
PushNotificationManager::Default().PushReceived(
    [](auto const&, PushNotificationReceivedEventArgs const& args)
    {
        auto deferral{ args.GetDeferral() };
        auto payload{ args.Payload() };

        // process payload...

        deferral.Complete();
    });
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Payload` | `IVector<Byte>` / `byte[]` | Gets the raw payload of the push notification that triggered the event. |
| `GetDeferral()` | method | Informs the system the app might continue working after the event handler returns; call `Complete()` on the returned deferral when done. |
| `Canceled` | event | Raised when the system is about to cancel the background task launched to handle the `PushReceived` event. |

## Notes

- Package: `Microsoft.Windows.PushNotifications` (Windows App SDK, WinRT).
- Register the `PushReceived` handler before calling `PushNotificationManager.Register()`, otherwise a `COMException: Element not found. Must register event handlers before calling Register()` is thrown.
- When the app is launched in the background solely to handle a push (activation kind `ExtendedActivationKind.Push`), call `GetDeferral()` and `Complete()` around payload processing to keep the app running under low-power conditions until finished.

## Related

- [PushNotificationManager](./push-notification-manager.md)
- [PushNotificationChannel](./push-notification-channel.md)
