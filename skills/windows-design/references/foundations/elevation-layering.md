# Elevation and layering

Windows 11 uses layering and elevation as its foundation for app hierarchy. Elevation is the depth (z-order) component of a surface's spatial relationship to another surface on the desktop; when two objects occupy the same screen location, the one with the higher elevation renders on top. Shadows and contour (outlines) communicate elevation and draw focus.

## Options / Props

| Surface | Elevation value | Stroke width |
|------|-------------|------|
| Window | 128 | 1 |
| Dialog | 128 | 1 |
| Flyout | 32 | 1 |
| Tooltip | 16 | 1 |
| Card | 8 | 1 |
| Control (rest) | 2 | 1 |
| Control (hover) | 2 | 1 |
| Control (pressed) | 1 | 1 |
| Layer (empty surface) | 1 | 1 |

## Notes

- **Layering**: Windows 11 apps use a two-layer system — the **base** layer (bottommost; app menus, commands, navigation) and the **content** layer (the app's central experience; may be one contiguous element or segmented into cards). Layering is tightly coupled with materials (see the Materials guidance).
- **Shadows**: the higher the elevation, the larger and softer the cast shadow; shadows should be used purposefully (to clarify overlapping-surface relationships) rather than decoratively. Standard controls (flyouts, dialogs, tooltips) already ship with shadows matched to their elevation value.
- Implementation APIs: `ThemeShadow` and `DropShadow` (see "Shadows in Windows apps" for implementation detail).
- Controls vary elevation/contour by interaction state (rest/hover/pressed) to communicate state, with shadow intensity also depending on the active theme.
- Package: `Microsoft.UI.Xaml.Media.ThemeShadow` / `Windows.UI.Composition.DropShadow` (WinUI 3 / Windows App SDK). Distinct from CSS `box-shadow`/elevation tokens in `@ark-ui/react` / `@chakra-ui/react`, Material elevation in Jetpack Compose, and shadow APIs in `apple-swiftui`.

## Related

- [Geometry](./geometry.md)
- [Design principles](./design-principles.md)
