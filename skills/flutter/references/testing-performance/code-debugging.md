---
source: https://docs.flutter.dev/testing/code-debugging
---

# Debug Flutter apps from code

Which debugging features you can enable in your code and at the command line: logging, programmatic breakpoints, per-layer tree dumps, debug flags, animation slow-down, and performance tracing.

## Signature / Usage

```dart
import 'dart:developer' as developer;

void main() {
  developer.log('log me', name: 'my.app.category');

  developer.log('log me 1', name: 'my.other.category');
  developer.log('log me 2', name: 'my.other.category');
}
```

## Add logging to your application

You can view your logs in DevTools' Logging view or in your system console.

- `print()`: prints a `stdout` message. Part of the `dart:io` library.
- `stderr.method_to_invoke()`: prints a `stderr` message. Replace `method_to_invoke()` with a method supported by `stderr`, such as `writeln()` or `write()`. Often used in a `try...catch` block. Part of `dart:io`.
- `log()`: includes greater granularity and more information in the logging output. Part of `dart:developer`.
- `debugPrint()`: if too much output results in discarded log lines, use this to keep those lines. Will print messages in release mode unless part of a debug mode check or an assert. Part of the `foundations` library.

```dart
stderr.writeln('print me');
```

You can also pass app data to the log call. The convention is to use the `error:` named parameter on the `log()` call, JSON encode the object you want to send, and pass the encoded string to the error parameter. DevTools' logging view interprets the JSON encoded error parameter as a data object and renders it in the details view for that log entry.

```dart
import 'dart:convert';
import 'dart:developer' as developer;

void main() {
  var myCustomObject = MyCustomObject();

  developer.log(
    'log me',
    name: 'my.app.category',
    error: jsonEncode(myCustomObject),
  );
}
```

## Set breakpoints

You can set breakpoints in DevTools' Debugger or in the built-in debugger of your IDE. To set programmatic breakpoints, import `dart:developer` and insert `debugger()` statements. The statement takes an optional `when` argument; this boolean argument sets a break when the given condition resolves to true.

```dart
import 'dart:developer';

void someFunction(double offset) {
  debugger(when: offset > 30);
  // ...
}
```

## Debug app layers using flags

Each layer of the Flutter framework provides a function to dump its current state or events to the console using the `debugPrint` property. Each render object in any tree includes the first five hexadecimal digits of its `hashCode`, which serves as a unique identifier for that render object. The official examples were run as macOS native apps on a MacBook Pro M1; dumps on your machine will differ.

### Print the widget tree

Call `debugDumpApp()` (you need your app in debug mode; you cannot call it inside a `build()` method when the app is building). It recursively calls `toStringDeep()` starting with the root of the widget tree and returns a "flattened" tree.

```dart
import 'package:material_ui/material_ui.dart';

void main() {
  runApp(const MaterialApp(home: AppHome()));
}

class AppHome extends StatelessWidget {
  const AppHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Center(
        child: TextButton(
          onPressed: () {
            debugDumpApp();
          },
          child: const Text('Dump Widget Tree'),
        ),
      ),
    );
  }
}
```

The dump includes all the widgets projected through their various build functions, and many widgets that don't appear in your app's source (for example `_InkFeatures`, part of `Material`). When the button changes from pressed to released it invokes `debugDumpApp()` and `TextButton` calls `setState()`, marking itself dirty. Look for a line like:

```plaintext
└TextButton(dirty, dependencies: [MediaQuery, _InheritedTheme, _LocalizationsScope-[GlobalKey#5880d]], state: _ButtonStyleState#ab76e)
```

First lines of the widget tree dump from the official page (truncated here; the page includes the full tree):

