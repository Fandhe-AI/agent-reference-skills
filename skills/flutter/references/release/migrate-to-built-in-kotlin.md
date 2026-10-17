---
source: https://docs.flutter.dev/release/breaking-changes/migrate-to-built-in-kotlin
---

# Migrating Flutter Android projects to built-in Kotlin

Update Flutter Android Gradle files to use built-in Kotlin support. Required for projects moving to Android Gradle Plugin (AGP) 9 or later. This overview links the app-developer and plugin-author guides.

## Signature / Usage

The two Gradle properties that control the migration (set in `gradle.properties`):

```properties
android.builtInKotlin=false
android.newDsl=false
```

Once an app and all its plugins have migrated (and the app is on AGP 9+), enable built-in Kotlin (requires Flutter 3.47 or later):

```properties
android.builtInKotlin=true
```

## Notes

- Applies only to apps and plugins that already use the Kotlin Gradle Plugin (KGP). If the project doesn't apply KGP, don't migrate to built-in Kotlin.
- Built-in Kotlin is the default in AGP 9 and later; apps using the `kotlin-android` plugin fail to build without migration (Flutter issue 181383).
- Flutter 3.44 added temporary support for the legacy KGP in AGP 9+ with `android.builtInKotlin=false` (issue 183909). Flutter 3.47 added support for enabling built-in Kotlin (`android.builtInKotlin=true`) once an app and all its plugins have migrated.
- AGP 9+ uses only the new AGP DSL interfaces. Flutter configured the AGP DSL to be compatible with the legacy DSL types (issue 184838) while it migrates old DSL types to the new DSL (issue 180137).
- Next steps: Flutter plans to remove support for applying KGP in a future version (issue 184837), and to remove the DSL Gradle property once its migration to the new AGP DSL is complete (issue 184839).
- Timeline: landed in version 3.44.0-0.1.pre; in stable release 3.44.
- Migration (Flutter 3.44 / 3.47): app developers follow the app developer guide; plugin authors follow the plugin author guide. Gradle build files vary by the Flutter version used when the app was created, so periodically run `flutter upgrade` in the app directory.
- Distance: Flutter-side Gradle/KGP migration steps only; Android Gradle Plugin and Gradle themselves are covered by android-build-gradle.

## Related

- [Built-in Kotlin migration for app developers](./built-in-kotlin-app-developers.md)
- [Built-in Kotlin migration for plugin authors](./built-in-kotlin-plugin-authors.md)
- [Breaking changes and migration guides](./breaking-changes.md)
