# Jetpack Compose performance on Wear OS

Performance techniques and validation tooling for Compose apps on Wear OS, where CPU/GPU resources are more limited than on phones and Material 3 Expressive's richer animations raise the cost of getting it wrong.

## Signature / Usage

```bash
# Verify a package is running from a baseline profile (should print status=speed-profile)
adb shell dumpsys package dexopt | grep -A 1 $PACKAGE_NAME

# Trigger background dexopt manually to (re)compile the profile
adb shell cmd package bg-dexopt-job
```

## Options / Props

| Technique | Purpose |
|------|-------------|
| Baseline profiles (+ startup profiles) | Pre-compile key-workflow classes/methods ahead of time to cut startup time and jank; Wear Compose libraries ship their own profile rules, auto-merged into the APK. Startup profiles further cut startup latency at the cost of larger APK size. |
| R8 code shrinker/optimizer | Shrinks/removes unused code and resources and rewrites code for runtime performance; configured in build settings. |
| Compose 1.8+ | Newer Compose versions carry stability and performance improvements; keep dependencies current. |
| Macrobenchmark | Measures larger use cases (app startup, complex UI manipulation) in a dedicated benchmark build variant. |
| JankStats | Library for tracking/analyzing jank in production or during testing. |
| System Trace (Android Studio) | Diagnoses latency in complex user journeys, especially with Material 3 Expressive animations. |
| UI Automator | Automates UI interactions to benchmark discrete pieces of a user journey. |

## Notes

- Measure in release or a dedicated benchmark build variant, not debug — debug mode imposes a significant performance cost and does not use baseline profiles, so it doesn't reflect real performance.
- Run final performance validation on physical Wear OS devices representative of the target user base, not only emulators — this matters more when migrating to Material 3 Expressive (flex fonts, shape morphing).
- `status=speed-profile` in `dumpsys package dexopt` output confirms the app is running from a compiled baseline profile.

## Related

- [Migrate from Material 2.5 to Material 3](./migrate-to-material3.md)