```plaintext
flutter: WidgetsFlutterBinding - DEBUG MODE
flutter: [root](renderObject: RenderView#06beb)
flutter: └View-[GlobalObjectKey FlutterView#7971c]
flutter:  └_ViewScope
flutter:   └_MediaQueryFromView(state: _MediaQueryFromViewState#d790c)
flutter:    └MediaQuery(MediaQueryData(size: Size(800.0, 600.0), devicePixelRatio: 1.0, textScaleFactor: 1.0, platformBrightness: Brightness.dark, padding: EdgeInsets.zero, viewPadding: EdgeInsets.zero, viewInsets: EdgeInsets.zero, systemGestureInsets: EdgeInsets.zero, alwaysUse24HourFormat: false, accessibleNavigation: false, highContrast: false, disableAnimations: false, invertColors: false, boldText: false, navigationMode: traditional, gestureSettings: DeviceGestureSettings(touchSlop: null), displayFeatures: []))
flutter:     └MaterialApp(state: _MaterialAppState#27fa9)
flutter:      └ScrollConfiguration(behavior: MaterialScrollBehavior)
flutter:       └HeroControllerScope
flutter:        └Focus(state: _FocusState#d7f97)
flutter:         └_FocusInheritedScope
```

If you write your own widgets, override `debugFillProperties()` to add information. Add `DiagnosticsProperty` objects to the method's argument and call the superclass method. The `toString` method uses this function to fill in the widget's description.

### Print the render tree

When debugging a layout issue, the Widgets layer's tree might lack detail. Call `debugDumpRenderTree()` (any time except during a layout or paint phase; consider calling it from a frame callback or an event handler).

```dart
import 'package:material_ui/material_ui.dart';

void main() {
  runApp(const MaterialApp(home: AppHome()));
}

class AppHome extends StatelessWidget {
  const AppHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Center(
        child: TextButton(
          onPressed: () {
            debugDumpRenderTree();
          },
          child: const Text('Dump Render Tree'),
        ),
      ),
    );
  }
}
```

When debugging layout issues, look at the `size` and `constraints` fields. The constraints flow down the tree and the sizes flow back up. In the official dump for this example:

- The `RenderView`, or window size, limits all render objects up to and including the `RenderPositionedBox#dc1df` render object to the size of the screen (`Size(800.0, 600.0)`).
- The `constraints` property of each render object limits the size of each child (a `BoxConstraints` value). Starting with `RenderSemanticsAnnotations#fe6b5`, the constraint equals `BoxConstraints(w=800.0, h=600.0)`.
- The `Center` widget created the `RenderPositionedBox#dc1df` render object under the `RenderSemanticsAnnotations#8187b` subtree.
- Each child under this render object has `BoxConstraints` with both minimum and maximum values, for example `RenderSemanticsAnnotations#a0a4b` uses `BoxConstraints(0.0<=w<=800.0, 0.0<=h<=600.0)`.
- All children of the `RenderPhysicalShape#8e171` render object use `BoxConstraints(BoxConstraints(56.0<=w<=800.0, 28.0<=h<=600.0))`.
- The child `RenderPadding#8455f` sets a `padding` value of `EdgeInsets(8.0, 0.0, 8.0, 0.0)`, giving new constraints `BoxConstraints(40.0<=w<=784.0, 28.0<=h<=600.0)`.

The `TextButton` implements the Material Design guidelines regarding button dimensions: a minimum width of 88 pixels and a specific height of 36.0. The `RenderPositionedBox#80b8d` render object loosens the constraints again to center the text within the button. The `RenderParagraph#59bc2` render object picks its size based on its contents. All parents take their child's dimensions to size themselves.

The `relayoutBoundary` attribute tells you how many ancestors depend on this element's size. For example, the innermost `RenderPositionedBox` line has `relayoutBoundary=up13`: when Flutter marks the `RenderConstrainedBox` as dirty, it also marks its 13 ancestors as dirty because the new dimensions might affect those ancestors.

Excerpt of the render tree dump from the official page (truncated):

