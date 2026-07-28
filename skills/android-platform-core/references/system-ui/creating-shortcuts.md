# Creating shortcuts

Concrete code for defining static shortcuts in XML, and creating/removing dynamic and pinned shortcuts at runtime.

## Signature / Usage

```xml
<!-- res/xml/shortcuts.xml, referenced via <meta-data android:name="android.app.shortcuts" .../> -->
<shortcuts xmlns:android="http://schemas.android.com/apk/res/android">
  <shortcut
    android:shortcutId="compose"
    android:enabled="true"
    android:icon="@drawable/compose_icon"
    android:shortcutShortLabel="@string/compose_shortcut_short_label1"
    android:shortcutLongLabel="@string/compose_shortcut_long_label1"
    android:shortcutDisabledMessage="@string/compose_disabled_message1">
    <intent
      android:action="android.intent.action.VIEW"
      android:targetPackage="com.example.myapplication"
      android:targetClass="com.example.myapplication.Main" />
  </shortcut>
</shortcuts>
```

```kotlin
// Pinned shortcut request
val shortcutManager = getSystemService<ShortcutManager>()
if (shortcutManager!!.isRequestPinShortcutSupported) {
    val pinShortcutInfo = ShortcutInfo.Builder(context, "my-shortcut").build()
    val pinnedShortcutCallbackIntent = shortcutManager.createShortcutResultIntent(pinShortcutInfo)
    val successCallback = PendingIntent.getBroadcast(context, 0, pinnedShortcutCallbackIntent, 0)
    shortcutManager.requestPinShortcut(pinShortcutInfo, successCallback.intentSender)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ShortcutManagerCompat.pushDynamicShortcut(context, shortcut)` | `Unit` | — | Creates or updates a dynamic shortcut. |
| `ShortcutManagerCompat.removeDynamicShortcuts(context, ids)` | `Unit` | — | Removes specific dynamic shortcuts by ID. |
| `ShortcutManagerCompat.removeAllDynamicShortcuts(context)` | `Unit` | — | Removes all dynamic shortcuts. |
| `ShortcutManager.isRequestPinShortcutSupported` | `Boolean` | — | Whether the current launcher supports pin requests. |
| `ShortcutManager.requestPinShortcut(info, resultIntentSender)` | `Boolean` | — | Requests the launcher to pin a shortcut, with an optional success callback. |

## Notes

- A static shortcut's `<shortcuts>` resource is referenced from the main activity's manifest entry via `<meta-data android:name="android.app.shortcuts" android:resource="@xml/shortcuts" />`.
- The Google Shortcuts Integration Library needs `androidx.core:core-google-shortcuts` to surface dynamic shortcuts on Assistant/launcher.
- Package: `androidx.core.content.pm` (`ShortcutManagerCompat`, `ShortcutInfoCompat`), `android.content.pm.ShortcutManager` (pinned shortcuts).

## Related

- [App shortcuts](./app-shortcuts.md)
