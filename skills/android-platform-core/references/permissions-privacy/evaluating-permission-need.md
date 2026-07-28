# Evaluating Whether a Permission Is Needed

Before declaring or requesting a permission, evaluate whether a privacy-preserving alternative API, intent, or system service can achieve the same result without a permission prompt.

## Signature / Usage

```kotlin
// Take a photo without the CAMERA permission
startActivity(Intent(MediaStore.ACTION_IMAGE_CAPTURE))

// Insert a contact without READ_CONTACTS / WRITE_CONTACTS
val intent = Intent(Intent.ACTION_INSERT).apply {
    type = ContactsContract.Contacts.CONTENT_TYPE
}
intent.resolveActivity(packageManager)?.run { startActivity(intent) }
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Photo Picker | system UI | — | Selects photos/videos without any runtime permission; replaces `READ_MEDIA_IMAGES`/`READ_MEDIA_VIDEO` for simple selection use cases. |
| `ACTION_IMAGE_CAPTURE` / `ACTION_VIDEO_CAPTURE` | intent | — | Delegates capture to the camera app; avoids the `CAMERA` permission. Throws `SecurityException` if the app declares `CAMERA` but it is not granted. |
| `ACTION_DIAL` vs `ACTION_CALL` | intent | — | `ACTION_DIAL` opens the dialer pre-filled without `CALL_PHONE`; `ACTION_CALL` requires the permission. |
| SMS Retriever API | library | — | Reads one-time passcodes without `READ_SMS`. |
| Storage Access Framework / MediaStore API | system API | — | Accesses shared files/media created by other apps without broad storage permissions. |

## Notes

- Use `ACCESS_COARSE_LOCATION` instead of `ACCESS_FINE_LOCATION` whenever approximate location suffices.
- On Android 10+ (API 29+), apps can read/write their own media files without any storage permission.
- Common permission-avoiding alternatives: Instance ID / `randomUUID()` instead of IMEI, Companion Device Pairing instead of `ACCESS_FINE_LOCATION` for Bluetooth pairing, Phone Number Hint instead of `READ_PHONE_STATE`, `CallScreeningService` instead of `READ_PHONE_STATE` for spam filtering, ML Kit/Play services barcode scanning instead of raw `CAMERA` access where possible.
- Google Play evaluates apps requesting sensitive permissions (all-files access, SMS, call logs) against declared use cases; requesting more than needed risks policy rejection.

## Related

- [declaring-permissions](./declaring-permissions.md)
- [media-permissions](./media-permissions.md)
- [explaining-permission-access](./explaining-permission-access.md)
