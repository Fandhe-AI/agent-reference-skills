# Compositor

Manages the session between an application and the system compositor process. Acts as a factory for visuals, brushes, animations, effects, and lights in the `Microsoft.UI.Composition` namespace, and manages the lifetime of objects it creates.

## Signature / Usage

```csharp
// RootGrid is a XAML Grid element.
Compositor compositor = ElementCompositionPreview.GetElementVisual(RootGrid).Compositor;

ContainerVisual root = compositor.CreateContainerVisual();
SpriteVisual child = compositor.CreateSpriteVisual();
child.Brush = compositor.CreateColorBrush(Color.FromArgb(0xFF, 0x00, 0xCC, 0x00));
root.Children.InsertAtTop(child);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| CreateContainerVisual() | method | Creates a [ContainerVisual](./container-visual.md). |
| CreateSpriteVisual() | method | Creates a [SpriteVisual](./sprite-visual.md). |
| CreateColorBrush() / CreateColorBrush(Color) | method | Creates a `CompositionColorBrush`, optionally with an initial color. |
| CreateSurfaceBrush() / CreateSurfaceBrush(ICompositionSurface) | method | Creates a [CompositionSurfaceBrush](./composition-surface-brush.md). |
| CreateScalarKeyFrameAnimation() | method | Creates a [ScalarKeyFrameAnimation](./key-frame-animation.md) for interpolator-driven animation of a scalar property. |
| CreateExpressionAnimation() / CreateExpressionAnimation(String) | method | Creates an [ExpressionAnimation](./expression-animation.md). |
| CreateSpringVector3Animation() | method | Creates a [SpringVector3NaturalMotionAnimation](./natural-motion-animation.md) for physics-based spring motion on a `Vector3` property. |
| CreateImplicitAnimationCollection() | method | Creates an [ImplicitAnimationCollection](./implicit-animation-collection.md). |
| CreateEffectFactory(IGraphicsEffect) | method | Creates a `CompositionEffectFactory` from a Win2D/`Windows.UI.Composition.Effects` graph, used to build a [CompositionEffectBrush](./composition-effect-brush.md). |
| DispatcherQueue | property | The dispatcher queue for this compositor. |
| GlobalPlaybackRate | property | Rate at which animation plays for all KeyFrame animations created by this compositor. |

## Notes

- Namespace: `Microsoft.UI.Composition` (Windows App SDK / WinUI 3). The UWP equivalent is `Windows.UI.Composition.Compositor` — the two are structurally similar but are distinct types; do not mix them in the same project.
- Must be created on a thread that has a `CoreDispatcher` (or `DispatcherQueue`).
- Implicitly synchronizes changes to associated visuals so they apply transactionally (a "commit").
- Distinct from `android-compose-graphics-animation` Compose `Canvas`/`Modifier.graphicsLayer`, Apple `CALayer`/Core Animation, and three.js `Scene` — this is the WinRT retained-mode compositor for Win32/WinUI/UWP apps.

## Related

- [Visual](./visual.md)
- [ContainerVisual](./container-visual.md)
- [SpriteVisual](./sprite-visual.md)
- [ExpressionAnimation](./expression-animation.md)
- [ImplicitAnimationCollection](./implicit-animation-collection.md)
- [CompositionEffectBrush](./composition-effect-brush.md)
- [CompositionSurfaceBrush](./composition-surface-brush.md)
- [KeyFrameAnimation](./key-frame-animation.md)
- [Natural motion animation](./natural-motion-animation.md)
