# DataClient

Reads or writes persistent `DataItem` objects (and, via `Asset`, larger payloads) that the Wearable Data Layer API automatically synchronizes across every device — phone and Wear OS watch — that a user owns. Each `DataItem` has a unique path (starting with `/`) and a payload of up to 100 KB; unlike `MessageClient`, data written while a device is disconnected is buffered and synced once it reconnects.

## Signature / Usage

```kotlin
import com.google.android.gms.wearable.PutDataMapRequest
import com.google.android.gms.wearable.PutDataRequest
import com.google.android.gms.wearable.Wearable

private fun Context.increaseCounter(count: Int): Task<DataItem> {
    val putDataReq: PutDataRequest = PutDataMapRequest.create("/count").run {
        dataMap.putInt("count_key", count)
        asPutDataRequest()
    }
    return Wearable.getDataClient(this).putDataItem(putDataReq)
}
```

Listening while the app is in the foreground, via a lifecycle-aware `DataClient.OnDataChangedListener` (recommended by the events guide over manual `onResume` / `onPause` registration):

```kotlin
class WearDataLayerObserver(
    private val dataClient: DataClient,
    private val onDataReceived: (DataEventBuffer) -> Unit
) : DefaultLifecycleObserver, DataClient.OnDataChangedListener {

    override fun onDataChanged(dataEvents: DataEventBuffer) {
        onDataReceived(dataEvents)
    }

    override fun onResume(owner: LifecycleOwner) {
        dataClient.addListener(this)
    }

    override fun onPause(owner: LifecycleOwner) {
        dataClient.removeListener(this)
    }
}

// In the Activity's onCreate:
lifecycle.addObserver(WearDataLayerObserver(Wearable.getDataClient(this)) { dataEvents -> handleDataEvents(dataEvents) })
```

Handling the received events:

```kotlin
override fun onDataChanged(dataEvents: DataEventBuffer) {
    dataEvents.forEach { event ->
        if (event.type == DataEvent.TYPE_CHANGED) {
            event.dataItem.also { item ->
                if (item.uri.path?.compareTo("/count") == 0) {
                    DataMapItem.fromDataItem(item).dataMap.apply {
                        updateCount(getInt("count_key"))
                    }
                }
            }
        } else if (event.type == DataEvent.TYPE_DELETED) {
            // DataItem deleted
        }
    }
}
```

Awaiting the result of a write from a coroutine (e.g. from a background service):

```kotlin
private suspend fun Context.sendDataAsync(count: Int) {
    try {
        val putDataReq = PutDataMapRequest.create("/count").run {
            dataMap.putInt("count_key", count)
            asPutDataRequest()
        }
        val dataItem = Wearable.getDataClient(this).putDataItem(putDataReq).await()
        handleDataItem(dataItem)
    } catch (e: Exception) {
        handleDataItemError(e)
    }
}
```

## Options / Props

| Member | Type | Description |
| --- | --- | --- |
| `putDataItem(request: PutDataRequest)` | `Task<DataItem>` | Queues a data item for sync; returns the stored item. |
| `getDataItems()` / `getDataItems(uri)` | `Task<DataItemBuffer>` | Reads currently stored data items. |
| `deleteDataItems(uri)` | `Task<Int>` | Removes matching data items from the network. |
| `getFdForAsset(asset: Asset)` | `Task<DataClient.GetFdForAssetResult>` | Opens a file descriptor for an `Asset` attached to a data item. |
| `addListener(listener)` / `removeListener(listener)` | `Task<Void>` | Registers/unregisters a foreground `OnDataChangedListener`. |
| `PutDataRequest.setUrgent()` | — | Requests immediate sync instead of the default delayed (up to ~30 min) batching; costs more battery. |

## Notes

- `DataItem` path must start with `/` and be unique; payload is capped at 100 KB — use `Asset` for larger content (see Asset).
- Data persists indefinitely and syncs even while devices are offline, unlike `MessageClient`.
- For background delivery independent of any running Activity, extend `WearableListenerService` instead of (or in addition to) an in-process `OnDataChangedListener`.
- `DataClient` is meant to synchronize data, not to serve as a storage mechanism: keep your own copy of the data (for example in a Room database). When an app is uninstalled on the phone, data items and assets are reset (sync guide).
- The lifecycle-observer approach keeps the Activity lean and helps guarantee the listener is removed even if the Activity is destroyed unexpectedly; in a `ViewModel` setup, the guide suggests collecting events as a `Flow` via `callbackFlow` and observing it with `repeatOnLifecycle`.
- The Data Layer API only synchronizes between Android phones and Wear OS watches — it has no iOS counterpart.

## Related

- [Asset](./assets.md)
- [WearableListenerService](./wearablelistenerservice.md)
- [MessageClient](./messageclient.md)
