---
source: https://docs.flutter.dev/release/breaking-changes/migrate-to-built-in-kotlin/for-app-developers
---

# Built-in Kotlin migration for app developers

Migrate Flutter apps to use built-in Kotlin. Assumes updating from an AGP version created before 9.0.0 to AGP 9.0.0+, using the minimum compatible dependency versions listed in the Android Gradle Plugin docs.

## Signature / Usage

Move the JVM target from `kotlinOptions` to `kotlin.compilerOptions` and drop the `kotlin-android` plugin (Kotlin DSL shown).

```kotlin
// Before: <app-src>/android/app/build.gradle(.kts)
plugins {
    id("com.android.application")
    id("kotlin-android")
    // ...
}

android {
    // ...
    kotlinOptions {
        jvmTarget = JavaVersion.VERSION_17.toString()
    }
    // ...
}
```

```kotlin
// After: <app-src>/android/app/build.gradle(.kts)
plugins {
    id("com.android.application")
    // ...
}

android {
    // ...
}

kotlin {
    compilerOptions {
        jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
    }
}
```

Legacy `apply` syntax (Groovy `build.gradle`): remove `apply plugin: 'kotlin-android'` and the `kotlinOptions` block, then add the same `kotlin { compilerOptions { jvmTarget = ... } }` block.

Add-to-app Android host app (uses `alias`): remove `alias(libs.plugins.kotlin.android)` and `kotlinOptions`, add the same `kotlin.compilerOptions` block. Host apps must add the flags manually:

```properties
# <host-app-project>/gradle.properties
android.newDsl=false
android.builtInKotlin=false
```

Enable built-in Kotlin after validation:

```properties
# <flutter-project>/android/gradle.properties
android.builtInKotlin=true
```

## Notes

- Applies only to apps that already apply KGP (the `kotlin-android` or `org.jetbrains.kotlin.android` plugin, typically in `<app-src>/android/app/build.gradle(.kts)`). Otherwise don't migrate; if the app doesn't apply `kotlin-android`, only `android.newDsl=false` is needed.
- Flutter defaults to the legacy KGP and old AGP DSL types. The Flutter migrator adds `android.builtInKotlin=false` and `android.newDsl=false` to `gradle.properties` on the next `flutter run` / `flutter build apk` (Android Studio builds also add them). The migrator can't run for add-to-app host app builds, which are pure native Android projects.
- Version note: Flutter 3.44 added support for AGP 9 with built-in Kotlin disabled (`android.builtInKotlin=false`); enabling it (`android.builtInKotlin=true`) requires Flutter 3.47 or later.
- Validate: confirm the app and every Flutter plugin it uses are migrated and the app is on AGP 9+, then set the property to `true` and run `flutter run` or `flutter build apk` on a connected device or emulator.
- If the build fails because of an unmigrated plugin, find the plugin repository on pub.dev, confirm in the changelog that no version has migrated, and report an issue titled "Migrate plugin to built-in Kotlin". The page supplies an issue body template referencing Flutter issue 181383 and the plugin author guide.
- Migration (Flutter 3.44 / 3.47): see the overview page for the Flutter-version timeline.
- Distance: Flutter-side Gradle edits only; Android Gradle Plugin and Kotlin Gradle Plugin themselves are covered by android-build-gradle.

## Related

- [Migrating Flutter Android projects to built-in Kotlin](./migrate-to-built-in-kotlin.md)
- [Built-in Kotlin migration for plugin authors](./built-in-kotlin-plugin-authors.md)
