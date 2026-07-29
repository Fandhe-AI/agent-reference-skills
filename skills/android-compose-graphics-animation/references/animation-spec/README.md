# animation-spec

| Name | Description | Path |
|------|-------------|------|
| AnimationSpec | Base type hierarchy that all animation spec factory functions (`tween`, `spring`, `keyframes`, `repeatable`, `snap`, ...) implement. Most Compose animation APIs (`animate*AsState`, `Animatable.animateTo`, `updateTransition`) accept an `AnimationSpec<T>` to customize duration, easing, and animation type. | [animationspec.md](./animationspec.md) |
| DecayAnimationSpec | `AnimationSpec` for fling/momentum animations: given only an initial value and initial velocity, the value decelerates naturally to a stop instead of animating toward an authored target. Built with `splineBasedDecay` (matches native Android scroll fling physics) or `exponentialDecay` (velocity decays exponentially, tunable friction). Consumed by `Animatable.animateDecay` and the standalone `DecayAnimation` class. | [decayanimationspec.md](./decayanimationspec.md) |
| Easing | `fun interface` that maps an animation's elapsed fraction (0.0 to 1.0) to an adjusted fraction, used by `tween` and by individual `keyframes` segments to control acceleration/deceleration. | [easing.md](./easing.md) |
| keyframes | Duration-based `AnimationSpec` that snapshots specific values at specific timestamps, interpolating between them. `keyframesWithSpline` is a variant for 2D-like values (e.g. `Offset`) that produces a smooth curve through the keyframe values using a monotone cubic Hermite spline instead of linear/eased segments. | [keyframes.md](./keyframes.md) |
| repeatable | Repeats a `DurationBasedAnimationSpec` (e.g. `tween`, `keyframes`) a finite (`repeatable`) or infinite (`infiniteRepeatable`) number of times. | [repeatable.md](./repeatable.md) |
| RepeatMode | Enum controlling how each iteration of a `repeatable` / `infiniteRepeatable` animation behaves after the first. | [repeatmode.md](./repeatmode.md) |
| snap | `AnimationSpec` that immediately switches to the end value without interpolating, optionally after a delay. | [snap.md](./snap.md) |
| spring | Physics-based `AnimationSpec` driven by damping ratio and stiffness. Produces smooth, interruptible animations by maintaining velocity continuity when the target value changes mid-animation. | [spring.md](./spring.md) |
| StartOffset | Controls the start timing of a `repeatable` / `infiniteRepeatable` animation's first iteration, either delaying it or fast-forwarding into it. | [startoffset.md](./startoffset.md) |
| tween | Duration-based `AnimationSpec` that interpolates between the start and end value over a fixed duration, applying an `Easing` curve to the fraction. | [tween.md](./tween.md) |
| TwoWayConverter | Converts a custom data type `T` to and from an `AnimationVector` (`AnimationVector1D`/`2D`/`3D`/`4D`), which is the type Compose's animation engine actually interpolates. Required to animate any type that doesn't already have a built-in `VectorConverter`. | [vectorconverter.md](./vectorconverter.md) |
