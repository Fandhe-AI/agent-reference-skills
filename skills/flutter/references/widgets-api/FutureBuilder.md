---
source: https://api.flutter.dev/flutter/widgets/FutureBuilder-class.html
---

# FutureBuilder class

A widget that builds itself based on the latest snapshot of interaction with a `Future`. (`FutureBuilder<T>`; inherits `Object` > `DiagnosticableTree` > `Widget` > `StatefulWidget`)

## Signature / Usage

```dart
const FutureBuilder({
  Key? key,
  required Future<T>? future,
  T? initialData,
  required AsyncWidgetBuilder<T> builder,
})
```

Snapshots passed to `builder` for a future that completes with data (with `initialData` null):

```dart
AsyncSnapshot<String>.nothing().inState(ConnectionState.waiting)
AsyncSnapshot<String>.withData(ConnectionState.done, 'some data')
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| key | Key? | — | Controls how one widget replaces another widget in the tree. |
| future | Future&lt;T&gt;? | required | The asynchronous computation to which this builder is currently connected, possibly null. |
| initialData | T? | — | The data that will be used to create the snapshots provided until a non-null `future` has completed. |
| builder | AsyncWidgetBuilder&lt;T&gt; | required | The build strategy currently used by this builder. |

## Notes

- Flutter widget API (Dart, `package:flutter/widgets.dart`) — distinct from Jetpack Compose / SwiftUI / WinUI / Ark UI / Chakra UI / fandhe-frontend components of the same name.
- Managing the future: the `future` must have been obtained earlier, e.g. during `State.initState`, `State.didUpdateWidget`, or `State.didChangeDependencies`. It must not be created during the `State.build` or `StatelessWidget.build` call that constructs the `FutureBuilder`; otherwise every time the parent rebuilds, the asynchronous task restarts. General guideline: assume every `build` method could get called every frame, and treat omitted calls as an optimization.
- Timing: rebuilding is scheduled by the completion of the future using `State.setState`, but is otherwise decoupled from the timing of the future. The `builder` is called at the discretion of the Flutter pipeline and receives a timing-dependent sub-sequence of the snapshots. Providing a new but already-completed future results in a single frame in the `ConnectionState.waiting` state, since there is no way to synchronously determine a `Future` has already completed.
- Builder contract: for a future that completes with data (and null `initialData`) the builder is called with either both or only the latter of `AsyncSnapshot<String>.nothing().inState(ConnectionState.waiting)` and `AsyncSnapshot<String>.withData(ConnectionState.done, 'some data')`. On error, with either both or only the latter of the waiting snapshot and `AsyncSnapshot<String>.withError(ConnectionState.done, 'some error', someStackTrace)`.
- `initialData` ensures the snapshot carries data of your choice rather than the default null if the builder is invoked before the future completes.
- The data and error fields of the snapshot change only as the connection state transitions from `waiting` to `done`, and are retained when changing the configuration to another future; e.g. an old future completed with data and a new future yields `AsyncSnapshot<String>.withData(ConnectionState.none, 'data of first future')` then `AsyncSnapshot<String>.withData(ConnectionState.waiting, 'data of first future')` (the latter only when the new future is non-null, the former only when the old future is non-null).
- The official page writes the waiting snapshot as `AsyncSnapshot<String>.withData(ConnectionState.waiting, null)`, which does not type-check for a non-nullable `T` (`withData` takes `T data`); shown here as `AsyncSnapshot<String>.nothing().inState(ConnectionState.waiting)`.
- The official page shows the post-switch waiting snapshot as 'data of second future', but data is retained from the old future until the new one completes (contradicting its own retention statement); corrected to 'data of first future'.
- A `FutureBuilder` behaves identically to a `StreamBuilder` configured with `future?.asStream()`, except that snapshots with `ConnectionState.active` may appear for the latter, depending on how the stream is implemented.
- Official example (DartPad sample `widgets.FutureBuilder.1`; the code is not included in the API page HTML; create locally with `flutter create --sample=widgets.FutureBuilder.1 mysample`): displays a loading spinner while loading, a success icon and text if the `Future` completes with a result, or an error icon and text on error.

## Related

- [StreamBuilder](./StreamBuilder.md)
- [StatefulWidget](./StatefulWidget.md)
- [State](./State.md)
