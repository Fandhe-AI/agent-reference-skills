# ImplicitAnimationCollection

A dictionary of animations (keyed by property name) that are triggered automatically when the associated `CompositionObject` property changes, decoupling animation-start logic from core app logic.

## Signature / Usage

```csharp
ImplicitAnimationCollection implicitAnimations = compositor.CreateImplicitAnimationCollection();

// Trigger an animation whenever "Offset" changes.
implicitAnimations["Offset"] = CreateOffsetAnimation(compositor);

// ImplicitAnimations can be shared across multiple visuals.
heroVisual.ImplicitAnimations = implicitAnimations;
listVisual.ImplicitAnimations = implicitAnimations;

listVisual.Offset = new Vector3(20f, 20f, 20f); // triggers the implicit animation

Vector3KeyFrameAnimation CreateOffsetAnimation(Compositor compositor)
{
  var animation = compositor.CreateVector3KeyFrameAnimation();
  animation.InsertExpressionKeyFrame(0f, "this.StartingValue");
  animation.InsertExpressionKeyFrame(1f, "this.FinalValue");
  animation.Target = "Offset";
  animation.Duration = TimeSpan.FromSeconds(0.25);
  return animation;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Insert(String, ICompositionAnimationBase) / indexer `[String]` | method/indexer | Associates an animation (or `CompositionAnimationGroup`) with the trigger property name. |
| Lookup(String) | method | Retrieves the animation associated with a property. |
| HasKey(String) | method | Checks whether the collection has a trigger for the given property. |
| Remove(String) / Clear() | method | Removes a specific trigger, or all triggers. |
| Size | property | Number of entries in the collection. |

## Notes

- Namespace: `Microsoft.UI.Composition` (Windows App SDK / WinUI 3). Assigned to a `CompositionObject.ImplicitAnimations` property (inherited by [Visual](./visual.md) and subclasses). The UWP equivalent is `Windows.UI.Composition.ImplicitAnimationCollection`.
- Supported trigger properties on `Visual`: `AnchorPoint`, `CenterPoint`, `Offset`, `Opacity`, `Orientation`, `RotationAngle`, `RotationAngleInDegrees`, `RotationAxis`, `Scale`, `Size`.
- The animation's `Target` property must be set or `StartAnimation` throws.
- `this.FinalValue` inside the triggered animation resolves to the newly assigned API value of the property that fired the trigger (and to the current value of any other property for animations on that other property).
- No animation fires if the newly assigned value equals the previous value (no delta).

## Related

- [Visual](./visual.md)
- [ExpressionAnimation](./expression-animation.md)
- [Compositor](./compositor.md)
