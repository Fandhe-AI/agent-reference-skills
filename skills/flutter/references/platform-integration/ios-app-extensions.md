---
source: https://docs.flutter.dev/platform-integration/ios/app-extensions
---

# Adding iOS app extensions

How to use iOS app extensions (for example a Share extension or home screen widget) with a Flutter app.

## Signature / Usage

Create the project, open the Xcode workspace, add the extension target (**File** > **New** > **Target** > **Share Extension**, name `ShareExtension`, then **Activate** the scheme), reorder **Embed Foundation Extensions** above **Run Script** in **Build Phases**, make **Minimum Deployments** match in both targets, then rebuild:

```console
$ flutter create example_app_with_extension
$ cd example_app_with_extension && open ios/Runner.xcworkspace
$ flutter build ios --config-only
```

Test: in debug mode you must use the iOS simulator; on a physical device run in release mode.

```console
$ flutter run
$ flutter run --release
```

Open a Flutter app in the Share extension with `FlutterViewController` (`ShareViewController.swift`):

```swift
import UIKit
import Flutter

class ShareViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        showFlutter()
    }

    func showFlutter() {
        let flutterEngine = FlutterEngine(name: "my flutter engine")
        flutterEngine.run()
        let flutterViewController = FlutterViewController(engine: flutterEngine, nibName: nil, bundle: nil)
        addChild(flutterViewController)
        view.addSubview(flutterViewController.view)
        flutterViewController.view.frame = view.bounds
    }

    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        self.extensionContext?.cancelRequest(
            withError: NSError(domain: Bundle.main.bundleIdentifier!, code: 0))
    }
}
```

Register plugins for the extension (Swift: add at the top of `showFlutter()`; Objective-C: import `GeneratedPluginRegistrant.h` and call after `[flutterEngine run]`):

```swift
GeneratedPluginRegistrant.register(with: flutterEngine)
```

```objc
[GeneratedPluginRegistrant registerWithRegistry:flutterEngine];
```

Scheme pre-action script (**Manage Schemes** > **ShareExtension** > **Build** > **Pre-actions** > **New Run Script Action**, build settings from **ShareExtension**):

```console
/bin/sh "$FLUTTER_ROOT/packages/flutter_tools/bin/xcode_backend.sh" prepare
```

## Options / Props

Ways to interact with an extension:

| Topic | How |
| --- | --- |
| Higher-level APIs | Some extensions have APIs (Core Spotlight indexes your app; WidgetKit can trigger a home screen widget update). Flutter plugins wrap these APIs; see the Apple frameworks page or pub.dev. |
| Share resources | Put the `Runner` target and the extension target in the same App Group (**Signing & Capabilities** > **+ Capability** > **App Groups**; you must be signed in to your Apple Developer account). Key/value: `shared_preference_app_group` plugin (`UserDefaults`); File: App Group container path from `path_provider`; Database: App Group container path with `sqflite`. |
| Background updates | `workmanager` plugin. |
| Deep linking | Direct users from an extension to a specific route with Deep Linking. |
| Scrollable list | The Flutter view does not handle scroll gestures in a Share extension by default; follow the instructions in flutter issue 164670. |
| Dart code / Flutter content in extensions | `home_widget` package: respond to user input with Dart code, render Flutter widgets as an image, save and retrieve `UserDefaults` data. |

Build settings needed to show a Flutter app in the extension: **User Script Sandboxing** = **No** on the **ShareExtension** target; in **PROJECT** > **Runner** > **Info** > **Configuration**, set **ShareExtension** values for **Debug**, **Profile**, and **Release** to match **Runner**; optionally delete `NSExtensionMainStoryboard` and add `NSExtensionPrincipalClass` (`ShareExtension.ShareViewController` for Swift, `ShareViewController` for Objective-C). For plugin registration add `GeneratedPluginRegistrant.m` under **Compile Sources** of the extension target and (Swift only) set the **Objective-C Bridging Header** to `Runner/Runner-Bridging-Header.h`.

## Notes

- Constraints: you must use an iOS simulator to test your extension in debug mode. Flutter does not fully support running app extensions in debug mode on physical devices when used to build extension UIs, because a physical device might run out of memory. iOS app extensions have limited memory; only modify an extension's UI if it supports at least 100MB of memory.
- The containing app and the extension do not communicate directly, and the containing app might not be running while the user interacts with the extension.
- When you add a new extension, Xcode generates sample code based on the template; see Apple's app extension documentation.
- Further reading from the source: the "Adding a Home Screen Widget to your Flutter app" codelab and "Adding a Flutter Screen to an iOS app".
- This is the Flutter-side extension workflow. WidgetKit, Core Spotlight, and extension APIs belong to the apple-* skills (for example apple-app-services, apple-swiftui, apple-uikit).

## Related

- [ios-apple-frameworks](./ios-apple-frameworks.md)
- [add-to-app-ios-screen](./add-to-app-ios-screen.md)
- [ios-launch-screen](./ios-launch-screen.md)
