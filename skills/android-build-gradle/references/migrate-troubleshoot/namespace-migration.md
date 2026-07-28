# Namespace Migration

The `namespace` property in `build.gradle.kts` replaces the deprecated `package` attribute in `AndroidManifest.xml`, and is used as the Kotlin/Java package for the generated `R` and `BuildConfig` classes.

## Signature / Usage

```kotlin
// build.gradle.kts
android {
    namespace = "com.example.myapp"
    testNamespace = "com.example.mytestapp" // optional, for androidTest/test source sets
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `namespace` | string | — | Package used for the generated `R` and `BuildConfig` classes; should match the app's base package. |
| `testNamespace` | string | `namespace` + `.test` | Overrides the namespace for `androidTest`/`test` source sets. |

## Notes

- Starting with AGP 7.3.0-alpha04, using `package` in the manifest generates a build warning; remove it from `<manifest>` after setting `namespace`.
- The `namespace` build property and the `package` attribute serve different purposes at build time: `namespace` is the Java/Kotlin package used to generate `R`; the manifest's merged `package` attribute (populated from the application ID) is the app's unique identifier.
- Keep `namespace` and application ID the same by default; if changing `namespace` independently, explicitly define the application ID first so it doesn't change unintentionally.
- Don't set `testNamespace` equal to `namespace` — this causes a namespace collision.
- AGP Upgrade Assistant can migrate an existing manifest `package` attribute to the `namespace` property automatically.
- Source: `developer.android.com/build/configure-app-module`.

## Related

- [Manifest Merger Conflicts](./manifest-merger-conflicts.md)
- [AGP Upgrade Assistant](./agp-upgrade-assistant.md)
