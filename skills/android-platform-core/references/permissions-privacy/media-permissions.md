# Media Permissions

Granular runtime permissions for reading another app's media from shared storage, split by media type since Android 13 (API 33), with a partial-access option since Android 14 (API 34).

## Signature / Usage

```xml
<!-- API 33+: only if the app reads other apps' media -->
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
<uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />
<uses-permission android:name="android.permission.READ_MEDIA_AUDIO" />

<!-- API 34+: partial access grant -->
<uses-permission android:name="android.permission.READ_MEDIA_VISUAL_USER_SELECTED" />

<!-- Legacy fallback for API 32 and below -->
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission
    android:name="android.permission.WRITE_EXTERNAL_STORAGE"
    android:maxSdkVersion="29" />
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `READ_MEDIA_IMAGES` | dangerous permission (API 33+) | — | Access to photos and screenshots created by other apps. |
| `READ_MEDIA_VIDEO` | dangerous permission (API 33+) | — | Access to videos created by other apps. |
| `READ_MEDIA_AUDIO` | dangerous permission (API 33+) | — | Access to audio files created by other apps. |
| `READ_MEDIA_VISUAL_USER_SELECTED` | dangerous permission (API 34+) | — | Granted when the user picks "Select photos and videos" instead of "Allow all", limiting access to only the items the user chose. |
| `ACCESS_MEDIA_LOCATION` | dangerous permission (API 29+) | — | Required to read unredacted EXIF geolocation metadata from photos. |
| `MANAGE_MEDIA` | special permission (API 31+) | — | Allows batch media modify/delete operations without a per-file confirmation dialog. |
| `READ_EXTERNAL_STORAGE` | legacy dangerous permission | — | Superseded by the `READ_MEDIA_*` permissions on API 33+; still needed with `maxSdkVersion="32"` for compatibility. |

## Notes

- `READ_MEDIA_IMAGES`/`READ_MEDIA_VIDEO`/`READ_MEDIA_AUDIO` are restricted by Google Play policy to declared, specific use cases; the Photo Picker is the recommended privacy-preserving alternative that needs no runtime permission at all.
- Requesting `READ_MEDIA_IMAGES` and `READ_MEDIA_VIDEO` together triggers a single combined system dialog.
- On Android 10+ (API 29+), apps do not need any storage permission to read/write media files they created themselves (scoped storage).
- `READ_MEDIA_VISUAL_USER_SELECTED` requires re-checking on every relevant access, since the user-selected item set can shrink if the user revises their selection from system settings.

## Related

- [evaluating-permission-need](./evaluating-permission-need.md)
- [manage-external-storage](./manage-external-storage.md)
- [declaring-permissions](./declaring-permissions.md)
