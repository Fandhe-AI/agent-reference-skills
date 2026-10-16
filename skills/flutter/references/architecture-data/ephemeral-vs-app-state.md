---
source: https://docs.flutter.dev/data-and-backend/state-mgmt/ephemeral-vs-app
---

# Differentiate between ephemeral state and app state

Ephemeral (UI/local) state lives in a single widget and is managed with `StatefulWidget` and `setState()`; app (shared) state is shared across the app or kept between sessions.

## Signature / Usage

Ephemeral state: the selected item of a bottom navigation bar held in `_index`:

```dart
class MyHomepage extends StatefulWidget {
  const MyHomepage({super.key});

  @override
  State<MyHomepage> createState() => _MyHomepageState();
}

class _MyHomepageState extends State<MyHomepage> {
  int _index = 0;

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      currentIndex: _index,
      onTap: (newIndex) {
        setState(() {
          _index = newIndex;
        });
      },
      // ... items ...
    );
  }
}
```

## Notes

- A useful definition of state: "whatever data you need in order to rebuild your UI at any moment in time". Some state (e.g. textures) is handled by the framework.
- Ephemeral state examples: current page in a `PageView`, current progress of a complex animation, current selected tab in a `BottomNavigationBar`. Other parts of the widget tree seldom need it, no need to serialize it, and it doesn't change in complex ways. No need for state management techniques (ScopedModel, Redux, etc.); a `StatefulWidget` is enough.
- App state examples: user preferences, login info, notifications in a social networking app, the shopping cart in an e-commerce app, read/unread state of articles in a news app. It is state that is not ephemeral, shared across many parts of the app, and kept between user sessions.
- There is no clear-cut rule. `State` and `setState()` can manage all state (the Flutter team does this in many simple samples, including the `flutter create` starter app). A selected tab might be app state if it must change from outside the class or persist between sessions; you may need to refactor ephemeral state into app state as an app grows.
- Flowchart in the page: start with "Data"; "Who needs it?" — "Most widgets" or "Some widgets" lead to App state, "Single widget" leads to Ephemeral state.
- Quoted rule of thumb (Dan Abramov): "Do whatever is less awkward".

## Related

- [Simple app state management](./simple-app-state.md)
- [Start thinking declaratively](./state-declarative.md)
- [Approaches to state management](./state-management-options.md)
