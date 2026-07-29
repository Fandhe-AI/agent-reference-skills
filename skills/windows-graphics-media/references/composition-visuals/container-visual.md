# ContainerVisual

A node in the visual tree that can have children. Base class for `SpriteVisual`, [ShapeVisual](./shape-visual.md), and [LayerVisual](./layer-visual.md).

## Signature / Usage

```csharp
Compositor compositor = ElementCompositionPreview.GetElementVisual(RootGrid).Compositor;

ContainerVisual root = compositor.CreateContainerVisual();

SpriteVisual child = compositor.CreateSpriteVisual();
child.Brush = compositor.CreateColorBrush(Color.FromArgb(0xFF, 0x00, 0xCC, 0x00));
child.Offset = new Vector3(50.0f, 50.0f, 0f);
child.Size = new Vector2(200, 200);

root.Children.InsertAtTop(child);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Children | VisualCollection | The children of this `ContainerVisual`; supports `InsertAtTop`, `InsertAtBottom`, `InsertAbove`, `InsertBelow`, `Remove`. |

All other members (`Offset`, `Size`, `Opacity`, `Clip`, `CenterPoint`, `RotationAngle`, etc.) are inherited from [Visual](./visual.md).

## Notes

- Namespace: `Microsoft.UI.Composition` (Windows App SDK / WinUI 3). Inherits from `Visual`. The UWP equivalent is `Windows.UI.Composition.ContainerVisual`.
- Used as the root visual of a composition tree, or as a grouping node for multiple child visuals sharing a transform/clip/opacity.

## Related

- [Visual](./visual.md)
- [SpriteVisual](./sprite-visual.md)
- [Compositor](./compositor.md)
- [ElementCompositionPreview](./element-composition-preview.md)
