---
source: https://api.flutter.dev/flutter/widgets/StreamBuilder-class.html
---

# StreamBuilder class

Widget that builds itself based on the latest snapshot of interaction with a `Stream`. (`StreamBuilder<T>`; inherits `Object` > `DiagnosticableTree` > `Widget` > `StatefulWidget` > `StreamBuilderBase<T, AsyncSnapshot<T>>`)

## Signature / Usage

```dart
const StreamBuilder({
  Key? key,
  T? initialData,
  required Stream<T>? stream,
  required AsyncWidgetBuilder<T> builder,
})
```

Snapshots the `builder` may receive (as an ordered sub-sequence including the last) for a stream producing the integers 0 through 9:

```dart
AsyncSnapshot<int>.withData(ConnectionState.waiting, null)
AsyncSnapshot<int>.withData(ConnectionState.active, 0)
AsyncSnapshot<int>.withData(ConnectionState.active, 1)
// ...
AsyncSnapshot<int>.withData(ConnectionState.active, 9)
AsyncSnapshot<int>.withData(ConnectionState.done, 9)
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| key | Key? | — | Controls how one widget replaces another widget in the tree. |
| initialData | T? | — | The data that will be used to create the initial snapshot. |
| stream | Stream&lt;T&gt;? | required | The asynchronous computation to which this builder is currently connected. |
| builder | AsyncWidgetBuilder&lt;T&gt; | required | The build strategy currently used by this builder. |

## Notes

- Flutter widget API (Dart, `package:flutter/widgets.dart`) — distinct from Jetpack Compose / SwiftUI / WinUI / Ark UI / Chakra UI / fandhe-frontend components of the same name.
- Managing the stream: the `stream` must have been obtained earlier, e.g. during `State.initState`, `State.didUpdateWidget`, or `State.didChangeDependencies`. It must not be created during the `State.build` or `StatelessWidget.build` call that constructs the `StreamBuilder`; otherwise every time the parent rebuilds, the asynchronous task restarts. General guideline: assume every `build` method could get called every frame, and treat omitted calls as an optimization.
- Timing: rebuilding is scheduled by each interaction using `State.setState`, but is otherwise decoupled from the timing of the stream. The `builder` is called at the discretion of the Flutter pipeline and receives a timing-dependent sub-sequence of the snapshots; the actual sequence depends on the relative timing of stream events and the build rate of the pipeline.
- Changing the configuration to another stream during event generation introduces pairs `AsyncSnapshot<int>.withData(ConnectionState.none, 5)` then `AsyncSnapshot<int>.withData(ConnectionState.waiting, 5)` (the latter only when the new stream is non-null, the former only when the old stream is non-null).
- The stream may produce errors, resulting in snapshots like `AsyncSnapshot<int>.withError(ConnectionState.active, 'some error', someStackTrace)`. The data and error fields of produced snapshots only change when the state is `ConnectionState.active`.
- `initialData` should be used to ensure the first frame has the expected value, as the builder will always be called before the stream listener has a chance to be processed.
- Official example (DartPad sample `widgets.StreamBuilder.1`; the code is not included in the API page HTML; create locally with `flutter create --sample=widgets.StreamBuilder.1 mysample`): listens to a Stream that emits bids for an auction, displaying the price below an icon, an error below an error icon, and the final price when the stream finishes.
- See also `ValueListenableBuilder` (wraps a `ValueListenable` instead of a `Stream`) and `StreamBuilderBase` (widget building based on a computation spanning all interactions with the stream).

## Related

- [FutureBuilder](./FutureBuilder.md)
- [ListenableBuilder](./ListenableBuilder.md)
- [StatefulWidget](./StatefulWidget.md)
