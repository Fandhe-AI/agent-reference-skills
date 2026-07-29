# Dynamic Feature Modules

Gradle-side configuration for Play Feature Delivery: applying the `com.android.dynamic-feature` plugin to a feature module, registering it on the base app module via `android.dynamicFeatures`, and declaring its delivery mode (install-time, on-demand, conditional, instant) with `dist:module` / `dist:delivery` manifest attributes.

## Signature / Usage

```kotlin
// dynamic_feature/build.gradle.kts
plugins {
    id("com.android.dynamic-feature")
}

dependencies {
    implementation(project(":app"))
}
```

```kotlin
// app/build.gradle.kts (base module)
android {
    dynamicFeatures += setOf(":dynamic_feature", ":dynamic_feature2")
}
```

```xml
<!-- dynamic_feature/src/main/AndroidManifest.xml -->
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:dist="http://schemas.android.com/apk/distribution"
    package="com.example.myapp.dynamic_feature">

    <dist:module
        dist:instant="false"
        dist:title="@string/feature_name">
        <dist:delivery>
            <dist:on-demand />
        </dist:delivery>
        <dist:fusing dist:include="true" />
    </dist:module>

    <application />
</manifest>
```

## Options / Props

| Name | Location | Description |
|------|----------|-------------|
| `com.android.dynamic-feature` | feature module `build.gradle(.kts)` plugin block | Marks the module as a Play Feature Delivery dynamic feature; adds bundle-aware build tasks. |
| `android.dynamicFeatures` | base module `build.gradle(.kts)` | List of `:module` paths that are dynamic features of this base app. |
| `dist:delivery` > `dist:install-time` | feature module manifest | Module is downloaded with the app at install time (default); can hold `<dist:conditions>` for conditional delivery. |
| `dist:delivery` > `dist:on-demand` | feature module manifest | Module is downloaded only when requested at runtime via the Play Core / Feature Delivery library. |
| `dist:delivery` > `dist:instant` | feature module manifest | Module is also deliverable as an instant experience without install. |
| `dist:fusing` | feature module manifest | Whether the module is included in the legacy multi-APK fallback for pre-Lollipop devices. |

## Notes

- A dynamic feature module always depends on its base module (`implementation(project(":app"))`); it must not declare its own `signingConfig`, `minifyEnabled`, `versionCode`, or `versionName` — these are inherited from the base module.
- Additional ProGuard/R8 rules for the feature can still be added via `proguardFiles` in the feature module's `buildTypes.release` block.
- Conditional delivery narrows an `install-time` module to devices meeting requirements (e.g. minimum API level, device feature) declared inside `<dist:install-time><dist:conditions>...</dist:conditions></dist:install-time>`.
- Building and installing dynamic feature APKs directly requires the app to be distributed as an Android App Bundle; this page covers only the Gradle/manifest DSL, not the runtime Play Core `SplitInstallManager` API for requesting on-demand modules.

## Related

- [app-bundle.md](./app-bundle.md)
- [bundle-config.md](./bundle-config.md)
