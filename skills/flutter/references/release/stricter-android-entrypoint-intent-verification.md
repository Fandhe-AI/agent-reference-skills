---
source: https://docs.flutter.dev/release/breaking-changes/stricter-android-entrypoint-intent-verification
---

# Stricter Android Intent verification for app entrypoints

In release builds, `FlutterActivity` and `FlutterFragmentActivity` verify the sender of an `Intent` before honoring routing, entrypoint, and cached-engine extras.

## Signature / Usage

Set host activities to non-exported:

```xml
<activity
    android:name=".MyFlutterActivity"
    android:exported="false">
</activity>
```

Use a deep link instead of `EXTRA_INITIAL_ROUTE`:

```java
Intent intent = new Intent(context, MainActivity.class);
intent.setAction(Intent.ACTION_VIEW);
intent.setData(Uri.parse("myapp://product_details"));
```

Declare entrypoints and routes statically:

```xml
<activity 
    android:name=".MyFlutterActivity"
    android:exported="true">
    <meta-data
        android:name="io.flutter.Entrypoint"
        android:value="myCustomEntrypoint" />
    <meta-data
        android:name="io.flutter.InitialRoute"
        android:value="/customRoute" />
</activity>
```

On Android 13 and earlier, internal launches of an exported activity:

```diff
- startActivity(intent);
+ startActivityForResult(intent, REQUEST_CODE);
```

Override configuration methods in an activity subclass:

```java
public class MyFlutterActivity extends FlutterActivity {
    @NonNull
    @Override
    public String getDartEntrypointFunctionName() {
        return ConfigManager.getEntrypoint(); 
    }
    
    @Nullable
    @Override
    public List<String> getDartEntrypointArgs() {
        return ConfigManager.getArgs();
    }
}
```

## Options / Props

Verified extras: `"route"` (`EXTRA_INITIAL_ROUTE`), `"dart_entrypoint"`, `"dart_entrypoint_args"`, `"cached_engine_id"`, `"cached_engine_group_id"`.

An `Intent` is verified as safe if:

| Condition | Rule |
| --- | --- |
| Activity not exported | `android:exported="false"` is automatically trusted |
| Android 14+ (API 34+) | Launching UID matches the app's UID (`getLaunchedFromUid()`) |
| Android 13 and earlier (API 33-) | Calling package matches the app package (`getCallingPackage()`); requires `startActivityForResult()` or `startActivityIfNeeded()` |

Fallback when verification fails in release builds:

| Extra | Fallback |
| --- | --- |
| `EXTRA_INITIAL_ROUTE` | Command-line arguments or `io.flutter.InitialRoute` metadata; otherwise `"/"` |
| `EXTRA_DART_ENTRYPOINT` | `io.flutter.Entrypoint` metadata; otherwise `"main"` |
| `EXTRA_DART_ENTRYPOINT_ARGS` | Ignored; returns `null` |
| `EXTRA_CACHED_ENGINE_ID` / `EXTRA_CACHED_ENGINE_GROUP_ID` | Ignored; returns `null` |

## Notes

- Timeline: landed in version 3.50.0-0.1.pre; in stable release 3.50.
- Deep links (`Intent.ACTION_VIEW`) remain supported but the URI must match an `<intent-filter>` in `AndroidManifest.xml`, unless the `Intent` is verified as self-sent.
- Debug and profile builds bypass verification to preserve tooling (`adb shell am start`) and tests; a failed verification logs a warning.
- No migration needed if the app passes none of these extras or the target activity is not exported. The main launcher activity (`ACTION_MAIN` + `CATEGORY_LAUNCHER`) must stay exported.
- On Android 13 and earlier, the result of `startActivityForResult()` need not be handled in `onActivityResult()`.
- Related: issues 190450, 190452; PR 190249 (flutter/flutter).
- Source: https://docs.flutter.dev/release/breaking-changes/stricter-android-entrypoint-intent-verification (flutter/website `acea420`, fetched 2026-11-14).

## Related

- [Restrict Android engine flags in release mode](./restrict-android-engine-flags-release-mode.md)
- [Breaking changes and migration guides](./breaking-changes.md)
