# Shadows (ThemeShadow / DropShadow)

Windows apps use shadows to express depth and elevation, guiding focus to the most important UI. `ThemeShadow` applies a consistent, built-in shadow to any XAML element based on its z-depth; `DropShadow` is the lower-level, fully customizable alternative with no built-in values.

## Signature / Usage

```xaml
<!-- ThemeShadow inside a Popup: elevate the caster via Translation.Z -->
<Popup>
    <Rectangle x:Name="PopupRectangle" Fill="Lavender" Height="48" Width="96">
        <Rectangle.Shadow>
            <ThemeShadow />
        </Rectangle.Shadow>
    </Rectangle>
</Popup>
```

```csharp
// Elevate the rectangle by 32 effective pixels
PopupRectangle.Translation += new Vector3(0, 0, 32);
```

```xaml
<!-- ThemeShadow outside a Popup: explicit Receivers required -->
<Grid>
    <Grid.Resources>
        <ThemeShadow x:Name="SharedShadow" />
    </Grid.Resources>

    <Grid x:Name="BackgroundGrid" Background="{ThemeResource ApplicationPageBackgroundThemeBrush}" />
    <Rectangle Height="100" Width="100" Fill="Turquoise" Shadow="{StaticResource SharedShadow}" />
</Grid>
```

```csharp
SharedShadow.Receivers.Add(BackgroundGrid);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `UIElement.Shadow` | `Shadow` (`ThemeShadow` is its only concrete subclass) | Attaches a shadow to any XAML `UIElement`, cast from that element. `DropShadow` is a separate, unrelated type attached to a `SpriteVisual`/`LayerVisual`'s `Shadow` property instead — see Notes. |
| `ThemeShadow.Receivers` | `IVector<UIElement>` | Elements the shadow may fall on when the caster is not inside a `Popup`. Receivers cannot be an ancestor of the caster in the visual tree. Ignored (shadow still renders) on Windows SDK 22000+. |
| `Translation` (z component) | `Vector3` | Elevates the shadow-casting element above its receivers; controls shadow size/softness. 32px is the recommended default for most popup UI. |
| `FlyoutPresenter.IsDefaultShadowEnabled` | `bool` | Set `false` in a `FlyoutPresenter` style to disable the automatic `ThemeShadow` that `Flyout`/`MenuFlyout`/`DatePickerFlyout`/`TimePickerFlyout` apply by default. |

## Notes

- `ThemeShadow`: `Microsoft.UI.Xaml.Media.ThemeShadow` (WinUI 3 / Windows App SDK), assigned through `UIElement.Shadow`. `DropShadow`: `Microsoft.UI.Composition.DropShadow`, a separate `CompositionShadow` assigned to a `SpriteVisual`/`LayerVisual`'s `Shadow` property rather than a XAML element's — documented in full (animatable `BlurRadius`/`Color`/`Offset`/`SourcePolicy`) in the `windows-graphics-media` skill.
- `ThemeShadow` requires no manual configuration — depth, blur, and color are derived automatically from the element's z-depth — while `DropShadow` provides no built-in values and must be configured by hand.
- Many built-in controls already cast a 32px-deep `ThemeShadow` automatically: context menus, command bars, `NavigationView`, `ComboBox`/`DropDownButton`/`SplitButton`, `TeachingTip`, `AutoSuggestBox`, date/time pickers, `TabView`, `BreadcrumbBar`, and connected animations (dialogs use 128px, tooltips 16px).
- Starting with Windows 11 (Windows SDK 22000+), `ThemeShadow` behaves like a drop shadow and the `Receivers` collection is ignored (no error, shadow still renders) — Microsoft recommends preferring `ThemeShadow` over `DropShadow` on that SDK level for this reason.
- Comparison: `ThemeShadow` — min SDK 18362, adapts automatically, not customizable, works (emulated) in 3D. `DropShadow` — min SDK 14393, no automatic adaptation, fully customizable, not supported in 3D.
- Shadows are meant to communicate hierarchy, not decoration; use too many and they stop drawing focus. For performance-sensitive scenarios, limit shadow count or fall back to other visual treatments (e.g. color) before reaching for `DropShadow`.
- Distinct from CSS `box-shadow`/`filter: drop-shadow()` in `ark-ui`/`chakra-ui`, `Modifier.shadow` in Jetpack Compose, and `CALayer.shadow*` in Apple Core Animation — these are the WinUI 3 XAML/Composition shadow types.

## Related

- [Mica Material](./mica-material.md)
- [System Backdrops (SystemBackdrop, MicaBackdrop, DesktopAcrylicBackdrop)](./system-backdrops.md)
- [Brushes (SolidColorBrush, LinearGradientBrush, AcrylicBrush, RevealBrush)](./brushes.md)
