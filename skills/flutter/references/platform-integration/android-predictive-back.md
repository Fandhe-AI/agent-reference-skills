---
source: https://docs.flutter.dev/platform-integration/android/predictive-back
---

# Add the predictive back gesture

The Android predictive back gesture lets users preview where a back gesture will navigate to before they commit to or cancel it.

## Signature / Usage

Enable it in `android/app/src/main/AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application
        android:label="my_app"
        android:name="${applicationName}"
        android:icon="@mipmap/ic_launcher"
        android:enableOnBackInvokedCallback="true">
        <!-- ... -->
    </application>
</manifest>
```

Intercept back navigation with `PopScope`:

```dart
PopScope(
  canPop: false,
  onPopInvokedWithResult: (bool didPop, Object? result) async {
    if (didPop) {
      return;
    }
    final shouldLeave = await _showExitConfirmationDialog(context);
    if (shouldLeave && context.mounted) {
      Navigator.of(context).pop(result);
    }
  },
  child: Scaffold(
    appBar: AppBar(title: const Text('Form Screen')),
    body: const Center(child: Text('Complete the form before leaving.')),
  ),
)
```

## Options / Props

`PopScope` `onPopInvokedWithResult` callback parameters:

| Name | Type | Description |
| --- | --- | --- |
| `didPop` | `bool` | Whether the pop operation succeeded. If `canPop` is `false`, `didPop` is `false`. |
| `result` | `Object?` | Optional return payload passed when popping the route (for example, with `Navigator.pop(context, result)`). |

## Notes

- Starting with Android 14 (API level 34), predictive back animations are enabled by default for system gestures when supported by the application. Flutter provides built-in support across default page route transitions and custom pop handling.
- To support the gesture on Android 13 or later, set `android:enableOnBackInvokedCallback="true"` on the `<application>` tag.
- `PopScope` replaces the deprecated `WillPopScope` widget and supports predictive back gestures.
- For API migrations, the source points to the Android predictive back migration guide (`/release/breaking-changes/android-predictive-back`).
- This page covers Flutter's `PopScope` / `Navigator` integration. The Android-side back handling (`OnBackInvokedCallback`, Jetpack Navigation) belongs to the android-navigation and android-platform-core skills; Flutter `Navigator` is distinct from react-router, tanstack-router, and Jetpack Navigation.

## Related

- [android-splash-screen](./android-splash-screen.md)
- [android-restore-state](./android-restore-state.md)
