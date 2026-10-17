---
source: https://docs.flutter.dev/platform-integration/web/web-content-in-flutter
---

# Embedding web content into a Flutter web app

Flutter web can render arbitrary web content within the boundaries of a widget, for example a `google_maps_flutter` view or a `video_player` (standard `video` element), using `HtmlElementView`.

## Signature / Usage

`HtmlElementView` reserves a space in the layout to be filled with any HTML element. It has two constructors: `HtmlElementView.fromTagName`, and `HtmlElementView` with `registerViewFactory`.

`HtmlElementView.fromTagName` creates an HTML element from its `tagName` and provides `onElementCreated` to configure the element before it is injected into the DOM:

```dart
// Create a `video` tag, and set its `src` and some `style` properties...
HtmlElementView.fromTagName(
  tagName: 'video',
  onElementCreated: (Object video) {
    video as web.HTMLVideoElement;
    video.src =
        'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
    video.style.width = '100%';
    video.style.height = '100%';
    // other customizations to the element...
  },
);
```

For more control, register your own HTML element factory per type of content:

1. Register the factory using `platformViewRegistry.registerViewFactory` from `dart:ui_web`.
2. Place the widget with `HtmlElementView(viewType: 'viewType')` in the widget tree.

## Fixing hit testing issues

Underlying platform views can swallow pointer events before they reach Flutter. Use `package:pointer_interceptor`: the `PointerInterceptor` widget creates an empty, transparent platform view directly behind its child in paint order, catching browser pointer events before they reach the `HtmlElementView`.

```yaml
dependencies:
  pointer_interceptor: ^0.10.1+2
```

Wrap an interactive widget:

```dart
PointerInterceptor(
  child: FloatingActionButton(
    onPressed: () {
      // Handle button press
    },
    child: const Icon(Icons.add),
  ),
)
```

Wrap overlay containers such as a `Drawer`, dialog, or popup menu:

```dart
Scaffold(
  drawer: PointerInterceptor(
    child: Drawer(
      child: ListView(
        children: [
          ListTile(
            title: const Text('Home'),
            onTap: () {
              // Handle navigation
            },
          ),
        ],
      ),
    ),
  ),
  body: HtmlElementView.fromTagName(tagName: 'iframe'),
)
```

Conditionally intercept with `intercepting`:

```dart
PointerInterceptor(
  intercepting: isOverlayVisible,
  child: ElevatedButton(
    onPressed: () {
      // Handle button press
    },
    child: const Text('Submit'),
  ),
)
```

Visualize the intercepted region with `debug: true`:

```dart
PointerInterceptor(
  debug: true,
  child: ElevatedButton(
    onPressed: () {},
    child: const Text('Click me'),
  ),
)
```

## Notes

- When `intercepting` is `false`, `PointerInterceptor` renders its `child` directly without creating an extra platform view in the DOM.
- To embed a full HTML page in a Flutter web app, use an `iframe` through `HtmlElementView.fromTagName(tagName: 'iframe')` (see the Drawer example above). The source points to the Flutter team's `package:webview_flutter`, but that plugin targets Android, iOS, and macOS only; web support exists only in the separate, non-endorsed `package:webview_flutter_web` (iframe-based, limited API).
- The source recommends `package:webview_flutter` without stating its platforms; the platform scope and the iframe alternative were added here.
- `HtmlElementView` is a Flutter widget (Dart, web only); the `Scaffold`, `Drawer`, `Icon`, and `ListView` names in the examples are Flutter widgets, distinct from same-named components in android-compose-components, apple-swiftui, and similar skills.

## Related

- [Adding Flutter to any web application](./embedding-flutter-web.md)
- [Wasm](./wasm.md)
