# 3-D Perspective Effects (PlaneProjection)

`PlaneProjection` applies a fixed-perspective 3D rotation/translation to any `UIElement` by setting the element's `Projection` property — a lighter-weight alternative to the full `UIElement.Transform3D` API for single-object 3D effects layered on top of the 2D transform system.

## Signature / Usage

```xaml
<StackPanel Margin="35" Background="Gray">
    <StackPanel.Projection>
        <PlaneProjection RotationX="-35" RotationY="-35" RotationZ="15"/>
    </StackPanel.Projection>
    <TextBlock Margin="10">Type Something Below</TextBlock>
    <TextBox Margin="10"/>
</StackPanel>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| RotationX / RotationY / RotationZ | `double` | Rotation in degrees around each axis of the center of rotation; can exceed 360 or be negative. |
| CenterOfRotationX / CenterOfRotationY | `double` | Pivot point as a 0–1 fraction of the object's bounds (default 0.5, the object's center). |
| CenterOfRotationZ | `double` | Moves the pivot in front of (positive) or behind (negative) the object's plane (default 0). |
| LocalOffsetX / LocalOffsetY / LocalOffsetZ | `double` | Translates the object along its own (rotated) x/y/z axis. |
| GlobalOffsetX / GlobalOffsetY / GlobalOffsetZ | `double` | Translates the object along the screen-aligned x/y/z axis, independent of its rotation. |

## Notes

- Package: `Microsoft.UI.Xaml.Media` (WinUI 3). Set via `UIElement.Projection`; applicable to any `UIElement`, including containers of controls.
- For scenarios `PlaneProjection` can't express — arbitrary model/perspective matrices, or 3D effects shared across multiple elements via a common "camera" — use `UIElement.Transform3D` with `PerspectiveTransform3D` + `CompositeTransform3D`, or `Matrix3DProjection`/`Matrix3D` for a raw matrix.
- Distinct from the 2D `RenderTransform` system (see Transforms) — `Projection` and `Transform3D` are separate `UIElement` properties that compose with, not replace, 2D render transforms.
- Not related to 3D scene/camera APIs in other skills (e.g. threejs `PerspectiveCamera`) — `PlaneProjection` is a fixed single-element perspective effect, not a scene-graph camera.

## Related

- [Transforms (RenderTransform)](./transforms.md)
