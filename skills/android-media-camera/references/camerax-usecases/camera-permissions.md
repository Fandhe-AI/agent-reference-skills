# Camera permissions

Manifest declarations and the runtime permissions required before binding CameraX use cases: `CAMERA` for any capture, `RECORD_AUDIO` for `VideoCapture` recordings with audio enabled.

## Signature / Usage

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
```

```kotlin
ActivityCompat.requestPermissions(
    this,
    arrayOf(Manifest.permission.CAMERA, Manifest.permission.RECORD_AUDIO),
    PERMISSION_REQUEST_CODE
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android.permission.CAMERA` | manifest permission | — | Required before calling `ProcessCameraProvider.bindToLifecycle()` with any use case. |
| `android.permission.RECORD_AUDIO` | manifest permission | — | Required only when calling `PendingRecording.withAudioEnabled()`; omitting it throws `SecurityException`. |

## Notes

- Declare both in `AndroidManifest.xml`; request at runtime on API 23+ before binding/recording.
- General runtime-permission request flow (`ActivityResultContracts.RequestPermission`, rationale UI) is owned by the `android-platform-core` skill's `permissions-privacy` category — this page covers only the CameraX-specific `CAMERA`/`RECORD_AUDIO` declarations.
- Writing captured photos/videos to shared storage (`WRITE_EXTERNAL_STORAGE`, scoped storage, MediaStore) is owned by the `android-data` skill's `files-storage` category.

## Related

- [VideoCapture](./video-capture.md)
- [Recording and PendingRecording](./recording.md)
