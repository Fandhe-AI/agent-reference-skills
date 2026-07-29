# Multidex (multiDexEnabled, MultiDexApplication, multiDexKeepProguard)

Configuration required when an app (or its test APK) exceeds the 64K DEX method reference limit. For `minSdk` 20 and below (Dalvik runtime), the app must opt into legacy multidex via a `defaultConfig` flag, a support library, and (optionally) an Application class hook; API 21+ (ART) supports multiple DEX files natively.

## Signature / Usage

```kotlin
// module build.gradle.kts
android {
    defaultConfig {
        minSdk = 15
        targetSdk = 36
        multiDexEnabled = true
    }
    buildTypes {
        getByName("release") {
            multiDexKeepProguard = file("multidex-config.pro")
        }
    }
}

dependencies {
    // Only required for minSdk <= 20
    implementation("androidx.multidex:multidex:2.0.1")
}
```

```xml
<!-- AndroidManifest.xml — no custom Application class -->
<application android:name="androidx.multidex.MultiDexApplication">
    ...
</application>
```

```kotlin
// Custom Application subclass, cannot extend MultiDexApplication directly
class MyApplication : SomeOtherApplication() {
    override fun attachBaseContext(base: Context) {
        super.attachBaseContext(base)
        MultiDex.install(this)
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `defaultConfig.multiDexEnabled` | `Boolean` | `false` | Enables legacy multidex output. Required only for `minSdk` ≤ 20; ignored/unnecessary at API 21+ where ART loads multiple DEX files natively. |
| `buildTypes { ... }.multiDexKeepFile` | `File` | — | Plaintext file listing classes (one per line) to force into the primary DEX file. |
| `buildTypes { ... }.multiDexKeepProguard` | `File` | — | ProGuard-syntax file (`-keep` rules) listing classes to force into the primary DEX file; alternative to `multiDexKeepFile`. |
| `androidx.multidex:multidex` dependency | Gradle coordinate | — | Provides `MultiDexApplication` and `MultiDex.install()`; required only when `minSdk` ≤ 20. |

## Notes

- `MultiDex.install()` must complete before any reflection- or JNI-based code runs in `attachBaseContext()`, otherwise a bad class partition can cause `ClassNotFoundException` or verification errors.
- Extending `androidx.multidex.MultiDexApplication` (directly, or by declaring it as `android:name` in the manifest) is the simplest path when there is no existing custom `Application` base class to preserve.
- `multiDexKeepProguard` is unrelated to code shrinking's own `proguardFiles`; it only controls primary-DEX class placement, not what gets stripped.

## Related

- [buildTypes](./build-types.md)
- [defaultConfig](./default-config.md)
