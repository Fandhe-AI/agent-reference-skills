# enableEdgeToEdge

Enables edge-to-edge display, letting the app draw its UI behind the system bars (status bar, caption bar, navigation bar) for a more immersive experience. Enforced by default on Android 15 (API 35)+.

## Signature / Usage

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()
    // ... rest of your code
}
```

```xml
<activity
    android:name=".ui.MainActivity"
    android:windowSoftInputMode="adjustResize"
    android:theme="@style/Theme.MyApplication"
    android:exported="true" />
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `statusBarStyle` | `SystemBarStyle` | auto (light/dark aware) | Appearance of the status bar. |
| `navigationBarStyle` | `SystemBarStyle` | auto (light/dark aware) | Appearance of the navigation bar. |

## Notes

- Default behavior: system bars become transparent on most devices; in 3-button navigation mode a translucent scrim is applied to the navigation bar for contrast; system icon colors adapt to light/dark theme.
- Set `android:windowSoftInputMode="adjustResize"` in the manifest so the app receives IME insets and can pad accordingly.
- Enforced on Android 15 (API 35)+ when targeting SDK 35 — unhandled content may be hidden by system UI.
- For dialogs, call `WindowCompat.enableEdgeToEdge(dialog.window)` in `onStart()`.
- Package: `androidx.activity`.

## Related

- [WindowInsets](./window-insets.md)
- [System bar appearance and immersive mode](./system-bar-appearance.md)
- [Display cutout](./display-cutout.md)
