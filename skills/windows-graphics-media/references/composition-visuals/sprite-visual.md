# SpriteVisual

Hosts 2D boxed content of type `CompositionBrush`. Any part of the visual not covered by pixels from the brush is rendered as transparent. The brush can be a `CompositionBackdropBrush`, `CompositionColorBrush`, [CompositionSurfaceBrush](./composition-surface-brush.md), or [CompositionEffectBrush](./composition-effect-brush.md).

## Signature / Usage

```csharp
SpriteVisual visual = compositor.CreateSpriteVisual();
visual.Brush = compositor.CreateColorBrush(Colors.White);
visual.Size = new Vector2(270, 200);

// Add a drop shadow
DropShadow shadow = compositor.CreateDropShadow();
shadow.BlurRadius = 5;
shadow.Offset = new Vector3(15, 15, -10);
shadow.Color = Colors.DarkGray;
visual.Shadow = shadow;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Brush | CompositionBrush | Describes how the `SpriteVisual` is painted (color, surface, or effect brush). |
| Shadow | CompositionShadow | The shadow (e.g. `DropShadow`) applied to the visual. |
| Children | VisualCollection | Inherited from `ContainerVisual` — `SpriteVisual` can also host child visuals. |

Position/transform properties (`Offset`, `Size`, `Opacity`, `Clip`, `CenterPoint`, `RotationAngle`, ...) are inherited from [Visual](./visual.md) via `ContainerVisual`.

## Notes

- Namespace: `Microsoft.UI.Composition` (Windows App SDK / WinUI 3). Inherits from `ContainerVisual` → `Visual`. The UWP equivalent is `Windows.UI.Composition.SpriteVisual`.
- The most common visual type for rendering solid colors, images, and effects; typically parented into a `ContainerVisual` tree via `Children.InsertAtTop`.

## Related

- [Visual](./visual.md)
- [ContainerVisual](./container-visual.md)
- [CompositionSurfaceBrush](./composition-surface-brush.md)
- [CompositionEffectBrush](./composition-effect-brush.md)
- [Compositor](./compositor.md)
