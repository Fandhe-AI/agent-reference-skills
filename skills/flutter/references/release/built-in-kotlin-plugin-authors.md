---
source: https://docs.flutter.dev/release/breaking-changes/migrate-to-built-in-kotlin/for-plugin-authors
---

# Built-in Kotlin migration for plugin authors

Migrate Flutter plugins to use built-in Kotlin. Requires a minimum Flutter version of 3.44 for the plugin.

## Signature / Usage

Gradle change (`<plugin-project>/android/build.gradle(.kts)`, Kotlin DSL shown):

```kotlin
// Before
plugins {
    id("com.android.library")
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

// After
plugins {
    id("com.android.library")
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

Legacy `apply` syntax (Groovy): remove `apply plugin: 'kotlin-android'` and `kotlinOptions`, then add the same `kotlin.compilerOptions` block.

Update the plugin's `pubspec.yaml`:

```yaml
environment:
  sdk: ^3.12.0
  flutter: ">=3.44.0"
```

Changelog entry for the new release:

```markdown
## <new-plugin-release-version>

- Updates the minimum supported SDK version to Flutter 3.44/Dart 3.12.
- Migrates to built-in Kotlin.
```

Enable built-in Kotlin in the plugin's example app after validation:

```properties
# <flutter-project>/android/gradle.properties
android.builtInKotlin=true
```

## Notes

- `kotlin.compilerOptions {}` requires KGP 2.0.0 or higher. Flutter enforces a minimum KGP version of 2.0.0 starting in Flutter 3.44, so the plugin's minimum Flutter version must be at least 3.44. That lets apps using the plugin build on AGP 9 with built-in Kotlin disabled (`android.builtInKotlin=false`).
- Because the minimum Flutter version changes, update the minimum Dart version too (the page's example uses `sdk: ^3.12.0`).
- Enabling built-in Kotlin (`android.builtInKotlin=true`) in the plugin's example app requires Flutter 3.47 or later. Built-in Kotlin requires AGP 9+.
- Applies only to plugins that already use KGP (the `kotlin-android` or `org.jetbrains.kotlin.android` plugin). If not, don't migrate. If the example app also applies KGP, migrate it using the app developer guide.
- Migration (Flutter 3.44 / 3.47): validate with `flutter run` or `flutter build apk` on a connected device or emulator.
- Distance: Flutter-side Gradle edits only; Android Gradle Plugin and Kotlin Gradle Plugin themselves are covered by android-build-gradle.

## Related

- [Migrating Flutter Android projects to built-in Kotlin](./migrate-to-built-in-kotlin.md)
- [Built-in Kotlin migration for app developers](./built-in-kotlin-app-developers.md)
