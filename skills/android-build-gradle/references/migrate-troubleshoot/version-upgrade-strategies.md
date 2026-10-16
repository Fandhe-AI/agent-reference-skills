# Dependency Version Upgrade Strategies

How to plan, analyze and mitigate risk when upgrading AGP, Gradle, Kotlin, the Android SDK and library dependencies.

## Signature / Usage

```toml
# Create a before/after baseline with the Dependency Guard plugin (third-party), then diff in VCS.
# gradle/libs.versions.toml
[versions]
dependencyGuard = "0.5.0"

[plugins]
dependency-guard = { id = "com.dropbox.dependency-guard", version.ref = "dependencyGuard" }
```

```kotlin
// app/build.gradle.kts
plugins {
    alias(libs.plugins.dependency.guard)
}

dependencyGuard {
    configuration("releaseRuntimeClasspath")
}
```

```bash
./gradlew dependencyGuard                       # writes app/dependencies/releaseRuntimeClasspath.txt (baseline; commit it)
./gradlew lint                                  # after upgrading: look for new warnings/errors
./gradlew lint -Dlint.baselines.continue=true   # update the lint warning baseline
./gradlew app:dependencies                      # search for `->` to find version conflicts
./gradlew wrapper --gradle-version latest       # upgrade wrapper jar and scripts
```

Treat lint warnings as errors before starting:

```kotlin
android {
    // ...
    lint {
        warningsAsErrors = true
    }
}
```

## Options / Props

**Upgrade considerations**

| Factor | Guidance |
|--------|----------|
| Library vs application | App: keep up-to-date and stable. Library: minimize dependencies, follow semantic versioning, avoid `major` upgrades, consider an RC, keep ABI compatible (Binary compatibility validator) |
| Release cycle | Short cycles: frequent small upgrades and quick rollback. Long cycles: more time to test but more new versions land mid-cycle |
| Latest features | Frequent upgrades make later ones easier but take risk more often; test alpha/beta/RC to prepare |
| New dependency | Require a review process against all risk criteria |
| Dedicated team | A build team can analyze and test upgrades before engineers adopt them |
| Automation tools | They upgrade to the latest versions and do no analysis; always check the results |

**Per-component strategies**

| Component | Steps |
|-----------|-------|
| AGP | Read release notes; upgrade Gradle to at least the listed version; use an Android Studio version that supports the AGP version; check SDK Build Tools, NDK, JDK compatibility; check custom Gradle plugins that use AGP APIs |
| Kotlin | Read Kotlin release notes. Compose with Kotlin < 2.0.0: use the compatible Compose compiler and update `kotlinCompilerExtensionVersion`. Kotlin >= 2.0.0: set up the Compose Compiler Gradle Plugin with the same version as Kotlin. The source asks to match the KSP plugin version to Kotlin (e.g. Kotlin 2.0.21 -> `2.0.21-1.0.25`); that describes the older scheme where the KSP version is prefixed with the Kotlin version (before KSP 2.3.0). KSP 2.3.0 and later use an independent version scheme (e.g. `2.3.4`, see dependencies/ksp-vs-kapt.md), so check KSP Releases for the supported Kotlin range. KSP processors rarely need upgrading |
| Kotlin compiler plugins | Use the matching Kotlin version (plugin version `2.0.21-1.0.25`, an old-scheme KSP-style version, requires Kotlin `2.0.21`); check plugins have matching releases before upgrading Kotlin |
| Libraries | Some require a minimum `compileSdk` (build fails otherwise) or minimum Kotlin version; if the app `minSdk` is lower than a library requires, manifest merger fails the build (raise the app `minSdk`, use a compatible library version, or with care `tools:overrideLibrary`) |
| Gradle | Read release notes; update `gradle/wrapper/gradle-wrapper.properties`; run `./gradlew wrapper --gradle-version latest`; upgrade plugins; upgrade the JDK running Gradle |
| Gradle plugins | Upgrading a plugin may require a Gradle upgrade; whenever upgrading plugins, upgrade Gradle |
| Android SDK | Read behavior changes in release notes; `targetSdk` upgrade is required by Play Store, `compileSdk` upgrade is optional; upgrade AGP, Android Studio and AndroidX with it |
| Android Studio | Upgrade any time; Tools menu has "AGP Upgrade Assistant..." and "Android SDK Upgrade Assistant..." |
| Java | Each Android SDK supports a subset of Java APIs; AGP desugaring covers lower SDKs; check JDK API sections in behavior changes even with Kotlin-only code |

## Notes

- **Risk:** major version bump (e.g. 1.2.3 -> 2.0.1); experimental API usage raises risk even for minor/patch bumps
- **Risk:** nonstable (alpha/dev/experimental) APIs
- **Risk:** dynamic behavior (server version dependence)
- **Risk:** manifest merging from AARs (new permissions, components)
- **Risk:** runtime updates (Play Services, AIDL-bound apps)
- **Risk:** number of versions skipped (e.g. 1.2.3 -> 1.34.5)
- **Risk:** migration guides, release notes, READMEs (known issues, security)
- **Risk:** known vulnerabilities: Play SDK Index, NVD via the third-party Dependency Check Gradle plugin (`./gradlew dependencyCheckAnalyze`, needs an NVD API key, slow)
- **Risk:** version conflicts: search for `->` in `./gradlew app:dependencies`
- **Risk:** license changes, including new transitive dependencies
- **Risk:** maintenance and quality (contributors, release frequency, issue backlog, test coverage, docs)
- **Risk:** open vs closed source: minimize closed-source dependencies and add tests
- The source page states the app `minSdk` is automatically the maximum of all library `minSdk` values; in practice manifest merger reports an error instead.
- Dependency Guard and Dependency Check are third-party Gradle plugins; the source strongly recommends enabling Dependency verification.
- Do not upgrade source code or resources while capturing the baseline diff; upgrade dependencies and build changes only.
- Per the Dependency Guard README (https://github.com/dropbox/dependency-guard), `dependencyGuard` compares against baselines or generates them if they don't exist; use `dependencyGuardBaseline` to intentionally re-baseline. There is no `--baseline` flag.
- Dependency Guard captures only library dependencies; SDK and JDK versions show up in the VCS diff of your build files.
- Lint is not normally run by a Studio or command-line build unless using the `build` or `lint` targets; run `gradlew build` or `gradlew lint` in CI (at least nightly).
- Mitigation options: accept, reject, or mitigate by batching upgrades into smaller sets, investigating, testing, reading source, and changing code. Document the decisions.
- If a license becomes incompatible: ask the owner to keep the license or dual-license, consult legal, switch to another library, or fork the last compatible version.
- Source: https://developer.android.com/build/version-upgrade-strategies (local copy fetched 2026-10).

## Related

- [AGP Upgrade Assistant](./agp-upgrade-assistant.md)
- [SDK Upgrade Assistant](./sdk-upgrade-assistant.md)
- [AGP / Gradle Version Compatibility](./agp-gradle-version-compatibility.md)
- [AGP / Kotlin / D8 / R8 Compatibility](./agp-kotlin-d8-r8-compatibility.md)
- [JDK Configuration](./jdk-configuration.md)
- [Dependency Resolution Errors](./dependency-resolution-errors.md)
