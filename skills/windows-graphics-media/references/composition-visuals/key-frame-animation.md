# KeyFrameAnimation (ScalarKeyFrameAnimation, Vector2/Vector3KeyFrameAnimation, ColorKeyFrameAnimation)

A time-based `CompositionAnimation` with one or more key frames — markers that specify a property's value at a given normalized time (0–1) along the animation's `Duration`, interpolated between frames (optionally with easing). `KeyFrameAnimation` is abstract; use the typed subclass matching the target property (`ScalarKeyFrameAnimation`, `Vector2KeyFrameAnimation`, `Vector3KeyFrameAnimation`, `Vector4KeyFrameAnimation`, `ColorKeyFrameAnimation`, `QuaternionKeyFrameAnimation`, `BooleanKeyFrameAnimation`, `PathKeyFrameAnimation`).

## Signature / Usage

```csharp
ScalarKeyFrameAnimation opacityAnimation = compositor.CreateScalarKeyFrameAnimation();
opacityAnimation.InsertKeyFrame(0.0f, 0.0f);
opacityAnimation.InsertKeyFrame(1.0f, 1.0f, compositor.CreateLinearEasingFunction());
opacityAnimation.Duration = TimeSpan.FromSeconds(0.5);

visual.StartAnimation("Opacity", opacityAnimation);
```

```csharp
// Vector3KeyFrameAnimation: bounce an offset back and forth, looping forever
Vector3KeyFrameAnimation offsetAnimation = compositor.CreateVector3KeyFrameAnimation();
offsetAnimation.InsertKeyFrame(0.0f, new Vector3(15, 15, -10));
offsetAnimation.InsertKeyFrame(0.5f, new Vector3(30, 30, -20));
offsetAnimation.InsertKeyFrame(1.0f, new Vector3(15, 15, -10));
offsetAnimation.Duration = TimeSpan.FromSeconds(2);
offsetAnimation.IterationBehavior = AnimationIterationBehavior.Forever;

shadow.StartAnimation("Offset", offsetAnimation);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| InsertKeyFrame(Single, T) / InsertKeyFrame(Single, T, CompositionEasingFunction) | method, on the typed subclass | Adds a key frame at a normalized progress key (0–1) with the target value, optionally with an easing function (e.g. `compositor.CreateLinearEasingFunction()`, `CreateCubicBezierEasingFunction(...)`) applied from the previous key frame. |
| InsertExpressionKeyFrame(Single, String) / InsertExpressionKeyFrame(Single, String, CompositionEasingFunction) | method, inherited | Adds a key frame whose value is an expression string (e.g. `"this.FinalValue"`) instead of a literal. |
| Duration | TimeSpan | Total duration of one iteration of the animation. |
| DelayTime / DelayBehavior | TimeSpan / AnimationDelayBehavior | Delay before the animation starts after `StartAnimation` is called, and whether the delay counts from `StartAnimation` or from when the animation actually begins. |
| IterationBehavior | AnimationIterationBehavior | `Count` (repeat `IterationCount` times) or `Forever`. |
| IterationCount | int | Number of repetitions when `IterationBehavior` is `Count`. |
| Direction | AnimationDirection | `Normal`, `Reverse`, `Alternate`, or `AlternateReverse` — how playback direction behaves across iterations. |
| StopBehavior | AnimationStopBehavior | Value left on the property when `StopAnimation` is called (e.g. hold current value vs. snap to the final key frame). |
| KeyFrameCount | int (read-only) | Number of key frames inserted so far. |

## Notes

- Namespace: `Microsoft.UI.Composition` (Windows App SDK / WinUI 3). `KeyFrameAnimation` inherits from `CompositionAnimation`; the UWP equivalent is `Windows.UI.Composition.KeyFrameAnimation`. Typed subclasses (`ScalarKeyFrameAnimation`, etc.) are `sealed` and inherit directly from `KeyFrameAnimation`.
- Created via the matching `Compositor.Create*KeyFrameAnimation()` factory method (e.g. `CreateScalarKeyFrameAnimation`, `CreateVector3KeyFrameAnimation`, `CreateColorKeyFrameAnimation`) — see [Compositor](./compositor.md).
- Does not stop automatically when the app is suspended; explicit `StopAnimation`/pause is needed around app-lifecycle suspend events.
- For continuously-recalculated (non-fixed) values driven by an equation or another object's properties, use [ExpressionAnimation](./expression-animation.md) instead. For physics-based spring/bounce motion instead of fixed key frames, use a natural motion animation.
- Distinct from `android-compose-graphics-animation` Compose `Animatable`/`tween`, Apple `CAKeyframeAnimation` (Core Animation), and CSS `@keyframes` in `ark-ui`/`chakra-ui` — this is the WinRT composition key-frame animation type.

## Related

- [Compositor](./compositor.md)
- [ExpressionAnimation](./expression-animation.md)
- [Natural motion animation](./natural-motion-animation.md)
- [ImplicitAnimationCollection](./implicit-animation-collection.md)
