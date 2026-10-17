---
source: https://docs.flutter.dev/learn/pathway/tutorial/layout
---

# Layout with Scaffold, Column and Row

Structure a screen with `Scaffold` and `AppBar`, then build a grid by nesting `Row` widgets in a `Column` using collection-for.

```dart
class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Align(
            alignment: Alignment.centerLeft,
            child: Text('Birdle'),
          ),
        ),
        body: Center(child: GamePage()),
      ),
    );
  }
}

class GamePage extends StatelessWidget {
  GamePage({super.key});

  // This manages game logic, and is out of scope for this lesson.
  final Game _game = Game();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        spacing: 5.0,
        children: [
          for (final guess in _game.guesses)
            Row(
              spacing: 5.0,
              children: [
                for (final letter in guess) Tile(letter.char, letter.type),
              ],
            ),
        ],
      ),
    );
  }
}
```

## Notes

- `Game` and `Tile` come from the tutorial project and are not defined in the source excerpt.
- `spacing` on `Column` / `Row` puts the given gap between children on the main axis.
- A widget with a non-constant field such as `final Game _game = Game();` cannot have a `const` constructor; remove `const` from the parents (`Center`, `MaterialApp`) that wrap it.
- Flutter `Row` / `Column` / `Scaffold` (Dart) are distinct from Jetpack Compose, SwiftUI, and Ark UI / Chakra UI components of the same name.
