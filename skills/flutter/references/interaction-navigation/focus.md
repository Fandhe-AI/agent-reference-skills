---
source: https://docs.flutter.dev/ui/interactivity/focus
---

# Understanding Flutter's keyboard focus system

How to control where keyboard input is directed with `FocusNode`, `Focus`, `FocusScope`, and focus traversal. Relevant to apps used with a physical keyboard, such as most desktop and web applications.

## Signature / Usage

Make a custom control focusable with the `Focus` widget:

```dart
import 'package:material_ui/material_ui.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  static const String _title = 'Focus Sample';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: _title,
      home: Scaffold(
        appBar: AppBar(title: const Text(_title)),
        body: const Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[MyCustomWidget(), MyCustomWidget()],
        ),
      ),
    );
  }
}

class MyCustomWidget extends StatefulWidget {
  const MyCustomWidget({super.key});

  @override
  State<MyCustomWidget> createState() => _MyCustomWidgetState();
}

class _MyCustomWidgetState extends State<MyCustomWidget> {
  Color _color = Colors.white;
  String _label = 'Unfocused';

  @override
  Widget build(BuildContext context) {
    return Focus(
      onFocusChange: (focused) {
        setState(() {
          _color = focused ? Colors.black26 : Colors.white;
          _label = focused ? 'Focused' : 'Unfocused';
        });
      },
      child: Center(
        child: Container(
          width: 300,
          height: 50,
          alignment: Alignment.center,
          color: _color,
          child: Text(_label),
        ),
      ),
    );
  }
}
```

### Glossary

| Term | Definition |
|------|------------|
| Focus tree | A tree of focus nodes that typically sparsely mirrors the widget tree, representing all the widgets that can receive focus. |
| Focus node | A single node in a focus tree. This node can receive the focus, and is said to "have focus" when it is part of the focus chain. It participates in handling key events only when it has focus. |
| Primary focus | The farthest focus node from the root of the focus tree that has focus. Key events start propagating to the primary focus node and its ancestors. |
| Focus chain | An ordered list of focus nodes that starts at the primary focus node and follows the branches of the focus tree to the root of the focus tree. |
| Focus scope | A special focus node whose job is to contain a group of other focus nodes, and allow only those nodes to receive focus. It contains information about which nodes were previously focused in its subtree. |
| Focus traversal | The process of moving from one focusable node to another in a predictable order, typically by pressing Tab. |

## Options / Props

Attributes of the `Focus` widget discussed on the page:

| Name | Type | Description |
|------|------|-------------|
| `focusNode` | `FocusNode` | Optional node to manage; if not passed, `Focus` creates its own. Pass one to call `requestFocus()` from a parent widget. |
| `autofocus` | `bool` | Request the focus the first time the focus scope it belongs to is focused. Only set on one widget per focus scope. Only takes effect if there isn't already a focus in the scope. |
| `canRequestFocus` | `bool` | If false, calling `requestFocus` on the node has no effect; also implies the node is skipped for focus traversal. |
| `skipTraversal` | `bool` | If true, the node doesn't participate in focus traversal but is still focusable if `requestFocus` is called on it. |
| `descendantsAreFocusable` | `bool` | Controls whether descendants can receive focus while still allowing this node to receive focus. `ExcludeFocus` is a `Focus` widget with this attribute set. |
| `onKeyEvent` | callback | Handler for key events in the subtree; return `KeyEventResult.handled` to stop propagation. |
| `onFocusChange` | callback | Notification when the focus state of the node changes (added to or removed from the focus chain, not only primary focus). |

### Key events

Key events start at the focus node with primary focus. If that node doesn't return `KeyEventResult.handled` from its `onKeyEvent` handler, its parent focus node is given the event, and so on up to the root. If the event reaches the root unhandled, it is returned to the platform for the next native control. Handled events are not propagated to other Flutter widgets or to native widgets.

A `Focus` widget that absorbs every key its subtree doesn't handle, without being able to be the primary focus:

```dart
@override
Widget build(BuildContext context) {
  return Focus(
    onKeyEvent: (node, event) => KeyEventResult.handled,
    canRequestFocus: false,
    child: child,
  );
}
```

Focus key events are processed before text entry events, so handling a key event when the focus widget surrounds a text field prevents that key from being entered into the text field. A widget that won't allow the letter "a" to be typed:

```dart
@override
Widget build(BuildContext context) {
  return Focus(
    onKeyEvent: (node, event) {
      return (event.logicalKey == LogicalKeyboardKey.keyA)
          ? KeyEventResult.handled
          : KeyEventResult.ignored;
    },
    child: const TextField(),
  );
}
```

### Obtaining the FocusNode

From an ancestor, create and pass in a `FocusNode` as the `focusNode` attribute (owned by a stateful widget). From a descendant, call `Focus.of(context)`; within the same build function use a `Builder` to get the correct context:

```dart
@override
Widget build(BuildContext context) {
  return Focus(
    child: Builder(
      builder: (context) {
        final bool hasPrimary = Focus.of(context).hasPrimaryFocus;
        print('Building with primary focus: $hasPrimary');
        return const SizedBox(width: 100, height: 100);
      },
    ),
  );
}
```

