# RemoteActivityHelper

Launches an `Intent` on a paired phone from a standalone Wear OS app — no companion phone app is required. Typical use is opening the Play Store (or, for an iOS companion, an App Store web link) so the user can install a phone-side app, or handing off any other URL/action to the connected handheld.

## Signature / Usage

```kotlin
import androidx.wear.remote.interactions.RemoteActivityHelper

// After determining the companion is an Android phone (see PhoneTypeHelper):
RemoteActivityHelper(context).startRemoteActivity(
    Intent(Intent.ACTION_VIEW).apply {
        data = Uri.parse("market://details?id=com.example.android.wearable.wear.finddevices")
    },
    phoneNodeId,
)
```

```kotlin
// For an iOS companion, open a web (App Store) URL instead of a market:// URI.
RemoteActivityHelper(context).startRemoteActivity(
    Intent(Intent.ACTION_VIEW).apply {
        data = Uri.parse("https://itunes.apple.com/us/app/yourappname")
    },
    phoneNodeId,
)
```

## Options / Props

| Member | Type | Description |
| --- | --- | --- |
| `RemoteActivityHelper(context)` | — | Constructs the helper for the given context. |
| `startRemoteActivity(intent: Intent, nodeId: String?)` | `ListenableFuture<Void>` | Sends the intent to be started on the given node (or the best-guess node if `null`). |
| `PhoneTypeHelper.getPhoneDeviceType(context)` | `Int` | `DEVICE_TYPE_ANDROID`, `DEVICE_TYPE_IOS`, `DEVICE_TYPE_UNKNOWN`, or `DEVICE_TYPE_ERROR` — used to pick the right market/app-store URI. |

## Notes

- Package: `androidx.wear.remote.interactions`.
- The Wear app's store URI may differ from the phone app's; there's no way to detect whether an app is installed on an iOS companion, so provide a manual trigger for that path rather than assuming detection is possible.
- Use `CapabilityClient` first to check whether the companion app is already installed before offering to launch the store listing.
- Pairs well with `OpenOnPhoneDialog` (in this skill's wear-compose category) as the UI prompt shown before the handoff.

## Related

- [CapabilityClient](./capabilityclient.md)
- [NodeClient](./nodeclient.md)