```plaintext
flutter: RenderView#02c80
flutter:  │ debug mode enabled - macos
flutter:  │ view size: Size(800.0, 600.0) (in physical pixels)
flutter:  │ device pixel ratio: 1.0 (physical pixels per logical pixel)
flutter:  │ configuration: Size(800.0, 600.0) at 1.0x (in logical pixels)
flutter:  │
flutter:  └─child: RenderSemanticsAnnotations#fe6b5
flutter:    │ needs compositing
flutter:    │ creator: Semantics ← _FocusInheritedScope ← Focus ←
flutter:    │   HeroControllerScope ← ScrollConfiguration ← MaterialApp ←
flutter:    │   MediaQuery ← _MediaQueryFromView ← _ViewScope ←
flutter:    │   View-[GlobalObjectKey FlutterView#6cffa] ← [root]
flutter:    │ parentData: <none>
flutter:    │ constraints: BoxConstraints(w=800.0, h=600.0)
flutter:    │ size: Size(800.0, 600.0)
```

To add information to the dump for your own render objects, override `debugFillProperties()`, add `DiagnosticsProperty` objects, then call the superclass method.

### Print the layer tree

To debug a compositing issue, use `debugDumpLayerTree()`.

```dart
import 'package:material_ui/material_ui.dart';

void main() {
  runApp(const MaterialApp(home: AppHome()));
}

class AppHome extends StatelessWidget {
  const AppHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Center(
        child: TextButton(
          onPressed: () {
            debugDumpLayerTree();
          },
          child: const Text('Dump Layer Tree'),
        ),
      ),
    );
  }
}
```

Output for this example:

```plaintext
flutter: TransformLayer#214da
flutter:  │ owner: RenderView#ebaaf
flutter:  │ creator: [root]
flutter:  │ engine layer: TransformEngineLayer#535de
flutter:  │ handles: 1
flutter:  │ offset: Offset(0.0, 0.0)
flutter:  │ transform:
flutter:  │   [0] 1.0,0.0,0.0,0.0
flutter:  │   [1] 0.0,1.0,0.0,0.0
flutter:  │   [2] 0.0,0.0,1.0,0.0
flutter:  │   [3] 0.0,0.0,0.0,1.0
flutter:  │
flutter:  ├─child 1: OffsetLayer#0f766
flutter:  │ │ creator: RepaintBoundary ← _FocusInheritedScope ← Semantics ←
flutter:  │ │   FocusScope ← PrimaryScrollController ← _ActionsScope ← Actions
flutter:  │ │   ← Builder ← PageStorage ← Offstage ← _ModalScopeStatus ←
flutter:  │ │   UnmanagedRestorationScope ← ⋯
flutter:  │ │ engine layer: OffsetEngineLayer#1768d
flutter:  │ │ handles: 2
flutter:  │ │ offset: Offset(0.0, 0.0)
flutter:  │ │
flutter:  │ ├─child 1: PictureLayer#dd023
flutter:  │ │   handles: 1
flutter:  │ │   paint bounds: Rect.fromLTRB(0.0, 0.0, 800.0, 600.0)
flutter:  │ │   picture: _NativePicture#36f94
flutter:  │ │   raster cache hints: isComplex = false, willChange = false
flutter:  │ │
flutter:  │ └─child 2: OffsetLayer#4cfc8
flutter:  │   │ creator: RepaintBoundary-[GlobalKey#bd5d9] ← IgnorePointer ←
flutter:  │   │   AnimatedBuilder ← Stack ←
flutter:  │   │   _CupertinoBackGestureDetector<dynamic> ← DecoratedBox ←
flutter:  │   │   DecoratedBoxTransition ← FractionalTranslation ←
flutter:  │   │   SlideTransition ← FractionalTranslation ← SlideTransition ←
flutter:  │   │   CupertinoPageTransition ← ⋯
flutter:  │   │ engine layer: OffsetEngineLayer#a1676
flutter:  │   │ handles: 2
flutter:  │   │ offset: Offset(0.0, 0.0)
flutter:  │   │
flutter:  │   └─child 1: PictureLayer#aee55
flutter:  │       handles: 1
flutter:  │       paint bounds: Rect.fromLTRB(0.0, 0.0, 800.0, 600.0)
flutter:  │       picture: _NativePicture#e732d
flutter:  │       raster cache hints: isComplex = false, willChange = false
flutter:  │
flutter:  └─child 2: PictureLayer#b16e5
flutter:      handles: 1
flutter:      paint bounds: Rect.fromLTRB(0.0, 0.0, 800.0, 600.0)
flutter:      picture: _NativePicture#eef0a
flutter:      raster cache hints: isComplex = false, willChange = false
flutter:
```

