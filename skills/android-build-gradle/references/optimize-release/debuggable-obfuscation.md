# Debuggable Builds with Obfuscation

Guidance for keeping a build debuggable while still exercising R8 obfuscation, useful for QA-testing release-like shrinking behavior before shipping.

## Signature / Usage

```kotlin
android {
    buildTypes {
        create("staging") {
            initWith(getByName("debug"))
            isDebuggable = true      // keep debugging enabled
            isMinifyEnabled = true   // exercise R8 obfuscation
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            applicationIdSuffix = ".staging"
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `isDebuggable` | `Boolean` | `true` for `debug`, `false` for `release` | Whether the resulting APK can be debugged on a secure device. |
| `isMinifyEnabled` | `Boolean` | `false` | Enables R8 shrinking/obfuscation independently of `isDebuggable`. |

## Notes

- `debuggable` and `minifyEnabled` are independent flags — a custom build type (e.g. `staging`, created with `initWith(getByName("debug"))`) can combine `isDebuggable = true` with `isMinifyEnabled = true` to catch obfuscation-related bugs (missing keep rules, reflection failures) without giving up debugger attachment.
- The default `debug` build type is auto-configured by Android Studio with `isDebuggable = true` and signed with the debug keystore; the default `release` build type must explicitly set `isDebuggable = false` before shipping.
- Test code (androidTest / unit tests) needs its own proguard rules to match the obfuscation applied to main code when the tested build type has `isMinifyEnabled = true`; consult Android Gradle Plugin's `VariantDimension` API for the exact test-rules mechanism, as it is not covered on this guide page.
- Disable `WebView.setWebContentsDebuggingEnabled(false)` for release builds that display paid content or expose JavaScript interfaces.

## Related

- [shrink-code.md](./shrink-code.md)
- [build-variant-optimization.md](./build-variant-optimization.md)
- [release-checklist.md](./release-checklist.md)
