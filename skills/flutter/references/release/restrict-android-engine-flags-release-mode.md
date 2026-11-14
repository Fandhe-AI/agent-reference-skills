---
source: https://docs.flutter.dev/release/breaking-changes/restrict-android-engine-flags-release-mode
---

# Restrict Android engine flags in release mode

Android release builds ignore engine configuration flags passed through `Intent` extras, and the Flutter CLI fails on `--use-application-binary` with flags for a release binary.

## Signature / Usage

Override `getFlutterEngineFlags()` in a `FlutterActivity` subclass instead of using `Intent` extras or the deprecated `getFlutterShellArgs()`:

```kotlin
class MyFlutterActivity : FlutterActivity() {
    override fun getFlutterEngineFlags(): List<String> {
        val flags = super.getFlutterEngineFlags().toMutableList()
        flags.add("--trace-startup")
        return flags
    }
}
```

Pass flags with the fragment builder:

```kotlin
val fragment = FlutterFragment.withNewEngine()
    .flutterEngineFlags(listOf("--trace-startup"))
    .build<FlutterFragment>()
```

Supply arguments to a pre-initialized `FlutterEngine`:

```kotlin
val args = arrayOf("--trace-startup", "--enable-impeller=true")
val flutterEngine = FlutterEngine(context, args)
FlutterEngineCache.getInstance().put("my_engine_id", flutterEngine)
```

Declare flags statically in `android/app/src/main/AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application
        android:label="my_app"
        android:name="${applicationName}"
        android:icon="@mipmap/ic_launcher">
        <!-- Declare engine configuration flags statically -->
        <meta-data
            android:name="io.flutter.embedding.android.DartFlags"
            android:value="--some-dart-flag" />
        <meta-data
            android:name="io.flutter.embedding.android.EnableDartProfiling"
            android:value="false" />
        <activity
            ...
        </activity>
    </application>
</manifest>
```

## Options / Props

Embedding behavior for engine flags passed in `Intent` extras:

| Build mode | Intent extras behavior | Notes |
| --- | --- | --- |
| Debug / Profile | Accepted and parsed | Flags apply dynamically at launch time. |
| Release | Ignored | The embedding logs a warning and discards all engine configuration flags received from `Intent` extras. |

Flutter CLI behavior:

| Build mode | Using `--use-application-binary` | CLI behavior | Notes |
| --- | --- | --- | --- |
| Debug / Profile | Yes | Passes flags to binary through `adb` | No rebuild required; flags apply at runtime. |
| Debug / Profile | No | Builds and passes flags through `adb` | Standard development workflow. |
| Release | Yes | Fatal error if configuration flags are provided | Prebuilt release binaries cannot be dynamically configured. |
| Release | No | Injects flags into `AndroidManifest.xml` during compilation | Standard release build workflow. |

## Notes

- Timeline: landed in version 3.50.0-0.1.pre; in stable release 3.50.
- Not affected: standard release builds with the CLI (`flutter run --release`, `flutter build apk --release`, `flutter build appbundle`), tests and benchmarks in debug or profile mode, and `--use-application-binary` without engine flags.
- Affected: direct `Intent` launches of release builds (`adb shell am start`, native code) that pass engine flags or route arguments; CI scripts passing flags to prebuilt release binaries with `--use-application-binary`; non-Gradle / hermetic build systems (such as Bazel) that configure release binaries with launch-time flags.
- Migration paths: switch testing and benchmarking to profile mode (`--profile`); build release binaries with flags directly using the CLI (without `--use-application-binary`) or compile one binary per configuration; declare flags in the manifest; configure flags programmatically in native host code.
- The internal interface method `FlutterActivityAndFragmentDelegate.Host.getFlutterShellArgs` is deprecated in favor of `getFlutterEngineFlags()`.
- Related issues 180686 and 190461; PRs 190870, 191328, 191924 (flutter/flutter).
- This page is about Flutter's Android embedding; `adb` and `Intent` semantics themselves belong to the `android-*` skills.
- Source: https://docs.flutter.dev/release/breaking-changes/restrict-android-engine-flags-release-mode (flutter/website `acea420`, fetched 2026-11-14).

## Related

- [Stricter Android Intent verification for app entrypoints](./stricter-android-entrypoint-intent-verification.md)
- [Breaking changes and migration guides](./breaking-changes.md)
