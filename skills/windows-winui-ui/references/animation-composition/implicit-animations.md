# Implicit Animations (ElementCompositionPreview, Visual, Compositor, ExpressionAnimation)

Composition-layer (Visual Layer) animations that run automatically in response to a property change on a `Visual`, without explicit `Begin()` calls — used for layout reposition animations, drop shadows, frosted glass, and other effects layered onto XAML content.

## Signature / Usage

```csharp
private void InitializeRepositionAnimation(UIElement repositionTarget)
{
    Visual targetVisual = ElementCompositionPreview.GetElementVisual(repositionTarget);
    Compositor compositor = targetVisual.Compositor;

    // Animation that runs whenever Offset changes.
    var repositionAnimation = compositor.CreateVector3KeyFrameAnimation();
    repositionAnimation.Duration = TimeSpan.FromSeconds(0.66);
    repositionAnimation.Target = "Offset";
    repositionAnimation.InsertExpressionKeyFrame(1.0f, "this.FinalValue");

    var repositionAnimations = compositor.CreateImplicitAnimationCollection();
    repositionAnimations["Offset"] = repositionAnimation;

    targetVisual.ImplicitAnimations = repositionAnimations;
}
```

```csharp
// ExpressionAnimation example: keep a SpriteVisual's Size in sync with a host Visual's Size.
var bindSizeAnimation = compositor.CreateExpressionAnimation("hostVisual.Size");
bindSizeAnimation.SetReferenceParameter("hostVisual", hostVisual);
shadowVisual.StartAnimation("Size", bindSizeAnimation);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ElementCompositionPreview.GetElementVisual(UIElement)` | static method | Returns the "handout" `Visual` that renders the given `UIElement`; read/animate `Offset`, `Opacity`, `Size` via this Visual. |
| `ElementCompositionPreview.SetElementChildVisual` / `GetElementChildVisual` | static methods | Attach ("handin") a custom `Visual` as the last child of an element's visual tree, drawing on top of XAML content. |
| `Visual.ImplicitAnimations` | `ImplicitAnimationCollection` | Maps a property name (e.g. `"Offset"`) to the `KeyFrameAnimation` that plays automatically whenever that property changes. |
| `Compositor.CreateVector3KeyFrameAnimation()` / `CreateExpressionAnimation(string)` | factory methods | Create the animation objects associated with a `Compositor`. |
| `KeyFrameAnimation.InsertExpressionKeyFrame(float, string)` | method | Adds a keyframe whose value is an expression (e.g. `"this.FinalValue"` — the value XAML layout is driving the property toward). |
| `ExpressionAnimation` | class | A `CompositionAnimation` driven by a math/reference expression string, re-evaluated continuously (e.g. binding one Visual's `Size` to another's). |
| `SpringAnimation` | class (`Microsoft.UI.Composition`) | A physically-based animation (damping ratio / period) usable in place of a keyframe animation for spring-like motion. |

## Notes

- Package: `Microsoft.UI.Xaml.Hosting` (`ElementCompositionPreview`) and `Microsoft.UI.Composition` (`Compositor`, `Visual`, `ExpressionAnimation`, `ImplicitAnimationCollection`, `SpringAnimation`) — WinUI 3 / Windows App SDK Visual Layer, distinct from the XAML `Storyboard`/`Timeline` animation system.
- Only modify/animate `Offset` on the handout `Visual` when the element's top-left corner coincides with its parent's in layout (e.g. wrap the element in a `Canvas` with no margin) — otherwise XAML layout and the animation fight each other.
- Changes made to the handout `Visual`'s properties (e.g. `Opacity`) do **not** reflect back into the corresponding `UIElement` property, and vice versa only flows XAML → Visual.
- Implicit animations fire automatically whenever the mapped property's value changes (including from XAML layout), unlike `Storyboard` animations which require an explicit trigger/`Begin()`.
- Composition effects (drop shadow, frosted glass/blur) follow the same `SetElementChildVisual` + `SpriteVisual` + `ExpressionAnimation`-bound `Size` pattern shown above.

## Related

- [Storyboard](./storyboard.md)
- [AnimatedVisualPlayer](./animated-visual-player.md)
