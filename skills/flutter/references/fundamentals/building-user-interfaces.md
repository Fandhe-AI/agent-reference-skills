---
source: https://docs.flutter.dev/ui
---

# Building user interfaces with Flutter

Flutter widgets are built using a modern framework that takes inspiration from React. You build your UI out of widgets; a widget describes what its view should look like given its current configuration and state. When state changes, the widget rebuilds its description, and the framework diffs it against the previous description to determine the minimal changes needed in the underlying render tree.

Flutter structures its UI layer into two tiers: the style-neutral core `widgets` library (provided by the Flutter SDK) and the design system packages `material_ui` and `cupertino_ui`, available on pub.dev.

## Signature / Usage

The minimal Flutter app calls `runApp()` with a widget:

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    const Center(
      child: Text(
        'Hello, world!',
        textDirection: TextDirection.ltr,
        style: TextStyle(color: Colors.blue),
      ),
    ),
  );
}
```

`runApp()` takes the given `Widget` and makes it the root of the widget tree. Here the tree has two widgets, `Center` and its child `Text`. The framework forces the root widget to cover the screen, so the text ends up centered. The text direction must be specified here; when `MaterialApp` is used it is taken care of for you.

### The `widgets` package

`package:flutter/widgets.dart` provides the foundational, style-neutral building blocks: layout primitives (`Row`, `Column`, `Stack`), interaction models (`GestureDetector`), animation controllers, and base presentation widgets (`CustomPaint`, `Image`, `RichText`).

Use `widgets` when:

- **Building a custom design system:** your app uses a bespoke visual language that does not strictly follow Material Design or Apple Human Interface Guidelines.
- **Creating design-agnostic packages:** importing `package:flutter/widgets.dart` lets a pub.dev package be used in both Material and Cupertino apps without unnecessary dependencies.
- **Embedded and non-standard devices:** automotive, kiosks, or embedded displays where platform conventions do not apply and minimal bundle size is critical.

### The `material_ui` package

`package:material_ui/material_ui.dart` implements Google's Material 3 design system (visual styling, dynamic color, elevation, typography, ripples) on top of the base widgets.

Use `material_ui` for Android or cross-platform apps, rapid prototyping (`Scaffold`, `AppBar`, `NavigationBar`, `ElevatedButton`, `FloatingActionButton`, `TextField`, `Dialog`), and Material theming (`ColorScheme.fromSeed`, light/dark mode, Android dynamic color).

### The `cupertino_ui` package

`package:cupertino_ui/cupertino_ui.dart` implements Apple's Human Interface Guidelines (iOS-specific visual styles, translucent blurs, haptic touches, navigation gestures).

Use `cupertino_ui` when targeting iOS and macOS native aesthetics (`CupertinoNavigationBar`, `CupertinoButton`, `CupertinoTabBar`, `CupertinoActionSheet`) or for platform-adaptive apps that render `material_ui` components on Android and `cupertino_ui` components on iOS.

| Feature | `widgets` | `material_ui` | `cupertino_ui` |
| --- | --- | --- | --- |
| Source | Flutter SDK (`flutter`) | pub.dev | pub.dev |
| Design system | None (style-neutral) | Material 3 | Apple HIG (iOS) 3 |
| Application root | `WidgetsApp` | `MaterialApp` | `CupertinoApp` |
| Scaffolding & layout | Raw layout (`Stack`, `Column`) | `Scaffold`, `AppBar` | `CupertinoPageScaffold` |
| Primary use case | Custom design systems, reusable packages | Android & cross-platform apps | iOS-first & adaptive apps |

### Basic widgets

- `Text`: a run of styled text.
- `Row`, `Column`: flex widgets for horizontal (`Row`) and vertical (`Column`) layouts, based on the web's flexbox model.
- `Stack`: places widgets on top of each other in paint order; use `Positioned` on children to position relative to the stack edges (based on the web's absolute positioning model).
- `Container`: a rectangular visual element that can be decorated with a `BoxDecoration`, and can have margins, padding, constraints, and a 3D matrix transform.

```dart
import 'package:flutter/material.dart';

class MyAppBar extends StatelessWidget {
  const MyAppBar({required this.title, super.key});

  // Fields in a Widget subclass are always marked "final".

