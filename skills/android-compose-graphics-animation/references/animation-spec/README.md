# animation-spec

| Name | Description | Path |
|------|-------------|------|
| AnimationSpec | Type hierarchy for animation specs: `AnimationSpec`, `FiniteAnimationSpec`, `DurationBasedAnimationSpec`, and `AnimationConstants`. | [animationspec.md](./animationspec.md) |
| tween | Duration-based animation that interpolates between start and end value using an `Easing` curve. | [tween.md](./tween.md) |
| spring | Physics-based animation driven by damping ratio and stiffness; handles interruptions smoothly. | [spring.md](./spring.md) |
| keyframes | Animation that specifies values at specific timestamps (`keyframes`) or along a spline curve (`keyframesWithSpline`). | [keyframes.md](./keyframes.md) |
| repeatable | Repeats a duration-based animation a finite (`repeatable`) or infinite (`infiniteRepeatable`) number of times. | [repeatable.md](./repeatable.md) |
| snap | Immediately snaps to the end value without animating, with an optional delay. | [snap.md](./snap.md) |
| Easing | `Easing` fun interface and built-in easing curves (`FastOutSlowInEasing`, `LinearEasing`, `CubicBezierEasing`, etc). | [easing.md](./easing.md) |
| RepeatMode | Enum controlling whether a repeated animation restarts or reverses each iteration. | [repeatmode.md](./repeatmode.md) |
| StartOffset | Delays or fast-forwards the start of a repeatable animation. | [startoffset.md](./startoffset.md) |
| TwoWayConverter | Converts a custom type to/from `AnimationVector` so it can be animated; built-in `VectorConverter`s for common types. | [vectorconverter.md](./vectorconverter.md) |
