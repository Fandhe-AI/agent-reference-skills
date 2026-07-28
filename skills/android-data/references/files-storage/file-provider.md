# FileProvider and File Sharing

Special subclass of `ContentProvider` (`androidx.core.content.FileProvider`) that generates secure, temporary content `Uri`s for sharing files stored in app-specific directories with other apps.

## Signature / Usage

```xml
<!-- AndroidManifest.xml -->
<provider
    android:name="androidx.core.content.FileProvider"
    android:authorities="com.example.myapp.fileprovider"
    android:grantUriPermissions="true"
    android:exported="false">
    <meta-data
        android:name="android.support.FILE_PROVIDER_PATHS"
        android:resource="@xml/filepaths" />
</provider>
```

```xml
<!-- res/xml/filepaths.xml -->
<paths>
    <files-path path="images/" name="myimages" />
</paths>
```

```kotlin
val fileUri: Uri? = FileProvider.getUriForFile(
    this, "com.example.myapp.fileprovider", requestFile)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:authorities` | attribute | — | URI authority used to build content URIs, typically `<applicationId>.fileprovider`. |
| `android:grantUriPermissions` | attribute | `false` | Must be `true` to grant temporary per-URI access to other apps. |
| `android:exported` | attribute | — | Should be `false`; access is instead granted per-URI via permission flags. |
| `<files-path>` | XML element | — | Shares a subdirectory under the app's internal `files/` directory. |
| `<cache-path>` | XML element | — | Shares a subdirectory under the internal cache directory. |
| `<external-path>` | XML element | — | Shares a subdirectory under external storage. |
| `path` / `name` | attribute | — | `path` is the subdirectory to expose; `name` is the URI path segment used in generated content URIs. |
| `FileProvider.getUriForFile(context, authority, file)` | function | — | Returns a content `Uri` for the given `File`, or throws `IllegalArgumentException` if it is outside a configured path. |

## Notes

- The `<paths>` XML file is the only way to declare sharable directories — this cannot be done programmatically.
- Requires the AndroidX Core library dependency.
- Prefer `FileProvider` over `Uri.fromFile()`: raw file URIs force the receiving app to hold `READ_EXTERNAL_STORAGE`, break across user profiles, and are rejected by apps like Gmail.
- Grant access only through intent flags (`FLAG_GRANT_READ_URI_PERMISSION`), never via `Context.grantUriPermission()`, which grants permanent access.

## Related

- [Uri permission grants](./uri-permissions.md)
- [Storage Access Framework](./storage-access-framework.md)
