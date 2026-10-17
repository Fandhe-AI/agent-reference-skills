---
source: https://docs.flutter.dev/platform-integration/android/compose-activity
---

# Launching a Jetpack Compose activity from your Flutter application

Launch a fullscreen native Android activity (written in Kotlin, using Jetpack Compose) from Flutter by calling a platform method channel that starts a second activity.

## Signature / Usage

Dart side:

```dart
const platformMethodChannel = MethodChannel(
  // Note: You can change this string value, but it must match
  // the `CHANNEL` attribute in the next step.
  'com.example.flutter_android_activity',
);

void _launchAndroidActivity() {
  platformMethodChannel.invokeMethod(
    // Note: You can change this value, but it must match
    // the `call.method` value in the next section.
    'launchActivity',

    // Note: You can pass any primitive data types you like.
    // To pass complex types, use package:pigeon to generate
    // matching Dart and Kotlin classes that share serialization logic.
    {'message': 'Hello from Flutter'},
  );
}
```

Android side, `MainActivity.kt`:

```kotlin
class MainActivity: FlutterActivity() {
    // This value must match the `MethodChannel` name in your Dart code.
    private val CHANNEL = "com.example.flutter_android_activity"

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        GeneratedPluginRegistrant.registerWith(flutterEngine)

        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler {
            call: MethodCall, result: MethodChannel.Result ->
                when (call.method) {
                    // Note: This must match the first parameter passed to
                    // `platformMethodChannel.invokeMethod` in your Dart code.
                    "launchActivity" -> {
                        val message = call.argument<String>("message")
                        if (message == null) {
                            result.error("INVALID_ARGUMENT", "message is required", null)
                            return@setMethodCallHandler
                        }
                        try {
                            val intent = Intent(this@MainActivity, SecondActivity::class.java)
                            intent.putExtra("message", message)
                            startActivity(intent)
                            result.success(true)
                        } catch (e: Exception) {
                            result.error("LAUNCH_FAILED", e.message, null)
                        }
                    }
                    else -> result.notImplemented()
                }
        }
    }
}

class SecondActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            Surface(modifier = Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                Column {
                    Text(text = "Second Activity")
                    // Note: This must match the shape of the data passed from your Dart code.
                    Text("" + getIntent()?.getExtras()?.getString("message"))
                    Button(onClick = {  finish() }) {
                        Text("Exit")
                    }
                }
            }
        }
    }
}
```

Manifest declaration (`android/app/src/main/AndroidManifest.xml`, inside `<application>`):

```xml
<activity android:name=".SecondActivity" android:exported="true" android:theme="@style/LaunchTheme"></activity>
```

## Options / Props

Four generated-Android-app files to modify:

| File | Change |
| --- | --- |
| `android/app/build.gradle` (or `.kts`) | Add `buildFeatures { compose = true }` and `composeOptions { kotlinCompilerExtensionVersion = "1.4.8" }` (as written in the source; pre-Kotlin 2.0 setup) to the `android` block; add a root-level `dependencies` block (core-ktx, lifecycle-runtime-ktx, activity-compose, compose-bom, compose ui / material / material3, test artifacts). |
| `android/build.gradle` (or `.kts`) | Add a top `buildscript` block with `classpath("com.android.tools.build:gradle:8.1.1")` ("Replace with the latest version"), `google()` and `mavenCentral()` repositories. |
| `android/app/src/main/AndroidManifest.xml` | Declare `.SecondActivity`. |
| `android/app/src/main/kotlin/com/example/flutter_android_activity/MainActivity.kt` | Add imports, `CHANNEL`, `configureFlutterEngine`, and `SecondActivity`. |

Three values must match across Dart and Kotlin: the channel name (`com.example.flutter_android_activity`), the method name (`launchActivity`), and the data structure (a map with a single `message` key).

## Notes

- Corrected from the official docs: the source sample passes `call.arguments.toString()` (the whole map, so `SecondActivity` would show `{message=Hello from Flutter}`); this page extracts the `message` key with `call.argument<String>("message")`. `result.success(true)` is returned only after `startActivity` succeeds and failures return `result.error` (source: empty `catch`, then `success`). The `else` branch calls `result.notImplemented()` (source: empty `else -> {}`).
- Dependency snippet from the source (Kotlin DSL): `implementation(platform("androidx.compose:compose-bom:2024.06.00"))`, `implementation("androidx.compose.material3:material3")`, `implementation("androidx.activity:activity-compose")`, among others. The Groovy tab uses `compose-bom:2023.08.00` for `androidTestImplementation`.
- Corrected from the official docs (outdated): `composeOptions { kotlinCompilerExtensionVersion = "1.4.8" }` applies only to Kotlin 1.x. With Kotlin 2.0+ (the norm on Flutter 3.44+ with AGP 9 built-in Kotlin), apply the Compose Compiler Gradle plugin `org.jetbrains.kotlin.plugin.compose` (same version as Kotlin) and drop `kotlinCompilerExtensionVersion`; keep `buildFeatures { compose = true }`. Example: `plugins { id("org.jetbrains.kotlin.plugin.compose") version "<kotlin-version>" }`.
- For Kotlin 1.x, adjust `kotlinCompilerExtensionVersion` (see the Compose-Kotlin compatibility map on developer.android.com) only if `flutter run` errors tell you which versions are installed.
- Imports may vary if library versions change or you use different Compose classes; follow your IDE's hints.
- All Flutter apps on Android exist within an activity completely consumed by Flutter, so the native `MethodChannel` callback's job is to launch a second activity. Not all Android activities use Jetpack Compose; this tutorial assumes Compose.
- To host native Android views inside the Flutter widget tree instead, see the Android platform views page.
- This page is the Flutter-to-Compose launch route. Compose APIs themselves (`Surface`, `Column`, `Button`, `MaterialTheme`) belong to the android-compose-ui and android-compose-components skills; Gradle details belong to android-build-gradle.

## Related

- [android-platform-views](./android-platform-views.md)
- [platform-channels](./platform-channels.md)
- [android-call-jetpack-apis](./android-call-jetpack-apis.md)
