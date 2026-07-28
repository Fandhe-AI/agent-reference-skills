# android {} block

Top-level DSL block in the module `build.gradle.kts` where Android-specific build configuration (SDK versions, namespace, and all nested configuration blocks) is declared.

## Signature / Usage

```kotlin
android {
    namespace = "com.example.myapp"
    compileSdk = 36
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `namespace` | `String` | — | Kotlin/Java package name used for the generated `R` and `BuildConfig` classes. Initially set to the package chosen at project creation; recommended to keep identical to `applicationId`. |
| `compileSdk` | `Int` | — | Android SDK version used to compile the module's source code; determines which Android/Java APIs are available. Use the latest available version to access new features. |

## Notes

- `namespace` is distinct from `applicationId` (declared in `defaultConfig`): namespace drives R/BuildConfig class generation, while `applicationId` is the app's unique identifier copied into the merged manifest's `package` attribute at build completion.
- For testing, `testNamespace` can override the namespace used by `androidTest`/`test` source sets (default: `{namespace}.test`); it must not equal `namespace` (causes class collisions).
- `buildToolsVersion` is an explicit override for the SDK Build Tools version (e.g. `"36.0.0"`); the AGP 9.3 release notes list SDK Build Tools 36.0.0 as the minimum/default version required.
- A nested form of `compileSdk` also exists on the current guide (`compileSdk { version = release(36) { minorApiLevel = 1 } }`), alongside the flat `compileSdk = 36` assignment used above; confirm which form your AGP version expects before using the nested one.

## Related

- [defaultConfig](./default-config.md)
- [Module build.gradle.kts](./module-build-gradle.md)
