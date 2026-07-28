# Adaptive icons

An `AdaptiveIconDrawable` composed of foreground/background (and optional monochrome) layers so the launcher and other surfaces can mask, animate, and theme the icon consistently across devices.

## Signature / Usage

```xml
<!-- res/mipmap-anydpi-v26/ic_launcher.xml -->
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@drawable/ic_launcher_background" />
    <foreground android:drawable="@drawable/ic_launcher_foreground" />
    <monochrome android:drawable="@drawable/ic_launcher_foreground" />
</adaptive-icon>
```

```xml
<application
    android:icon="@mipmap/ic_launcher"
    android:roundIcon="@mipmap/ic_launcher_round"
    ... />
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `<background>` | drawable | — | Background layer, 108x108 dp. |
| `<foreground>` | drawable | — | Foreground/logo layer, 108x108 dp; logo should stay within the 66x66 dp safe zone (48-66 dp recommended). |
| `<monochrome>` | drawable | none | Single-color layer enabling user theming (Android 13+); required unless targeting Android 16 QPR2+, which can auto-theme without it. |

## Notes

- Outer 18 dp on each side of every layer is reserved for masking/visual effects; avoid clipping-sensitive content there.
- Themed icons display only when the user enables themed icons, the app provides (or the OS synthesizes, 16 QPR2+) a monochrome layer, and the launcher supports theming.
- Prefer vector drawables over bitmaps for scalability; avoid adding masks/shadows to layer artwork.
- Package: `android.graphics.drawable.AdaptiveIconDrawable` (platform resource format, not a Compose API).

## Related

- [App shortcuts](./app-shortcuts.md)
