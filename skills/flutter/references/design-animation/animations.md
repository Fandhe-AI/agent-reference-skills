---
source: https://docs.flutter.dev/ui/animations
---

# Introduction to animations

Flutter's animation support makes it easy to implement a variety of animation types. Many widgets, especially Material widgets, come with the standard motion effects defined in their design spec, but these effects can be customized.

## Signature / Usage

```dart
controller = AnimationController(
  duration: const Duration(seconds: 2),
  vsync: this,
);
animation = CurvedAnimation(parent: controller, curve: Curves.easeIn);
tween = Tween<double>(begin: -200, end: 0);
```

`Tween.animate` with a controller and a curve:

```dart
final AnimationController controller = AnimationController(
  duration: const Duration(milliseconds: 500),
  vsync: this,
);
final Animation<double> curve = CurvedAnimation(
  parent: controller,
  curve: Curves.easeOut,
);
final Animation<int> alpha = IntTween(begin: 0, end: 255).animate(curve);
```

## Notes

- Choosing an approach (decision tree in the source): pre-packaged implicit animations are the easiest; custom implicit animations use `TweenAnimationBuilder`; built-in explicit animations are classes where you control the animation rather than the framework; for custom explicit animations build from scratch with `AnimatedBuilder` and `AnimatedWidget`.
- Animation types: tween-based (beginning and ending points, a timeline, and a curve; the framework calculates the transition; see `Tween`, `CurveTween`, `TweenSequence`) and physics-based (motion modeled on real-world behavior; see `AnimationController.animateWith` and `SpringSimulation`).
- Common patterns: animated list or grid (`AnimatedList`), shared element transition (`Hero` between routes; see hero-animations), staggered animation (smaller motions that are sequential or overlapping).
- Concepts: the animation system is based on typed `Animation` objects. `Animation<double>` is an abstract class exposing the current value (`.value`) and status (dismissed, forward, reverse, completed); it does not handle rendering or `build()`. `Animation<Color>` and `Animation<Size>` are also possible.
- `CurvedAnimation` defines non-linear progress. It wraps the object it modifies (you don't subclass `AnimationController` to implement a curve). Custom curves override `transformInternal()`:

  ```dart
  import 'dart:math';

  class ShakeCurve extends Curve {
    @override
    double transformInternal(double t) => t + sin(t * pi * 4) * 0.2;
  }
  ```

- `AnimationController` generates a new value whenever the hardware is ready for a new frame, linearly from 0.0 to 1.0 over the duration by default. It is an `Animation<double>` with extra methods (`.forward()`, etc.). The `vsync` argument prevents offscreen animations from consuming unnecessary resources; use the stateful object as `vsync` by adding `SingleTickerProviderStateMixin`. Controller values stay within `lowerBound` / `upperBound` even when driven by `fling()`, but a `CurvedAnimation` can exceed 0.0 to 1.0 (for example `Curves.elasticIn`).
- A `Tween` maps an input range to an output range. It inherits from `Animatable<T>`, not `Animation<T>`; e.g. `ColorTween(begin: Colors.transparent, end: Colors.black54)`. It stores mutable `begin` / `end` and provides `evaluate(Animation<double>)`; `animate()` returns an `Animation`, not an `Animatable`.
- Notifications: `addListener()` (called whenever the value changes; commonly calls `setState()`) and `addStatusListener()` (called when an animation begins, ends, moves forward, or reverses, per `AnimationStatus`).
- Other resources named by the page: the `animations` packages on pub.dev (container transforms, shared axis, fade through, fade), animation samples in the sample app catalog, cookbook animation recipes, the Animations in Flutter codelab, the Animations tutorial, and Zero to One with Flutter parts 1 and 2.
- Flutter animation framework (Dart). Distinct from Motion (JS), Jetpack Compose animation APIs, Rive, and Theatre.js; use the motion, android-compose-graphics-animation, rive, or theatrejs skills for those.

## Related

- [animations-overview](./animations-overview.md)
- [implicit-animations](./implicit-animations.md)
- [explicit-animations](./explicit-animations.md)
- [hero-animations](./hero-animations.md)
- [staggered-animations](./staggered-animations.md)
- [AnimationController](./AnimationController.md)
