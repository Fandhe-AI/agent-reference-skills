# Release Checklist

Steps to prepare an Android app module for a production release build: versioning, disabling debug artifacts, enabling shrinking, and cleaning up test/dev leftovers before signing and building.

## Signature / Usage

```kotlin
android {
    namespace = "com.example.testapp"
    compileSdk = 33

    defaultConfig {
        applicationId = "com.example.testapp"
        minSdk = 24
        targetSdk = 33
        versionCode = 2      // monotonically increase every release
        versionName = "1.1"  // user-visible string
    }

    buildTypes {
        release {
            isDebuggable = false
            isMinifyEnabled = true
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `versionCode` | `Int` | — | Positive integer internal version; must strictly increase release over release. Not shown to users. Max value 2,100,000,000 (Google Play limit). |
| `versionName` | `String` | — | User-visible version string (e.g. `"1.1"`), typically `<major>.<minor>.<point>`. |
| `isDebuggable` | `Boolean` | `false` (release) | Must be `false` for release builds. |

## Notes

- Checklist highlights (per official "Prepare for release" guide): set `applicationId`/`versionCode`/`versionName`; set `isDebuggable = false`; disable `WebView.setWebContentsDebuggingEnabled(false)` where applicable; remove `Log.*` calls, `Debug` tracing calls, and stray test/log files from `src/`, `lib/`, `assets/`, `res/raw/`; verify `<uses-permission>` is minimal; verify `minSdk`/`targetSdk`; point all remote URLs at production; enable app shrinking (R8/ProGuard).
- `versionCode` can be overridden per `productFlavor`; per-ABI/split APKs may need a pre-set `versionCode` offset scheme (see [apk-splits.md](./apk-splits.md)) so Google Play always prefers the correct split.
- Signing (keystore, Play App Signing) is required before producing a distributable build — see [app-signing.md](./app-signing.md).
- Requirement starting 2026: apps installed on certified Android devices must be registered by a verified developer, in addition to the standard signing/versioning checklist.
- Play Console upload and store-listing steps are outside this skill's scope; this page covers only the Gradle/module-level preparation.

## Related

- [app-signing.md](./app-signing.md)
- [apk-splits.md](./apk-splits.md)
- [debuggable-obfuscation.md](./debuggable-obfuscation.md)
