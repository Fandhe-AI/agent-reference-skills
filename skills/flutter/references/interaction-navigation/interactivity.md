---
source: https://docs.flutter.dev/ui/interactivity
---

# Add interactivity to your Flutter app

How to implement a stateful widget that responds to taps: a `StatefulWidget` subclass plus a `State` subclass that calls `setState()`, and the three ways to manage state (self-managed, parent-managed, mixed).

## Signature / Usage

A stateful widget is implemented by two classes: a subclass of `StatefulWidget` that overrides `createState()`, and a subclass of `State` that holds mutable state and `build()`.

```dart
class FavoriteWidget extends StatefulWidget {
  const FavoriteWidget({super.key});

  @override
  State<FavoriteWidget> createState() => _FavoriteWidgetState();
}
```

The `State` class stores the mutable fields and the tap callback calls `setState()`:

```dart
class _FavoriteWidgetState extends State<FavoriteWidget> {
  bool _isFavorited = true;
  int _favoriteCount = 41;
```

```dart
void _toggleFavorite() {
  setState(() {
    if (_isFavorited) {
      _favoriteCount -= 1;
      _isFavorited = false;
    } else {
      _favoriteCount += 1;
      _isFavorited = true;
    }
  });
}
```

Plug the stateful widget into the tree:

```dart diff
  child: Row(
    children: [
      // ...
-     Icon(
-       Icons.star,
-       color: Colors.red[500],
-     ),
-     const Text('41'),
+     const FavoriteWidget(),
    ],
  ),
```

## Stateful and stateless widgets

- A _stateless_ widget never changes. `Icon`, `IconButton`, and `Text` are examples; they subclass `StatelessWidget`.
- A _stateful_ widget is dynamic. `Checkbox`, `Radio`, `Slider`, `InkWell`, `Form`, and `TextField` are examples; they subclass `StatefulWidget`.
- A widget's state is stored in a `State` object, separating the widget's state from its appearance. When the state changes, the state object calls `setState()`, telling the framework to redraw the widget.

## Managing state

Common ways to manage state:

- The widget manages its own state
- The parent manages the widget's state
- A mix-and-match approach

Principles from the page:

- If the state in question is user data (for example the checked or unchecked mode of a checkbox, or the position of a slider), the state is best managed by the parent widget.
- If the state in question is aesthetic (for example an animation), the state is best managed by the widget itself.
- If in doubt, start by managing state in the parent widget.

### The widget manages its own state (TapboxA)

```dart
import 'package:material_ui/material_ui.dart';

// TapboxA manages its own state.

//------------------------- TapboxA ----------------------------------

class TapboxA extends StatefulWidget {
  const TapboxA({super.key});

  @override
  State<TapboxA> createState() => _TapboxAState();
}

class _TapboxAState extends State<TapboxA> {
  bool _active = false;

  void _handleTap() {
    setState(() {
      _active = !_active;
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _handleTap,
      child: Container(
        width: 200,
        height: 200,
        decoration: BoxDecoration(
          color: _active ? Colors.lightGreen[700] : Colors.grey[600],
        ),
        child: Center(
          child: Text(
            _active ? 'Active' : 'Inactive',
            style: const TextStyle(fontSize: 32, color: Colors.white),
          ),
        ),
      ),
    );
  }
}

//------------------------- MyApp ----------------------------------

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: Scaffold(
        appBar: AppBar(title: const Text('Flutter Demo')),
        body: const Center(child: TapboxA()),
      ),
    );
  }
}
```

### The parent widget manages the widget's state (TapboxB)

TapboxB exports its state to its parent through a callback. Because TapboxB doesn't manage any state, it subclasses `StatelessWidget`.

