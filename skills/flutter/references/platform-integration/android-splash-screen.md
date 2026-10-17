---
source: https://docs.flutter.dev/platform-integration/android/splash-screen
---

# Adding a splash screen to your Android app

A splash screen (also known as a launch screen) provides a simple initial experience while your Android app loads, allowing time for the engine to load and the app to initialize.

## Signature / Usage

Define the launch theme in `styles.xml` (`windowBackground` is the `Drawable` shown as the launch screen), plus a normal theme applied to `FlutterActivity` after the launch screen is gone:

```xml
<style name="LaunchTheme" parent="@android:style/Theme.Black.NoTitleBar">
    <item name="android:windowBackground">@drawable/launch_background</item>
</style>
```

```xml
<style name="NormalTheme" parent="@android:style/Theme.Black.NoTitleBar">
    <item name="android:windowBackground">@drawable/normal_background</item>
</style>
```

Set the activity theme and the switch-over metadata in `AndroidManifest.xml`:

```xml
<activity
    android:name=".MyActivity"
    android:theme="@style/LaunchTheme"
    // ...
    >
    <meta-data
        android:name="io.flutter.embedding.android.NormalTheme"
        android:resource="@style/NormalTheme"
        />
    <intent-filter>
        <action android:name="android.intent.action.MAIN"/>
        <category android:name="android.intent.category.LAUNCHER"/>
    </intent-filter>
</activity>
```

Android 12 `SplashScreen` API in `styles.xml`:

```xml
<style name="LaunchTheme" parent="@android:style/Theme.Black.NoTitleBar">
    <item name="android:windowSplashScreenBackground">@color/bgColor</item>
    <item name="android:windowSplashScreenAnimatedIcon">@drawable/launch_background</item>
</style>
```

Keep showing the last frame of the Android launch screen in Flutter (Kotlin, `MainActivity.kt`):

```kotlin
class MainActivity : FlutterActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    // Aligns the Flutter view vertically with the window.
    WindowCompat.setDecorFitsSystemWindows(getWindow(), false)

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      // Disable the Android splash screen fade out animation to avoid
      // a flicker before the similar frame is drawn in Flutter.
      splashScreen.setOnExitAnimationListener { splashScreenView -> splashScreenView.remove() }
    }

    super.onCreate(savedInstanceState)
  }
}
```

## Notes

- Options: use a package from pub.dev, or implement manually as in the splash screen sample app (`android_splash_screen` in the samples repo); the page assumes the manual approach.
- The default Flutter project template already defines a launch theme and launch background; customize by editing `styles.xml`.
- The normal theme background only shows briefly after the splash disappears, and during orientation change and `Activity` restoration, so use a solid background color similar to the primary background of the Flutter UI.
- If your app supports releases earlier than Android 12 and post-Android 12, consider two different resources in `styles.xml`, and make sure the background image follows the icon guidelines.
- For apps embedding Flutter screens in an existing Android app, consider pre-warming a `FlutterEngine` and reusing it to minimize initialization wait time.
- To preserve the single-frame illusion, reimplement in Flutter the first frame showing elements of the Android launch screen in the same positions (see the sample app). The Java variant of the `MainActivity` snippet uses `getSplashScreen().setOnExitAnimationListener(...)`.
- This is the Flutter-side setup. The Android `SplashScreen` API itself belongs to the android-platform-core / android-* skills.

## Related

- [ios-launch-screen](./ios-launch-screen.md)
- [add-to-app-android-screen](./add-to-app-android-screen.md)