The `RepaintBoundary` widget creates a `RenderRepaintBoundary` RenderObject in the render tree and a new layer in the layer tree (the `OffsetLayer#0f766` above). This reduces how much needs to be repainted.

### Print the focus tree

To debug a focus or shortcut issue, dump the focus tree using `debugDumpFocusTree()`. The focus tree labels nodes as follows: the focused node is labeled `PRIMARY FOCUS`; ancestors of the focus nodes are labeled `IN FOCUS PATH`. If your app uses the `Focus` widget, use its `debugLabel` property to simplify finding its focus node in the tree. You can also use the `debugFocusChanges` boolean property to enable extensive logging when the focus changes.

```dart
import 'package:material_ui/material_ui.dart';

void main() {
  runApp(const MaterialApp(home: AppHome()));
}

class AppHome extends StatelessWidget {
  const AppHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Center(
        child: TextButton(
          onPressed: () {
            debugDumpFocusTree();
          },
          child: const Text('Dump Focus Tree'),
        ),
      ),
    );
  }
}
```

Excerpt of the output (truncated):

```plaintext
flutter: FocusManager#9d096
flutter:  │ primaryFocus: FocusScopeNode#926dc(_ModalScopeState<dynamic>
flutter:  │   Focus Scope [PRIMARY FOCUS])
flutter:  │ primaryFocusCreator: FocusScope ← PrimaryScrollController ←
flutter:  │   _ActionsScope ← Actions ← Builder ← PageStorage ← Offstage ←
flutter:  │   _ModalScopeStatus ← UnmanagedRestorationScope ←
flutter:  │   RestorationScope ← AnimatedBuilder ←
flutter:  │   _ModalScope<dynamic>-[LabeledGlobalKey<_ModalScopeState<dynamic>>#bd53e]
flutter:  │   ← Semantics ← _RenderTheaterMarker ← _EffectiveTickerMode ←
flutter:  │   TickerMode ←
flutter:  │   _OverlayEntryWidget-[LabeledGlobalKey<_OverlayEntryWidgetState>#89dd7]
flutter:  │   ← _Theater ← Overlay-[LabeledGlobalKey<OverlayState>#52f82] ←
flutter:  │   UnmanagedRestorationScope ← ⋯
flutter:  │
flutter:  └─rootScope: FocusScopeNode#f4205(Root Focus Scope [IN FOCUS PATH])
flutter:    │ IN FOCUS PATH
flutter:    │ focusedChildren: FocusScopeNode#a0d10(Navigator Scope [IN FOCUS
flutter:    │   PATH])
```

### Print the semantics tree

The `debugDumpSemanticsTree()` function prints the semantic tree for the app. The Semantics tree is presented to the system accessibility APIs. To obtain a dump, enable accessibility using a system accessibility tool or the `SemanticsDebugger`, then use `debugDumpSemanticsTree()`.

```dart
import 'package:flutter/foundation.dart';
import 'package:flutter/rendering.dart';
import 'package:material_ui/material_ui.dart';

void main() {
  runApp(const MaterialApp(home: AppHome()));
}

class AppHome extends StatelessWidget {
  const AppHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Center(
        child: Semantics(
          button: true,
          enabled: true,
          label: 'Clickable text here!',
          child: GestureDetector(
            onTap: () {
              debugDumpSemanticsTree();
              if (kDebugMode) {
                print('Clicked!');
              }
            },
            child: const Text('Click Me!', style: TextStyle(fontSize: 56)),
          ),
        ),
      ),
    );
  }
}
```

