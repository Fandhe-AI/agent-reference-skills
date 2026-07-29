# DropShadow

A Gaussian-blur drop shadow cast by a [SpriteVisual](./sprite-visual.md) or `LayerVisual`, assigned to the visual's `Shadow` property. `DropShadow` is the only concrete subclass of the abstract `CompositionShadow`.

## Signature / Usage

```csharp
DropShadow shadow = compositor.CreateDropShadow();
shadow.BlurRadius = 5;
shadow.Offset = new Vector3(15, 15, -10);
shadow.Color = Colors.DarkGray;

visual.Shadow = shadow; // visual is a SpriteVisual or LayerVisual
```

```csharp
// Inherit the shadow's alpha mask from the visual's own brush content
// (e.g. so a circular/transparent-PNG image casts a circular shadow)
shadow.SourcePolicy = CompositionDropShadowSourcePolicy.InheritFromVisualContent;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| BlurRadius | float, animatable | Radius of the Gaussian blur used to generate the shadow. |
| Color | Color, animatable | Color of the shadow. |
| Offset | Vector3, animatable | Offset of the shadow relative to its visual. |
| Opacity | float, animatable | Opacity of the shadow. |
| Mask | CompositionBrush, animatable | Brush used as an opacity mask for the shadow; defaults to the visual's own brush. |
| SourcePolicy | CompositionDropShadowSourcePolicy | `Default` (shadow is a rectangle matching the visual's bounds) or `InheritFromVisualContent` (shadow follows the alpha channel of the visual's brush, e.g. for non-rectangular/transparent PNG content). |

## Notes

- Namespace: `Microsoft.UI.Composition` (Windows App SDK / WinUI 3). `DropShadow` inherits from `CompositionShadow` (which inherits from `CompositionObject`). The UWP equivalent is `Windows.UI.Composition.DropShadow`.
- Shadows are **not** clipped by a visual's implicit size-based clip, but do respect an explicit `Visual.Clip`.
- `BlurRadius` and `Offset` are independently animatable via [ScalarKeyFrameAnimation](./key-frame-animation.md) / `Vector3KeyFrameAnimation` (`shadow.StartAnimation("BlurRadius", ...)`, `shadow.StartAnimation("Offset", ...)`), enabling pulsing/floating shadow effects.
- `LayerVisual.Shadow` applies the shadow to the flattened result of the layer's children (rather than per-child), which is the standard way to give a group of visuals a single combined shadow.
- The XAML-layer equivalent is `Microsoft.UI.Xaml.Media.ThemeShadow`, which derives its shape from XAML elevation rather than a manually configured `DropShadow`; see the `windows-design` skill's elevation/materials guidance and `windows-winui-ui`'s implicit-animations page for the composition-visual-layer pattern this is used with.
- Distinct from CSS `box-shadow`/`filter: drop-shadow()` in `ark-ui`/`chakra-ui`, `Modifier.shadow`/`Modifier.dropShadow` in Jetpack Compose, and `CALayer.shadow*` in Apple Core Animation — this is the WinRT composition shadow type.

## Related

- [SpriteVisual](./sprite-visual.md)
- [LayerVisual](./layer-visual.md)
- [Compositor](./compositor.md)
- [KeyFrameAnimation](./key-frame-animation.md)
