---
source: https://docs.flutter.dev/ui/animations/staggered-animations
---

# Staggered animations

A staggered animation consists of sequential or overlapping animations: visual changes happen as a series of operations rather than all at once. One `AnimationController` controls all of the `Animation` objects; each `Animation` specifies its motion during an `Interval`, and each animated property has its own `Tween`.

## Signature / Usage

Each tween's animation is driven by a `CurvedAnimation` whose `curve` is an `Interval`:

```dart
width = Tween<double>(begin: 50, end: 150).animate(
  CurvedAnimation(
    parent: controller,
    curve: const Interval(0.125, 0.250, curve: Curves.ease),
  ),
),
```

Tween values need not be doubles:

```dart
borderRadius =
    BorderRadiusTween(
      begin: BorderRadius.circular(4),
      end: BorderRadius.circular(75),
    ).animate(
      CurvedAnimation(
        parent: controller,
        curve: const Interval(0.375, 0.500, curve: Curves.ease),
      ),
    ),
```

Stateless widget that defines the animations and builds the animating part with `AnimatedBuilder`:

```dart
import 'dart:async';

import 'package:flutter/scheduler.dart' show timeDilation;
import 'package:material_ui/material_ui.dart';

class StaggerAnimation extends StatelessWidget {
  StaggerAnimation({super.key, required this.controller})
    : // Each animation defined here transforms its value during the subset
      // of the controller's duration defined by the animation's interval.
      // For example, the opacity animation transforms its value during
      // the first 10% of the controller's duration.
      opacity = Tween<double>(begin: 0, end: 1).animate(
        CurvedAnimation(
          parent: controller,
          curve: const Interval(0, 0.100, curve: Curves.ease),
        ),
      ),

      width = Tween<double>(begin: 50, end: 150).animate(
        CurvedAnimation(
          parent: controller,
          curve: const Interval(0.125, 0.250, curve: Curves.ease),
        ),
      ),

      height = Tween<double>(begin: 50, end: 150).animate(
        CurvedAnimation(
          parent: controller,
          curve: const Interval(0.250, 0.375, curve: Curves.ease),
        ),
      ),

      padding =
          EdgeInsetsTween(
            begin: const EdgeInsets.only(bottom: 16),
            end: const EdgeInsets.only(bottom: 75),
          ).animate(
            CurvedAnimation(
              parent: controller,
              curve: const Interval(0.250, 0.375, curve: Curves.ease),
            ),
          ),

      borderRadius =
          BorderRadiusTween(
            begin: BorderRadius.circular(4),
            end: BorderRadius.circular(75),
          ).animate(
            CurvedAnimation(
              parent: controller,
              curve: const Interval(0.375, 0.500, curve: Curves.ease),
            ),
          ),

      color = ColorTween(begin: Colors.indigo[100], end: Colors.orange[400])
          .animate(
            CurvedAnimation(
              parent: controller,
              curve: const Interval(0.500, 0.750, curve: Curves.ease),
            ),
          );

  final Animation<double> controller;
  final Animation<double> opacity;
  final Animation<double> width;
  final Animation<double> height;
  final Animation<EdgeInsets> padding;
  final Animation<BorderRadius?> borderRadius;
  final Animation<Color?> color;

  // This function is called each time the controller "ticks" a new frame.
  // When it runs, all of the animation's values will have been
  // updated to reflect the controller's current value.
  Widget _buildAnimation(BuildContext context, Widget? child) {
    return Container(
      padding: padding.value,
      alignment: Alignment.bottomCenter,
      child: Opacity(
        opacity: opacity.value,
        child: Container(
          width: width.value,
          height: height.value,
          decoration: BoxDecoration(
            color: color.value,
            border: Border.all(color: Colors.indigo[300]!, width: 3),
            borderRadius: borderRadius.value,
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(builder: _buildAnimation, animation: controller);
  }
}
```

Stateful widget that creates the controller and plays the animation forward then in reverse:

```dart
class StaggerDemo extends StatefulWidget {
  const StaggerDemo({super.key});

  @override
  State<StaggerDemo> createState() => _StaggerDemoState();
}

class _StaggerDemoState extends State<StaggerDemo>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();

    _controller = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Future<void> _playAnimation() async {
    if (_controller.isAnimating) return;

    try {
      await _controller.forward().orCancel;
      await _controller.reverse().orCancel;
    } on TickerCanceled {
      // The animation got canceled, probably because it was disposed of.
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Staggered Animation')),
      body: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: _playAnimation,
        child: Center(
          child: Container(
            width: 300,
            height: 300,
            decoration: BoxDecoration(
              color: Colors.black.withValues(alpha: 0.1),
              border: Border.all(color: Colors.black.withValues(alpha: 0.5)),
            ),
            child: StaggerAnimation(controller: _controller.view),
          ),
        ),
      ),
    );
  }
}

void main() {
  timeDilation = 10; // 1 is normal animation speed.
  runApp(const MaterialApp(home: StaggerDemo()));
}
```

## Notes

- All animations are driven by the same `AnimationController`. Regardless of real-time duration, the controller's values must be between 0.0 and 1.0, inclusive. Each animation has an `Interval` between 0.0 and 1.0, inclusive; specify it with the `curve` property of `CurvedAnimation`. For each property animated in an interval create a `Tween`, whose `animate()` takes a parent animation and produces an `Animation` for that property.
- In the example the opacity changes during the first 10% of the timeline, a tiny gap follows before the width changes, nothing animates during the last 25%, increasing the padding makes the widget appear to rise, and a border radius of `75.0` turns the `150.0` x `150.0` square into a circle. Padding and height changes share the exact same interval, but they don't have to.
- The stateless widget (`StaggerAnimation`) specifies the tweens, defines the `Animation` objects, and builds the animating widget tree; the stateful widget (`StaggerDemo`) creates the controller (2000 ms), plays the animation, and builds the non-animating tree. Taps during playback are ignored so the sequence can finish.
- The example uses an `Opacity` widget inside `AnimatedBuilder` to keep all animated properties in one builder; when animating opacity alone prefer `FadeTransition` to avoid rebuilding the child on each frame.
- `EdgeInsetsTween` extends `Tween<EdgeInsets>` (non-nullable), so `animate()` yields `Animation<EdgeInsets>`; `BorderRadiusTween` and `ColorTween` are nullable, hence `Animation<BorderRadius?>` / `Animation<Color?>`.
- The sample imports `package:material_ui/material_ui.dart`, the opt-in standalone Material package available in Flutter 3.47.
- Flutter animation framework (Dart). Distinct from Motion (JS) keyframes/sequences, Jetpack Compose animation APIs, Rive, and Theatre.js sequences; use the motion, android-compose-graphics-animation, rive, or theatrejs skills for those.

## Related

- [animations](./animations.md)
- [explicit-animations](./explicit-animations.md)
- [AnimationController](./AnimationController.md)
- [hero-animations](./hero-animations.md)
