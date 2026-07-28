# App Signing

Every release APK/AAB must be digitally signed. Covers generating an upload keystore, wiring a `signingConfig` to a release build variant, and Google Play App Signing for managing the actual app signing key.

## Signature / Usage

```kotlin
android {
    signingConfigs {
        create("release") {
            storeFile = file("my-release-key.jks")
            storePassword = "store_password"
            keyAlias = "release-key-alias"
            keyPassword = "key_password"
        }
    }

    buildTypes {
        release {
            signingConfig = signingConfigs["release"]
        }
    }
}
```

```kotlin
// keystore.properties-based secrets loading (avoid hardcoding credentials)
import java.util.Properties
import java.io.FileInputStream

val keystorePropertiesFile = rootProject.file("keystore.properties")
val keystoreProperties = Properties()
keystoreProperties.load(FileInputStream(keystorePropertiesFile))

android {
    signingConfigs {
        create("release") {
            keyAlias = keystoreProperties["keyAlias"] as String
            keyPassword = keystoreProperties["keyPassword"] as String
            storeFile = file(keystoreProperties["storeFile"] as String)
            storePassword = keystoreProperties["storePassword"] as String
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `storeFile` | `File` | — | Path to the keystore file (`.jks`). |
| `storePassword` | `String` | — | Keystore password. |
| `keyAlias` | `String` | — | Alias identifying the key within the keystore. |
| `keyPassword` | `String` | — | Password for the individual key. |

## Notes

- `signingConfigs` itself is owned by `build-config`; this page covers keystore creation and the Play-side operational flow around it.
- Debug builds are signed automatically by Android Studio with a generated debug certificate at `$HOME/.android/debug.keystore` (30-year validity); delete this file to force regeneration if it expires or becomes invalid.
- Recommended keystore validity: at least 25 years; **the app signing key's validity must end after October 22, 2033** to remain eligible for Google Play distribution.
- **Play App Signing**: upload a signed app with an "upload key"; Google Play manages the real "app signing key" separately, allowing the upload key to be reset if compromised without losing the app's identity. New apps let Google generate the signing key (recommended) or accept an uploaded one via export; existing apps opt in from Play Console → Release → Setup → App signing.
- Different `signingConfigs` can be assigned per product flavor (e.g. `free` / `paid`) to sign flavor-specific builds with different keys.
- View a variant's signing details via Gradle Tool Window → `app > tasks > android > signingReport`.

## Related

- [release-checklist.md](./release-checklist.md)
- [debuggable-obfuscation.md](./debuggable-obfuscation.md)
