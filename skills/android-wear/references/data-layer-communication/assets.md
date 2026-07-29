# Asset

Attaches large binary payloads (images, media files) to a `DataItem` when the 100 KB inline payload limit is too small. Assets are content-addressed and deduplicated by the Data Layer API, so re-sending the same bytes does not retransmit them.

## Signature / Usage

```kotlin
import com.google.android.gms.wearable.Asset
import com.google.android.gms.wearable.PutDataMapRequest
import com.google.android.gms.wearable.PutDataRequest
import com.google.android.gms.wearable.Wearable
import java.io.ByteArrayOutputStream

private fun createAssetFromBitmap(bitmap: Bitmap): Asset =
    ByteArrayOutputStream().let { byteStream ->
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteStream)
        Asset.createFromBytes(byteStream.toByteArray())
    }

private fun Context.sendImagePutDataMapRequest(): Task<DataItem> {
    val asset: Asset = createAssetFromBitmap(
        BitmapFactory.decodeResource(resources, R.drawable.ic_walk)
    )
    val request: PutDataRequest = PutDataMapRequest.create("/image").run {
        dataMap.putAsset("profileImage", asset)
        asPutDataRequest()
    }
    return Wearable.getDataClient(this).putDataItem(request)
}
```

Reading the asset back once a `DataItem` event delivers it:

```kotlin
override fun onDataChanged(dataEvents: DataEventBuffer) {
    dataEvents
        .filter { it.type == DataEvent.TYPE_CHANGED && it.dataItem.uri.path == "/image" }
        .forEach { event ->
            val asset = DataMapItem.fromDataItem(event.dataItem)
                .dataMap.getAsset("profileImage")

            asset?.let { safeAsset ->
                lifecycleScope.launch {
                    val bitmap = loadBitmapFromAsset(safeAsset)
                }
            }
        }
}

private suspend fun loadBitmapFromAsset(asset: Asset): Bitmap? = withContext(Dispatchers.IO) {
    val assetResult = Wearable.getDataClient(this@DataLayerActivity)
        .getFdForAsset(asset)
        .await()
    assetResult?.inputStream?.use { inputStream ->
        BitmapFactory.decodeStream(inputStream)
    }
}
```

## Options / Props

| Member | Type | Description |
| --- | --- | --- |
| `Asset.createFromBytes(bytes: ByteArray)` | `Asset` | Creates an asset from raw bytes (e.g. a compressed bitmap). |
| `Asset.createFromUri(uri: Uri)` | `Asset` | Creates an asset from a content/file `Uri`. |
| `Asset.createFromFd(fd: ParcelFileDescriptor)` | `Asset` | Creates an asset from an open file descriptor. |
| `DataMap.putAsset(key, asset)` | `Unit` | Attaches the asset to a `PutDataMapRequest`'s `DataMap`. |
| `DataClient.getFdForAsset(asset)` | `Task<DataClient.GetFdForAssetResult>` | Retrieves a readable file descriptor for a received asset. |

## Notes

- Prefer `Asset` over inlining large payloads directly on a `DataItem` — the 100 KB limit is on the `DataItem` payload itself, not on attached assets.
- Assets sync over Bluetooth when available and fall back to a cloud relay; transfer is deduplicated so repeated identical assets are cheap.

## Related

- [DataClient](./dataclient.md)
