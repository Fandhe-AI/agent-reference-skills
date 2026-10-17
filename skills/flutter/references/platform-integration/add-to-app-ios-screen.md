---
source: https://docs.flutter.dev/add-to-app/ios/add-flutter-screen
---

# Add a Flutter screen to an iOS app

How to add a single Flutter screen to an existing iOS app by starting a `FlutterEngine` and presenting a `FlutterViewController`.

## Signature / Usage

Create and pre-warm a `FlutterEngine` (UIKit Swift, `AppDelegate.swift`):

```swift
import UIKit
import Flutter
// The following library connects plugins with iOS platform code to this app.
import FlutterPluginRegistrant

@UIApplicationMain
class AppDelegate: FlutterAppDelegate { // More on FlutterAppDelegate and FlutterSceneDelegate below.
  lazy var flutterEngine = FlutterEngine(name: "my flutter engine")

  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Runs the default Dart entrypoint with a default Flutter route.
    flutterEngine.run();
    // Connects plugins with iOS platform code to this app.
    GeneratedPluginRegistrant.register(with: self.flutterEngine);
    return super.application(application, didFinishLaunchingWithOptions: launchOptions);
  }
}
```

Present the screen:

```swift
@objc func showFlutter() {
  let flutterEngine = (UIApplication.shared.delegate as! AppDelegate).flutterEngine
  let flutterViewController =
      FlutterViewController(engine: flutterEngine, nibName: nil, bundle: nil)
  present(flutterViewController, animated: true, completion: nil)
}
```

SwiftUI: hold the engine in an `@Observable` object and wrap `FlutterViewController` in `UIViewControllerRepresentable`:

```swift
@Observable
class FlutterDependencies {
  let flutterEngine = FlutterEngine(name: "my flutter engine")
  init() {
    // Runs the default Dart entrypoint with a default Flutter route.
    flutterEngine.run()
    // Connects plugins with iOS platform code to this app.
    GeneratedPluginRegistrant.register(with: self.flutterEngine);
  }
}

struct FlutterViewControllerRepresentable: UIViewControllerRepresentable {
  // Flutter dependencies are passed in through the view environment.
  @Environment(FlutterDependencies.self) var flutterDependencies

  func makeUIViewController(context: Context) -> some UIViewController {
    return FlutterViewController(
      engine: flutterDependencies.flutterEngine,
      nibName: nil,
      bundle: nil)
  }

  func updateUIViewController(_ uiViewController: UIViewControllerType, context: Context) {}
}
```

Objective-C equivalent of the engine creation:

```objc
self.flutterEngine = [[FlutterEngine alloc] initWithName:@"my flutter engine"];
// Runs the default Dart entrypoint with a default Flutter route.
[self.flutterEngine run];
// Connects plugins with iOS platform code to this app.
[GeneratedPluginRegistrant registerWithRegistry:self.flutterEngine];
```

Alternative without pre-warming (implicit engine; usually not recommended):

```swift
func showFlutter() {
  let flutterViewController = FlutterViewController(project: nil, nibName: nil, bundle: nil)
  present(flutterViewController, animated: true, completion: nil)
}
```

Subclass `FlutterSceneDelegate` in UIKit apps:

```swift
  import UIKit
+ import Flutter

- class SceneDelegate: UIResponder, UIWindowSceneDelegate {
+ class SceneDelegate: FlutterSceneDelegate {
```

SwiftUI app delegate that selects `FlutterSceneDelegate`:

```swift
override func application(
  _ application: UIApplication,
  configurationForConnecting connectingSceneSession: UISceneSession,
  options: UIScene.ConnectionOptions
) -> UISceneConfiguration {
  let configuration = UISceneConfiguration(
    name: nil,
    sessionRole: connectingSceneSession.role
  )
  configuration.delegateClass = FlutterSceneDelegate.self
  return configuration
}
```

Launch options:

Custom entrypoint:

```swift
let flutterEngine = FlutterEngine()
flutterEngine.run(withEntrypoint: "myOtherEntrypoint", libraryURI: "other_file.dart")
```

Initial route:

```swift
let flutterEngine = FlutterEngine()
// FlutterDefaultDartEntrypoint is the same as nil, which will run main().
flutterEngine.run(
  withEntrypoint: "main", initialRoute: "/onboarding")
```

Initial route with an implicit engine:

```swift
let flutterViewController = FlutterViewController(
      project: nil, initialRoute: "/onboarding", nibName: nil, bundle: nil)
```

Entrypoints other than `main()` must be annotated so they are not tree-shaken away:

