# Watch Face Push (WatchFacePushManager)

Wear OS 6+ API letting a companion marketplace app install, update, or remove pre-built Watch Face Format APKs directly onto a paired watch into a small number of "slots" — an alternative distribution path to the Play Store, without writing WFF XML on the watch side.

## Signature / Usage

```kotlin
val watchFacePushManager = WatchFacePushManagerFactory.createWatchFacePushManager(context)

// List installed watch faces and remaining capacity
val response = watchFacePushManager.listWatchFaces()
response.installedWatchFaceDetails.forEach { Log.i(TAG, "Installed: ${it.packageName}") }
val remainingSlots = response.remainingSlotCount

// Add a new watch face (requires a prior validation token, see below)
try {
    val slot = watchFacePushManager.addWatchFace(parcelFileDescriptor, token)
    Log.i(TAG, "${slot.packageName} (${slot.versionCode}) added in slot ${slot.slotId}")
} catch (e: WatchFacePushManager.AddWatchFaceException) {
    Log.e(TAG, "Failed to install watch face", e)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `WatchFacePushManagerFactory.createWatchFacePushManager(context)` | function | — | Creates the `WatchFacePushManager` instance. |
| `listWatchFaces()` | suspend function | — | Returns `installedWatchFaceDetails` (list of `WatchFaceSlot`) and `remainingSlotCount`. |
| `addWatchFace(parcelFileDescriptor, token)` | suspend function | — | Installs a validated watch face APK into an available slot; returns the new `WatchFaceSlot`. Throws `AddWatchFaceException`. |
| `updateWatchFace(slotId, parcelFileDescriptor, token)` | suspend function | — | Replaces the watch face installed in `slotId`. Throws `UpdateWatchFaceException`. |
| `removeWatchFace(slotId)` | suspend function | — | Uninstalls the watch face in `slotId`. Throws `RemoveWatchFaceException`. |
| `isWatchFaceActive(packageName)` | suspend function | — | Returns whether the given installed watch face is currently active on the watch face picker. |
| `setWatchFaceAsActive(slotId)` | suspend function | — | Sets the watch face in `slotId` as the active watch face; callable once per marketplace app; requires `SET_PUSHED_WATCH_FACE_AS_ACTIVE` at runtime. |
| `WatchFaceSlot.slotId` / `.packageName` / `.versionCode` | property | — | Identifies an installed watch face; `slotId` is not persistent and must be re-queried before each slot operation. |
| `WatchFaceSlot.getMetaData(name)` | function | — | Reads additional metadata declared in the watch face APK's manifest. |

## Notes

- This is the Wear OS Watch Face Format marketplace-delivery API — distinct from writing WFF XML itself (covered by the rest of this category) and unrelated to same-named "push" concepts in other skills.
- Requires the `com.google.wear.permission.PUSH_WATCH_FACES` manifest permission (and `com.google.wear.permission.SET_PUSHED_WATCH_FACE_AS_ACTIVE` to call `setWatchFaceAsActive()`), plus the `androidx.wear.watchfacepush:watchfacepush` dependency.
- On Wear OS 6, each marketplace app is limited to 1 slot.
- Watch face APKs pushed this way must be pre-validated with the Watch Face Push validator (CLI jar or `DwfValidatorFactory.create().validate(...)`), which produces the validation token required by `addWatchFace()` / `updateWatchFace()`; the APK may contain only `AndroidManifest.xml`, `resources.arsc`, `res/**`, and `META-INF/**`, must declare `android:hasCode="false"`, and must be signed with a different key than the marketplace app, and its package name must follow `<marketplace app id>.watchfacepush.<watchface name>`.
- Don't call `isWatchFaceActive()` immediately after `updateWatchFace()` — wait for the update to complete first.

## Related

- [overview](./overview.md)
- [build-and-debug](./build-and-debug.md)
