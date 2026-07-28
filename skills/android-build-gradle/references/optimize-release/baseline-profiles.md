# Baseline Profiles

Baseline Profiles enable Profile Guided Optimization (PGO): ART ahead-of-time-compiles the specified startup/navigation code paths at install time, improving cold-start speed by roughly 30% from the very first launch.

## Signature / Usage

```kotlin
// app/build.gradle.kts
plugins {
    id("com.android.application")
    id("androidx.baselineprofile")
}

dependencies {
    baselineProfile(project(":baseline-profile"))
}
```

```kotlin
// baseline-profile/build.gradle.kts (separate androidx.test module)
baselineProfile {
    managedDevices += "pixel6Api31"
    useConnectedDevices = false
}
```

```bash
./gradlew :app:generateBaselineProfile
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `managedDevices` | `List<String>` | none | Gradle-managed devices to run profile generation on. |
| `useConnectedDevices` | `Boolean` | `true` | Uses connected physical/emulator devices to generate profiles (must be rooted or API 33+). |

## Notes

- Generated profile is compiled to `assets/dexopt/baseline.prof` and bundled in the AAB; source rules live at `src/<variant>/generated/baselineProfiles/baseline-prof.txt` (AGP 8.0+ variant-aware layout, replacing the old single `src/main/baseline-prof.txt`).
- Profile generation must run against a build with `isMinifyEnabled = false` (the Macrobenchmark "benchmark" variant); the shipped release build must have `isMinifyEnabled = true` — R8 automatically rewrites the profile rules to match obfuscated release code (AGP 8.2+).
- Minimum recommended: AGP 8.0.0, `androidx.benchmark:benchmark-macro-junit4:1.4.1`, `androidx.profileinstaller:profileinstaller:1.4.1`.
- Distinct from Startup Profiles (`startup-prof.txt`), which optimize DEX layout specifically for startup; using both together is recommended.
- Baseline profile generation via Macrobenchmark (`BaselineProfileRule`) and detailed performance measurement are out of scope here; see this skill's build-config / migrate-troubleshoot categories for anything beyond enabling the Gradle plugin and generating the profile.

## Related

- [build-variant-optimization.md](./build-variant-optimization.md)
- [shrink-code.md](./shrink-code.md)
