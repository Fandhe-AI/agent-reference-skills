# AGP Upgrade Assistant

Built-in Android Studio tool (**Tools > AGP Upgrade Assistant**) that automates upgrading the Android Gradle plugin version: translating deprecated syntax, aligning Gradle compatibility, and checking third-party plugin requirements.

## Signature / Usage

```bash
# After running the assistant, verify manually:
./gradlew build
./gradlew test
```

```kotlin
// Before (deprecated in AGP 8+)
android {
    compileSdkVersion(33)
}

// After (AGP 8+ syntax)
android {
    compileSdk = 33
}
```

## Notes

- Works best with declarative build files and Gradle Version Catalogs (`gradle/libs.versions.toml`); it does not support `buildSrc` constants/variables, version catalogs declared in settings files, or non-declarative build expressions.
- Shows required vs. recommended steps (e.g. update AGP, update Gradle, update Kotlin, update third-party plugins); required steps are pre-selected.
- Running selected steps modifies build files, updates `gradle/wrapper/gradle-wrapper.properties`, syncs the project, and downloads new plugin/library versions.
- If sync fails after upgrading, try an incremental path (e.g. 7.0 to 8.0 to 8.5 to 9.0) instead of jumping directly to the latest version, or run/disable individual steps to isolate the failure.
- Can migrate the manifest `package` attribute to the `namespace` build property automatically.
- For AGP 9.x, Google also provides AI-assisted agent skills for non-KMP and KMP apps (`github.com/android/skills`, `github.com/Kotlin/kotlin-agent-skills`).
- Source: `developer.android.com/build/agp-upgrade-assistant`.

## Related

- [AGP / Gradle Version Compatibility](./agp-gradle-version-compatibility.md)
- [Namespace Migration](./namespace-migration.md)
