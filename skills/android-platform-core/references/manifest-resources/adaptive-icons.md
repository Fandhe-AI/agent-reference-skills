# Adaptive icons

Launcher icon format composed of separate foreground/background (and optional monochrome) layers so the system can apply masks, animations, and themed coloring.

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
<!-- AndroidManifest.xml -->
<application
    android:icon="@mipmap/ic_launcher"
    android:roundIcon="@mipmap/ic_launcher_round" ...>
</application>
```

## Options / Props

| Layer | Size | Description |
|-------|------|-------------|
| `<background>` | 108×108 dp | Full-bleed color/pattern layer, required. |
| `<foreground>` | 108×108 dp | Logo/content layer, required; keep visual content within the inner 66×66 dp safe zone (outer 18 dp per side reserved for masking/effects). |
| `<monochrome>` | 108×108 dp | Optional single-color layer used for Android 13+ (API 33+) user theming; can reuse the foreground drawable. |

## Notes

- File location for the adaptive-icon XML: `res/mipmap-anydpi-v26/ic_launcher.xml` (requires API 26+ qualifier).
- Vector drawables are preferred over bitmaps for both layers; layers should have no built-in masks or shadows since the system applies its own mask shape.
- Layer content can be defined inline (`<shape>`, `<inset>`, etc.) instead of referencing a separate drawable resource.

## Related

- [drawable resources](./drawable-resources.md)
- [application element](./application-element.md)
