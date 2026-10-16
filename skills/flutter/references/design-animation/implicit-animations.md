---
source: https://docs.flutter.dev/ui/animations/implicit-animations
---

# Implicit animations

Implicit animations (implicitly animated widgets) are an assortment of widgets that manage animations for you, named after the `ImplicitlyAnimatedWidget` class they implement.

## Signature / Usage

You pass a `duration` and an optional `curve` to an implicitly animated widget such as `AnimatedOpacity`. When you update the widget with a new target value, such as after calling `setState()`, it automatically animates to that value:

```dart
import 'package:material_ui/material_ui.dart';

class FadeBoxDemo extends StatefulWidget {
  const FadeBoxDemo({super.key});

  @override
  State<FadeBoxDemo> createState() => _FadeBoxDemoState();
}

class _FadeBoxDemoState extends State<FadeBoxDemo> {
  bool _visible = true;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        AnimatedOpacity(
          opacity: _visible ? 1 : 0,
          duration: const Duration(milliseconds: 500),
          curve: Curves.easeInOut,
          child: const FlutterLogo(size: 100),
        ),
        const SizedBox(height: 16),
        ElevatedButton(
          onPressed: () => setState(() => _visible = !_visible),
          child: const Text('Toggle opacity'),
        ),
      ],
    );
  }
}
```

## Notes

- With implicit animations you don't need to manage an `AnimationController` or `Ticker`.
- When no built-in implicitly animated widget covers the property you want to animate, build a custom implicit animation with `TweenAnimationBuilder` (a `Tween` plus a `builder` callback). All implicit animations extend `ImplicitlyAnimatedWidget`.
- Documentation named by the page: the Animations in Flutter codelab (implicit and explicit animations), the `AnimatedContainer` cookbook recipe, the "Fade a widget in and out" cookbook recipe (`AnimatedOpacity`), and the `TweenAnimationBuilder` and `ImplicitlyAnimatedWidget` API pages.
- Widget of the Week videos on the page cover `AnimatedOpacity`, `AnimatedPadding`, `AnimatedPositioned`, and `AnimatedSwitcher`; Flutter in Focus videos cover implicit animation basics and custom implicit animations with `TweenAnimationBuilder`.
- The code sample imports `package:material_ui/material_ui.dart`, the opt-in standalone Material package available in Flutter 3.47.
- Flutter animation framework (Dart). Distinct from Motion (JS), Jetpack Compose animation APIs (`animate*AsState`), Rive, and Theatre.js; use the motion, android-compose-graphics-animation, rive, or theatrejs skills for those.

## Related

- [animations](./animations.md)
- [explicit-animations](./explicit-animations.md)
- [animations-overview](./animations-overview.md)
