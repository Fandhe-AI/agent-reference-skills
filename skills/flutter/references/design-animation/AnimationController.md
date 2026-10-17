---
source: https://api.flutter.dev/flutter/animation/AnimationController-class.html
---

# AnimationController

A controller for an animation (`package:flutter/animation.dart`). It plays an animation forward or in reverse, stops it, sets it to a specific value, defines its bounds, and can fling it with a physics simulation. By default it linearly produces values from 0.0 to 1.0 during a given duration.

## Signature / Usage

```dart
AnimationController({
  double? value,
  Duration? duration,
  Duration? reverseDuration,
  String? debugLabel,
  double lowerBound = 0.0,
  double upperBound = 1.0,
  AnimationBehavior animationBehavior = AnimationBehavior.normal,
  required TickerProvider vsync,
})
```

Typical use inside a `State` (from the API docs):

```dart
class Foo extends StatefulWidget {
  const Foo({ super.key, required this.duration });

  final Duration duration;

  @override
  State<Foo> createState() => _FooState();
}

class _FooState extends State<Foo> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this, // the SingleTickerProviderStateMixin
      duration: widget.duration,
    );
  }

  @override
  void didUpdateWidget(Foo oldWidget) {
    super.didUpdateWidget(oldWidget);
    _controller.duration = widget.duration;
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(); // ...
  }
}
```

Unbounded variant:

```dart
AnimationController.unbounded({
  double value = 0.0,
  Duration? duration,
  Duration? reverseDuration,
  String? debugLabel,
  required TickerProvider vsync,
  AnimationBehavior animationBehavior = AnimationBehavior.preserve,
})
```

## Options / Props

Constructor named parameters (default constructor):

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| value | double? | — | Initial value |
| duration | Duration? | — | The length of time this animation should last |
| reverseDuration | Duration? | — | The length of time this animation should last when going in reverse |
| debugLabel | String? | — | Label used in the `toString` output |
| lowerBound | double | 0.0 | The value at which this animation is deemed to be dismissed |
| upperBound | double | 1.0 | The value at which this animation is deemed to be completed |
| animationBehavior | AnimationBehavior | AnimationBehavior.normal | Behavior when `AccessibilityFeatures.disableAnimations` is true |
| vsync | TickerProvider | required | Provides the `Ticker` that steps the animation |

Selected members:

| Name | Signature | Description |
| --- | --- | --- |
| forward | `TickerFuture forward({double? from})` | Starts running this animation forwards (towards the end) |
| reverse | `TickerFuture reverse({double? from})` | Starts running this animation in reverse (towards the beginning) |
| toggle | `TickerFuture toggle({double? from})` | Toggles the direction based on `isForwardOrCompleted` |
| repeat | `TickerFuture repeat({double? min, double? max, bool reverse = false, Duration? period, int? count})` | Runs forward and restarts when it completes |
| animateTo | `TickerFuture animateTo(double target, {Duration? duration, Curve curve = Curves.linear})` | Drives from the current value to `target`, "forward" |
| animateBack | `TickerFuture animateBack(double target, {Duration? duration, Curve curve = Curves.linear})` | Drives from the current value to `target`, "backward" |
| animateWith | `TickerFuture animateWith(Simulation simulation)` | Drives the animation according to the given simulation |
| fling | `TickerFuture fling({double velocity = 1.0, SpringDescription? springDescription, AnimationBehavior? animationBehavior})` | Drives the animation with a spring within the bounds |
| stop | `void stop({bool canceled = true})` | Stops running this animation |
| reset | `void reset()` | Sets the value to `lowerBound`, stopping the animation |
| resync | `void resync(TickerProvider vsync)` | Recreates the `Ticker` with the new `TickerProvider` |
| dispose | `void dispose()` | Releases resources; the object is unusable afterwards |
| value | `double` (getter/setter) | The current value of the animation |
| status | `AnimationStatus` (no setter) | The current status of this animation |
| isAnimating | `bool` (no setter) | Whether currently animating forward or reverse |
| view | `Animation<double>` (no setter) | Read-only `Animation<double>` view so users cannot mutate the controller |
| velocity | `double` (no setter) | Rate of change of `value` per second |
| duration / reverseDuration | `Duration?` (getter/setter) | Forward and reverse durations |

## Notes

- Ticker providers: an `AnimationController` needs a `TickerProvider` passed as `vsync`. Typically the relevant `State` serves as the provider after applying a mixin such as `SingleTickerProviderStateMixin`.
- If the controller is associated with a `State` through a `TickerProvider`, updates are silenced while that `State`'s subtree is disabled by `TickerMode`; time still elapses and `forward` / `stop` still change the value, but no new values are generated on their own.
- Life cycle: dispose the controller when no longer needed. With a `StatefulWidget`, create it in `State.initState` and dispose it in `State.dispose`.
- Methods that start animations return a `TickerFuture` that completes when the animation completes successfully and never throws; if the animation is canceled the future never completes. `TickerFuture.orCancel` completes with an error (`TickerCanceled`) when aborted:

  ```dart
  Future<void> fadeOutAndUpdateState() async {
    try {
      await fadeAnimationController.forward().orCancel;
      await sizeAnimationController.forward().orCancel;
      setState(() {
        dismissed = true;
      });
    } on TickerCanceled {
      // the animation got canceled, probably because we were disposed
    }
  }
  ```

- Flutter animation framework (Dart, `package:flutter`). Distinct from Motion (JS), Jetpack Compose animation APIs (`Animatable` / `animate*AsState`), Rive, and Theatre.js; use the motion, android-compose-graphics-animation, rive, or theatrejs skills for those.

## Related

- [animations](./animations.md)
- [animations-overview](./animations-overview.md)
- [explicit-animations](./explicit-animations.md)
- [implicit-animations](./implicit-animations.md)
- [staggered-animations](./staggered-animations.md)
