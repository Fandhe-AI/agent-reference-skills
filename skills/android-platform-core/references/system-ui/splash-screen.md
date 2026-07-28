# SplashScreen API

Shows an Android 12+ style animated launch screen on all supported API levels via `installSplashScreen()`, with theme-driven appearance and callbacks to hold the splash screen while data loads or to customize the exit animation.

## Signature / Usage

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    val splashScreen = installSplashScreen()
    setContentView(R.layout.main_activity)

    val content: View = findViewById(android.R.id.content)
    content.viewTreeObserver.addOnPreDrawListener(
        object : ViewTreeObserver.OnPreDrawListener {
            override fun onPreDraw(): Boolean {
                return if (viewModel.isReady) {
                    content.viewTreeObserver.removeOnPreDrawListener(this)
                    true
                } else {
                    false // keep suspending drawing
                }
            }
        }
    )
}
```

```gradle
dependencies {
    implementation("androidx.core:core-splashscreen:1.0.0")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:windowSplashScreenBackground` | color (theme attr) | — | Splash screen background color. |
| `android:windowSplashScreenAnimatedIcon` | drawable (theme attr) | — | Vector drawable or `AnimatedVectorDrawable` shown centered. |
| `android:windowSplashScreenAnimationDuration` | int ms (theme attr) | — | Icon animation duration; ≤1000ms recommended. |
| `android:windowSplashScreenIconBackgroundColor` | color (theme attr) | none | Background behind the icon for contrast. |
| `android:windowSplashScreenBrandingImage` | drawable (theme attr) | none | Bottom branding image (not recommended by design guidance). |
| `android:windowSplashScreenBehavior` | enum (theme attr) | — | `icon_preferred` always shows the animated icon (Android 13+). |
| `SplashScreen.setKeepOnScreenCondition(condition)` | `Unit` | — | Suspends splash screen removal until `condition` returns `false`. |
| `SplashScreen.setOnExitAnimationListener(listener)` | `Unit` | — | Customizes the dismissal animation via a `SplashScreenViewProvider`. |

## Notes

- Platform API: Android 12 (API 31)+. Compat behavior for API 23+ requires `androidx.core:core-splashscreen:1.0.0`.
- Animated icon dimensions: 432 dp container (4x adaptive icon size), 288 dp visible inner area.
- Max delayed start for the icon animation is 166 ms.

## Related

- [Adaptive icons](./adaptive-icons.md)
