---
source: https://docs.flutter.dev/ui/adaptive-responsive/input
---

# User input & accessibility

An adaptive app also supports a variety of user inputs (scroll wheel, right-click, hover, tab traversal, keyboard shortcuts), some of which are critical for users of assistive technologies. Some work by default on Material widgets; custom widgets may need to implement them directly.

## Signature / Usage

Scroll wheel for custom widgets with `Listener`:

```dart
return Listener(
  onPointerSignal: (event) {
    if (event is PointerScrollEvent) print(event.scrollDelta.dy);
  },
  child: ListView(),
);
```

### Tab traversal and focus interactions

Most built-in components support traversal and highlights by default. For your own widget use `FocusableActionDetector`, which combines focus, mouse input, and shortcuts in one widget:

```dart
class _BasicActionDetectorState extends State<BasicActionDetector> {
  bool _hasFocus = false;
  @override
  Widget build(BuildContext context) {
    return FocusableActionDetector(
      onFocusChange: (value) => setState(() => _hasFocus = value),
      actions: <Type, Action<Intent>>{
        ActivateIntent: CallbackAction<Intent>(
          onInvoke: (intent) {
            print('Enter or Space was pressed!');
            return null;
          },
        ),
      },
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          const FlutterLogo(size: 100),
          // Position focus in the negative margin for a cool effect
          if (_hasFocus)
            Positioned(
              left: -4,
              top: -4,
              bottom: -4,
              right: -4,
              child: _roundedBorder(),
            ),
        ],
      ),
    );
  }
}
```

#### Controlling traversal order

Use `FocusTraversalGroup` to treat sections of the tree as a group when tabbing (for example, tab through all form fields before the submit button):

```dart
return Column(
  children: [
    FocusTraversalGroup(child: MyFormWithMultipleColumnsAndRows()),
    SubmitButton(),
  ],
);
```

The default is `ReadingOrderTraversalPolicy`; modify it with another predefined `TraversalPolicy` or a custom policy.

### Keyboard accelerators

Wrap a single focusable widget in `KeyboardListener` or `Focus`:

```dart
  @override
  Widget build(BuildContext context) {
    return Focus(
      onKeyEvent: (node, event) {
        if (event is KeyDownEvent) {
          print(event.logicalKey);
        }
        return KeyEventResult.ignored;
      },
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 400),
        child: const TextField(
          decoration: InputDecoration(border: OutlineInputBorder()),
        ),
      ),
    );
  }
}
```

Apply shortcuts to a large section of the tree with `Shortcuts` and `Actions` (shortcuts fire only when this tree or a child has focus and is visible):

```dart
// Define a class for each type of shortcut action you want
class CreateNewItemIntent extends Intent {
  const CreateNewItemIntent();
}

Widget build(BuildContext context) {
  return Shortcuts(
    // Bind intents to key combinations
    shortcuts: const <ShortcutActivator, Intent>{
      SingleActivator(LogicalKeyboardKey.keyN, control: true):
          CreateNewItemIntent(),
    },
    child: Actions(
      // Bind intents to an actual method in your code
      actions: <Type, Action<Intent>>{
        CreateNewItemIntent: CallbackAction<CreateNewItemIntent>(
          onInvoke: (intent) => _createNewItem(),
        ),
      },
      // Your sub-tree must be wrapped in a focusNode, so it can take focus.
      child: Focus(autofocus: true, child: Container()),
    ),
  );
}
```

For always-on, app-wide shortcuts use a global `HardwareKeyboard` listener:

```dart
@override
void initState() {
  super.initState();
  HardwareKeyboard.instance.addHandler(_handleKey);
}

@override
void dispose() {
  HardwareKeyboard.instance.removeHandler(_handleKey);
  super.dispose();
}
```

Check key combinations with `HardwareKeyboard.instance.logicalKeysPressed`:

```dart
static bool isKeyDown(Set<LogicalKeyboardKey> keys) {
  return keys
      .intersection(HardwareKeyboard.instance.logicalKeysPressed)
      .isNotEmpty;
}
```

Fire an action on `Shift+N`:

```dart
bool _handleKey(KeyEvent event) {
  bool isShiftDown = isKeyDown({
    LogicalKeyboardKey.shiftLeft,
    LogicalKeyboardKey.shiftRight,
  });

  if (isShiftDown && event.logicalKey == LogicalKeyboardKey.keyN) {
    _createNewItem();
    return true;
  }

  return false;
}
```

### Mouse enter, exit, and hover for custom widgets

Change the cursor with `MouseRegion`:

```dart
// Show hand cursor
return MouseRegion(
  cursor: SystemMouseCursors.click,
  // Request focus when clicked
  child: GestureDetector(
    onTap: () {
      Focus.of(context).requestFocus();
      _submit();
    },
    child: Logo(showBorder: hasFocus),
  ),
);
```

Custom rollover and hover effects:

```dart
return MouseRegion(
  onEnter: (_) => setState(() => _isMouseOver = true),
  onExit: (_) => setState(() => _isMouseOver = false),
  onHover: (e) => print(e.localPosition),
  child: Container(
    height: 500,
    color: _isMouseOver ? Colors.blue : Colors.black,
  ),
);
```

### Visual density

`VisualDensity` adjusts the density of views across the application (for example, larger hit areas on touch devices). `MaterialApp` components that support it animate their densities to match. Horizontal and vertical densities default to 0.0 and can be any negative or positive value.

```dart
double densityAmt = touchMode ? 0.0 : -1.0;
VisualDensity density = VisualDensity(
  horizontal: densityAmt,
  vertical: densityAmt,
);
return MaterialApp(
  theme: ThemeData(visualDensity: density),
  home: MainAppScaffold(),
  debugShowCheckedModeBanner: false,
);
```

Look it up in your own views:

```dart
VisualDensity density = Theme.of(context).visualDensity;
```

## Notes

- `ScrollView` / `ListView` support the scroll wheel by default.
- Unlike `Shortcuts` or `KeyboardListener`, the static `HardwareKeyboard` listener must be disabled by you when the user is typing in a field or the associated widget is hidden (important when binding Delete/Backspace while child `TextField`s exist).
- Material buttons handle basic focus states and cursors by default; an exception is changing the default styling to set `overlayColor` to transparent. Implement focus state for custom buttons or gesture detectors.
- `VisualDensity` is unit-less; Material generally uses around 4 logical pixels per unit (the page's example uses 6 pixels per unit, which is up to you).
- The Wonderous app's button code is cited for an outline-on-focus example using `FocusNode.hasFocus`.
- Flutter focus / shortcut handling (Dart) is distinct from Compose focus modifiers (android-compose-ui) and SwiftUI focus (apple-swiftui).

## Related

- [Platform idioms](./platform-idioms.md)
- [Best practices for adaptive design](./adaptive-best-practices.md)
- [Large screen devices](./large-screens.md)
- GestureDetector
- [Focus](../interaction-navigation/focus.md)
- [Actions and shortcuts](../interaction-navigation/actions-and-shortcuts.md)
- [Accessibility](../interaction-navigation/accessibility.md)
