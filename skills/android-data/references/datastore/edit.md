# edit

Extension function on `DataStore<Preferences>` for atomic, transactional read-modify-write updates without manually converting to `MutablePreferences`.

## Signature / Usage

```kotlin
package androidx.datastore.preferences.core

public suspend fun DataStore<Preferences>.edit(
    transform: suspend (MutablePreferences) -> Unit
): Preferences
```

```kotlin
suspend fun incrementCounter(dataStore: DataStore<Preferences>) {
    dataStore.edit { preferences ->
        val currentValue = preferences[EXAMPLE_COUNTER] ?: 0
        preferences[EXAMPLE_COUNTER] = currentValue + 1
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `transform` | `suspend (MutablePreferences) -> Unit` | — | Mutates the given `MutablePreferences` in place; the result is persisted atomically when the block completes. |

## Notes

- Thin wrapper over `DataStore.updateData`.
- Do not access `dataStore.data` inside the `transform` block — it deadlocks.
- Package: `androidx.datastore.preferences.core`.

## Related

- [DataStore](./datastore.md)
- [Preferences / MutablePreferences](./preferences.md)
- [preferences-keys](./preferences-keys.md)
