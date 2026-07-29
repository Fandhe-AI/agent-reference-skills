# WearableListenerService

Base `Service` for receiving Data Layer events (`onDataChanged`, `onMessageReceived`, `onCapabilityChanged`) in the background, independent of any running Activity. The system binds the service on demand when an event arrives and unbinds it once there is no more work, so it does not need to run continuously.

## Signature / Usage

```kotlin
import com.google.android.gms.wearable.DataEventBuffer
import com.google.android.gms.wearable.MessageEvent
import com.google.android.gms.wearable.Wearable
import com.google.android.gms.wearable.WearableListenerService

class DataLayerListenerService : WearableListenerService() {

    override fun onDataChanged(dataEvents: DataEventBuffer) {
        dataEvents
            .map { it.dataItem.uri }
            .forEach { uri ->
                val nodeId: String = uri.host!!
                val payload: ByteArray = uri.toString().toByteArray()
                Wearable.getMessageClient(this)
                    .sendMessage(nodeId, "/data-item-received", payload)
            }
    }

    override fun onMessageReceived(messageEvent: MessageEvent) {
        // Handle messageEvent.path / messageEvent.data
    }
}
```

Register only for the specific event types the service needs, filtering on path:

```xml
<service
    android:name=".DataLayerListenerService"
    android:exported="true">
    <intent-filter>
        <action android:name="com.google.android.gms.wearable.DATA_CHANGED" />
        <data
            android:scheme="wear"
            android:host="*"
            android:path="/count" />
    </intent-filter>
</service>
```

## Options / Props

| Intent action | Fires for | `<data>` filter |
| --- | --- | --- |
| `com.google.android.gms.wearable.DATA_CHANGED` | `onDataChanged` | `android:scheme="wear" android:host="*" android:path="<data item path>"` |
| `com.google.android.gms.wearable.MESSAGE_RECEIVED` | `onMessageReceived` | `android:scheme="wear" android:host="*" android:path="<message path>"` |
| `com.google.android.gms.wearable.CAPABILITY_CHANGED` | `onCapabilityChanged` | `android:scheme="wear" android:host="*" android:path="/<capability name>"` |

## Notes

- Declare per-event, per-path `<intent-filter>` entries rather than one broad listener filter — this lets the system route only the events the service actually handles instead of waking it for every Data Layer event on the device.
- Because a `WearableListenerService` instance is not tied to a `Lifecycle`, awaiting a `Task` from `DataClient`/`MessageClient` inside it should use `runBlocking` (or a similar blocking bridge) rather than a coroutine scope tied to an Activity/ViewModel.
- For listening only while an Activity is in the foreground, register `DataClient.OnDataChangedListener` / `MessageClient.OnMessageReceivedListener` directly instead — it's simpler and avoids waking a service for UI-only concerns; see DataClient and MessageClient.

## Related

- [DataClient](./dataclient.md)
- [MessageClient](./messageclient.md)
- [CapabilityClient](./capabilityclient.md)
