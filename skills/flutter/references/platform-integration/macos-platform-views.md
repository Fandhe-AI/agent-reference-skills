---
source: https://docs.flutter.dev/platform-integration/macos/platform-views
---

# Hosting native macOS views in your Flutter app with Platform Views

Platform views embed native macOS views in a Flutter app, so you can apply transforms, clips, and opacity to the native view from Dart. macOS uses hybrid composition: the native `NSView` is appended to the view hierarchy.

## Signature / Usage

Dart side:

```dart
Widget build(BuildContext context) {
  // This is used in the platform side to register the view.
  const String viewType = '<platform-view-type>';
  // Pass parameters to the platform side.
  final Map<String, dynamic> creationParams = <String, dynamic>{};

  return AppKitView(
    viewType: viewType,
    layoutDirection: TextDirection.ltr,
    creationParams: creationParams,
    creationParamsCodec: const StandardMessageCodec(),
  );
}
```

Platform side (`NativeView.swift`):

```swift
import Cocoa
import FlutterMacOS

class NativeViewFactory: NSObject, FlutterPlatformViewFactory {
  private var messenger: FlutterBinaryMessenger

  init(messenger: FlutterBinaryMessenger) {
    self.messenger = messenger
    super.init()
  }

  func create(
    withViewIdentifier viewId: Int64,
    arguments args: Any?
  ) -> NSView {
    return NativeView(
      viewIdentifier: viewId,
      arguments: args,
      binaryMessenger: messenger)
  }

  /// Implementing this method is only necessary when
  /// the `arguments` in `createWithFrame` is not `nil`.
  public func createArgsCodec() -> (FlutterMessageCodec & NSObjectProtocol)? {
    return FlutterStandardMessageCodec.sharedInstance()
  }
}

class NativeView: NSView {

  init(
    viewIdentifier viewId: Int64,
    arguments args: Any?,
    binaryMessenger messenger: FlutterBinaryMessenger?
  ) {
    super.init(frame: CGRect(x: 0, y: 0, width: 200, height: 200))
    wantsLayer = true
    layer?.backgroundColor = NSColor.systemBlue.cgColor
    // macOS views can be created here
    createNativeView(view: self)
  }

    required init?(coder nsCoder: NSCoder) {
        super.init(coder: nsCoder)
    }

  func createNativeView(view _view: NSView) {
    let nativeLabel = NSTextField()
    nativeLabel.frame = CGRect(x: 0, y: 0, width: 180, height: 48.0)
    nativeLabel.stringValue = "Native text from macOS"
    nativeLabel.textColor = NSColor.black
    nativeLabel.font = NSFont.systemFont(ofSize: 14)
    nativeLabel.isBezeled = false
    nativeLabel.focusRingType = .none
    nativeLabel.isEditable = true
    nativeLabel.sizeToFit()
    _view.addSubview(nativeLabel)
  }
}
```

App registration (`MainFlutterWindow.swift`):

```swift
class MainFlutterWindow: NSWindow {
  override func awakeFromNib() {
    // ...

    let registrar = flutterViewController.registrar(forPlugin: "plugin-name")
    let factory = NativeViewFactory(messenger: registrar.messenger)
    registrar.register(
      factory,
      withId: "<platform-view-type>")
  }
}
```

Plugin registration (`Plugin.swift`):

```swift
public class Plugin: NSObject, FlutterPlugin {
  public static func register(with registrar: FlutterPluginRegistrar) {
    let factory = NativeViewFactory(messenger: registrar.messenger)
    registrar.register(factory, withId: "<platform-view-type>")
  }
}
```

## Notes

- Platform view support on macOS is not fully functional as of the current release; for example, gesture support is not yet available on macOS (version note in the source).
- Performance: the Flutter UI is composed on the dedicated raster thread while the platform view performs graphics operations on the platform thread; Flutter synchronizes the two to rasterize the combined contents, so slow or blocking operations on the platform thread can negatively impact Flutter graphics performance.
- Use `defaultTargetPlatform` in Dart `build()` to choose the widget per platform (`TargetPlatform.android` / `iOS` / `macOS`), throwing `UnsupportedError('Unsupported platform view')` by default.
- Related guides: Hosting native Android views and Hosting native iOS views. API docs: `AppKitView`, `FlutterPlatformViewFactory`, `FlutterPlatformView`.
- This is the Flutter-side hosting mechanism. AppKit `NSView` APIs belong to the apple-appkit skill; `AppKitView` is a Flutter widget.

## Related

- [ios-platform-views](./ios-platform-views.md)
- [android-platform-views](./android-platform-views.md)
- [desktop](./desktop.md)
