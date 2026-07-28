# defaultConfig

Nested block inside `android { }` that sets default values shared by all build variants (build types × product flavors); individual build types or product flavors can override these values.

## Signature / Usage

```kotlin
android {
    defaultConfig {
        applicationId = "com.example.myapp"
        minSdk = 23
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `applicationId` | `String` | — | Unique app identifier on the device and Google Play Store. Must have ≥2 dot-separated segments, each starting with a letter, characters limited to `[a-zA-Z0-9_]`. Must never change after publishing. |
| `testApplicationId` | `String` | `{applicationId}.test` | Overrides the application ID used by the test APK. |
| `minSdk` | `Int` | — | Lowest Android API level the app supports; restricts installable devices. Lint warns about APIs unavailable at this level. |
| `targetSdk` | `Int` | — | API level the app is tested against; affects runtime compatibility behavior and is subject to Google Play target-level policies. |
| `versionCode` | `Int` | — | Internal integer version, incremented for each release. |
| `versionName` | `String` | — | User-facing version string. |
| `testInstrumentationRunner` | `String` | — | Fully-qualified class name of the instrumentation test runner, e.g. `androidx.test.runner.AndroidJUnitRunner`. |
| `manifestPlaceholders` | `Map<String, Any>` | — | Key/value pairs injected into placeholder tokens (`${token}`) in `AndroidManifest.xml`. |
| `missingDimensionStrategy(dimension, ...)` | function | — | Declares a fallback flavor to use when a dependency declares a flavor dimension this module does not have. |

## Notes

- Keeping `applicationId` identical to `namespace` is the recommended default; the two serve different purposes (see `android-block.md`).
- `applicationId` is referred to as "package name" by platform APIs such as `Context.getPackageName()`.
- Values here are the defaults for every build variant; `buildTypes` and `productFlavors` blocks can override individual properties (e.g. `applicationIdSuffix`, `versionNameSuffix`).
- `testInstrumentationRunner`/`testOptions` here cover only the DSL declaration; test authoring itself is owned by the `android-testing` skill.

## Related

- [android {} block](./android-block.md)
- [buildTypes](./build-types.md)
- [productFlavors and flavorDimensions](./product-flavors.md)
