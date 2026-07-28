# App shortcuts

Quick actions that let users jump directly into a specific app function from a supported launcher or assistant, without navigating the full app UI. Three types: static, dynamic, pinned.

## Signature / Usage

```kotlin
val shortcut = ShortcutInfoCompat.Builder(context, "id1")
    .setShortLabel("Website")
    .setLongLabel("Open the website")
    .setIcon(IconCompat.createWithResource(context, R.drawable.icon_website))
    .setIntent(Intent(Intent.ACTION_VIEW, Uri.parse("https://www.mysite.example.com/")))
    .build()

ShortcutManagerCompat.pushDynamicShortcut(context, shortcut)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Static shortcuts | resource | — | Defined at build time in a resource file packaged into the APK/AAB; fixed structure, best for routine consistent actions. |
| Dynamic shortcuts | runtime | — | Pushed/updated/removed at runtime via `ShortcutManagerCompat`; used for context-sensitive actions. |
| Pinned shortcuts | runtime | — | Added to a supported launcher with user permission; appear as separate icons; cannot be removed by the app, only disabled. |
| `ShortcutManagerCompat.getMaxShortcutCountPerActivity()` | `Int` | — | Device-specific max shortcut count per activity. |

## Notes

- Only main activities (handling `Intent.ACTION_MAIN` + `Intent.CATEGORY_LAUNCHER`) can have shortcuts; define shortcuts per main activity if an app has multiple.
- Most launchers display up to 4 static+dynamic shortcuts at once.
- Launchers can read shortcut metadata even though other apps cannot — do not store sensitive user data in shortcuts.
- Use the Google Shortcuts Integration Library (`androidx.core:core-google-shortcuts`) to push dynamic shortcuts to Google surfaces (Assistant, launcher) without consuming the device shortcut limit.
- Package: `androidx.core.content.pm` (`ShortcutManagerCompat`, `ShortcutInfoCompat`).

## Related

- [Creating shortcuts](./creating-shortcuts.md)
