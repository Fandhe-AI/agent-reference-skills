---
source: https://docs.flutter.dev/learn/pathway/tutorial/stateful-widget
---

# Stateful Widget with setState

Convert a StatelessWidget to a StatefulWidget and trigger UI updates with `setState`, managing controller lifecycles in `State`.

```dart
class GuessInput extends StatefulWidget {
  const GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  @override
  State<GuessInput> createState() => _GuessInputState();
}

class _GuessInputState extends State<GuessInput> {
  final TextEditingController _textEditingController = TextEditingController();
  final FocusNode _focusNode = FocusNode();

  @override
  void dispose() {
    _textEditingController.dispose();
    _focusNode.dispose();
    super.dispose();
  }

  void _onSubmit() {
    widget.onSubmitGuess(_textEditingController.text.trim());
    _textEditingController.clear();
    _focusNode.requestFocus();
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              maxLength: 5,
              focusNode: _focusNode,
              autofocus: true,
              decoration: const InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(35)),
                ),
              ),
              controller: _textEditingController,
              onSubmitted: (input) {
                _onSubmit();
              },
            ),
          ),
        ),
        IconButton(
          padding: EdgeInsets.zero,
          icon: const Icon(Icons.arrow_circle_up),
          onPressed: _onSubmit,
        ),
      ],
    );
  }
}
```

The parent calls `setState` around the mutation:

```dart
GuessInput(
  onSubmitGuess: (String guess) {
    setState(() {
      _game.guess(guess);
    });
  },
),
```

## Notes

- Excerpt of the Birdle tutorial; `Game` is tutorial-specific game logic that is not shown in the source.
- Mutating state without `setState` changes the data but does not rebuild the UI.
- Controllers and focus nodes belong in `State` and must be disposed in `dispose()`; otherwise a rebuild recreates them and the field loses focus.
- Flutter `StatefulWidget` / `State` (Dart) is distinct from Jetpack Compose `remember` / SwiftUI `@State`.
