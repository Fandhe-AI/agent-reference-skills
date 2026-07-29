# AGP / Kotlin / D8 / R8 Version Compatibility

Each Kotlin compiler version requires a minimum Android Gradle plugin (AGP) version and a minimum bundled D8/R8 version, a separate compatibility axis from the AGP-Gradle wrapper matrix.

## Signature / Usage

```kotlin
// libs.versions.toml — pick a Kotlin version compatible with the AGP version in use
[versions]
kotlin = "2.4.0"
agp = "9.3.0"
```

## Options / Props

| Kotlin version | Required AGP version | Required R8 version |
|------|------|-------------|
| 2.4 | 8.5.2+ | 9.1.29 |
| 2.3 | 8.2.2–8.13 (9.x needs 9.0.28+) | 8.13.19 |
| 2.2 | 7.3.1–8.10 | 8.10.21 |
| 2.1 | 7.4.2–8.7.2 | 8.6.17 |
| 2.0 | 7.4.2–8.3 | 8.5.10 |
| 1.9 | 7.4.2–8.2 | 8.0.27 |
| 1.8 | 4.1.3–7.4 | 4.0.48 |

## Notes

- Each AGP release bundles a fixed D8 and R8 version; the required R8 version above is the minimum bundled with a compatible AGP release, not something set independently.
- AGP 9.x releases before 9.0.28 do not support Kotlin 2.3; check this matrix in addition to `agp-gradle-version-compatibility.md` when bumping the Kotlin version without also bumping AGP.
- Java 8+ API desugaring requires AGP 7.0 (D8/R8 3.0.76) or higher.
- R8 can only emit Kotlin metadata version 1.4 or newer; when shrinking a Kotlin 1.3 library, R8 automatically upgrades its metadata to 1.4 format, while Kotlin 1.4+ metadata is preserved as-is.
- Source: `developer.android.com/build/kotlin-support`.

## Related

- [AGP / Gradle Version Compatibility](./agp-gradle-version-compatibility.md)
- [JDK Configuration](./jdk-configuration.md)
