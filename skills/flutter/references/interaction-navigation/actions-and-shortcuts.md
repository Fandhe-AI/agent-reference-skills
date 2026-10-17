---
source: https://docs.flutter.dev/ui/interactivity/actions-and-shortcuts
---

# Using Actions and Shortcuts

How to bind physical keyboard events to actions in the user interface: `Shortcuts` map key combinations to `Intent`s, and `Actions` map `Intent`s to `Action`s that fulfill them.

## Signature / Usage

```dart
@override
Widget build(BuildContext context) {
  return Shortcuts(
    shortcuts: <LogicalKeySet, Intent>{
      LogicalKeySet(LogicalKeyboardKey.control, LogicalKeyboardKey.keyA):
          const SelectAllIntent(),
    },
    child: Actions(
      dispatcher: LoggingActionDispatcher(),
      actions: <Type, Action<Intent>>{
        SelectAllIntent: SelectAllAction(model),
      },
      child: Builder(
        builder: (context) => TextButton(
          onPressed: Actions.handler<SelectAllIntent>(
            context,
            const SelectAllIntent(),
          ),
          child: const Text('SELECT ALL'),
        ),
      ),
    ),
  );
}
```

### Concepts

- An `Intent` instance represents a generic action the user wishes to perform; it can be fulfilled by different actions in different contexts.
- An `Action` can be a simple callback (`CallbackAction`) or something more complex that integrates with undo/redo architectures or other logic.
- `Shortcuts` are key bindings stored in a table with their bound intent; when the `Shortcuts` widget invokes them, it sends the matching intent to the actions subsystem.
- Why separate Actions from Intents: key mapping definitions are often at a high level and action definitions at a low level, and a single key combination can map to an intended operation and adapt to whichever action fulfills it in the focused context. For instance, `ActivateIntent` maps each type of control to its corresponding `ActivateAction`.
- Intents can configure an action so the same action serves multiple uses (for example `DirectionalFocusIntent` takes a direction). Don't pass state in the `Intent` that applies to all invocations of an `Action`; pass it to the `Action` constructor instead.
- Why not callbacks: actions can decide whether they are enabled by implementing `isEnabled`, and key bindings and implementations are often in different places.

### Callbacks only: CallbackShortcuts

If all you need are callbacks without the flexibility of `Actions` and `Shortcuts`, use `CallbackShortcuts`:

```dart
@override
Widget build(BuildContext context) {
  return CallbackShortcuts(
    bindings: <ShortcutActivator, VoidCallback>{
      const SingleActivator(LogicalKeyboardKey.arrowUp): () {
        setState(() => count = count + 1);
      },
      const SingleActivator(LogicalKeyboardKey.arrowDown): () {
        setState(() => count = count - 1);
      },
    },
    child: Focus(
      autofocus: true,
      child: Column(
        children: <Widget>[
          const Text('Press the up arrow key to add to the counter'),
          const Text('Press the down arrow key to subtract from the counter'),
          Text('count: $count'),
        ],
      ),
    ),
  );
}
```

### Shortcuts and ShortcutManager

The map given to `Shortcuts` maps a `LogicalKeySet` (or a `ShortcutActivator`) to an `Intent` instance. The shortcut manager is longer-lived than the `Shortcuts` widget; it contains the logic for deciding how to handle keys, walks up the tree to find other shortcut mappings, and maintains the map of key combinations to intents. `Shortcuts` takes a `ShortcutManager` that you can subclass:

```dart
class LoggingShortcutManager extends ShortcutManager {
  @override
  KeyEventResult handleKeypress(BuildContext context, KeyEvent event) {
    final KeyEventResult result = super.handleKeypress(context, event);
    if (result == KeyEventResult.handled) {
      print('Handled shortcut $event in $context');
    }
    return result;
  }
}
```

### Defining and invoking actions

Actions in simplest form are subclasses of `Action<Intent>` with an `invoke()` method:

```dart
class SelectAllAction extends Action<SelectAllIntent> {
  SelectAllAction(this.model);

  final Model model;

  @override
  void invoke(covariant SelectAllIntent intent) => model.selectAll();
}
```