### Controlling focus traversal

The default algorithm is `ReadingOrderTraversalPolicy`. Place `FocusTraversalGroup` around subtrees that should be fully traversed before moving on; give it a `FocusTraversalPolicy` (for example `OrderedTraversalPolicy`) to determine ordering. The `order` argument of `FocusTraversalOrder` can be any `FocusOrder` subclass; `NumericFocusOrder` and `LexicalFocusOrder` are provided. Traversing a row of buttons in the order TWO, ONE, THREE:

```dart
class OrderedButtonRow extends StatelessWidget {
  const OrderedButtonRow({super.key});

  @override
  Widget build(BuildContext context) {
    return FocusTraversalGroup(
      policy: OrderedTraversalPolicy(),
      child: Row(
        children: <Widget>[
          const Spacer(),
          FocusTraversalOrder(
            order: const NumericFocusOrder(2),
            child: TextButton(child: const Text('ONE'), onPressed: () {}),
          ),
          const Spacer(),
          FocusTraversalOrder(
            order: const NumericFocusOrder(1),
            child: TextButton(child: const Text('TWO'), onPressed: () {}),
          ),
          const Spacer(),
          FocusTraversalOrder(
            order: const NumericFocusOrder(3),
            child: TextButton(child: const Text('THREE'), onPressed: () {}),
          ),
          const Spacer(),
        ],
      ),
    );
  }
}
```

`FocusTraversalPolicy` is the abstract base class that determines which widget is next (`findFirstFocus`, `findLastFocus`, `next`, `previous`, `inDirection`); concrete policies include `ReadingOrderTraversalPolicy`, `OrderedTraversalPolicy` and the `DirectionalFocusTraversalPolicyMixin` classes. The member functions are rarely called directly.

## Notes

- The docs prose refers to `Focus.onFocusChanged`; the actual `Focus` constructor parameter is `onFocusChange` (per api.flutter.dev Focus class).
- Best practices for `FocusNode`:
  - Don't allocate a new `FocusNode` for each build (memory leaks, occasional loss of focus on rebuild).
  - Do create `FocusNode` and `FocusScopeNode` in a stateful widget's state and dispose them in `dispose`.
  - Don't use the same `FocusNode` for multiple widgets.
  - Do set the `debugLabel` to help diagnose focus issues.
  - Don't set `onKeyEvent` on a `FocusNode` / `FocusScopeNode` managed by a `Focus` / `FocusScope` widget; add a `Focus` widget around the subtree and set its `onKeyEvent` instead (set `canRequestFocus: false` if it shouldn't take primary focus), because the widget's attribute can overwrite the node's handler on a later build.
  - Do call `requestFocus()` on a node to request primary focus. `focusNode.requestFocus()` is equivalent to `FocusScope.of(context).requestFocus(focusNode)` and more performant.
- `FocusNode.unfocus()`: there is always a primary focus, so an unfocused node passes focus to the nearest `FocusScopeNode` or a previously focused node in that scope, depending on `disposition` (`UnfocusDisposition.scope` is the default; `UnfocusDisposition.previouslyFocusedChild` searches the scope for the previously focused child, equal to `scope` if none). To control where focus goes, focus another node explicitly or use `focusInDirection`, `nextFocus`, or `previousFocus`.
- If there is no other scope, focus moves to `FocusManager.rootScope`, which has no `context`; focus traversal may suddenly stop working. Fix by adding a `FocusScope` ancestor. `WidgetsApp` (and thus `MaterialApp` / `CupertinoApp`) has its own `FocusScope`.
- Timing: when focus is requested, it only takes effect after the current build phase completes, so focus changes are always delayed by one frame.
- `FocusScope` is a `Focus` variant managing a `FocusScopeNode`; traversal stays within a scope unless a node outside is explicitly focused. Focusing a scope node first tries the current or most recently focused node in its subtree, or the node that requested autofocus; otherwise the scope itself receives focus.
- `FocusableActionDetector` combines `Actions`, `Shortcuts`, `MouseRegion` and a `Focus` widget; it is what Flutter controls use to implement actions, key bindings, and focus and hover highlights.
- `FocusManager.instance.primaryFocus` (also the global `primaryFocus` field) holds the currently focused node. `FocusManager.instance.highlightMode` and `highlightStrategy` switch between "touch" and "traditional" (mouse and keyboard) focus highlights; use `addHighlightModeListener` to listen for changes.
- If the intent of the "no letter a" example is input validation, a `TextInputFormatter` is probably better; the `Shortcuts` widget uses the key-event technique to handle shortcuts before they become text input.
- Snippets import `package:material_ui/material_ui.dart` exactly as on the source page; the standalone `material_ui` / `cupertino_ui` packages are an opt-in in Flutter 3.47.

## Related

- [Using Actions and Shortcuts](./actions-and-shortcuts.md)
- [Add interactivity to your Flutter app](./interactivity.md)
