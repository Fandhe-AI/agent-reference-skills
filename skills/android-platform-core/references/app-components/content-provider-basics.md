# ContentProvider basics

A `ContentProvider` manages access to a central repository of app data and exposes it to callers (including other apps) as relational-style tables addressed by content URIs.

## Signature / Usage

```kotlin
val cursor = contentResolver.query(
    UserDictionary.Words.CONTENT_URI,   // content://user_dictionary/words
    projection,                          // columns to return
    selectionClause,                     // WHERE clause
    selectionArgs.toTypedArray(),        // WHERE values
    sortOrder                            // ORDER BY clause
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ContentResolver.query(uri, projection, selection, args, sortOrder)` | method | — | Retrieves rows matching the criteria; returns a `Cursor`. |
| `ContentResolver.insert(uri, values)` | method | — | Inserts a `ContentValues` row; returns the new row's content `Uri`. |
| `ContentResolver.update(uri, values, selection, args)` | method | — | Updates matching rows; returns the number of rows updated. |
| `ContentResolver.delete(uri, selection, args)` | method | — | Deletes matching rows; returns the number of rows deleted. |
| Content URI | `content://authority/path[/id]` | — | `authority` identifies the provider (e.g. `user_dictionary`); `path` identifies a table; an appended numeric id addresses a single row. |

## Notes

- This is the Android platform component API (Kotlin / `android.app`, `android.content`) — distinct from the same-named concept in other skills.
- Providers back use cases beyond simple CRUD: sharing data with other apps, feeding app widgets, custom search suggestions, and server sync.
- Always close a `Cursor` when finished, and always use parameterized `selection` (`"var = ?"` + `selectionArgs`) rather than string concatenation, to avoid SQL injection.
- Reading/writing a provider may require declaring `<uses-permission>` for that provider's custom read/write permissions.
- For implementing your own provider, see [Creating a ContentProvider](./content-provider-creating.md). File-based and MediaStore-specific data access is owned by the `android-data` skill.

## Related

- [Creating a ContentProvider](./content-provider-creating.md)
- [App components overview](./app-components-overview.md)
