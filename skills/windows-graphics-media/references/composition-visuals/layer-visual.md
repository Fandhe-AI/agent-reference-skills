# LayerVisual

A `ContainerVisual` whose children are flattened into a single layer before an `Effect` or `Shadow` is applied, so a group opacity/blur/shadow renders correctly across overlapping children instead of being applied to each child independently.

## Signature / Usage

```csharp
LayerVisual layerVisual = compositor.CreateLayerVisual();
layerVisual.Size = new Vector2(300, 300);

SpriteVisual a = compositor.CreateSpriteVisual();
a.Brush = compositor.CreateColorBrush(Colors.Blue);
a.Size = new Vector2(150, 150);

SpriteVisual b = compositor.CreateSpriteVisual();
b.Brush = compositor.CreateColorBrush(Colors.Red);
b.Size = new Vector2(150, 150);
b.Offset = new Vector3(75, 75, 0);

layerVisual.Children.InsertAtTop(a);
layerVisual.Children.InsertAtTop(b);

// A single shadow cast by the flattened (blue + red) group, not one shadow per child.
DropShadow shadow = compositor.CreateDropShadow();
shadow.BlurRadius = 9;
shadow.SourcePolicy = CompositionDropShadowSourcePolicy.InheritFromVisualContent;
layerVisual.Shadow = shadow;

ElementCompositionPreview.SetElementChildVisual(hostGrid, layerVisual);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Children | VisualCollection, inherited from `ContainerVisual` | The children flattened into the layer. |
| Effect | CompositionEffectBrush | Effect applied to the flattened representation of the children (e.g. a blur brush from a `CompositionEffectFactory`). |
| Shadow | CompositionShadow | Shadow (typically a `DropShadow`) cast by the flattened representation of the children. |

## Notes

- Namespace: `Microsoft.UI.Composition` (Windows App SDK / WinUI 3). Inherits from `ContainerVisual` → `Visual`. The UWP equivalent is `Windows.UI.Composition.LayerVisual`.
- Created via `Compositor.CreateLayerVisual()`.
- When an effect with a single input is set on `Effect`, that input is implicitly the flattened subtree rooted at the `LayerVisual` — no explicit `SetSourceParameter` call for the backdrop is needed as it would be for a plain [SpriteVisual](./sprite-visual.md)'s [CompositionEffectBrush](./composition-effect-brush.md). An effect with two inputs uses the layer subtree for the first unbound input; effects with zero inputs, or with all inputs already bound to a surface brush, are rejected.
- Without `LayerVisual`, applying `Opacity`/a blur/a `Shadow` to a `ContainerVisual` of overlapping semi-transparent children composites each child independently first (visible seams/double-blending at overlaps); `LayerVisual` flattens to one bitmap first, then applies the effect/shadow/opacity once.

## Related

- [ContainerVisual](./container-visual.md)
- [SpriteVisual](./sprite-visual.md)
- [DropShadow](./drop-shadow.md)
- [CompositionEffectBrush](./composition-effect-brush.md)