Or use a `CallbackAction`:

```dart
CallbackAction(onInvoke: (intent) => model.selectAll());
```

Add actions with the `Actions` widget, which takes a map of `Intent` types to `Action`s:

```dart
@override
Widget build(BuildContext context) {
  return Actions(
    actions: <Type, Action<Intent>>{SelectAllIntent: SelectAllAction(model)},
    child: child,
  );
}
```

Find and invoke:

```dart
Action<SelectAllIntent>? selectAll = Actions.maybeFind<SelectAllIntent>(
  context,
);
```

```dart
Object? result;
if (selectAll != null) {
  result = Actions.of(context)
      .invokeAction(selectAll, const SelectAllIntent());
}
```

```dart
Object? result = Actions.maybeInvoke<SelectAllIntent>(
  context,
  const SelectAllIntent(),
);
```

`Actions.handler` creates a handler closure if the intent has a mapping to an enabled action, otherwise returns `null` (so a button can be disabled when no enabled action matches):

```dart
@override
Widget build(BuildContext context) {
  return Actions(
    actions: <Type, Action<Intent>>{SelectAllIntent: SelectAllAction(model)},
    child: Builder(
      builder: (context) => TextButton(
        onPressed: Actions.handler<SelectAllIntent>(
          context,
          SelectAllIntent(controller: controller),
        ),
        child: const Text('SELECT ALL'),
      ),
    ),
  );
}
```

### Action dispatchers

Replace the default `ActionDispatcher` to, for example, log executed actions. Pass the dispatcher to the `Actions` widget; it invokes actions from any `Actions` widgets below that don't set a dispatcher of their own.

```dart
class LoggingActionDispatcher extends ActionDispatcher {
  @override
  Object? invokeAction(
    covariant Action<Intent> action,
    covariant Intent intent, [
    BuildContext? context,
  ]) {
    print('Action invoked: $action($intent) from $context');
    super.invokeAction(action, intent, context);

    return null;
  }

  @override
  (bool, Object?) invokeActionIfEnabled(
    covariant Action<Intent> action,
    covariant Intent intent, [
    BuildContext? context,
  ]) {
    print('Action invoked: $action($intent) from $context');
    return super.invokeActionIfEnabled(action, intent, context);
  }
}
```

```dart
@override
Widget build(BuildContext context) {
  return Actions(
    dispatcher: LoggingActionDispatcher(),
    actions: <Type, Action<Intent>>{SelectAllIntent: SelectAllAction(model)},
    child: Builder(
      builder: (context) => TextButton(
        onPressed: Actions.handler<SelectAllIntent>(
          context,
          const SelectAllIntent(),
        ),
        child: const Text('SELECT ALL'),
      ),
    ),
  );
}
```

## Notes

- `ShortcutActivator` is a replacement for `LogicalKeySet`. `LogicalKeySet` is a `ShortcutActivator`; there is also `SingleActivator` (a single key and optional modifiers) and `CharacterActivator` (activates by the character produced by a key sequence). `ShortcutActivator` is meant to be subclassed for custom activation.
- The `Shortcuts` widget uses the `Focus` widget's context and `Actions.invoke` to find which action to invoke. If no matching intent type is found in the first `Actions` widget, it considers the next ancestor `Actions`, up to the root.
- `Actions` only invokes actions when `isEnabled(Intent intent)` returns true. If the action isn't enabled, it is not invoked and the framework stops searching for matching actions at that point.
- `Actions.find` throws an exception when it doesn't find a matching `Intent` type; `Actions.maybeFind` returns null.
- `Actions.handler` and `Actions.invoke` only find actions in the provided `context`; use a `Builder` so the framework finds actions defined in the same `build` function.
- Invoking an action directly with `invoke` on the action opts out of services an action dispatcher might provide (logging, undo/redo, and so on).
- The source page ends with a full DartPad example (`CopyableTextField`, `ClearIntent` / `CopyIntent` / `SelectAllIntent` and their actions); not reproduced here beyond the snippets above.

## Related

- [Understanding Flutter's keyboard focus system](./focus.md)
- [Add interactivity to your Flutter app](./interactivity.md)
