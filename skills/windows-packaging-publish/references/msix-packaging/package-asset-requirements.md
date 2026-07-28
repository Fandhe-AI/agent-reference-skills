# Package Asset Requirements (Icons, Tiles, Logos)

Windows displays an app's icon and tile assets at a range of pixel sizes depending on context (Taskbar, Start, search, tiles) and the user's display scale factor. The manifest's logo entries (`Square44x44Logo`, `Square150x150Logo`, etc.) are *base sizes*; you supply pre-scaled variants Windows picks from at runtime.

## Signature / Usage

```xml
<uap:VisualElements
  Square150x150Logo="images\squareTile.png"
  Square44x44Logo="images\smallTile.png" ... />
```

Filename qualifiers for pre-scaled variants:

```
Square44x44Logo.scale-100.png
Square44x44Logo.scale-200.png
Square44x44Logo.scale-400.png
AppList.targetsize-16.png
AppList.targetsize-16_altform-unplated.png       (dark theme)
AppList.targetsize-16_altform-lightunplated.png  (light theme)
```

## Options / Props

### Manifest logo entries → pixel sizes by scale factor

| Manifest entry | Base size | 100% | 200% | 400% |
|-----------------|-----------|------|------|------|
| `Square44x44Logo` | 44 px | 44 px | 88 px | 176 px |
| `Square150x150Logo` | 150 px | 150 px | 300 px | 600 px |
| `Wide310x150Logo` | 310×150 px | 310×150 px | 620×300 px | 1240×600 px |
| `Square310x310Logo` | 310 px | 310 px | 620 px | 1240 px |
| `Square71x71Logo` | 71 px | 71 px | 142 px | 284 px |
| `StoreLogo` | 50 px | 50 px | 100 px | 200 px |

At minimum, provide `Square44x44Logo` / `Square150x150Logo` at 100%, 200%, 400% scale, plus the App icon target-size assets below; Windows picks the closest match for intermediate scales (125%, 150%, 250%, 300%).

### App icon (AppList) — required, per theme

Target sizes: 16, 20, 24, 30, 32, 36, 40, 48, 60, 64, 72, 80, 96, 256 px. Three variants required for each size:

| Variant | Suffix |
|---------|--------|
| Default | `AppList.targetsize-<N>.png` |
| Dark theme | `AppList.targetsize-<N>_altform-unplated.png` |
| Light theme | `AppList.targetsize-<N>_altform-lightunplated.png` |

### Tiles (Windows 10) — partially required

Four sizes: `SmallTile`, `MedTile`, `WideTile`, `LargeTile`, each at scale-100/125/150/200/400. Windows 11 does not use tile assets, but at minimum the Medium tile at 100% is required for Store publishing.

### Other assets

| Asset | Required for |
|-------|--------------|
| `SplashScreen.scale-*.png` | Launch splash screen (light/dark theme variants optional) |
| `BadgeLogo.scale-*.png` | Windows 10 lock screen badge (optional for most apps) |
| `StoreLogo.scale-*.png` | Required to publish to the Microsoft Store |

## Notes

- Windows looks for an exact size match first, then scales down from the next size above — provide enough variants to avoid blurry upscaling; minimum recommended set is 16x16, 24x24, 32x32, 48x48, and 256x256.
- Icons should have a transparent background; if plated on a solid background, provide separate light/dark themed versions.
- This page covers MSIX manifest/Store-facing icon and tile assets (`uap:VisualElements`), not general app UI iconography frameworks.

## Related

- [Package Manifest Schema](./package-manifest-schema.md)
