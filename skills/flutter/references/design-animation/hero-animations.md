---
source: https://docs.flutter.dev/ui/animations/hero-animations
---

# Hero animations

The hero is the widget that flies between screens. The `Hero` widget implements the style of animation commonly known as shared element transitions (or shared element animations). The guide covers standard hero animations and radial hero animations (a hero whose shape changes from circular to rectangular in flight).

## Signature / Usage

Source and destination heroes share a tag. The `PhotoHero` widget from the standard example:

```dart
import 'package:flutter/scheduler.dart' show timeDilation;
import 'package:material_ui/material_ui.dart';

class PhotoHero extends StatelessWidget {
  const PhotoHero({
    super.key,
    required this.photo,
    this.onTap,
    required this.width,
  });

  final String photo;
  final VoidCallback? onTap;
  final double width;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: width,
      child: Hero(
        tag: photo,
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: onTap,
            child: Image.asset(photo, fit: BoxFit.contain),
          ),
        ),
      ),
    );
  }
}
```

Pushing the destination route triggers the animation:

```dart
class HeroAnimation extends StatelessWidget {
  const HeroAnimation({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Basic Hero Animation')),
      body: Center(
        child: PhotoHero(
          photo: 'images/flippers.png',
          width: 300,
          onTap: () {
            Navigator.of(context).push(
              MaterialPageRoute<void>(
                builder: (context) {
                  return Scaffold(
                    appBar: AppBar(title: const Text('Flippers Page')),
                    body: Container(
                      // Set background to blue to emphasize that it's a new route.
                      color: Colors.lightBlueAccent,
                      padding: const EdgeInsets.all(16),
                      alignment: Alignment.topLeft,
                      child: PhotoHero(
                        photo: 'images/flippers.png',
                        width: 100,
                        onTap: () {
                          Navigator.of(context).pop();
                        },
                      ),
                    ),
                  );
                },
              ),
            );
          },
        ),
      ),
    );
  }
}

void main() {
  timeDilation = 5; // 1 means normal animation speed.
  runApp(const MaterialApp(home: HeroAnimation()));
}
```

Radial hero animation — the clip tree and the center-arc rect tween:

```dart
class RadialExpansion extends StatelessWidget {
  const RadialExpansion({super.key, required this.maxRadius, this.child})
    : clipRectSize = 2 * (maxRadius / math.sqrt2);

  final double maxRadius;
  final double clipRectSize;
  final Widget? child;

  @override
  Widget build(BuildContext context) {
    return ClipOval(
      child: Center(
        child: SizedBox(
          width: clipRectSize,
          height: clipRectSize,
          child: ClipRect(
            child: child, // Photo
          ),
        ),
      ),
    );
  }
}
```

```dart
static RectTween _createRectTween(Rect? begin, Rect? end) {
  return MaterialRectCenterArcTween(begin: begin, end: end);
}
```

## Notes

- Structure: define a source `Hero` and a destination `Hero` with the same tag (typically an object representing the underlying data; the heroes should have virtually identical widget trees), create a route containing the destination hero, and trigger the animation by pushing it on the `Navigator` stack. Navigator push and pop trigger a hero animation for each pair of heroes with matching tags in the source and destination routes. As the hero animates, the destination route (minus the hero) fades into view.
- Behind the scenes, at `t=0.0` Flutter calculates the destination hero's path offscreen (curved motion per the Material motion spec), places the destination hero in the overlay at the source hero's location and size (so it appears above all routes), and moves the source hero offscreen. The hero's rectangular bounds animate with a `Tween<Rect>` given by the `createRectTween` property of `Hero`, by default `MaterialRectArcTween` (opposing corners along a curved path). When the flight completes the hero moves from the overlay to the destination route and the source hero is restored. Popping performs the same process in reverse.
- Standard animation notes: the starting route is implicitly pushed by `MaterialApp` when `HeroAnimation` is its `home`; `InkWell` makes tapping easy for both heroes; a transparent `Material` lets the image "pop out" during flight; `SizedBox` sets the hero's size at start and end; `BoxFit.contain` keeps the aspect ratio; the destination image location is set with a layout widget (`Container`). Specify a route with `MaterialPageRoute`, `CupertinoPageRoute`, or a custom `PageRouteBuilder`. Use `timeDilation` to slow the transition while debugging.
- Radial animation: the circle clip (and image) scales from `minRadius` to `maxRadius` while the square clip keeps a constant size, and the intersection yields a rectangle at the end (the image is no longer clipped). The `Photo` class's `Material` has a slightly opaque color so transparent parts of the image render with color. `Photo` does not include the `Hero`; the hero wraps `RadialExpansion`. The default flight path interpolates tweens using hero corners, affecting aspect ratio during the radial transformation, so `MaterialRectCenterArcTween` interpolates with the center point of each hero. Build the destination route with `PageRouteBuilder`. The flag `debugPaintSizeEnabled` helps visualize the intersection during development.
- To run the examples: create a new Flutter app, add the `material_ui` package with `flutter pub add material_ui`, replace `lib/main.dart` with the example, download the images (`beachball.png`, `binoculars.png`, `chair.png`, `flippers.png`) into an `images` directory, and declare them as assets:

  ```yaml
  flutter:
    uses-material-design: true
    assets:
      - images/
  ```

  Then run `flutter run`.
- The samples import `package:material_ui/material_ui.dart`, the opt-in standalone Material package available in Flutter 3.47.
- Flutter `Hero` (shared element transition between `Navigator` routes, Dart). Distinct from Motion layout/shared-layout animation (JS), Jetpack Compose shared element transitions, Rive, and Theatre.js; use the motion, android-compose-graphics-animation, rive, or theatrejs skills for those.

## Related

- [animations](./animations.md)
- [explicit-animations](./explicit-animations.md)
- [staggered-animations](./staggered-animations.md)
- [MaterialApp](./MaterialApp.md)
