# signingConfigs

Nested block inside `android { }` that declares keystore-based signing configurations, which can then be assigned to a build type via `signingConfig`.

## Signature / Usage

```kotlin
android {
    signingConfigs {
        create("release") {
            storeFile = file("myreleasekey.keystore")
            storePassword = System.getenv("KSTOREPWD")
            keyAlias = "MyReleaseKey"
            keyPassword = System.getenv("KEYPWD")
        }
    }
    buildTypes {
        getByName("release") {
            signingConfig = signingConfigs.getByName("release")
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `storeFile` | `File` | — | Path to the keystore file. |
| `storePassword` | `String` | — | Keystore password. |
| `keyAlias` | `String` | — | Alias of the signing key inside the keystore. |
| `keyPassword` | `String` | — | Password of the signing key. |

## Notes

- This page covers only the `signingConfigs` **DSL declaration**; secure credential handling, App Signing by Google Play, and the release publishing procedure are owned by the `optimize-release` category.
- Reading passwords via `System.getenv(...)` (as shown above) avoids committing secrets to the build file.
- The `debug` build type has an implicit, pre-generated debug keystore; it does not need an explicit `signingConfigs` entry.

## Related

- [buildTypes](./build-types.md)
