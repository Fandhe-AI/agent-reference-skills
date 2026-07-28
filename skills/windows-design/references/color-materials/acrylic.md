# Acrylic

Acrylic is a translucent `Brush` that replicates frosted glass, adding depth and visual hierarchy to app surfaces. It comes in two blend types — background acrylic and in-app acrylic — and is mode-aware (supports light and dark themes).

## Signature / Usage

```xaml
<!-- In-app acrylic brush applied to a control's Background -->
<Grid>
    <Grid.Background>
        <AcrylicBrush TintColor="White" TintOpacity="0.6" BackgroundSource="Backdrop"/>
    </Grid.Background>
</Grid>
```

```xaml
<!-- Background acrylic as the window backdrop -->
<Window.SystemBackdrop>
    <DesktopAcrylicBackdrop/>
</Window.SystemBackdrop>
```

## Options / Props

| Blend type | Description |
|------|-------------|
| Background acrylic | Reveals the desktop wallpaper and other windows behind the active app. Used for transient, light-dismiss surfaces (flyouts, context menus, `MenuFlyout`, `AutoSuggestBox`, `ComboBox` popups). |
| In-app acrylic | Adds depth within the app frame only (does not reveal content behind the window). Used for supporting UI such as navigation panes that overlap content when scrolling. |

| Important API | Description |
|------|-------------|
| `AcrylicBrush` | Brush class for applying acrylic to any element's `Background`. |
| `Control.Background` | Property most commonly set to an `AcrylicBrush`. |
| `Window.SystemBackdrop` | Property for applying a window-level backdrop material. |
| `DesktopAcrylicBackdrop` | Background-acrylic backdrop class for `Window.SystemBackdrop`. |

## Notes

- Package: `Microsoft.UI.Xaml.Media.AcrylicBrush` / `Microsoft.UI.Xaml.Media.DesktopAcrylicBackdrop` (WinUI 3 / Windows App SDK). Distinct from CSS `backdrop-filter` and any JS/Compose blur brush.
- Avoid layering multiple acrylic surfaces edge-to-edge — it produces a visible seam/striping effect and distracting optical illusions.
- Rendering acrylic is GPU-intensive; it is automatically disabled in Battery Saver mode, and users can turn off *Transparency effects* in Settings > Personalization > Colors. In High Contrast mode it is replaced by a solid color. Background acrylic additionally becomes solid when the window deactivates or on Xbox/HoloLens/tablet mode.
- Don't place accent-colored text or hyperlinks over acrylic — see Accessible color contrast for the underlying contrast-ratio rule.
- Prefer an opaque background over acrylic for large vertical panes that section off content; reserve in-app acrylic for panes that overlap content (e.g. `NavigationView` Compact/Minimal panes).

## Related

- [Materials overview](./materials-overview.md)
- [Mica / Mica Alt](./mica.md)
- [Accessible color contrast](./accessible-color-contrast.md)
- [Background material selection](./background-material-selection.md)