  final Widget title;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 56, // in logical pixels
      padding: const EdgeInsets.symmetric(horizontal: 8),
      decoration: BoxDecoration(color: Colors.blue[500]),
      // Row is a horizontal, linear layout.
      child: Row(
        children: [
          const IconButton(
            icon: Icon(Icons.menu),
            tooltip: 'Navigation menu',
            onPressed: null, // null disables the button
          ),
          // Expanded expands its child
          // to fill the available space.
          Expanded(child: title),
          const IconButton(
            icon: Icon(Icons.search),
            tooltip: 'Search',
            onPressed: null,
          ),
        ],
      ),
    );
  }
}
```

Be sure to have a `uses-material-design: true` entry in the `flutter` section of `pubspec.yaml` to use the predefined Material icons:

```yaml
name: my_app
flutter:
  uses-material-design: true
```

Many Material widgets need to be inside a `MaterialApp` to inherit theme data. `MyAppBar` marks its middle child `Expanded` so it fills remaining space; several `Expanded` children share space by their `flex` argument.

### Using Material components

A Material app starts with `MaterialApp`, which builds useful widgets at the root of the app, including a `Navigator` that manages a stack of widgets identified by strings ("routes"). Using `MaterialApp` is entirely optional but a good practice.

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(title: 'Flutter Tutorial', home: TutorialHome()));
}

class TutorialHome extends StatelessWidget {
  const TutorialHome({super.key});

  @override
  Widget build(BuildContext context) {
    // Scaffold is a layout for
    // the major Material Components.
    return Scaffold(
      appBar: AppBar(
        leading: const IconButton(
          icon: Icon(Icons.menu),
          tooltip: 'Navigation menu',
          onPressed: null,
        ),
        title: const Text('Example title'),
        actions: const [
          IconButton(
            icon: Icon(Icons.search),
            tooltip: 'Search',
            onPressed: null,
          ),
        ],
      ),
      // body is the majority of the screen.
      body: const Center(child: Text('Hello, world!')),
      floatingActionButton: const FloatingActionButton(
        tooltip: 'Add', // used by assistive technologies
        onPressed: null,
        child: Icon(Icons.add),
      ),
    );
  }
}
```

`Scaffold` takes several widgets as named arguments, each placed in the appropriate position; `AppBar` accepts widgets for `leading`, `title`, and `actions`. This pattern recurs throughout the framework.

### Handling gestures

`GestureDetector` has no visual representation but detects user gestures (taps, drags, scales). Many widgets (`IconButton`, `ElevatedButton`, `FloatingActionButton`) use it to expose `onPressed()` callbacks.

```dart
import 'package:flutter/material.dart';

class MyButton extends StatelessWidget {
  const MyButton({super.key});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        print('MyButton was tapped!');
      },
      child: Container(
        height: 50,
        padding: const EdgeInsets.all(8),
        margin: const EdgeInsets.symmetric(horizontal: 8),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(5),
          color: Colors.lightGreen[500],
        ),
        child: const Center(child: Text('Engage')),
      ),
    );
  }
}
```

### Changing widgets in response to input

Stateless widgets receive arguments from their parent and store them in `final` fields. `StatefulWidget`s generate `State` objects that hold state.

```dart
import 'package:flutter/material.dart';

class Counter extends StatefulWidget {
  // This class is the configuration for the state.
  // It holds the values (in this case nothing) provided
  // by the parent and used by the build  method of the
  // State. Fields in a Widget subclass are always marked
  // "final".

  const Counter({super.key});

  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _counter = 0;

  void _increment() {
    setState(() {
      // This call to setState tells the Flutter framework
      // that something has changed in this State, which
      // causes it to rerun the build method below so that
      // the display can reflect the updated values. If you
      // change _counter without calling setState(), then
      // the build method won't be called again, and so
      // nothing would appear to happen.
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called,
    // for instance, as done by the _increment method above.
    // The Flutter framework has been optimized to make
    // rerunning build methods fast, so that you can just
    // rebuild anything that needs updating rather than
    // having to individually changes instances of widgets.
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        ElevatedButton(onPressed: _increment, child: const Text('Increment')),
        const SizedBox(width: 16),
        Text('Count: $_counter'),
      ],
    );
  }
}
```

