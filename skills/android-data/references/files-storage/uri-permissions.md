# Uri Permission Grants

Temporary, per-`Uri` read/write access granted to another app via intent flags, typically used together with `FileProvider` or Storage Access Framework results.

## Signature / Usage

```kotlin
// Grant on the outgoing Intent
resultIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)

// Persist an SAF/Photo Picker Uri across device restarts
val takeFlags = Intent.FLAG_GRANT_READ_URI_PERMISSION or
    Intent.FLAG_GRANT_WRITE_URI_PERMISSION
contentResolver.takePersistableUriPermission(uri, takeFlags)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Intent.FLAG_GRANT_READ_URI_PERMISSION` | flag | — | Grants the receiving app temporary read access to the `Uri`. |
| `Intent.FLAG_GRANT_WRITE_URI_PERMISSION` | flag | — | Grants the receiving app temporary write access to the `Uri`. |
| `contentResolver.takePersistableUriPermission(uri, flags)` | function | — | Makes a granted `Uri` permission (from SAF or Photo Picker) survive device reboot. |

## Notes

- Set flags via `Intent.setFlags()` / `addFlags()`, not via `Context.grantUriPermission()`, which does not auto-expire.
- Permissions granted through an `Intent` are automatically revoked when the receiving app's task finishes.
- Persistable permission is lost if the underlying document is moved or deleted.
- Photo Picker persistable grants are capped at 5,000 media items per app.

## Related

- [FileProvider and file sharing](./file-provider.md)
- [Storage Access Framework](./storage-access-framework.md)
- [Photo Picker](./photo-picker.md)