```dart
import 'package:material_ui/material_ui.dart';

// ParentWidget manages the state for TapboxB.

//------------------------ ParentWidget --------------------------------

class ParentWidget extends StatefulWidget {
  const ParentWidget({super.key});

  @override
  State<ParentWidget> createState() => _ParentWidgetState();
}

class _ParentWidgetState extends State<ParentWidget> {
  bool _active = false;

  void _handleTapboxChanged(bool newValue) {
    setState(() {
      _active = newValue;
    });
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      child: TapboxB(active: _active, onChanged: _handleTapboxChanged),
    );
  }
}

//------------------------- TapboxB ----------------------------------

class TapboxB extends StatelessWidget {
  const TapboxB({super.key, this.active = false, required this.onChanged});

  final bool active;
  final ValueChanged<bool> onChanged;

  void _handleTap() {
    onChanged(!active);
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _handleTap,
      child: Container(
        width: 200,
        height: 200,
        decoration: BoxDecoration(
          color: active ? Colors.lightGreen[700] : Colors.grey[600],
        ),
        child: Center(
          child: Text(
            active ? 'Active' : 'Inactive',
            style: const TextStyle(fontSize: 32, color: Colors.white),
          ),
        ),
      ),
    );
  }
}
```

### A mix-and-match approach (TapboxC)

`TapboxC` exports its `_active` state to its parent but manages its `_highlight` state internally. The `GestureDetector` listens to all tap events: tap down adds a dark green border, tap up removes it.

```dart
class _TapboxCState extends State<TapboxC> {
  bool _highlight = false;

  void _handleTapDown(TapDownDetails details) {
    setState(() {
      _highlight = true;
    });
  }

  void _handleTapUp(TapUpDetails details) {
    setState(() {
      _highlight = false;
    });
  }

  void _handleTapCancel() {
    setState(() {
      _highlight = false;
    });
  }

  void _handleTap() {
    widget.onChanged(!widget.active);
  }

  @override
  Widget build(BuildContext context) {
    // This example adds a green border on tap down.
    // On tap up, the square changes to the opposite state.
    return GestureDetector(
      onTapDown: _handleTapDown, // Handle the tap events in the order that
      onTapUp: _handleTapUp, // they occur: down, up, tap, cancel
      onTap: _handleTap,
      onTapCancel: _handleTapCancel,
      child: Container(
        width: 200,
        height: 200,
        decoration: BoxDecoration(
          color: widget.active ? Colors.lightGreen[700] : Colors.grey[600],
          border: _highlight
              ? Border.all(color: Colors.teal[700]!, width: 10)
              : null,
        ),
        child: Center(
          child: Text(
            widget.active ? 'Active' : 'Inactive',
            style: const TextStyle(fontSize: 32, color: Colors.white),
          ),
        ),
      ),
    );
  }
}
```

## Other interactive widgets

Standard widgets: `Form`, `FormField`.

Material Components: `Checkbox`, `DropdownButton`, `TextButton`, `FloatingActionButton`, `IconButton`, `Radio`, `ElevatedButton`, `Slider`, `Switch`, `TextField`.

## Notes

- Members or classes that start with an underscore (`_`) are private.
- Placing the `Text` in a `SizedBox` and setting its width prevents a discernible "jump" when the text changes between the values of 40 and 41, because those values have different widths.
- Most of the Material widgets implement the Material Design guidelines. `GestureDetector` can be used to build interactivity into any custom widget. Flutter also provides a set of iOS-style widgets called `Cupertino`.
- Snippets import `package:material_ui/material_ui.dart` exactly as on the source page. The standalone `material_ui` / `cupertino_ui` packages are an opt-in in Flutter 3.47; see the release category for the opt-in note.
- Flutter widget (Dart) state model with `StatefulWidget` / `State` / `setState()`; distinct from Jetpack Compose `remember` / `mutableStateOf`, SwiftUI `@State`, and React `useState` in the other skills.

## Related

- [Taps, drags, and other gestures](./gestures.md)
- [Understanding Flutter's keyboard focus system](./focus.md)
- [Using Actions and Shortcuts](./actions-and-shortcuts.md)