`StatefulWidget` and `State` are separate objects with different life cycles: widgets are temporary objects used to construct the presentation for the current state, while `State` objects persist between calls to `build()`.

Change notifications flow "up" the widget hierarchy by way of callbacks, while current state flows "down" to the stateless widgets that do presentation. The common parent that redirects this flow is the `State`. Separating concerns, a stateless `CounterDisplay` (takes `count`) and `CounterIncrementor` (takes `onPressed`) can sit under a `Counter` state holder.

### Bringing it all together

A shopping-list example: `ShoppingListItem` (stateless) stores constructor values in `final` fields and calls the `onCartChanged` callback it received from its parent instead of mutating `inCart`. The parent `ShoppingList` (stateful) mutates its state inside `setState()`.

```dart
class ShoppingList extends StatefulWidget {
  const ShoppingList({required this.products, super.key});

  final List<Product> products;

  // The framework calls createState the first time
  // a widget appears at a given location in the tree.
  // If the parent rebuilds and uses the same type of
  // widget (with the same key), the framework re-uses
  // the State object instead of creating a new State object.

  @override
  State<ShoppingList> createState() => _ShoppingListState();
}

class _ShoppingListState extends State<ShoppingList> {
  final _shoppingCart = <Product>{};

  void _handleCartChanged(Product product, bool inCart) {
    setState(() {
      // When a user changes what's in the cart, you need
      // to change _shoppingCart inside a setState call to
      // trigger a rebuild.
      // The framework then calls build, below,
      // which updates the visual appearance of the app.

      if (!inCart) {
        _shoppingCart.add(product);
      } else {
        _shoppingCart.remove(product);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Shopping List')),
      body: ListView(
        padding: const EdgeInsets.symmetric(vertical: 8),
        children: widget.products.map((product) {
          return ShoppingListItem(
            product: product,
            inCart: _shoppingCart.contains(product),
            onCartChanged: _handleCartChanged,
          );
        }).toList(),
      ),
    );
  }
}
```

When the parent rebuilds it creates a new `ShoppingListItem`, which is cheap because the framework compares newly built widgets with the previous ones and applies only the differences to the underlying `RenderObject`. The framework reuses the existing `_ShoppingListState` instead of calling `createState` again; use the `widget` property to read the current `ShoppingList`, and override `didUpdateWidget(oldWidget)` to be notified when it changes. Forgetting `setState` means the framework does not know the widget is dirty and the UI might not update.

### Responding to widget lifecycle events

After `createState()`, the framework inserts the state object into the tree and calls `initState()` (once-only work such as configuring animations or subscribing to platform services; must start by calling `super.initState`). When the state object is no longer needed, the framework calls `dispose()` (cancel timers, unsubscribe; typically ends with `super.dispose`).

### Keys

By default the framework matches widgets across builds by `runtimeType` and order. With keys, the two widgets must also have the same `key`. Keys are most useful in widgets that build many instances of the same type (for example a lazily built list): semantic keys let the framework sync entries with matching keys and keep state attached to the same semantic entry instead of the same numerical position.

### Global keys

Global keys uniquely identify child widgets, must be globally unique across the whole widget hierarchy (unlike local keys, which only need to be unique among siblings), and can be used to retrieve the state associated with a widget (`GlobalKey`).

## Notes

- The Material and Cupertino design systems are shown on this page as the standalone `material_ui` / `cupertino_ui` pub.dev packages; the code samples still import `package:flutter/material.dart`. The 3.47 opt-in to the standalone packages is described in the release category (material-ui-and-cupertino-ui); in-framework Material / Cupertino is not yet deprecated at 3.47.7.
- Flutter widgets (Dart) are distinct from same-named components in Jetpack Compose (android-compose-ui / android-compose-components), SwiftUI (apple-swiftui), WinUI (windows-winui-controls), Ark UI / Chakra UI (ark-ui / chakra-ui) and the Rust fandhe-frontend; names like `Text`, `Row`, `Column`, `Stack` are not interchangeable across them.

## Related

- [Declarative UI](./declarative-ui.md)
- [How Flutter works](./how-flutter-works.md)
- [Widget catalog](./widget-catalog.md)
- [Architectural overview](./architectural-overview.md)
