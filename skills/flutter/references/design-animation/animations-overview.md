---
source: https://docs.flutter.dev/ui/animations/overview
---

# Animations API overview

An overview of animation concepts. The animation system in Flutter is based on typed `Animation` objects. Widgets can incorporate these animations in their build functions directly by reading their current value and listening to their state changes, or use them as the basis of more elaborate animations passed along to other widgets.

## Signature / Usage

The source page has no code block. The API surface it describes:

```text
Animation<T>.addListener(listener)          // called whenever the value changes
Animation<T>.addStatusListener(listener)    // called when AnimationStatus changes
AnimationController: forward(), stop(), fling(), repeat(), animateTo(), animateWith()
Tween<T>.evaluate(animation)                // concrete value for the animation's current value
Tween<T>.animate(parent)                    // new Animation<T> driven by the parent
Animatable.chain(parent)                    // compose animatables
```

## Notes

- `Animation` is the primary building block: a value of a specific type that can change over the animation's lifetime. Whenever the value changes, all listeners added with `addListener` are notified; typically a `State` calls `setState` in the listener. Flutter provides `AnimatedWidget` (subclass and implement `build`; for stateless animated widgets) and `AnimatedBuilder` (pass a `builder`; for larger build functions). Use `ListenableBuilder` for other `Listenable` objects, and an `ImplicitlyAnimatedWidget` subclass (e.g. `AnimatedOpacity`, `TweenAnimationBuilder`) for implicit animations that manage their own controller.
- `AnimationStatus`: animations typically start `dismissed` (beginning of the range), run `forward` or `reverse`, and reach `completed` at the end of the range.
- `AnimationController` is itself an animation and lets you `forward` or `stop` and `fling` (using a physical simulation such as a spring). `ReverseAnimation` mirrors an animation (1.0 to 0.0); `CurvedAnimation` adjusts the value by a `Curve` (e.g. `Curves`).
- Tweens: a `Tween<T>` interpolates between `begin` and `end` (`ColorTween`, `RectTween` are type-specific; override `lerp` for your own). To get a concrete value, either `evaluate` the tween at the animation's current value (for widgets already rebuilding on changes) or `animate` it (returns a new `Animation`).
- Architecture: the `SchedulerBinding` exposes frame callbacks (`scheduleFrameCallback()`), all given the same official time stamp so animations appear synchronized. A `Ticker` hooks into that mechanism to call back every tick, reports elapsed time relative to the first tick after it started (so tickers started at different times between ticks stay in lockstep), and can be started and stopped (start returns a `Future` that resolves when stopped). `Simulation` maps elapsed time to a double and has a notion of completion (e.g. `BouncingScrollSimulation`, `ClampingScrollSimulation`). `Animatable` maps a double to a typed value; `Tween<T>` is an `Animatable`; `chain()` composes. `Curve` maps doubles nominally in 0.0-1.0 to 0.0-1.0 and is stateless and immutable.
- Animation subclasses: `kAlwaysCompleteAnimation`, `kAlwaysDismissedAnimation`, `AlwaysStoppedAnimation` never change. `CurvedAnimation` takes a parent, a forward curve, and an optional reverse curve (keeps using the same curve if the parent reverses before an endpoint to avoid a jump). `ReverseAnimation`, `ProxyAnimation` (forwards a mutable parent), `TrainHoppingAnimation` (switches between two parents when their values cross).
- Controller methods: `forward()` / `reverse()` interpolate linearly from lower to upper bound (or vice versa) over the duration; `repeat()` repeats indefinitely unless `count` is given or it is stopped; `animateTo()` interpolates to a target with a linear curve unless `curve` is given (omitting `duration` scales the controller's duration by the distance fraction); `fling()` uses a spring simulation with initial velocity and optional `SpringDescription`; `animateWith()` drives the controller with a given simulation. These return a `TickerFuture` that completes on success; cancelation leaves it incomplete, and its `orCancel` property throws `TickerCanceled`.
- Flutter animation framework (Dart). Distinct from Motion (JS), Jetpack Compose animation APIs, Rive, and Theatre.js; use the motion, android-compose-graphics-animation, rive, or theatrejs skills for those.

## Related

- [animations](./animations.md)
- [AnimationController](./AnimationController.md)
- [explicit-animations](./explicit-animations.md)
