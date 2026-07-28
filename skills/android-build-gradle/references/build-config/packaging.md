# packaging

Nested block inside `android { }` that controls which files are included/excluded when packaging the final APK/AAB, and how native libraries are packaged.

## Signature / Usage

```kotlin
android {
    packaging {
        resources {
            excludes.add("META-INF/*")
        }
        jniLibs {
            excludes.add("**/exclude.so")
            useLegacyPackaging = false
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `resources.excludes` | `MutableSet<String>` | — | File path patterns (other than native libraries) to exclude from packaging. |
| `jniLibs.excludes` | `MutableSet<String>` | — | `.so` file path patterns to exclude from packaging. |
| `jniLibs.useLegacyPackaging` | `Boolean` | `true` (legacy default; set `false` to enable uncompressed native libraries) | Controls whether native libraries are packaged uncompressed/extracted at install time versus the legacy compressed format. |

## Notes

- AGP 8.1.0-alpha10 moved native-library-compression configuration from the manifest's `android:extractNativeLibs` attribute into this DSL; the AGP 8.1.0 release notes still show the block named `packagingOptions { }`, while current guides use `packaging { }` — both names may appear depending on AGP version.
- `useLegacyPackaging` only applies to APK-producing (application) modules; library modules continue to use the `extractNativeLibs` manifest attribute.
- The older `exclude("pattern")` method is deprecated in favor of `resources.excludes.add(...)` / `jniLibs.excludes.add(...)`.

## Related

- [Module build.gradle.kts](./module-build-gradle.md)
