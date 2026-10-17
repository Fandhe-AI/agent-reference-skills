---
source: https://docs.flutter.dev/data-and-backend/state-mgmt/simple
---

# Simple app state management

App state management with the `provider` package: lift state up, hold it in a `ChangeNotifier`, supply it with `ChangeNotifierProvider`, and read it with `Consumer`.

## Signature / Usage

Add the dependency:

```console
$ flutter pub add provider
```

Model (`ChangeNotifier`):

```dart
class CartModel extends ChangeNotifier {
  /// Internal, private state of the cart.
  final List<Item> _items = [];

  /// An unmodifiable view of the items in the cart.
  UnmodifiableListView<Item> get items => UnmodifiableListView(_items);

  /// The current total price of all items (assuming all items cost $42).
  int get totalPrice => _items.length * 42;

  /// Adds [item] to cart. This and [removeAll] are the only ways to modify the
  /// cart from the outside.
  void add(Item item) {
    _items.add(item);
    // This call tells the widgets that are listening to this model to rebuild.
    notifyListeners();
  }

  /// Removes all items from the cart.
  void removeAll() {
    _items.clear();
    // This call tells the widgets that are listening to this model to rebuild.
    notifyListeners();
  }
}
```

Provide it above the widgets that need it:

```dart
void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => CartModel(),
      child: const MyApp(),
    ),
  );
}
```

Several providers with `MultiProvider`:

```dart
void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (context) => CartModel()),
        Provider(create: (context) => SomeOtherClass()),
      ],
      child: const MyApp(),
    ),
  );
}
```

Consume it:

```dart
return Consumer<CartModel>(
  builder: (context, cart, child) {
    return Text('Total price: ${cart.totalPrice}');
  },
);
```

Access without rebuilding:

```dart
Provider.of<CartModel>(context, listen: false).removeAll();
```

## Options / Props

`Consumer` builder arguments:

| Name | Type | Description |
|------|------|-------------|
| context | BuildContext | The context, as in every build method. |
| cart (model) | the `ChangeNotifier` type given as the generic | The instance of the model; use its data to define what the UI looks like. |
| child | Widget? | For optimization: a large subtree under the `Consumer` that doesn't change when the model changes can be constructed once and passed via the `child` argument of `Consumer`. |

## Notes

- Lift state up: in declarative frameworks, if you want to change the UI you rebuild it. Instead of `MyCart.updateWith(somethingNew)` (a method call) you use `MyCart(contents)` (a constructor). Constructors can only be called in the build methods of parents, so `contents` must live in `MyCart`'s parent or above (here `MyApp`). Widgets are immutable: they don't change, they get replaced.
- Passing callbacks down works but gets old quickly for state modified from many places. Flutter's mechanism for providing data to descendants is `InheritedWidget`, `InheritedNotifier`, `InheritedModel`, and more; `provider` wraps them.
- `provider` concepts: `ChangeNotifier`, `ChangeNotifierProvider`, `Consumer`. `ChangeNotifier` is part of `flutter:foundation`, easily testable without widget testing; the only `ChangeNotifier`-specific code is `notifyListeners()`.
- `ChangeNotifierProvider` does not rebuild `CartModel` unless absolutely necessary and automatically calls `dispose()` on it. Don't place it higher than necessary.
- `Consumer<T>` requires the generic type; `provider` is type-based.
- Best practice: put `Consumer` widgets as deep in the tree as possible so large portions of the UI aren't rebuilt for a small detail.
- Use `Provider.of` with `listen: false` when you need to call methods but not display model data; the widget won't rebuild on `notifyListeners`.
- If you are new to Flutter and have no strong reason to choose another approach (Redux, Rx, hooks, etc.), the page recommends starting with `provider`.
- Flutter state management (Dart widgets, `provider`) is distinct from the android-architecture skill's ViewModel / state holder guidance.

## Related

- [Differentiate between ephemeral state and app state](./ephemeral-vs-app-state.md)
- [Approaches to state management](./state-management-options.md)
- [Guide to app architecture](./architecture-guide.md)
