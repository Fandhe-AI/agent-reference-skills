---
source: https://docs.flutter.dev/ui/animations/tutorial
---

# Animations tutorial

A tutorial showing how to build explicit animations in Flutter. The examples build on each other and introduce different aspects of the animation library. You learn how to use the fundamental animation classes to animate a widget and when to use `AnimatedWidget` vs. `AnimatedBuilder`.

## Signature / Usage

Rendering animations with `addListener()` and `setState()` (the non-animated starting point is a `LogoApp` that draws a `FlutterLogo` at a fixed 300x300):

```dart
class _LogoAppState extends State<LogoApp> with SingleTickerProviderStateMixin {
  late Animation<double> animation;
  late AnimationController controller;

  @override
  void initState() {
    super.initState();
    controller = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );
    animation = Tween<double>(begin: 0, end: 300).animate(controller)
      ..addListener(() {
        setState(() {
          // The state that has changed here is the animation object's value.
        });
      });
    controller.forward();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 10),
        height: animation.value,
        width: animation.value,
        child: const FlutterLogo(),
      ),
    );
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }
}
```

Simplifying with `AnimatedWidget`:

```dart
class AnimatedLogo extends AnimatedWidget {
  const AnimatedLogo({super.key, required Animation<double> animation})
    : super(listenable: animation);

  @override
  Widget build(BuildContext context) {
    final animation = listenable as Animation<double>;
    return Center(
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 10),
        height: animation.value,
        width: animation.value,
        child: const FlutterLogo(),
      ),
    );
  }
}
```

`LogoApp` keeps the controller and `Tween` and builds `AnimatedLogo(animation: animation)`.

Monitoring progress with `addStatusListener()`:

```dart
animation = Tween<double>(begin: 0, end: 300).animate(controller)
  ..addStatusListener((status) {
    if (status == AnimationStatus.completed) {
      controller.reverse();
    } else if (status == AnimationStatus.dismissed) {
      controller.forward();
    }
  })
  ..addStatusListener((status) => debugPrint('$status'));
controller.forward();
```

Refactoring with `AnimatedBuilder`:

```dart
class LogoWidget extends StatelessWidget {
  const LogoWidget({super.key});

  // Leave out the height and width so it fills the animating parent.
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 10),
      child: const FlutterLogo(),
    );
  }
}

class GrowTransition extends StatelessWidget {
  const GrowTransition({
    required this.child,
    required this.animation,
    super.key,
  });

  final Widget child;
  final Animation<double> animation;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: AnimatedBuilder(
        animation: animation,
        builder: (context, child) {
          return SizedBox(
            height: animation.value,
            width: animation.value,
            child: child,
          );
        },
        child: child,
      ),
    );
  }
}
```

`LogoApp.build` then returns `GrowTransition(animation: animation, child: const LogoWidget())`.

Simultaneous animations (several tweens on one controller, `Tween.evaluate()` in `AnimatedLogo`):

```dart
class AnimatedLogo extends AnimatedWidget {
  const AnimatedLogo({super.key, required Animation<double> animation})
    : super(listenable: animation);

  // Make the tweens static because they don't change.
  static final Tween<double> _opacityTween = Tween(begin: 0.1, end: 1);
  static final Tween<double> _sizeTween = Tween(begin: 0, end: 300);

  @override
  Widget build(BuildContext context) {
    final animation = listenable as Animation<double>;
    return Center(
      child: Opacity(
        opacity: _opacityTween.evaluate(animation),
        child: Container(
          margin: const EdgeInsets.symmetric(vertical: 10),
          height: _sizeTween.evaluate(animation),
          width: _sizeTween.evaluate(animation),
          child: const FlutterLogo(),
        ),
      ),
    );
  }
}
```

with `animation = CurvedAnimation(parent: controller, curve: Curves.easeIn)` plus the same status listener in `initState`.

## Notes

- The Flutter SDK also provides built-in explicit animations such as `FadeTransition`, `SizeTransition`, and `SlideTransition`; they take an `Animation` (often driven by an `AnimationController`) and require less code than the custom explicit animations in this tutorial.
- An `Animation` generates a sequence of numbers over time but renders nothing; store it as a member of your widget and use its value to decide how to draw. Every time the `Animation` generates a number, the callback registered with `addListener()` calls `setState()`. `AnimationController` requires the `vsync` parameter. Dispose of the controller when the `State` is discarded to prevent memory leaks.
- Dart cascade notation: `animation = Tween<double>(begin: 0, end: 300).animate(controller)..addListener(...)` is equivalent to calling `animation.addListener(...)` as a separate statement.
- `AnimatedWidget` manages its own `State` object and animation listener, so a subclass does not. Examples of `AnimatedWidget` in the Flutter API: `AnimatedBuilder`, `AnimatedModalBarrier`, `DecoratedBoxTransition`, `FadeTransition`, `PositionedTransition`, `RelativePositionedTransition`, `RotationTransition`, `ScaleTransition`, `SizeTransition`, `SlideTransition`. For a reusable animation use an `AnimatedWidget`; to separate the transition from the widget use an `AnimatedBuilder`.
- `AnimatedBuilder` does not render the widget itself nor manage the `Animation`; its general-purpose counterpart is `ListenableBuilder`. In the `GrowTransition` code the `child` appears to be specified twice: the outer reference is passed to `AnimatedBuilder`, which passes it to the builder closure, so animation ticks do not rebuild the static `child` subtree.
- Looping: `addStatusListener()` is useful for reacting to status changes, but to loop continuously use `controller.repeat(reverse: true)`. Calling `stop()` doesn't change the animation's status, so it doesn't notify status listeners.
- The simultaneous-animations example is for illustration only: for opacity animations in production prefer `FadeTransition` to avoid rebuilding widgets every frame; for size changes consider `SizeTransition` when animating how much of a child is revealed.
- Next steps named by the page: implicit animations and `TweenAnimationBuilder`; specialized `Tween` subclasses (`ColorTween`, `RectTween`, `IntTween`); staggered animations; hero animations; physics simulations and `fling()`; `ReverseAnimation` and the Animations overview.
- The tutorial's runnable sources import `package:material_ui/material_ui.dart`, the opt-in standalone Material package available in Flutter 3.47.
- Flutter animation framework (Dart). Distinct from Motion (JS), Jetpack Compose animation APIs, Rive, and Theatre.js; use the motion, android-compose-graphics-animation, rive, or theatrejs skills for those.

## Related

- [animations](./animations.md)
- [implicit-animations](./implicit-animations.md)
- [staggered-animations](./staggered-animations.md)
- [hero-animations](./hero-animations.md)
- [AnimationController](./AnimationController.md)
