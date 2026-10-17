---
source: https://docs.flutter.dev/add-to-app/android/add-flutter-screen
---

# Add a Flutter screen to an Android app

How to add a single Flutter screen (normal opaque, or see-through translucent) to an existing Android app using `FlutterActivity`.

## Signature / Usage

Step 1: register `FlutterActivity` in `AndroidManifest.xml` under the `application` tag (replace `@style/LaunchTheme` with any theme; it dictates system chrome colors and the `FlutterActivity` background before the first Flutter frame):

```xml
<activity
  android:name="io.flutter.embedding.android.FlutterActivity"
  android:theme="@style/LaunchTheme"
  android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
  android:hardwareAccelerated="true"
  android:windowSoftInputMode="adjustResize"
  />
```

Step 2: launch it (Kotlin; also shown for Jetpack Compose and Java in the source):

```kotlin
myButton.setOnClickListener {
  startActivity(
    FlutterActivity.createDefaultIntent(this)
  )
}
```

With a custom initial route (new engine):

```kotlin
myButton.setOnClickListener {
  startActivity(
    FlutterActivity
      .withNewEngine()
      .initialRoute("/my_route")
      .build(this)
  )
}
```

Step 3 (optional): pre-warm and cache a `FlutterEngine` in `Application`, then use it.

```kotlin
class MyApplication : Application() {
  lateinit var flutterEngine : FlutterEngine

  override fun onCreate() {
    super.onCreate()

    // Instantiate a FlutterEngine.
    flutterEngine = FlutterEngine(this)

    // Start executing Dart code to pre-warm the FlutterEngine.
    flutterEngine.dartExecutor.executeDartEntrypoint(
      DartExecutor.DartEntrypoint.createDefault()
    )

    // Cache the FlutterEngine to be used by FlutterActivity.
    FlutterEngineCache
      .getInstance()
      .put("my_engine_id", flutterEngine)
  }
}
```

```kotlin
myButton.setOnClickListener {
  startActivity(
    FlutterActivity
      .withCachedEngine("my_engine_id")
      .build(this)
  )
}
```

Initial route with a cached engine (set just before executing the Dart entrypoint):

```kotlin
flutterEngine = FlutterEngine(this)
// Configure an initial route.
flutterEngine.navigationChannel.setInitialRoute("your/route/here");
// Start executing Dart code to pre-warm the FlutterEngine.
flutterEngine.dartExecutor.executeDartEntrypoint(
  DartExecutor.DartEntrypoint.createDefault()
)
```

Translucent screen: use a theme with `windowIsTranslucent`, apply it to the `FlutterActivity` in the manifest, and launch with a transparent `BackgroundMode`.

```xml
<style name="MyTheme" parent="@style/MyParentTheme">
  <item name="android:windowIsTranslucent">true</item>
</style>
```

```kotlin
// Using a new FlutterEngine.
startActivity(
  FlutterActivity
    .withNewEngine()
    .backgroundMode(FlutterActivityLaunchConfigs.BackgroundMode.transparent)
    .build(this)
);

// Using a cached FlutterEngine.
startActivity(
  FlutterActivity
    .withCachedEngine("my_engine_id")
    .backgroundMode(FlutterActivityLaunchConfigs.BackgroundMode.transparent)
    .build(this)
);
```

## Options / Props

| Builder / API | Description |
| --- | --- |
| `FlutterActivity.createDefaultIntent(context)` | Launches with Dart entrypoint `main()` and initial route `/`. |
| `FlutterActivity.withNewEngine()` | Configures a `FlutterActivity` that creates its own `FlutterEngine` (non-trivial initialization time). |
| `.initialRoute(String)` | Initial Flutter route; the Dart entrypoint cannot be changed with `Intent`, but the initial route can. |
| `FlutterActivity.withCachedEngine(id)` | Uses a pre-warmed engine from `FlutterEngineCache` with the same ID. |
| `.backgroundMode(FlutterActivityLaunchConfigs.BackgroundMode.transparent)` | Transparent background for translucent screens. |
| `FlutterEngineCache.getInstance().put(id, engine)` | Caches an engine; use the same ID in any `FlutterActivity` or `FlutterFragment`. |

## Notes

- Use the import `io.flutter.embedding.android.FlutterActivity`.
- To warm up a `FlutterEngine` you must execute a Dart entrypoint. If it invokes `runApp()`, the app behaves as if running in a zero-size window until the engine is attached to a `FlutterActivity`, `FlutterFragment`, or `FlutterView`; make sure the app behaves appropriately in between.
- A cached `FlutterEngine` outlives any `FlutterActivity` / `FlutterFragment` that displays it, and Dart code keeps executing after they are destroyed. To stop and clear resources, obtain the engine from `FlutterEngineCache` and call `FlutterEngine.destroy()`.
- A pre-warmed engine can also run arbitrary non-UI Dart logic (networking, data caching, background behavior within a `Service`); adhere to all Android restrictions on background execution.
- Flutter debug and release builds have drastically different performance; evaluate performance with a release build.
- Cached engine and initial route: `FlutterActivity` / `FlutterFragment` do not offer an initial route for a cached engine because it is already running Dart code. Set it via `navigationChannel.setInitialRoute(...)` before the Dart entrypoint runs; changing it after the first `runApp()` has no effect. To switch routes between Activities/Fragments on the same engine, set up a method channel and instruct Dart code to change `Navigator` routes.
- Make sure your Flutter content has a translucent background too; a solid color painted by your Flutter UI still looks opaque.
- This is the Flutter embedding API. Android Activity and theme APIs belong to the android-* skills; Flutter `Navigator` is distinct from Jetpack Navigation.

## Related

- [add-to-app](./add-to-app.md)
- [add-to-app-multiple-flutters](./add-to-app-multiple-flutters.md)
- [android-splash-screen](./android-splash-screen.md)
