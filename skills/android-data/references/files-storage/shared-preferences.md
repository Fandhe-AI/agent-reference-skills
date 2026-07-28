# SharedPreferences

Stores private, primitive key-value data (booleans, floats, ints, longs, strings, string sets) through `Context.getSharedPreferences()` and the `SharedPreferences.Editor` API.

## Signature / Usage

```kotlin
// Get a handle (named file, shared across the app)
val sharedPref = activity?.getSharedPreferences(
    getString(R.string.preference_file_key), Context.MODE_PRIVATE)

// Write
with (sharedPref.edit()) {
    putInt(getString(R.string.saved_high_score_key), newHighScore)
    apply()
}

// Read
val highScore = sharedPref.getInt(getString(R.string.saved_high_score_key), defaultValue)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `context.getSharedPreferences(name, mode)` | `(String, Int) -> SharedPreferences` | — | Handle to a named preferences file, shared across multiple components. |
| `activity.getPreferences(mode)` | `(Int) -> SharedPreferences` | — | Handle to the single default preferences file for one `Activity`. |
| `SharedPreferences.edit()` | `() -> SharedPreferences.Editor` | — | Creates an editor for batched writes. |
| `Editor.apply()` | `() -> Unit` | — | Commits changes to the in-memory object immediately and writes to disk asynchronously. Preferred over `commit()`. |
| `Editor.commit()` | `() -> Boolean` | — | Writes to disk synchronously; avoid calling on the main thread. |
| `Context.MODE_PRIVATE` | `Int` | — | Required mode; file accessible only to the calling app. |

## Notes

- Prefix preference file names with the app's application ID (e.g. `"com.example.myapp.PREFERENCE_FILE_KEY"`) to avoid collisions.
- `MODE_WORLD_READABLE` / `MODE_WORLD_WRITEABLE` are deprecated (API level 17) and throw `SecurityException` on Android 7.0+.
- Official guidance recommends **DataStore** over SharedPreferences for new apps (built on coroutines/Flow). See the `datastore` category in this skill for the migration target; this page only covers the legacy SharedPreferences API.

## Related

- [Storage options overview](./storage-overview.md)
