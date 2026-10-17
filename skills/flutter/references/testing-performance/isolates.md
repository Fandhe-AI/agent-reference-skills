---
source: https://docs.flutter.dev/perf/isolates
---

# Concurrency and isolates

Multithreading in Flutter using Dart isolates: move large computations off the main isolate to avoid UI jank.

## Signature / Usage

```dart
// Produces a list of 211,640 photo objects.
// (The JSON file is ~20MB.)
Future<List<Photo>> getPhotos() async {
  final String jsonString = await rootBundle.loadString('assets/photos.json');
  final List<Photo> photos = await Isolate.run<List<Photo>>(() {
    final List<Object?> photoData = jsonDecode(jsonString) as List<Object?>;
    return photoData.cast<Map<String, Object?>>().map(Photo.fromJson).toList();
  });
  return photos;
}
```

All Dart code runs in isolates, which are similar to threads, but differ in that isolates have their own isolated memory. They do not share state in any way, and can only communicate by messaging. By default, Flutter apps do all of their work on a single isolate, the main isolate. Each isolate has its own memory and its own event loop. For smooth rendering, Flutter adds a "paint frame" event to the event queue 60 times per second (for a 60Hz device). If these events aren't processed on time, the application experiences UI jank, or worse, becomes unresponsive.

## Common use cases for isolates

The only hard rule is to use isolates when large computations are causing UI jank, i.e. any computation that takes longer than Flutter's frame gap. Isolates are commonly used for:

- Reading data from a local database
- Sending push notifications
- Parsing and decoding large data files
- Processing or compressing photos, audio files, and video files
- Converting audio and video files
- When you need asynchronous support while using FFI
- Applying filtering to complex lists or filesystems

## Message passing between isolates

Dart's isolates are an implementation of the Actor model. They can only communicate with each other by message passing, done with `Port` objects. Messages are generally copied from the sending isolate to the receiving isolate: any value passed to an isolate, even if mutated on that isolate, doesn't change the value on the original isolate. The only objects that aren't copied are immutable objects (such as a String or an unmodifiable byte); a reference is sent across the port instead.

An exception: when an isolate exits while sending a message using `Isolate.exit`, the sending isolate won't exist after sending, so it can pass ownership of the message to the other isolate. The two lowest-level primitives that send messages are `SendPort.send` (makes a copy of a mutable message) and `Isolate.exit` (sends the reference). Both `Isolate.run` and `compute` use `Isolate.exit` under the hood.

## Short-lived isolates

The easiest way is `Isolate.run`. It spawns an isolate, passes a callback to the spawned isolate to start some computation, returns a value from the computation, and shuts the isolate down when the computation is complete, all concurrently with the main isolate. It requires a single argument, a callback function that takes no arguments (`FutureOr<R> Function()`). For a complete walkthrough of using isolates to parse JSON in the background, see the cookbook recipe `/cookbook/networking/background-parsing`.

## Stateful, longer-lived isolates

Short-lived isolates have performance overhead to spawn new isolates and copy objects from one isolate to another. If you do the same computation repeatedly, create isolates that don't exit immediately using lower-level APIs that `Isolate.run` abstracts:

- `Isolate.spawn()` and `Isolate.exit()`
- `ReceivePort` and `SendPort`
- the `send()` method

These long-lived isolates are colloquially known as _background workers_, useful when a process needs to run repeatedly or runs over a period of time and yields multiple return values. You might also use the `worker_manager` package to manage long-lived isolates.

### ReceivePorts and SendPorts

`ReceivePort` and `SendPort` are the only way isolates can communicate with each other. Ports behave similarly to `Streams`, in which the `StreamController` or `Sink` is created in one isolate, and the listener is set up in the other. The `StreamController` is called a `SendPort`, and you "add" messages with the `send()` method. `ReceivePort`s are the listeners, and call a provided callback with the message as an argument. For two-way communication between the main isolate and a worker isolate, follow the examples in the Dart documentation.

## Using platform plugins in isolates

You can use platform plugins in background isolates, via the `BackgroundIsolateBinaryMessenger` API. For example, a native host API encryption can be done in a background isolate instead of wasting UI thread time marshaling data. The following snippet uses the `shared_preferences` package in a background isolate:

```dart
import 'dart:isolate';

import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized(); // Added: not in the official snippet
  // Identify the root isolate to pass to the background isolate.
  RootIsolateToken rootIsolateToken = RootIsolateToken.instance!;
  Isolate.spawn(_isolateMain, rootIsolateToken);
}

Future<void> _isolateMain(RootIsolateToken rootIsolateToken) async {
  // Register the background isolate with the root isolate.
  BackgroundIsolateBinaryMessenger.ensureInitialized(rootIsolateToken);

  // You can now use the shared_preferences plugin.
  SharedPreferences sharedPreferences = await SharedPreferences.getInstance();

  print(sharedPreferences.getBool('isDebug'));
}
```

## Limitations of Isolates

Isolates have their own global fields, and can only communicate with message passing, ensuring that mutable objects in an isolate are only ever accessible in a single isolate. For example, a global mutable variable called `configuration` is copied as a new global field in a spawned isolate; mutating it in the spawned isolate leaves the main isolate's untouched, even if you pass `configuration` as a message.

- **Web platforms and compute**: Dart web platforms, including Flutter web, don't support isolates. You can use the `compute` method to ensure your code compiles. `compute()` runs the computation on the main thread on the web, but spawns a new thread on mobile devices. On mobile and desktop, `await compute(fun, message)` is equivalent to `await Isolate.run(() => fun(message))`.
- **No `rootBundle` access or `dart:ui` methods**: All UI tasks and Flutter itself are coupled to the main isolate. You can't access assets using `rootBundle` in spawned isolates, nor perform any widget or UI work in spawned isolates.
- **Limited plugin messages from host platform to Flutter**: with background isolate platform channels, you can send messages to the host platform and receive responses, but you can't receive unsolicited messages from the host platform. For example, you can't set up a long-lived Firestore listener in a background isolate, but you can query Firestore for a response in the background.

## More information

- If you're using many isolates, consider the `IsolateNameServer` class in Flutter, or the pub package that clones the functionality for Dart applications not using Flutter.
- `isolate_agents` is a package that abstracts Ports and makes it easier to create long-lived isolates.
- See the announcement for the `BackgroundIsolateBinaryMessenger` API (Flutter blog: "Introducing background isolate channels").

## Notes

- Adapted: added `WidgetsFlutterBinding.ensureInitialized()` and the widgets import (not in the official snippet) as the usual main() setup before plugin use; `RootIsolateToken.instance` itself is available without it.
- Corrected: the official page states the `Isolate.run` callback must have exactly one required, unnamed argument; the actual signature is `Isolate.run<R>(FutureOr<R> computation())`, a zero-argument callback (the one-argument form applies to `compute()`).
- Dart language-level concurrency (event loop, isolates, Actor model) is specified on dart.dev, which is out of scope for this skill; only the Flutter-side usage is covered here.

## Related

- [Performance best practices](./performance-best-practices.md)
- [Flutter performance profiling](./ui-performance.md)
