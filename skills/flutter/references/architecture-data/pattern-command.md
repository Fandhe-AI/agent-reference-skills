---
source: https://docs.flutter.dev/app-architecture/design-patterns/command
---

# The command pattern

A command is a class that wraps a view model action and exposes its states (running, completed, error), simplifying view model logic and reusing code.

## Signature / Usage

Simplified `Command` (a `ChangeNotifier`):

```dart
class Command extends ChangeNotifier {
  Command(this._action);

  bool _running = false;
  bool get running => _running;

  Exception? _error;
  Exception? get error => _error;

  bool _completed = false;
  bool get completed => _completed;

  final Future<void> Function() _action;

  Future<void> execute() async {
    if (_running) {
      return;
    }

    _running = true;
    _completed = false;
    _error = null;
    notifyListeners();

    try {
      await _action();
      _completed = true;
    } on Exception catch (error) {
      _error = error;
    } finally {
      _running = false;
      notifyListeners();
    }
  }

  void clear() {
    _running = false;
    _error = null;
    _completed = false;
  }
}
```

Using commands in a view model:

```dart
class HomeViewModel extends ChangeNotifier {
  HomeViewModel() {
    load = Command0(_load)..execute();
    edit = Command1<String>(_edit);
  }

  User? get user => // ...

  // Command0 accepts 0 arguments
  late final Command0 load;

  // Command1 accepts 1 argument
  late final Command1<String> edit;

  Future<void> _load() async {
    // load user
  }

  Future<void> _edit(String name) async {
    // edit user
  }
}
```

Listening to the command state in the view:

```dart
ListenableBuilder(
  listenable: widget.viewModel.load,
  builder: (context, child) {
    if (widget.viewModel.load.running) {
      return const Center(child: CircularProgressIndicator());
    }

    if (widget.viewModel.load.error != null) {
      return Center(
        child: Text('Error: ${widget.viewModel.load.error}'),
      );
    }

    return child!;
  },
  child: ListenableBuilder(
    listenable: widget.viewModel,
    builder: (context, _) {
      // ···
    },
  ),
),
```

Full implementation as in the Compass App example (uses the `Result` class):

```dart
import 'dart:async';

import 'package:flutter/foundation.dart';

import 'result.dart';

/// Defines a command action that returns a [Result] of type [T].
/// Used by [Command0] for actions without arguments.
typedef CommandAction0<T> = Future<Result<T>> Function();

/// Defines a command action that returns a [Result] of type [T].
/// Takes an argument of type [A].
/// Used by [Command1] for actions with one argument.
typedef CommandAction1<T, A> = Future<Result<T>> Function(A);

/// Facilitates interaction with a view model.
///
/// Encapsulates an action,
/// exposes its running and error states,
/// and ensures that it can't be launched again until it finishes.
///
/// Use [Command0] for actions without arguments.
/// Use [Command1] for actions with one argument.
///
/// Actions must return a [Result] of type [T].
///
/// Consume the action result by listening to changes,
/// then call to [clearResult] when the state is consumed.
abstract class Command<T> extends ChangeNotifier {
  bool _running = false;

  /// Whether the action is running.
  bool get running => _running;

  Result<T>? _result;

  /// Whether the action completed with an error.
  bool get error => _result is Error;

  /// Whether the action completed successfully.
  bool get completed => _result is Ok;

  /// The result of the most recent action.
  ///
  /// Returns `null` if the action is running or completed with an error.
  Result<T>? get result => _result;

  /// Clears the most recent action's result.
  void clearResult() {
    _result = null;
    notifyListeners();
  }

  /// Execute the provided [action], notifying listeners and
  /// setting the running and result states as necessary.
  Future<void> _execute(CommandAction0<T> action) async {
    // Ensure the action can't launch multiple times.
    // e.g. avoid multiple taps on button
    if (_running) return;

    // Notify listeners.
    // e.g. button shows loading state
    _running = true;
    _result = null;
    notifyListeners();

    try {
      _result = await action();
    } finally {
      _running = false;
      notifyListeners();
    }
  }
}

/// A [Command] that accepts no arguments.
final class Command0<T> extends Command<T> {
  /// Creates a [Command0] with the provided [CommandAction0].
  Command0(this._action);

  final CommandAction0<T> _action;

  /// Executes the action.
  Future<void> execute() async {
    await _execute(_action);
  }
}

/// A [Command] that accepts one argument.
final class Command1<T, A> extends Command<T> {
  /// Creates a [Command1] with the provided [CommandAction1].
  Command1(this._action);

  final CommandAction1<T, A> _action;

  /// Executes the action with the specified [argument].
  Future<void> execute(A argument) async {
    await _execute(() => _action(argument));
  }
}
```

## Notes

- The `HomeViewModel` snippet is illustrative and is quoted verbatim from the official page: with the full Compass App implementation below, the equivalent declarations are `Command0<void>` / `Command1<void, String>` and the actions must return `Future<Result<void>>` (the simplified `Command` above defines neither `Command0` nor `Command1`).
- View models are typically implemented by extending `ChangeNotifier` and calling `notifyListeners()` to refresh views. Without commands, each action needs its own `running` / `error` state (e.g. `runningLoad`, `errorLoad`, `runningEdit`, `errorEdit`) and manual listener code to trigger UI actions such as a `SnackBar`.
- `execute()` sets `running` to `true` and resets `error` and `completed`; when the action finishes `running` becomes `false` and `completed` `true`. While `running` is `true` the command cannot begin executing again, preventing repeated button presses. In the simplified version, thrown `Exception`s are captured into the `error` state.
- Call `clear()` (simplified) / `clearResult()` (full version) after consuming an error so the UI action doesn't fire on every `notifyListeners()`.
- `Command0` is for actions without parameters, `Command1` for actions taking one parameter. The pattern can be extended to support other argument counts.
- Ready-to-use implementations exist on pub.dev, such as the `command_it` package.
- Flutter design pattern (Dart, MVVM) — distinct from the android-architecture skill's guidance.

## Related

- [Error handling with Result objects](./pattern-result.md)
- [Guide to app architecture](./architecture-guide.md)
- [Optimistic state](./pattern-optimistic-state.md)
