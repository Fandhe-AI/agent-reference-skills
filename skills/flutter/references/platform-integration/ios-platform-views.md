---
source: https://docs.flutter.dev/platform-integration/ios/platform-views
---

# Host native iOS views in your Flutter app with platform views

Platform views embed native iOS views in a Flutter app, so you can apply transforms, clips, and opacity to the native view from Dart. iOS only uses hybrid composition: the native `UIView` is appended to the view hierarchy.

## Signature / Usage

Dart side:

```dart
Widget build(BuildContext context) {
  // This is used in the platform side to register the view.
  const String viewType = '<platform-view-type>';
  // Pass parameters to the platform side.
  final Map<String, dynamic> creationParams = <String, dynamic>{};

  return UiKitView(
    viewType: viewType,
    layoutDirection: TextDirection.ltr,
    creationParams: creationParams,
    creationParamsCodec: const StandardMessageCodec(),
  );
}
```

Platform side (Swift): factory, UIKit platform view, and registration in `AppDelegate.swift`.

```swift
class FLNativeViewFactory: NSObject, FlutterPlatformViewFactory {
    private var messenger: FlutterBinaryMessenger

    init(messenger: FlutterBinaryMessenger) {
        self.messenger = messenger
        super.init()
    }

    func create(
        withFrame frame: CGRect,
        viewIdentifier viewId: Int64,
        arguments args: Any?
    ) -> FlutterPlatformView {
        return FLNativeView(
            frame: frame,
            viewIdentifier: viewId,
            arguments: args,
            binaryMessenger: messenger)
    }

    /// Implementing this method is only necessary when the `arguments` in `createWithFrame` is not `nil`.
    public func createArgsCodec() -> FlutterMessageCodec & NSObjectProtocol {
          return FlutterStandardMessageCodec.sharedInstance()
    }
}

class FLNativeView: NSObject, FlutterPlatformView {
    private var _view: UIView

    init(
        frame: CGRect,
        viewIdentifier viewId: Int64,
        arguments args: Any?,
        binaryMessenger messenger: FlutterBinaryMessenger?
    ) {
        _view = UIView()
        super.init()
        // iOS views can be created here
        createNativeView(view: _view)
    }

    func view() -> UIView {
        return _view
    }

    func createNativeView(view _view: UIView){
        _view.backgroundColor = UIColor.blue
        let nativeLabel = UILabel()
        nativeLabel.text = "Native text from iOS"
        nativeLabel.textColor = UIColor.white
        nativeLabel.textAlignment = .center
        nativeLabel.frame = CGRect(x: 0, y: 0, width: 180, height: 48.0)
        _view.addSubview(nativeLabel)
    }
}

@main
@objc class AppDelegate: FlutterAppDelegate, FlutterImplicitEngineDelegate {

    func didInitializeImplicitFlutterEngine(_ engineBridge: FlutterImplicitEngineBridge) {
        GeneratedPluginRegistrant.register(with: engineBridge.pluginRegistry)

        guard let pluginRegistrar = engineBridge.pluginRegistry.registrar(forPlugin: "plugin-name") else { return }

        let factory = FLNativeViewFactory(messenger: pluginRegistrar.messenger())
        pluginRegistrar.register(
            factory,
            withId: "<platform-view-type>")
    }
}
```

SwiftUI variant: wrap the SwiftUI view in a `UIHostingController`, store it as a property of `FLNativeView`, set `hostingController.view.frame = frame`, and return `hostingController.view` from `view()`.

```swift
class FLNativeView: NSObject, FlutterPlatformView {
    private let hostingController: UIHostingController<MySwiftUIView>

    init(
        frame: CGRect,
        viewIdentifier viewId: Int64,
        arguments args: Any?,
        binaryMessenger messenger: FlutterBinaryMessenger?
    ) {
        hostingController = UIHostingController(rootView: MySwiftUIView())
        super.init()
        hostingController.view.frame = frame
    }

    func view() -> UIView {
        return hostingController.view
    }
}
```

Plugin registration (`FLPlugin.swift`):

```swift
class FLPlugin: NSObject, FlutterPlugin {
    public static func register(with registrar: FlutterPluginRegistrar) {
        let factory = FLNativeViewFactory(messenger: registrar.messenger())
        registrar.register(factory, withId: "<platform-view-type>")
    }
}
```

Objective-C registration (`AppDelegate.m`; headers `FLNativeView.h` declare `FLNativeViewFactory` and `FLNativeView`):

```objc
- (void)didInitializeImplicitFlutterEngine:(NSObject<FlutterImplicitEngineBridge>*)engineBridge {
  [GeneratedPluginRegistrant registerWithRegistry:engineBridge.pluginRegistry];

  NSObject<FlutterPluginRegistrar>* registrar =
      [engineBridge.pluginRegistry registrarForPlugin:@"plugin-name"];

  FLNativeViewFactory* factory =
      [[FLNativeViewFactory alloc] initWithMessenger:registrar.messenger];

  [registrar registerViewFactory:factory withId:@"<platform-view-type>"];
}
```

Pick the widget per platform in Dart:

```dart
switch (defaultTargetPlatform) {
  case TargetPlatform.android:
  // return widget on Android.
  case TargetPlatform.iOS:
  // return widget on iOS.
  case TargetPlatform.macOS:
  // return widget on macOS.
  default:
    throw UnsupportedError('Unsupported platform view');
}
```

## Notes

- In Flutter 3.41 and later, iOS apps use the `UIScene` lifecycle by default. For apps using `UIScene` you must implement `FlutterImplicitEngineDelegate` and register your platform views inside `didInitializeImplicitFlutterEngine(_:)` (Objective-C: `didInitializeImplicitFlutterEngine:`). See the UISceneDelegate adoption guide (`/release/breaking-changes/uiscenedelegate#migrate-appdelegate`).
- Implementing `createArgsCodec` is only necessary when the `arguments` in `createWithFrame` is not `nil`.
- Composition limitations: the `ShaderMask` and `ColorFiltered` widgets are not supported. `BackdropFilter` is supported with limitations (see the "iOS Platform View Backdrop Filter Blur" design doc).
- Performance: platform views carry performance trade-offs. For complex cases, use a placeholder texture while an animation is happening in Dart (take a screenshot of the native view and render it as a texture).
- Related guides: Hosting native Android views and Hosting native macOS views.
- This page is the Flutter-side hosting mechanism. UIKit / SwiftUI view APIs belong to the apple-uikit and apple-swiftui skills. `UiKitView` here is a Flutter widget, distinct from SwiftUI views of similar names.

## Related

- [android-platform-views](./android-platform-views.md)
- [macos-platform-views](./macos-platform-views.md)
- [ios-apple-frameworks](./ios-apple-frameworks.md)
