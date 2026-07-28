# App Icon Construction

Windows displays an app icon at many sizes depending on location and display scale factor. Providing multiple pre-rendered sizes (rather than relying on runtime scaling) keeps the icon crisp; the MSIX/AppX package manifest maps base logo names (e.g. `Square44x44Logo`) to per-scale image files.

## Options / Props

### Scale factor sizes by UI context

| Windows 11 scale factor | 100% | 125% | 150% | 200% | 250% | 300% | 400% |
|--------------------------|------|------|------|------|------|------|------|
| Context menu, title bar, system tray | 16px | 20px | 24px | 32px | 40px | 48px | 64px |
| Taskbar, search results, Start all apps list | 24px | 30px | 36px | 48px | 60px | 72px | 96px |
| Start pins | 32px | 40px | 48px | 64px | 80px | 96px | 256px |

Minimum recommended set: 16x16, 24x24, 32x32, 48x48, 256x256.

### Manifest logo entries → pixel sizes

| Manifest entry | Base size | 100% | 125% | 150% | 200% | 250% | 300% | 400% |
|-----------------|-----------|------|------|------|------|------|------|------|
| `Square44x44Logo` | 44 px | 44 px | 55 px | 66 px | 88 px | 110 px | 132 px | 176 px |
| `Square150x150Logo` | 150 px | 150 px | 188 px | 225 px | 300 px | 375 px | 450 px | 600 px |
| `Wide310x150Logo` | 310×150 px | 310×150 px | 388×188 px | 465×225 px | 620×300 px | 775×375 px | 930×450 px | 1240×600 px |
| `Square310x310Logo` | 310 px | 310 px | 388 px | 465 px | 620 px | 775 px | 930 px | 1240 px |
| `Square71x71Logo` | 71 px | 71 px | 89 px | 107 px | 142 px | 178 px | 213 px | 284 px |
| `StoreLogo` | 50 px | 50 px | 63 px | 75 px | 100 px | 125 px | 150 px | 200 px |

### Required asset groups (filenames)

| Asset group | Required? | Notes |
|-------------|-----------|-------|
| `AppList.targetsize-{16..256}.png` | Required | Primary app-list icon (Taskbar, Start pins, search results) |
| `AppList.targetsize-*_altform-unplated.png` (dark) | Required | Dark-theme variant; omitting causes a fallback system backplate |
| `AppList.targetsize-*_altform-lightunplated.png` (light) | Required | Light-theme variant |
| `AppList.scale-{100,125,150,200,400}.png` | Optional (Win10) | Legacy scale-based app-list assets |
| `SmallTile` / `MedTile` / `WideTile` / `LargeTile` .scale-* | Partially required | Windows 11 doesn't use tiles, but `MedTile.scale-100` is required to publish to the Microsoft Store |
| `SplashScreen.scale-*` | Required | Default; dark/light theme variants optional |
| `BadgeLogo.scale-*` | Optional | Windows 10 lock-screen badge |
| `StoreLogo.scale-*` | Required | Microsoft Store listing logo; light-theme variant optional |

## Notes

- Windows looks for an exact pixel match first, then the next size up and scales down — providing more sizes reduces scaling artifacts; always include a 256px asset so Windows never scales up.
- At minimum, provide `Square44x44Logo` and `Square150x150Logo` at 100%/200%/400% scale plus the target-size app-list variants; Windows picks the closest available asset for intermediate factors (125%, 150%, 250%, 300%).
- Transparent backgrounds are preferred; if the icon must be plated, provide separate light-theme and dark-theme plated versions.
- Win32 apps use classic `.ico` files with a subset of the sizes above, distinct from the MSIX manifest asset set.
- Package/scope: MSIX/AppX manifest (`VisualElements` schema). Distinct from app icon asset pipelines in apple-distribution (`.appiconset`) and android-build-gradle (adaptive icons/mipmap).

## Related

- [App Icons](./app-icons.md)
