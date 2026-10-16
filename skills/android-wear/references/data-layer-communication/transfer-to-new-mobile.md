# Transfer Wear OS data to a new mobile device (onNodeMigrated)

Starting in Wear OS 4, when a user connects an existing Wear OS device to a new mobile device, Wear OS data can be transferred to it. The Wearable Data Layer delivers `DataItem` objects stored on the old mobile device to the new one, and `WearableListenerService.onNodeMigrated()` is invoked on the mobile app.

## Signature / Usage

Mobile app dependency and manifest declaration:

```groovy
dependencies {
    ...
    implementation 'com.google.android.gms:play-services-wearable:20.0.1'
}
```

```xml
<service
    android:name=".snippets.datalayer.MyWearableListenerService"
    android:exported="true"
    tools:ignore="ExportedService">
    <intent-filter>
        <action android:name="com.google.android.gms.wearable.NODE_MIGRATED" />
        <data android:scheme="wear" android:host="*" />
    </intent-filter>
</service>
```

```kotlin
class MyWearableListenerService : WearableListenerService() {
    val dataClient: DataClient = Wearable.getDataClient(this)

    private fun shouldHandleDataItem(nodeId: String, dataItem: DataItem): Boolean {
        // Your logic here
        return dataItem.uri.path?.startsWith("/my_feature_path/") == true
    }

    private fun handleDataItem(nodeId: String, dataItem: DataItem) {
        val data = dataItem.data ?: return
        val path = dataItem.uri.path ?: return
        // Your logic here
        if (data.toString().startsWith("Please restore")) {
            dataClient.putDataItem(PutDataRequest.create(path).setData(data))
        }
    }

    override fun onNodeMigrated(nodeId: String, archive: DataItemBuffer) {
        val dataItemsToHandle = mutableListOf<DataItem>()

        for (dataItem in archive) {
            if (shouldHandleDataItem(nodeId, dataItem)) {
                dataItemsToHandle.add(dataItem.freeze())
            }
        }

        // Callback stops automatically after 20 seconds of data processing.
        // If you think you need more time, delegate to a coroutine or thread.
        runBlocking {
            for (dataItem in dataItemsToHandle) {
                handleDataItem(nodeId, dataItem)
            }
        }
    }
}
```

## Options / Props

| Data owner | Handling during transfer |
| --- | --- |
| Wear OS app | `DataItem` objects are preserved on the Wear OS device |
| Mobile app | Archived on the old device, packaged into a `DataItemBuffer`, delivered to the mobile app on the new device; `onNodeMigrated()` is invoked immediately after delivery |

## Notes

- Only data stored in the Wearable Data Layer is transferred.
- Preserving transferred `DataItem` objects is the app's responsibility: the archive is deleted from the old device shortly after delivery (re-put the items, as the sample does with `putDataItem`).
- Archived items are discarded, not delivered, unless the app is installed on both mobile devices and the package signatures match.
- Do not run power-demanding or time-consuming work in `onNodeMigrated()` (battery, ANRs); the callback stops automatically after 20 seconds, so delegate longer work to a coroutine or thread.
- This differs from cloud backup and restore, where the user restores data to a new Wear OS device.
- Source page last updated 2026-10-14 UTC.

## Related

- [WearableListenerService](./wearablelistenerservice.md)
- [DataClient](./dataclient.md)
- [Cloud backup and restore on Wear OS](./cloud-backup-restore.md)
- [Data Layer API overview](./data-layer-overview.md)
