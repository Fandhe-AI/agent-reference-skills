# stringPreferencesKey / intPreferencesKey / ...

Top-level functions that create a typed `Preferences.Key<T>` used to read and write a single value in `Preferences`.

## Signature / Usage

```kotlin
package androidx.datastore.preferences.core

public fun intPreferencesKey(name: String): Preferences.Key<Int>
public fun doublePreferencesKey(name: String): Preferences.Key<Double>
public fun stringPreferencesKey(name: String): Preferences.Key<String>
public fun booleanPreferencesKey(name: String): Preferences.Key<Boolean>
public fun floatPreferencesKey(name: String): Preferences.Key<Float>
public fun longPreferencesKey(name: String): Preferences.Key<Long>
public fun stringSetPreferencesKey(name: String): Preferences.Key<Set<String>>
public fun byteArrayPreferencesKey(name: String): Preferences.Key<ByteArray>
```

```kotlin
val EXAMPLE_COUNTER = intPreferencesKey("example_counter")
val USER_NAME = stringPreferencesKey("user_name")
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `String` | — | Unique name of the preference within the `DataStore<Preferences>` file. |

## Notes

- Using the same `name` with two different key-builder types can result in `ClassCastException` at read time.
- `stringSetPreferencesKey` values must be treated as immutable; mutating a returned `Set<String>` in place does not persist.
- `byteArrayPreferencesKey` values are copied on write/read; large binary payloads should generally use Proto/Typed DataStore instead.
- Package: `androidx.datastore.preferences.core`.

## Related

- [Preferences / MutablePreferences](./preferences.md)
- [edit](./edit.md)
