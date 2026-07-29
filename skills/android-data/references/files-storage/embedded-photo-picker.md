# Embedded Photo Picker

`androidx.photopicker` API (backed by the platform `android.widget.photopicker` classes) that embeds the system Photo Picker UI directly inside the app's own view or Compose hierarchy via a `SurfaceView`-hosted session, instead of launching it as a separate activity like the classic `PickVisualMedia` contract.

## Signature / Usage

```kotlin
// build.gradle(.kts)
// implementation("androidx.photopicker:photopicker-compose:1.0.0-alpha01")

@Composable
fun EmbeddedPickerScreen() {
    val state = rememberEmbeddedPhotoPickerState(
        onUriPermissionGranted = { uris -> /* newly granted Uris */ },
        onUriPermissionRevoked = { uris -> /* deselected Uris */ },
        onSelectionComplete = { /* collapse the picker */ },
    )

    EmbeddedPhotoPicker(
        state = state,
        modifier = Modifier.fillMaxSize(),
        embeddedPhotoPickerFeatureInfo = EmbeddedPhotoPickerFeatureInfo.Builder()
            .setMaxSelectionLimit(10)
            .build(),
    )
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `EmbeddedPhotoPicker(state, modifier, provider, embeddedPhotoPickerFeatureInfo)` | `@Composable` function (`androidx.photopicker.compose`) | — | Hosts the remote picker `SurfaceView` in the Compose tree and drives its lifecycle from `state`. |
| `rememberEmbeddedPhotoPickerState(initialExpandedValue, initialMediaSelection, onSessionError, onUriPermissionGranted, onUriPermissionRevoked, onSelectionComplete)` | `@Composable` function returning `EmbeddedPhotoPickerState` | — | Creates and remembers the state object, wiring the selection/error callbacks. |
| `EmbeddedPhotoPickerState.isExpanded` | `var Boolean` | `false` | Toggles the picker between collapsed and expanded (album grid, profile selector) presentation. |
| `EmbeddedPhotoPickerState.selectedMedia` | `Set<Uri>` (read-only) | `emptySet()` | Currently selected media Uris, updated internally on grant/revoke. |
| `EmbeddedPhotoPickerState.deselectUri(uri)` / `deselectUris(uris)` | `suspend fun` | — | Requests the picker deselect item(s) previously granted through this session. |
| `EmbeddedPhotoPickerView` (`androidx.photopicker`) | `ViewGroup` | — | Non-Compose (Views) equivalent; call `setProvider()` and `setEmbeddedPhotoPickerFeatureInfo()`, and register an `EmbeddedPhotoPickerStateChangeListener` via `addEmbeddedPhotoPickerStateChangeListener()`. |
| `EmbeddedPhotoPickerProviderFactory.create(context)` | static method → `EmbeddedPhotoPickerProvider` | — | Platform (`android.widget.photopicker`) entry point that binds to the picker service; used internally by both the Compose and Views wrappers, or directly for custom integrations. |
| `EmbeddedPhotoPickerProvider.openSession(hostToken, displayId, width, height, featureInfo, clientExecutor, callback)` | method | — | Requests a new session; the resulting `EmbeddedPhotoPickerSession` arrives via `callback.onSessionOpened()`. |
| `EmbeddedPhotoPickerClient` | interface | — | Callback interface: `onSessionOpened(session)`, `onSessionError(throwable)`, `onUriPermissionGranted(uris)`, `onUriPermissionRevoked(uris)`, `onSelectionComplete()`. |
| `EmbeddedPhotoPickerSession` | interface | — | Handle for a running session: `getSurfacePackage()`, `notifyResized(w, h)`, `notifyVisibilityChanged(visible)`, `notifyConfigurationChanged(config)`, `notifyPhotoPickerExpanded(expanded)`, `requestRevokeUriPermission(uris)`, `close()`. |
| `EmbeddedPhotoPickerFeatureInfo.Builder` | builder | mime types `["image/*", "video/*"]`, `maxSelectionLimit=100` | Configures mime-type filter, `setAccentColor`, `setOrderedSelection`, `setMaxSelectionLimit` (≤ 100), `setPreSelectedUris`, `setThemeNightMode`. |

## Notes

- Requires Android 14 (API level 34, `Build.VERSION_CODES.UPSIDE_DOWN_CAKE`) with SDK Extensions version 15+; the Compose/Views entry points are annotated `@RequiresExtension(extension = UPSIDE_DOWN_CAKE, version = 15)`.
- The `androidx.photopicker:photopicker` / `androidx.photopicker:photopicker-compose` artifacts are alpha (`1.0.0-alpha01`) and gate their APIs behind `@ExperimentalPhotoPickerApi` / `@ExperimentalPhotoPickerComposeApi` opt-in annotations.
- The host app's manifest must declare a `<queries>` element for the picker service intent, or `EmbeddedPhotoPickerProvider.openSession()` cannot resolve the service:
  ```xml
  <queries>
      <intent>
          <action android:name="com.android.photopicker.core.embedded.EmbeddedService.BIND"/>
      </intent>
  </queries>
  ```
- This is distinct from [Photo Picker](./photo-picker.md)'s `PickVisualMedia` / `PickMultipleVisualMedia` `ActivityResultContract`, which launches the picker as a separate activity and returns once via a callback; the embedded API keeps the picker's UI resident in the caller's own window and view hierarchy across a longer-lived, continuous multi-select session.
- Granted `Uri`s from a session can still have their permission revoked before the caller reads them (e.g. if the user deselects the item); callers must handle `SecurityException` when opening a granted `Uri`.

## Related

- [Photo Picker](./photo-picker.md)
- [Uri Permission Grants](./uri-permissions.md)
