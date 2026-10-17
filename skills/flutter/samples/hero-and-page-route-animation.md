---
source: https://docs.flutter.dev/cookbook/navigation/hero-animations
---

# Hero and Page Route Animation

Animate a widget across screens with `Hero`, and customize a route transition with `PageRouteBuilder`, `Tween` and `SlideTransition`.

```dart
import 'package:flutter/material.dart';

void main() => runApp(const HeroApp());

class HeroApp extends StatelessWidget {
  const HeroApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(title: 'Transition Demo', home: MainScreen());
  }
}

class MainScreen extends StatelessWidget {
  const MainScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Main Screen')),
      body: GestureDetector(
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute<void>(
              builder: (context) {
                return const DetailScreen();
              },
            ),
          );
        },
        child: Hero(
          tag: 'imageHero',
          child: Image.network('https://picsum.photos/250?image=9'),
        ),
      ),
    );
  }
}

class DetailScreen extends StatelessWidget {
  const DetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GestureDetector(
        onTap: () {
          Navigator.pop(context);
        },
        child: Center(
          child: Hero(
            tag: 'imageHero',
            child: Image.network('https://picsum.photos/250?image=9'),
          ),
        ),
      ),
    );
  }
}
```

Custom page transition (from https://docs.flutter.dev/cookbook/animation/page-route-animation):

```dart
Route<void> _createRoute() {
  return PageRouteBuilder(
    pageBuilder: (context, animation, secondaryAnimation) => const Page2(),
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      const begin = Offset(0.0, 1.0);
      const end = Offset.zero;
      const curve = Curves.ease;

      final tween = Tween(
        begin: begin,
        end: end,
      ).chain(CurveTween(curve: curve));

      return SlideTransition(position: animation.drive(tween), child: child);
    },
  );
}

// Push it with:
Navigator.of(context).push(_createRoute());
```

## Notes

- Both `Hero` widgets must use the same `tag`.
- In `PageRouteBuilder`, `pageBuilder` is called only the first time the route is built; `child` passed to `transitionsBuilder` is its result and stays the same throughout the transition.
- `CurvedAnimation(parent: animation, curve: curve)` with `tween.animate(...)` is an alternative to `chain(CurveTween(...))`.
- Flutter animation (Dart) is distinct from Motion (JS), Compose animation APIs, Rive, and Theatre.js.
- Migration (Flutter 3.44): see the decouple-page-transition-builders breaking change for `ThemeData` page transitions.
