---
source: https://docs.flutter.dev/add-to-app
---

# Add Flutter to an existing app

Flutter can be integrated into an existing application piecemeal, as a module ("add-to-app"), to render part of the app with Flutter or to run shared non-UI logic. Supported on Android, iOS, macOS, and web.

## Signature / Usage

Entry points per platform (from the page's "Get started" and "API usage" cards):

| Platform | Project setup | API usage |
| --- | --- | --- |
| Android | `/add-to-app/android/project-setup` | `/add-to-app/android/add-flutter-screen` |
| iOS | `/add-to-app/ios/project-setup` | `/add-to-app/ios/add-flutter-screen` |
| macOS | `/add-to-app/macos/project-setup` | `/add-to-app/macos/add-flutter-screen` |
| Web | `/platform-integration/web/embedding-flutter-web#embedded-mode` | `/platform-integration/web/embedding-flutter-web#manage-flutter-views-from-js` |

For debugging and stateful hot reload on an app that contains Flutter, use `flutter attach` from IDEs or the command line:

```console
$ flutter attach
```

## Options / Props

Two flavors of add-to-app:

| Flavor | Platforms | Description |
| --- | --- | --- |
| Multi-engine | Android, iOS, macOS | One or more Flutter instances, each rendering a widget embedded into the host application; each instance is a separate Dart program running in isolation, with independent application and UI state and minimal memory. See multiple Flutters. |
| Multi-view | Web | Multiple `FlutterView`s each rendering an embedded widget; only one Dart program, and all views and widgets can share objects. |

Most common use cases: hybrid navigation stacks (some screens rendered by Flutter, others by another framework) and partial-screen views (a screen with multiple widgets, some rendered by Flutter).

Supported features:

| Platform | Features |
| --- | --- |
| Android | Auto-build and import the module via a Flutter SDK hook in your Gradle script; build into a generic Android Archive (AAR); `FlutterEngine` API for starting and persisting Flutter independently of `FlutterActivity` / `FlutterFragment`; Android Studio co-editing and module creation/import wizard; Java and Kotlin host apps; Flutter plugins; `flutter attach`. |
| iOS | Build into a Swift package; auto-build and import using Xcode build phases; `FlutterEngine` API independent of `FlutterViewController`; Objective-C and Swift host apps; Flutter plugins; `flutter attach`. |
| macOS | Build into a Swift package; Xcode build phases; `FlutterEngine` API independent of `FlutterViewController`; Swift host apps; Flutter plugins; `flutter attach`. |
| Web | Any HTML DOM-based web app: client-side Dart frameworks (jaspr, ngdart, over_react), JS frameworks (React, Angular, Vue.js), server-side frameworks (Django, Ruby on Rails, Apache Struts), or VanillaJS. Requirement: the app supports importing JavaScript libraries and creating HTML elements for Flutter to render into. |

## Notes

- Mobile limitations: multi-view mode is not supported (multi-engine only); packing multiple Flutter libraries into an application is not supported; plugins that do not support `FlutterPlugin` might misbehave if they assume things untenable in add-to-app (such as a Flutter `Activity` always being present); on Android the Flutter module only supports AndroidX applications.
- Web limitations: multi-engine mode is not supported (multi-view only); there is no way to completely shut down the Flutter engine (you can remove all `FlutterView` objects and let data be garbage collected, but the engine remains warmed up).
- Sample projects for Android and iOS importing a Flutter module are in the add-to-app samples repository (`add_to_app` in the samples repo).
- Only the index and the three follow-up guides in this reference set are covered; the per-platform project-setup pages are not.
- This is the Flutter-as-library integration path. Host-side native development belongs to the android-* skills and apple-uikit / apple-swiftui; Compose Multiplatform (kotlin-multiplatform) is a different cross-platform approach and not the same as Flutter add-to-app.

## Related

- [add-to-app-multiple-flutters](./add-to-app-multiple-flutters.md)
- [add-to-app-android-screen](./add-to-app-android-screen.md)
- [add-to-app-ios-screen](./add-to-app-ios-screen.md)
