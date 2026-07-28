# Preferences / MutablePreferences

Map-like container keyed by `Preferences.Key<T>`, used as the `T` in `DataStore<Preferences>`. `Preferences` is the read-only view; `MutablePreferences` adds write operations for use inside `edit { }` / `updateData { }`.

## Signature / Usage

```kotlin
package androidx.datastore.preferences.core

public abstract class Preferences internal constructor() {
    public abstract operator fun <T> contains(key: Key<T>): Boolean
    public abstract operator fun <T> get(key: Key<T>): T?
    public abstract fun asMap(): Map<Key<*>, Any>
    public fun toMutablePreferences(): MutablePreferences
    public fun toPreferences(): Preferences
    public fun copy(block: (MutablePreferences) -> Unit): Preferences

    // constructed only via stringPreferencesKey / intPreferencesKey / ... — no public constructor
    public class Key<T> internal constructor(public val name: String) {
        public infix fun to(value: T): Pair<T>
    }

    public class Pair<T> internal constructor(internal val key: Key<T>, internal val value: T)
}

// constructed only via toMutablePreferences() / mutablePreferencesOf() — no public constructor
public class MutablePreferences internal constructor() : Preferences() {
    public operator fun <T> set(key: Key<T>, value: T)
    public operator fun plusAssign(prefs: Preferences)
    public operator fun plusAssign(pair: Preferences.Pair<*>)
    public operator fun minusAssign(key: Preferences.Key<*>)
    public fun putAll(vararg pairs: Preferences.Pair<*>)
    public fun <T> remove(key: Preferences.Key<T>): T
    public fun clear()
}

// PreferencesFactory.kt
public fun emptyPreferences(): Preferences
public fun preferencesOf(vararg pairs: Preferences.Pair<*>): Preferences
public fun mutablePreferencesOf(vararg pairs: Preferences.Pair<*>): MutablePreferences
```

```kotlin
val EXAMPLE_COUNTER = intPreferencesKey("example_counter")

val counter: Flow<Int> = dataStore.data
    .catch { exception -> if (exception is IOException) emit(emptyPreferences()) else throw exception }
    .map { preferences -> preferences[EXAMPLE_COUNTER] ?: 0 }

val seeded = preferencesOf(EXAMPLE_COUNTER to 100)
```

## Notes

- Reading a missing key with `get` returns `null`; always provide a fallback (e.g. `?: 0`).
- Using the same key name with two different `Preferences.Key<T>` types can result in `ClassCastException`.
- `MutablePreferences` starts frozen after being handed to a transform; mutate only inside the `edit` / `updateData` block that owns it.
- Supported value types: `Boolean`, `Int`, `Long`, `Float`, `Double`, `String`, `Set<String>`, `ByteArray`.
- `emptyPreferences()` is the standard fallback in `data.catch { emit(emptyPreferences()) }` when reading fails with an `IOException`. `preferencesOf` / `mutablePreferencesOf` build a `Preferences` / `MutablePreferences` from `Key to value` pairs, similar to `mapOf`.
- Package: `androidx.datastore.preferences.core`.

## Related

- [preferences-keys](./preferences-keys.md)
- [edit](./edit.md)
- [preferencesDataStore / PreferenceDataStoreFactory](./preferences-datastore.md)