```dart
@pragma('vm:entry-point')
void myOtherEntrypoint() { ... };
```

Content-sized views:

```swift
let flutterViewController = FlutterViewController(engine: flutterEngine, nibName: nil, bundle: nil)
flutterViewController.isAutoResizable = true
```

## Options / Props

| API | Description |
| --- | --- |
| `FlutterEngine(name:)` + `run()` | Host to the Dart VM and Flutter runtime; runs `main()` of `lib/main.dart` by default. |
| `run(withEntrypoint:libraryURI:)` / `runWithEntrypoint:` | Run a different Dart entrypoint, optionally in a specific library file. |
| `run(withEntrypoint:initialRoute:)` | Sets `dart:ui` `PlatformDispatcher.defaultRouteName` (for example `/onboarding` instead of `/`). |
| `FlutterViewController(engine:nibName:bundle:)` | Attaches to an engine to pass input events and display frames. |
| `FlutterViewController(project:nibName:bundle:)` / `(project:initialRoute:nibName:bundle:)` | Implicit engine creation (on demand; may add noticeable latency before the first frame). |
| `pushRoute()` / `popRoute()` | Change the current Flutter route from the platform side after the engine is running. |
| `SystemNavigator.pop()` | Pop the iOS route from the Flutter side. |
| `isAutoResizable` (Swift) / `autoResizable` (Objective-C) | Size the embedded `FlutterView` based on its content. |
| `FlutterAppDelegate` / `FlutterAppLifeCycleProvider` + `FlutterPluginAppLifeCycleDelegate` | Application-level lifecycle forwarding (remote notifications, background execution, debug connection stays open when the device locks). |
| `FlutterSceneDelegate` / `FlutterSceneLifeCycleProvider` + `FlutterPluginSceneLifeCycleDelegate` | Scene lifecycle forwarding (for example `scene(_:openURLContexts:)` and `scene(_:continue:)` to plugins such as `local_auth`). |

## Notes

- Corrected from the official docs: the source Swift initial-route sample declares `flutterEngine` but calls `engine.run(...)`; this page uses `flutterEngine` consistently (as the Objective-C tab does).
- Pre-warming a long-lived `FlutterEngine` is generally recommended: the first frame appears faster, Flutter and Dart state outlive one `FlutterViewController`, and the app and plugins can interact with Dart logic before showing the UI. The implicit-engine alternative can suit rarely shown screens, no good heuristic for starting the Dart VM, or no need to persist state between view controllers.
- As of Flutter 3.41, `UIScene` support is the default for iOS apps, and Apple requires UIKit apps built with recent iOS SDKs to use the `UIScene` lifecycle. Adopt both `FlutterAppDelegate` (or `FlutterAppLifeCycleProvider`) and `FlutterSceneDelegate` (or `FlutterSceneLifeCycleProvider`) so plugins receive all lifecycle events. See the UIScene migration guide (`/release/breaking-changes/uiscenedelegate`).
- In SwiftUI apps, configure the scene delegate class in `application(_:configurationForConnecting:options:)`; if the app does not support multiple scenes, set **Enable Multiple Scenes** (`UIApplicationSupportsMultipleScenes`) to **NO** under **Application Scene Manifest** in the target's `Info.plist`.
- If your delegates cannot subclass the Flutter ones, conform to `FlutterAppLifeCycleProvider` / `FlutterSceneLifeCycleProvider` and forward every callback (remote notifications, open URL, shortcut items, background URL sessions, fetch, and the scene callbacks) to the plugin lifecycle delegates; the source lists the full forwarding implementations in Swift and Objective-C.
- Content-sized views: the root widget must support unbounded constraints. Avoid widgets that require bounded constraints (like `ListView` or `LayoutBuilder`) at the top of the tree; many common widgets are unsupported (`ScaffoldBuilder`, `CupertinoTimerPicker`, anything relying on a `LayoutBuilder`). Use an `UnconstrainedBox` to test a widget; see the `add_to_app/ios_content_resizing` sample project.
- Dart code begins running when `run` is called on the engine; the default `main()` of the default Dart library runs.
- Use platform channels to push data or prepare your Flutter environment before presenting the UI.
- This is the Flutter embedding API. UIKit / SwiftUI / UIScene APIs themselves belong to the apple-uikit and apple-swiftui skills.

## Related

- [add-to-app](./add-to-app.md)
- [add-to-app-multiple-flutters](./add-to-app-multiple-flutters.md)
- [ios-app-extensions](./ios-app-extensions.md)
