---
source: https://docs.flutter.dev/testing/errors
---

# Handling errors in Flutter

How to control error messages and logging of errors. The framework catches errors raised during framework callbacks (build, layout, paint); other errors are handled via `PlatformDispatcher`.

## Signature / Usage

```dart
import 'dart:ui';

import 'package:material_ui/material_ui.dart';

Future<void> main() async {
  await myErrorsHandler.initialize();
  FlutterError.onError = (details) {
    FlutterError.presentError(details);
    myErrorsHandler.onErrorDetails(details);
  };
  PlatformDispatcher.instance.onError = (error, stack) {
    myErrorsHandler.onError(error, stack);
    return true;
  };
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      builder: (context, widget) {
        Widget error = const Text('...rendering error...');
        if (widget is Scaffold || widget is Navigator) {
          error = Scaffold(body: Center(child: error));
        }
        ErrorWidget.builder = (errorDetails) => error;
        if (widget != null) return widget;
        throw StateError('widget is null');
      },
    );
  }
}
```

## Handlers

| Name | Description |
|------|-------------|
| `FlutterError.onError` | All errors caught by Flutter are routed here. By default, this calls `FlutterError.presentError`, which dumps the error to the device logs. When running from an IDE, the inspector overrides this behavior so errors can also be routed to the IDE's console. |
| `FlutterError.presentError` | Dumps the error to the device logs. Consider calling it from your custom error handler in order to see the logs in the console as well. |
| `ErrorWidget.builder` | Invoked when an error occurs during the build phase, to build the widget used instead of the one that failed. By default, in debug mode this shows an error message in red, and in release mode this shows a gray background. |
| `PlatformDispatcher.instance.onError` | Handles errors raised when no Flutter callback is on the call stack. By default, this only prints errors and does nothing else. |

## Errors caught by Flutter

For example, to make your application quit immediately any time an error is caught by Flutter in release mode:

```dart
import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:material_ui/material_ui.dart';

void main() {
  FlutterError.onError = (details) {
    FlutterError.presentError(details);
    if (kReleaseMode) exit(1);
  };
  runApp(const MyApp());
}

// The rest of the `flutter create` code...
```

The top-level `kReleaseMode` constant indicates whether the app was compiled in release mode. This handler can also be used to report errors to a logging service (see the cookbook chapter "reporting errors to a service").

## Define a custom error widget for build phase errors

To define a customized error widget that displays whenever the builder fails to build a widget, use `MaterialApp.builder`:

```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      builder: (context, widget) {
        Widget error = const Text('...rendering error...');
        if (widget is Scaffold || widget is Navigator) {
          error = Scaffold(body: Center(child: error));
        }
        ErrorWidget.builder = (errorDetails) => error;
        if (widget != null) return widget;
        throw StateError('widget is null');
      },
    );
  }
}
```

## Errors not caught by Flutter

Consider an `onPressed` callback that invokes an asynchronous function, such as `MethodChannel.invokeMethod` (or pretty much any plugin):

```dart
OutlinedButton(
  child: const Text('Click me!'),
  onPressed: () async {
    const channel = MethodChannel('crashy-custom-channel');
    await channel.invokeMethod('blah');
  },
)
```

If `invokeMethod` throws an error, it won't be forwarded to `FlutterError.onError`. Instead, it's forwarded to the `PlatformDispatcher`. To catch such an error, use `PlatformDispatcher.instance.onError`:

```dart
import 'dart:ui';

import 'package:material_ui/material_ui.dart';

void main() {
  MyBackend myBackend = MyBackend();
  PlatformDispatcher.instance.onError = (error, stack) {
    myBackend.sendError(error, stack);
    return true;
  };
  runApp(const MyApp());
}
```

## Notes

- You can customize these behaviors, typically by setting them to values in your `void main()` function.
- The snippets import `package:material_ui/material_ui.dart` as written in the official page. Per the Flutter 3.47 notes, `material_ui` / `cupertino_ui` are standalone packages you can opt in to; the in-framework `package:flutter/material.dart` is not yet deprecated in 3.47.7.
- `myErrorsHandler`, `myBackend`, and `MyBackend` are placeholders in the official snippets, not Flutter APIs.

## Related

- [Common Flutter errors](./common-errors.md)
- [Debug Flutter apps from code](./code-debugging.md)
