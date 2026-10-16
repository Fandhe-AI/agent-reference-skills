---
source: https://docs.flutter.dev/app-architecture/design-patterns/optimistic-state
---

# Optimistic state

Improve perceived responsiveness by presenting a successful UI state before the background task completes, and reverting only if it fails (example: a subscribe button).

## Signature / Usage

View model with optimistic `subscribe()`:

```dart
/// Subscribe button view model.
/// Handles the subscribe action and exposes the state to the subscription.
class SubscribeButtonViewModel extends ChangeNotifier {
  SubscribeButtonViewModel({required this.subscriptionRepository});

  final SubscriptionRepository subscriptionRepository;

  /// Whether the user is subscribed.
  bool subscribed = false;

  /// Whether the subscription action has failed.
  bool error = false;

  // Subscription action
  Future<void> subscribe() async {
    // Ignore taps when subscribed.
    if (subscribed) {
      return;
    }

    // Optimistic state.
    // It will be reverted if the subscription fails.
    subscribed = true;
    // Notify listeners to update the UI.
    notifyListeners();

    try {
      await subscriptionRepository.subscribe();
    } catch (e) {
      print('Failed to subscribe: $e');
      // Revert to the previous state.
      subscribed = false;
      // Set the error state.
      error = true;
    } finally {
      notifyListeners();
    }
  }
}
```

Repository that simulates a failing request:

```dart
class SubscriptionRepository {
  /// Simulates a network request and then fails.
  Future<void> subscribe() async {
    // Simulate a network request.
    await Future<void>.delayed(const Duration(seconds: 1));
    // Fail after one second.
    throw Exception('Failed to subscribe');
  }
}
```

View: build method and error handling:

```dart
@override
Widget build(BuildContext context) {
  return ListenableBuilder(
    listenable: widget.viewModel,
    builder: (context, _) {
      return FilledButton(
        onPressed: widget.viewModel.subscribe,
        style: widget.viewModel.subscribed
            ? SubscribeButtonStyle.subscribed
            : SubscribeButtonStyle.unsubscribed,
        child: widget.viewModel.subscribed
            ? const Text('Subscribed')
            : const Text('Subscribe'),
      );
    },
  );
}
```

```dart
@override
void initState() {
  super.initState();
  widget.viewModel.addListener(_onViewModelChange);
}

@override
void dispose() {
  widget.viewModel.removeListener(_onViewModelChange);
  super.dispose();
}

/// Listen to ViewModel changes.
void _onViewModelChange() {
  // If the subscription action has failed.
  if (widget.viewModel.error) {
    // Reset the error state.
    widget.viewModel.error = false;
    // Show an error message.
    ScaffoldMessenger.of(context)
        .showSnackBar(const SnackBar(content: Text('Failed to subscribe')));
  }
}
```

## Notes

- Feature architecture: a `StatefulWidget` `SubscribeButton`, a `SubscribeButtonViewModel` extending `ChangeNotifier`, and a `SubscriptionRepository`. The widget and view model form the presentation layer.
- The `error` flag is reset to `false` after the message is shown to avoid displaying it repeatedly when `notifyListeners()` is called again. Call `removeListener()` on dispose to avoid errors.
- Advanced optimistic state: add a third temporal state indicating the action is still running (e.g. a pending chat message icon), either with another flag or the Command pattern running state.
- Flutter design pattern (Dart, MVVM) — distinct from the android-architecture skill's guidance.

## Related

- [The command pattern](./pattern-command.md)
- [Offline-first support](./pattern-offline-first.md)
- [Guide to app architecture](./architecture-guide.md)
