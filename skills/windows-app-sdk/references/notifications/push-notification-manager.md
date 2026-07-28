# PushNotificationManager

Provides APIs for receiving and registering to receive push notifications delivered through the Windows Push Notification Service (WNS). Get an instance via the `Default` property.

## Signature / Usage

```cpp
#include <winrt/Microsoft.Windows.PushNotifications.h>
using namespace winrt::Microsoft::Windows::PushNotifications;

// Register event handlers before calling Register()
PushNotificationManager::Default().PushReceived(
    [](auto const&, PushNotificationReceivedEventArgs const& args)
    {
        auto payload{ args.Payload() };
    });

PushNotificationManager::Default().Register();

if (PushNotificationManager::IsSupported())
{
    auto channelOperation = PushNotificationManager::Default().CreateChannelAsync(remoteId);
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Default` | `PushNotificationManager` (static property) | Gets the default (singleton) instance of the class. |
| `Register()` | method | Registers the app to receive `PushReceived` events when incoming notifications arrive. |
| `Unregister()` | method | Unregisters the app from receiving `PushReceived` events. |
| `UnregisterAll()` | method | Cleans up all registration-related data; push notifications stop functioning until `Register` is called again. |
| `CreateChannelAsync(Guid)` | method | Asynchronously requests a push channel (`PushNotificationChannel`) from WNS, using the app's Azure Entra ID Object ID (`remoteId`). Retries automatically for up to 15 minutes. |
| `IsSupported()` | method | Gets a boolean indicating whether the push notification APIs are supported for the calling app. |
| `PushReceived` | event | Raised when a push notification for the app is received by the platform. |

## Notes

- Package: `Microsoft.Windows.PushNotifications` (Windows App SDK, WinRT). Distinct from `System.Windows.Controls` (WPF), the JS `@ark-ui/react` / `@chakra-ui/react` APIs, and Jetpack Compose.
- `PushNotificationManager` depends on the Singleton package; self-contained (unpackaged) apps have extra deployment considerations.
- Event handlers for `PushReceived` must be registered before calling `Register()`, otherwise a `COMException: Element not found. Must register event handlers before calling Register()` is thrown at runtime.
- `Register()` must be called before `Microsoft.Windows.AppLifecycle.AppInstance.GetActivatedEventArgs`.
- Push notifications require a Microsoft Entra ID (Azure AD) multi-tenant app registration; packaged apps additionally require mapping their Package Family Name to their Azure AppId. Not supported with Microsoft Partner Center identities.
- WNS Channel URIs expire after 30 days; request a fresh channel on every app launch instead of caching one.

## Related

- [PushNotificationChannel](./push-notification-channel.md)
- [PushNotificationReceivedEventArgs](./push-notification-received-event-args.md)
