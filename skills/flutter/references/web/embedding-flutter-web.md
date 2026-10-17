---
source: https://docs.flutter.dev/platform-integration/web/embedding-flutter-web
---

# Adding Flutter to any web application

Flutter views and web content can be composed in two ways: a Flutter view controls the full page (full page mode), or Flutter views are added to an existing web application (embedded mode).

## Signature / Usage

Full page mode is the default for new Flutter web projects; no extra configuration is needed. It is used when Flutter web is launched without `multiViewEnabled` or a `hostElement`.

```html
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    <script src="flutter_bootstrap.js" defer></script>
  </body>
</html>
```

`iframe` embedding (full page mode is recommended when embedding through an `iframe`; the embedding page sizes and positions the frame and Flutter fills it):

```html
<iframe src="https://url-to-your-flutter/index.html"></iframe>
```

## iframe vs direct DOM embedding

| Feature | `iframe` embedding | Direct DOM embedding (`hostElement` / multiview) |
| --- | --- | --- |
| Isolation & sandboxing | Full browser sandboxing with separate JS global scope, DOM tree, and CSS styles | Shares the same DOM tree and JavaScript context |
| Memory & engine instances | Each `iframe` initializes its own Flutter engine, WebAssembly/JS runtime, and memory heap | A single Flutter engine instance and memory heap can manage one or more views (multiview) |
| JavaScript interop | Asynchronous messaging (such as `postMessage`) | Direct synchronous communication using `package:web` and `dart:js_interop` |
| Styling & layout | Independent frame isolated from host page CSS | Direct integration into host page CSS layout (such as flexbox and grid) |
| State sharing | State must be synchronized across window boundaries | Direct state sharing in Dart across all attached views |
| Best for | Third-party widgets, untrusted content, isolated micro-frontends, simple drop-in embeds | Embedded UI components in existing web apps, multi-view dashboards, tight host-app integration |

## Embedded mode (multi-view)

In this mode a Flutter web app can launch but does not render until the first view is added with `addView`; the host can add or remove views; the Flutter app is notified of changes.

Enable it with `multiViewEnabled: true` in `initializeEngine`:

```js
{{flutter_js}}
{{flutter_build_config}}

_flutter.loader.load({
  onEntrypointLoaded: async function onEntrypointLoaded(engineInitializer) {
    let engine = await engineInitializer.initializeEngine({
      multiViewEnabled: true, // Enables embedded mode.
    });
    let app = await engine.runApp();
    // Make this `app` object available to your JS app.
  }
});
```

Manage views from JS with the `app` object returned by `runApp`:

```js
// Adding a view...
let viewId = app.addView({
  hostElement: document.querySelector('#some-element'),
});

// Removing viewId...
let viewConfig = app.removeView(viewId);
```

### Handling view changes from Dart

View additions and removals are surfaced through `WidgetsBindingObserver.didChangeMetrics`. All attached views are available via `WidgetsBinding.instance.platformDispatcher.views` (type `FlutterView`). Render into each `FlutterView` with a `View` widget; `View` widgets can be grouped under a `ViewCollection` widget. A `WidgetBuilder` runs for each `FlutterView`:

```dart
import 'dart:ui' show FlutterView;
import 'package:flutter/widgets.dart';

/// Calls [viewBuilder] for every view added to the app to obtain the widget to
/// render into that view. The current view can be looked up with [View.of].
class MultiViewApp extends StatefulWidget {
  const MultiViewApp({super.key, required this.viewBuilder});

  final WidgetBuilder viewBuilder;

  @override
  State<MultiViewApp> createState() => _MultiViewAppState();
}

class _MultiViewAppState extends State<MultiViewApp> with WidgetsBindingObserver {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _updateViews();
  }

  @override
  void didUpdateWidget(MultiViewApp oldWidget) {
    super.didUpdateWidget(oldWidget);
    // Need to re-evaluate the viewBuilder callback for all views.
    _views.clear();
    _updateViews();
  }

  @override
  void didChangeMetrics() {
    _updateViews();
  }

  Map<Object, Widget> _views = <Object, Widget>{};

  void _updateViews() {
    final Map<Object, Widget> newViews = <Object, Widget>{};
    for (final FlutterView view in WidgetsBinding.instance.platformDispatcher.views) {
      final Widget viewWidget = _views[view.viewId] ?? _createViewWidget(view);
      newViews[view.viewId] = viewWidget;
    }
    setState(() {
      _views = newViews;
    });
  }

  Widget _createViewWidget(FlutterView view) {
    return View(
      view: view,
      child: Builder(
        builder: widget.viewBuilder,
      ),
    );
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ViewCollection(views: _views.values.toList(growable: false));
  }
}
```