Output:

```plaintext
flutter: SemanticsNode#0
flutter:  │ Rect.fromLTRB(0.0, 0.0, 800.0, 600.0)
flutter:  │
flutter:  └─SemanticsNode#1
flutter:    │ Rect.fromLTRB(0.0, 0.0, 800.0, 600.0)
flutter:    │ textDirection: ltr
flutter:    │
flutter:    └─SemanticsNode#2
flutter:      │ Rect.fromLTRB(0.0, 0.0, 800.0, 600.0)
flutter:      │ sortKey: OrdinalSortKey#824a2(order: 0.0)
flutter:      │
flutter:      └─SemanticsNode#3
flutter:        │ Rect.fromLTRB(0.0, 0.0, 800.0, 600.0)
flutter:        │ flags: scopesRoute
flutter:        │
flutter:        └─SemanticsNode#4
flutter:            Rect.fromLTRB(278.0, 267.0, 522.0, 333.0)
flutter:            actions: tap
flutter:            flags: isButton, hasEnabledState, isEnabled
flutter:            label:
flutter:              "Clickable text here!
flutter:              Click Me!"
flutter:            textDirection: ltr
flutter:
flutter: Clicked!
```

### Print event timings

To find out where your events happen relative to the frame's begin and end, toggle `debugPrintBeginFrameBanner` and `debugPrintEndFrameBanner`. The print frame banner log:

```plaintext
I/flutter : ▄▄▄▄▄▄▄▄ Frame 12         30s 437.086ms ▄▄▄▄▄▄▄▄
I/flutter : Debug print: Am I performing this work more than once per frame?
I/flutter : Debug print: Am I performing this work more than once per frame?
I/flutter : ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
```

To print the call stack causing the current frame to be scheduled, use the `debugPrintScheduleFrameStacks` flag.

## Debug layout issues

To debug a layout problem using a GUI, set `debugPaintSizeEnabled` to `true`. This flag can be found in the `rendering` library. You can enable it at any time and it affects all painting while `true`. Consider adding it to the top of your `void main()` entry point.

```dart
// Add import to the Flutter rendering library.
import 'package:flutter/rendering.dart';
import 'package:material_ui/material_ui.dart';

void main() {
  debugPaintSizeEnabled = true;
  runApp(const MyApp());
}
```

When enabled, Flutter displays: all boxes in a bright teal border; all padding as a box with a faded blue fill and blue border around the child widget; all alignment positioning with yellow arrows; all spacers in gray, when they have no child.

