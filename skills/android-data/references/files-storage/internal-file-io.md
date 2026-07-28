# Internal File I/O (openFileOutput / openFileInput)

Stream-based helpers on `Context` for reading and writing files directly under the app's internal `filesDir`.

## Signature / Usage

```kotlin
val filename = "myfile"
val fileContents = "Hello world!"

// Write
context.openFileOutput(filename, Context.MODE_PRIVATE).use {
    it.write(fileContents.toByteArray())
}

// Read
context.openFileInput(filename).bufferedReader().useLines { lines ->
    lines.fold("") { some, text -> "$some\n$text" }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `context.openFileOutput(name, mode)` | `(String, Int) -> FileOutputStream` | — | Opens (creating if needed) a private file for writing under `filesDir`. |
| `context.openFileInput(name)` | `(String) -> FileInputStream` | — | Opens a private file for reading from `filesDir`. |
| `Context.MODE_PRIVATE` | `Int` | — | Default and recommended mode; file accessible only to the calling app. |

## Notes

- Android 7.0+ (API level 24+) requires `Context.MODE_PRIVATE`; using world-readable/writable modes throws a `SecurityException`.
- `MODE_WORLD_READABLE` and `MODE_WORLD_WRITEABLE` are deprecated since API level 17.
- For arbitrary paths (not just top-level filesDir entries), use `File(context.filesDir, filename)` with standard Java/Kotlin file APIs instead.

## Related

- [App-specific storage](./app-specific-storage.md)
- [Cache management and StorageManager](./cache-management.md)
