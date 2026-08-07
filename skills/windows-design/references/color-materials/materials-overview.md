# Materials overview

Materials are visual effects applied to UX surfaces that resemble real-life artifacts. Windows uses occluding materials (Mica, Acrylic) as base layers beneath UI controls, and transparent materials (Smoke) to highlight immersive/modal surfaces.

## Signature / Usage

Materials are chosen per surface type, not mixed arbitrarily:

- **Mica** — opaque backdrop for long-lived app/settings windows.
- **Acrylic** — semi-transparent brush for transient, light-dismiss surfaces (flyouts, context menus) or in-app supporting panes.
- **Smoke** — translucent black overlay that dims the layer beneath a modal surface (e.g. dialog).

## Options / Props

| Material | Type | Typical use |
|------|------|-------------|
| Mica / Mica Alt | Opaque, mode-aware | Base/backdrop layer of app and settings windows. |
| Acrylic | Semi-transparent, mode-aware | Transient light-dismiss surfaces (flyouts, menus); in-app supporting/navigation panes. |
| Smoke | Translucent black, not mode-aware | Dimming the surface behind a modal UI such as a dialog. |

## Notes

- Package: `Microsoft.UI.Xaml.Media` (`Microsoft.UI.Xaml.Media.AcrylicBrush`, `Microsoft.UI.Xaml.Media.DesktopAcrylicBackdrop`, `Microsoft.UI.Xaml.Media.MicaBackdrop`) in WinUI 3 / Windows App SDK. Distinct from the JS `@ark-ui/react` / `@chakra-ui/react` styling systems and from Jetpack Compose `Surface`/elevation.
- Mica also indicates window focus with active and inactive states as a built-in feature.
- Layering in Windows is tightly coupled with materials: apply a material as the base layer, then use theme resources such as `LayerFillColorDefaultBrush` for the content layer that sits on top of it.
- All materials are automatically disabled or replaced with a solid fallback color in High Contrast mode, when Battery Saver is active, on low-end hardware, or when the user disables transparency effects.

## Related

- [Mica](./mica.md)
- [Acrylic](./acrylic.md)
- [Smoke](./smoke.md)
- [Background material selection](./background-material-selection.md)