- `debugPaintBaselinesEnabled`: does something similar but for objects with baselines. The app displays the baseline for alphabetic characters in bright green and the baseline for ideographic characters in orange. Flutter positions the ideographic baseline at the very bottom of the text line.
- `debugPaintPointersEnabled`: turns on a special mode that highlights any objects that you tap in teal. This can help you determine if an object fails to hit test (for example, an object outside the bounds of its parent isn't considered for hit testing).
- `debugPaintLayerBordersEnabled`: finds the boundaries of each layer; each layer's bounds are outlined in orange.
- `debugRepaintRainbowEnabled`: displays a repainted layer; whenever a layer repaints, it overlays with a rotating set of colors.

Any function or method in the Flutter framework that starts with `debug...` only works in debug mode.

## Debug animation issues

To debug animations with the least effort, slow them down: click **Slow Animations** in DevTools' Inspector view, which reduces the animation to 20% speed. For more control, set the `timeDilation` variable (from the `scheduler` library) to a number greater than 1.0, for instance, 50.0. It's best to only set this once on app startup. If you change it on the fly, especially if you reduce it while animations are running, it's possible that the framework will observe time going backwards, which will probably result in asserts and generally interfere with your efforts.

## Debug performance issues

You can achieve similar results to some of these debug flags using DevTools. Some of the debug flags provide little benefit. To use these features, compile your app in debug mode. The following list highlights some flags and one function from the `rendering` library for debugging performance issues.

- `debugDumpRenderTree()`: to dump the rendering tree to the console, call this function when not in a layout or repaint phase. To set these flags either edit the framework code, or import the module, set the value in your `main()` function, then hot restart.
- `debugPaintLayerBordersEnabled`: to display the boundaries of each layer, set this property to `true`. When set, each layer paints a box around its boundary.
- `debugRepaintRainbowEnabled`: to display a colored border around each widget, set this property to `true`. These borders change color as the app user scrolls in the app. To set this flag, add `debugRepaintRainbowEnabled = true;` as a top-level property in your app. If any static widgets rotate through colors after setting this flag, consider adding repaint boundaries to those areas.
- `debugPrintMarkNeedsLayoutStacks`: to determine if your app creates more layouts than expected, set this property to `true`. When set, the framework outputs stack traces to the console to explain why your app marks each render object to be laid out.
- `debugPrintMarkNeedsPaintStacks`: to determine if your app paints more layouts than expected, set this property to `true`.

You can generate stack traces on demand as well. To print your own stack traces, add the `debugPrintStack()` function to your app.

### Trace Dart code performance

To perform custom performance traces and measure wall or CPU time of arbitrary segments of Dart code, use `dart:developer` `Timeline` utilities. Wrap the code you want to measure in `Timeline` methods; while connected to your app, open DevTools' Timeline events tab and select the **Dart** recording option in the **Performance settings**, then perform the function you want to measure. You can also import and export trace files into the Timeline view, but only files generated by DevTools.

```dart
import 'dart:developer';

void main() {
  Timeline.startSync('interesting function');
  // iWonderHowLongThisTakes();
  Timeline.finishSync();
}
```

To ensure that the runtime performance characteristics closely match that of your final product, run your app in profile mode.

### Add performance overlay

You can toggle display of the performance overlay using the **Performance Overlay** button in the Flutter inspector. To enable the `PerformanceOverlay` widget in code, set the `showPerformanceOverlay` property to `true` on the `MaterialApp`, `CupertinoApp`, or `WidgetsApp` constructor:

```dart
import 'package:material_ui/material_ui.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      showPerformanceOverlay: true,
      title: 'My Awesome App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const MyHomePage(title: 'My Awesome App'),
    );
  }
}
```

If you're not using `MaterialApp`, `CupertinoApp`, or `WidgetsApp`, you can get the same effect by wrapping your application in a stack and putting a widget on your stack that was created by calling `PerformanceOverlay.allEnabled()`. To learn how to interpret the graphs in the overlay, check out "The performance overlay" in "Profiling Flutter performance".

## Add widget alignment grid

To add an overlay to a Material Design baseline grid on your app to help verify alignments, add the `debugShowMaterialGrid` argument in the `MaterialApp` constructor. To add an overlay to non-Material applications, add a `GridPaper` widget.

## Notes

- Use the dump functions only in debug mode; `debug...` flags and functions don't work in other modes. `debugDumpApp()` cannot be called inside `build()` while the app is building, and `debugDumpRenderTree()` cannot be called during a layout or paint phase.
- The full widget, render, focus, and layer tree dumps are long; only excerpts of the widget, render, and focus trees are reproduced here. See the official page for the full output.
- The snippets import `package:material_ui/material_ui.dart` as written in the official page. Per the Flutter 3.47 notes, `material_ui` / `cupertino_ui` are standalone packages you can opt in to; the in-framework `package:flutter/material.dart` is not yet deprecated in 3.47.7.
- Distance line: `Timeline`, `debugger()`, and the dumps here are Dart / Flutter tooling. The `showPerformanceOverlay` and `MaterialApp` entries are Flutter widgets, not Compose or SwiftUI components of the same name.

## Related

- [Debug Flutter apps](./debugging.md)
- [Flutter performance profiling](./ui-performance.md)
- [Common Flutter errors](./common-errors.md)
