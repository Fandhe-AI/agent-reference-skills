# Creating a ContentProvider

Implementing a custom `ContentProvider` subclass to expose your app's data to `ContentResolver` callers, using `UriMatcher` to route content URIs to the right table/row logic.

## Signature / Usage

```kotlin
private val sUriMatcher = UriMatcher(UriMatcher.NO_MATCH).apply {
    addURI("com.example.app.provider", "table3", 1)     // all rows
    addURI("com.example.app.provider", "table3/#", 2)   // single row ("#" = numeric)
}

class ExampleProvider : ContentProvider() {
    override fun onCreate(): Boolean {
        // Defer heavy initialization out of onCreate()
        return true
    }

    override fun query(
        uri: Uri, projection: Array<out String>?, selection: String?,
        selectionArgs: Array<out String>?, sortOrder: String?
    ): Cursor? = when (sUriMatcher.match(uri)) {
        1 -> /* query all rows */ null
        2 -> /* query row uri.lastPathSegment */ null
        else -> null
    }

    override fun getType(uri: Uri): String = when (sUriMatcher.match(uri)) {
        1 -> "vnd.android.cursor.dir/vnd.com.example.provider.table3"
        2 -> "vnd.android.cursor.item/vnd.com.example.provider.table3"
        else -> ""
    }

    override fun insert(uri: Uri, values: ContentValues?): Uri? = null
    override fun update(uri: Uri, values: ContentValues?, selection: String?, selectionArgs: Array<out String>?): Int = 0
    override fun delete(uri: Uri, selection: String?, selectionArgs: Array<out String>?): Int = 0
}
```

```xml
<provider
    android:name=".ExampleProvider"
    android:authorities="com.example.app.provider"
    android:exported="true"
    android:readPermission="com.example.app.permission.READ_PROVIDER"
    android:writePermission="com.example.app.permission.WRITE_PROVIDER" />
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onCreate()` | method (override) | — | Provider initialization. Called on the main thread — defer expensive work. |
| `query()` / `insert()` / `update()` / `delete()` | methods (override) | — | CRUD entry points; may be called concurrently from multiple threads (unlike `onCreate()`), so implementations must be thread-safe. |
| `getType(uri)` | method (override) | — | Returns the MIME type for a content URI (`vnd.android.cursor.dir/...` for a set, `vnd.android.cursor.item/...` for a single row). |
| `android:authorities` | manifest attribute | — | Reverse-domain identifier for the provider, e.g. `com.example.app.provider`; forms the authority segment of its content URIs. |
| `android:exported` | manifest attribute | — | Whether other apps can access the provider at all; combine with `readPermission` / `writePermission` for finer-grained access control. |
| `UriMatcher` | `android.content.UriMatcher` | — | Maps URI path patterns to integer codes; `*` matches any string segment, `#` matches numeric segments only. |

## Notes

- This is the Android platform component API (Kotlin / `android.app`, `android.content`) — distinct from the same-named concept in other skills.
- Design the content URI scheme and `authorities` before implementation: `content://com.example.<appname>.provider/table1`.
- Storage backing the provider can be a SQLite database, Room, or files in app-specific storage — the provider is an access layer, not a storage engine itself.
- Prefer a public contract class of `String` constants for URIs and column names so external callers don't need to guess your schema.

## Related

- [ContentProvider basics](./content-provider-basics.md)
- [App components overview](./app-components-overview.md)
