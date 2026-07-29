# Natural motion animation (SpringVector3NaturalMotionAnimation, ScalarNaturalMotionAnimation, ...)

A physics-based `CompositionAnimation` that uses forces (rather than fixed key frames) to move a property toward a final value — currently spring motion, via `Spring{Scalar,Vector2,Vector3}NaturalMotionAnimation`. `NaturalMotionAnimation` is abstract; concrete per-type classes (`ScalarNaturalMotionAnimation`, `Vector2NaturalMotionAnimation`, `Vector3NaturalMotionAnimation`) hold `InitialValue`/`FinalValue`/`InitialVelocity`, and the sealed `Spring*` types add the spring parameters.

## Signature / Usage

```csharp
SpringVector3NaturalMotionAnimation spring = compositor.CreateSpringVector3Animation();
spring.DampingRatio = 0.8f;
spring.Period = TimeSpan.FromSeconds(0.05);
spring.FinalValue = new Vector3(0, 0, 0);

visual.StartAnimation("Offset", spring);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| DampingRatio | float | Amount of damping applied to the spring; `< 1` overshoots and oscillates before settling, `1` critically damps (no overshoot), `> 1` is over-damped. |
| Period | TimeSpan | Time for the spring to complete one oscillation — controls perceived "stiffness"/speed. |
| InitialValue | T (Scalar/Vector2/Vector3), inherited | Value the animation starts from; if unset, the property's current value is used. |
| FinalValue | T, inherited | Value the spring settles toward. |
| InitialVelocity | T, inherited | Starting velocity, e.g. to carry over momentum from a just-ended gesture/animation. |
| DelayTime / DelayBehavior | TimeSpan / AnimationDelayBehavior, inherited | Delay before the animation starts after `StartAnimation` is called. |
| StopBehavior | AnimationStopBehavior, inherited | Value left on the property when `StopAnimation` is called. |

## Notes

- Namespace: `Microsoft.UI.Composition` (Windows App SDK / WinUI 3). `NaturalMotionAnimation` inherits from `CompositionAnimation`; `Spring*NaturalMotionAnimation` inherits from the matching `*NaturalMotionAnimation` (e.g. `SpringVector3NaturalMotionAnimation` : `Vector3NaturalMotionAnimation`). The UWP equivalent is `Windows.UI.Composition.NaturalMotionAnimation`.
- Created via `Compositor.CreateSpringScalarAnimation()` / `CreateSpringVector2Animation()` / `CreateSpringVector3Animation()` — see [Compositor](./compositor.md).
- Unlike [KeyFrameAnimation](./key-frame-animation.md), there is no fixed `Duration`; the animation runs until the spring settles (or is stopped), making it well suited to following a released touch/mouse gesture (e.g. combined with `InteractionTracker` output or an `InitialVelocity` carried over from inertia).
- Distinct from Jetpack Compose `Animatable`/`spring()` `AnimationSpec` and Apple `UISpringTimingParameters`/SwiftUI `.spring()` — this is the WinRT composition natural-motion animation type.

## Related

- [Compositor](./compositor.md)
- [KeyFrameAnimation](./key-frame-animation.md)
- [InteractionTracker](./interaction-tracker.md)
