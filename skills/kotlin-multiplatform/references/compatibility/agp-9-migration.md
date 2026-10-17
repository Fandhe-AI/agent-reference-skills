---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-project-agp-9-migration.html
---

# Updating multiplatform projects with Android apps to use AGP 9

With Android Gradle plugin 9.0 or newer, the Kotlin Multiplatform Gradle plugin is no longer compatible with `com.android.application` and `com.android.library`. Extract the Android entry point into a separate module and migrate the shared module to the Android-KMP library plugin.

## Signature / Usage

Shared module (`composeApp/build.gradle.kts`): replace `kotlin.androidTarget {}` with `kotlin.androidLibrary {}`:

```kotlin
androidLibrary {
    namespace = "compose.project.demo.composedemo"
    compileSdk = libs.versions.android.compileSdk.get().toInt()

    compilerOptions {
        jvmTarget.set(JvmTarget.JVM_11)
    }

    androidResources {
        enable = true
    }
}
```

Version catalog entry for the new plugin:

```toml
[plugins]
androidMultiplatformLibrary = { id = "com.android.kotlin.multiplatform.library", version.ref = "agp" }
```

### Steps

Android app entry point module (`androidApp`):

1. Create the `androidApp` directory with an empty `build.gradle.kts` and a `src` directory, then add `include(":androidApp")` to `settings.gradle.kts` and sync.
2. Add the Kotlin Android plugin to `gradle/libs.versions.toml`:

   ```toml
   [plugins]
   kotlinAndroid = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
   ```

3. In `androidApp/build.gradle.kts` specify the plugins, and make sure all are also in the root `build.gradle.kts` with `apply false`:

   ```kotlin
   plugins {
      alias(libs.plugins.kotlinAndroid)
      alias(libs.plugins.androidApplication)
      alias(libs.plugins.composeMultiplatform)
      alias(libs.plugins.composeCompiler)
   }
   ```

4. Copy the dependencies from the `androidMain.dependencies {}` block of `composeApp` and add the dependency on `composeApp` itself:

   ```kotlin
   kotlin {
       dependencies { 
           implementation(projects.composeApp)
           implementation(libs.androidx.activity.compose)
           implementation(libs.compose.uiToolingPreview)
       }
   }
   ```

5. Copy the entire `android {}` block from `composeApp/build.gradle.kts` to `androidApp/build.gradle.kts`, and copy the compiler options from the `androidTarget {}` block into the `target {}` block:

   ```kotlin
   kotlin {
       target {
           compilerOptions {
               jvmTarget.set(JvmTarget.JVM_11)
           }
       }
   }
   ```

6. Change `composeApp` from an Android application to an Android library: replace `alias(libs.plugins.androidApplication)` with `alias(libs.plugins.androidLibrary)`, and remove the application properties (`applicationId`, `targetSdk`, `versionCode`, `versionName`) from `android.defaultConfig {}`, leaving `minSdk = libs.versions.android.minSdk.get().toInt()`.
7. Move `composeApp/src/androidMain` into `androidApp/src/` and rename it to `main`. Entry point code (such as `MainActivity.kt`) must be in `androidApp`; all `expect` / `actual` declarations must remain in the common module's source sets. Fix the run configuration module (`demo.composeApp` to `demo.androidApp`) if the IDE does not create it, then remove the `kotlin.sourceSets.androidMain.dependencies {}` block from `composeApp`.

Switch the shared module to the Android-KMP library plugin:

1. Add the plugin to the version catalog (see above).
2. In `composeApp/build.gradle.kts` swap `alias(libs.plugins.androidLibrary)` for `alias(libs.plugins.androidMultiplatformLibrary)`.
3. In the root `build.gradle.kts` add:

   ```kotlin
   alias(libs.plugins.androidMultiplatformLibrary) apply false
   ```

4. Replace the `kotlin.androidTarget {}` block with `kotlin.androidLibrary {}` (see Signature / Usage) and remove the `android {}` block.
5. Replace `debugImplementation(libs.compose.uiTooling)` with `androidRuntimeClasspath(libs.compose.uiTooling)`, as the new plugin doesn't support build variants.

Update the Android Gradle plugin version:

1. In `gradle/libs.versions.toml` set the AGP to a 9.* version:

   ```toml
   [versions]
   agp = "9.0.0"
   ```

2. Update Gradle in `gradle/wrapper/gradle-wrapper.properties` to at least 9.1.0:

   ```text
   distributionUrl=https\://services.gradle.org/distributions/gradle-9.1.0-bin.zip
   ```

3. Remove `alias(libs.plugins.kotlinAndroid)` from `androidApp/build.gradle.kts`; Kotlin support is built in with AGP 9.0.
4. Update the namespace in the `kotlin.androidLibrary {}` block so it doesn't conflict with the app's namespace, for example:

   ```kotlin
   kotlin {
       androidLibrary {
           namespace = "compose.project.demo.composedemolibrary"
           // ...
       }
   }
   ```

## Notes

- Short-term option: enable the deprecated APIs with `android.enableLegacyVariantApi=true` in `gradle.properties`. The legacy APIs are going to be removed completely in AGP 10, which is likely to be released in the second half of 2026 (per the source).
- Android Studio supports AGP 9.0.0 starting with Otter 3 Feature Drop 2025.2.3; IntelliJ IDEA support for AGP 9.0.0 was expected in Q1 2026 (per the source).
- Library migration steps are in Google's Android documentation (developer.android.com/kotlin/multiplatform/plugin#migrate). The source links a prepared AI-agent skill for the migration (Kotlin/kotlin-agent-skills); results of AI processing are not entirely predictable.
- The sample is the Compose Multiplatform app from the new-project tutorial, in the `kotlin-hands-on/get-started-with-cm` repository branches `main`, `new-project-structure` and `old-project-structure`.
- Migration (Kotlin 1.9 → 2.0): in Kotlin 2.3.0 the `androidTarget` name is deprecated in favor of `android` with the new plugin (see changes-kotlin-2-0-and-later).
- Distance line: AGP versions, `android {}` build configuration and built-in Kotlin belong to android-build-gradle; this page covers the Kotlin Multiplatform project restructuring.

## Related

- [Compatibility guide for Kotlin Multiplatform — Kotlin 2.0.0 and later](./changes-kotlin-2-0-and-later.md)
- [Android source set layout](./android-source-set-layout.md)
- [Compatibility guide for Kotlin Multiplatform — Version compatibility](./version-compatibility.md)
- Adding Android dependencies
- Recommended Kotlin Multiplatform project structure
