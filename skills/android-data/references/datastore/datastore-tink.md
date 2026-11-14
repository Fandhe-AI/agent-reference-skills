# datastore-tink / AeadSerializer

Encryption support for DataStore using the Tink library: `AeadSerializer` wraps an existing `Serializer<T>` and encrypts/decrypts data with Authenticated Encryption with Associated Data (AEAD). New artifact `androidx.datastore:datastore-tink`.

## Signature / Usage

Create a key using Tink APIs:

```kotlin
val keysetHandle =
    AndroidKeysetManager.Builder()
        .withSharedPref(applicationContext, "keyset", "keyset_prefs")
        .withKeyTemplate(KeyTemplate.createFrom(PredefinedAeadParameters.AES256_GCM))
        .withMasterKeyUri("android-keystore://master_key")
        .build()
        .keysetHandle
```

Create an `AeadSerializer` that wraps an existing serializer:

```kotlin
val aeadSerializer = AeadSerializer(
    // Use tink APIs to create an Aead object to encrypt/decrypt data.
    aead =
        keysetHandle.getPrimitive(
            RegistryConfiguration.get(),
            Aead::class.java,
        ),
    // AeadSerializer can wrap an existing serializer.
    wrappedSerializer = ExistingSerializer,
    // Specify a unique name to prevent a ciphertext swapping attack.
    associatedData = "settings.json".encodeToByteArray(),
)
```

Use this `aeadSerializer` in place of your serializer when creating the datastore instance:

```kotlin
val dataStore = dataStore(
    fileName = "settings.json",
    serializer = aeadSerializer,
    scope = scope,
)
```

Adapted (not in the official docs): `dataStore(...)` returns a `ReadOnlyProperty<Context, DataStore<T>>`, not a `DataStore<T>`, so declare it as a top-level property delegate and read the instance through a `Context`.

```kotlin
val Context.settingsDataStore: DataStore<Settings> by dataStore(
    fileName = "settings.json",
    serializer = aeadSerializer,
    scope = scope,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `aead` | `Aead` (Tink) | — | Tink primitive used to encrypt/decrypt. |
| `wrappedSerializer` | `Serializer<T>` | — | Existing serializer wrapped by `AeadSerializer`. |
| `associatedData` | `ByteArray` | — | Unique name to prevent a ciphertext swapping attack. |

## Notes

- Introduced in 1.3.0-alpha07 (2026-03-11); stable in 1.3.0 (2026-10-21). `AeadSerializer` is available on JVM and Android targets.
- `GeneralSecurityException` thrown in `AeadSerializer` is wrapped in `CorruptionException` since 1.3.0-alpha10, so a `CorruptionHandler` can handle it.
- The first three snippets are verbatim from the official release notes (the release-note `val dataStore = dataStore(...)` form is not directly usable; use the delegate form above); the Tink keyset and `ExistingSerializer` are the caller's own.
- Source: https://developer.android.com/jetpack/androidx/releases/datastore (1.3.0-alpha07 section, retrieved 2026-11-14)

## Related

- [Proto/Typed DataStore (Serializer)](./proto-datastore.md)
- [CorruptionHandler](./corruption-handler.md)
