# Visual

The base visual object in the visual hierarchy. Supports position, clipping, and 2D/3D transformation; content, colors, and effects are provided by subclasses such as `SpriteVisual` and `ContainerVisual`.

## Signature / Usage

```csharp
Visual visual = compositor.CreateContainerVisual();
visual.Offset = new Vector3(50f, 50f, 0f);
visual.Size = new Vector2(200, 200);
visual.CenterPoint = new Vector3(100f, 100f, 0f);
visual.RotationAngleInDegrees = 45f;
visual.Opacity = 0.8f;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Offset | Vector3, animatable | Offset relative to the parent (or, for a root visual, relative to the window's upper-left corner). |
| Size | Vector2, animatable | Width and height of the visual. |
| Scale | Vector3 | Scale applied to the visual. |
| RotationAngle / RotationAngleInDegrees | float, animatable | Rotation angle in radians / degrees, used with `RotationAxis` and `CenterPoint` for axis-angle rotation. |
| Opacity | float, animatable | Transparency from 0 (fully transparent) to 1 (fully opaque). The visual remains present in the tree at `Opacity = 0`. |
| CenterPoint | Vector3, animatable | Point about which rotation or scaling occurs. |
| AnchorPoint | Vector2, animatable | Point on the visual positioned at the visual's `Offset`; normalized to the visual's size. |
| Clip | CompositionClip | Clipping region; content outside the region is not rendered. |
| Parent | Visual (read-only) | The parent of the visual. |
| TransformMatrix | Matrix4x4, animatable | Transformation matrix applied to the visual. |

## Notes

- Namespace: `Microsoft.UI.Composition` (Windows App SDK / WinUI 3). Derived: `ContainerVisual` (and, transitively, `SpriteVisual`, `ShapeVisual`, `LayerVisual`). The UWP equivalent is `Windows.UI.Composition.Visual`.
- Visual objects are thread-agile and not bound to the UI thread.
- Animatable properties are driven via `CompositionObject.StartAnimation(propertyName, animation)` — see [ExpressionAnimation](./expression-animation.md) and [ImplicitAnimationCollection](./implicit-animation-collection.md).
- Distinct from Apple `UIView`/`NSView`, Android View, and three.js `Object3D` — this is the WinRT composition-tree node, not a framework UI element.

## Related

- [Compositor](./compositor.md)
- [ContainerVisual](./container-visual.md)
- [SpriteVisual](./sprite-visual.md)
- [ExpressionAnimation](./expression-animation.md)
- [ImplicitAnimationCollection](./implicit-animation-collection.md)
