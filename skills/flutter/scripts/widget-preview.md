---
source: https://docs.flutter.dev/tools/widget-previewer
---

# Widget Preview

Command for starting the Flutter Widget Previewer, which is stable as of Flutter 3.47.

## Start the Widget Previewer

Source: https://docs.flutter.dev/tools/widget-previewer

```sh
flutter widget-preview start
```

Run from the Flutter project's root directory. Launches a local server and opens a real-time preview environment in the browser. Project builds are cached in a `.widget_preview/` folder in the project root. Android Studio, IntelliJ, and Visual Studio Code start the previewer automatically.

## Mark a widget for preview

Source: https://docs.flutter.dev/tools/widget-previewer

The `@Preview` annotation from `package:flutter/widget_previews.dart` applies to top-level functions or static methods returning a `Widget` or `WidgetBuilder`, and to public Widget constructors and factories with no required arguments.

```dart
import 'package:flutter/widget_previews.dart';
import 'package:material_ui/material_ui.dart'; // For Material widgets

@Preview(name: 'My Sample Text')
Widget mySampleText() {
  return const Text('Hello, World!');
}
```

`package:material_ui` is an opt-in package in Flutter 3.47; run `flutter pub add material_ui` first, or import `package:flutter/material.dart` instead (`Text` itself comes from `package:flutter/widgets.dart`).