### Replace `runApp` by `runWidget`

`runApp` assumes at least one view (the `implicitView`). In multi-view mode the `implicitView` does not exist, so `runApp` fails with `Unexpected null value` errors. Call `runWidget` instead; it only renders into explicitly added views:

```dart
void main() {
  runWidget(
    MultiViewApp(
      viewBuilder: (BuildContext context) => const MyApp(),
    ),
  );
}
```

### Identifying views

Each `FlutterView` has a `viewId` assigned when attached:

```dart
class SomeWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Retrieve the `viewId` where this Widget is being built:
    final int viewId = View.of(context).viewId;
    // ...
```

### Initial view configuration

Pass initialization data from JS via the `initialData` property of `addView`:

```js
// Adding a view with initial data...
let viewId = app.addView({
  hostElement: someElement,
  initialData: {
    greeting: 'Hello, world!',
    randomValue: Math.floor(Math.random() * 100),
  }
});
```

In Dart, `initialData` is a `JSAny` accessible through the top-level `views` property in `dart:ui_web`, by the current `viewId`:

```dart
final initialData = ui_web.views.getInitialData(viewId) as YourJsInteropType;
```

### View constraints

By default an embedded view treats the size of its `hostElement` as immutable and tightly constrains its layout to the available space. Pass `viewConstraints` to `addView` to inform Flutter how the view needs to be laid out:

```js
// Adding a view with constraints...
let viewId = app.addView({
  hostElement: someElement,
  viewConstraints: {
    maxWidth: 320,
    minHeight: 0,
    maxHeight: Infinity,
  }
});
```

## Custom element (`hostElement`)

Embed a single-view Flutter web app into any HTML element by passing a `config` object with `hostElement` to `_flutter.loader.load`:

```js
_flutter.loader.load({
  config: {
    hostElement: document.getElementById('flutter_host'),
  }
});
```

## Host element CSS requirements

An empty host `<div>` defaults to `height: auto` and `position: static`, giving a computed height of `0px`; Flutter then computes a zero-height view and nothing renders. Apply to the host element:

- `width` and `height`: explicit or relative dimensions that evaluate to non-zero (for example `width: 100%; height: 500px;`).
- `position: relative` (or `absolute` / `fixed`): establishes a positioning context for the canvas and DOM overlay layers.
- `overflow: hidden`: prevents the Flutter canvas and interaction elements from overflowing the container or causing unexpected scrollbars.

```css
#flutter_host {
  width: 100%;
  height: 600px;
  position: relative;
  overflow: hidden;
}
```

```html
<div id="flutter_host"></div>
```

## Notes

- Multi-view embedding also works with a single view. Advantages: views can be created and removed dynamically, and if single-view support is ever deprecated your app is unaffected.
- View constraints passed from JS must be compatible with the CSS of the `hostElement`; Flutter does not "fix" contradictory constraints (for example `max-height: 100px` in CSS with `maxHeight: Infinity` in Flutter).
- Flutter web multi-view embedding (Dart `View` / `ViewCollection`, `runWidget`) is distinct from embedding React / Next.js components (react, nextjs-app skills).

## Related

- [Flutter web app initialization](./initialization.md)
- [Embedding web content into a Flutter web app](./web-content-in-flutter.md)
