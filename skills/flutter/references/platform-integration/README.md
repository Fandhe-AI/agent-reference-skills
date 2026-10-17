# platform-integration

| Name | Description | Path |
|------|-------------|------|
| Add a Flutter screen to an Android app | How to add a single Flutter screen (normal opaque, or see-through translucent) to an existing Android app using `FlutterActivity`. | [add-to-app-android-screen.md](./add-to-app-android-screen.md) |
| Add a Flutter screen to an iOS app | How to add a single Flutter screen to an existing iOS app by starting a `FlutterEngine` and presenting a `FlutterViewController`. | [add-to-app-ios-screen.md](./add-to-app-ios-screen.md) |
| Multiple Flutter screens or views | How to integrate multiple instances of the Flutter engine, screens, or views into one application using `FlutterEngineGroup`. | [add-to-app-multiple-flutters.md](./add-to-app-multiple-flutters.md) |
| Add Flutter to an existing app | Flutter can be integrated into an existing application piecemeal, as a module, on Android, iOS, macOS, and web. | [add-to-app.md](./add-to-app.md) |
| Calling JetPack APIs | Flutter apps on Android can use the latest Android APIs the first day they are released; this page outlines how to invoke them from Dart. | [android-call-jetpack-apis.md](./android-call-jetpack-apis.md) |
| Launching a Jetpack Compose activity from your Flutter application | Launch a fullscreen native Android activity written in Kotlin with Jetpack Compose from Flutter through a platform method channel. | [android-compose-activity.md](./android-compose-activity.md) |
| Hosting native Android views in your Flutter app with Platform Views | Platform views embed native Android views in a Flutter app so you can apply transforms, clips, and opacity from Dart. | [android-platform-views.md](./android-platform-views.md) |
| Add the predictive back gesture | The Android predictive back gesture lets users preview where a back gesture will navigate before they commit to it. | [android-predictive-back.md](./android-predictive-back.md) |
| Restore state on Android | How to restore the state of an Android app after it has been killed by the OS, using `RestorationManager`. | [android-restore-state.md](./android-restore-state.md) |
| Protect your app's sensitive content | The `SensitiveContent` widget prevents screens that contain sensitive content, such as passwords, from being projected. | [android-sensitive-content.md](./android-sensitive-content.md) |
| Adding a splash screen to your Android app | A splash screen (launch screen) provides a simple initial experience while the Android app loads. | [android-splash-screen.md](./android-splash-screen.md) |
| Bind to native code using FFI | Flutter apps can use the `dart:ffi` library to call native APIs; since Flutter 3.38 the recommended template is `package_ffi`, which uses build hooks. | [bind-native-code.md](./bind-native-code.md) |
| Desktop support for Flutter | Flutter provides support for compiling a native Windows, macOS, or Linux desktop app, including plugins. | [desktop.md](./desktop.md) |
| Adding iOS app extensions | How to use iOS app extensions, such as a Share extension or home screen widget, with a Flutter app. | [ios-app-extensions.md](./ios-app-extensions.md) |
| Leveraging Apple's system APIs and frameworks | Maps Apple system frameworks to Flutter plugins that offer equivalent functionality, for developers coming from iOS development. | [ios-apple-frameworks.md](./ios-apple-frameworks.md) |
| Adding a launch screen to your iOS app | Launch screens provide a simple initial experience while the iOS app loads and the app initializes. | [ios-launch-screen.md](./ios-launch-screen.md) |
| Host native iOS views in your Flutter app with platform views | Platform views embed native iOS views in a Flutter app, so you can apply transforms, clips, and opacity from Dart. | [ios-platform-views.md](./ios-platform-views.md) |
| Restore state on iOS | How to restore the state of an iOS app after it has been killed by the OS, using `RestorationManager`. | [ios-restore-state.md](./ios-restore-state.md) |
| Bind to native code using the legacy FFI plugin template | Documents the legacy `plugin_ffi` approach to C interop: bundle C/C++ sources in a Flutter plugin and bind them with `dart:ffi`. | [legacy-ffi-plugin.md](./legacy-ffi-plugin.md) |
| Hosting native macOS views in your Flutter app with Platform Views | Platform views embed native macOS views in a Flutter app, so you can apply transforms, clips, and opacity from Dart. | [macos-platform-views.md](./macos-platform-views.md) |
| Build for and integrate with multiple platforms | Flutter enables you to build, test, and deploy natively compiled, multi-platform applications from a single codebase. | [overview.md](./overview.md) |
| Writing custom platform-specific code | How to use custom platform-specific code with Flutter: platform channels (`MethodChannel`) and the `Pigeon` package. | [platform-channels.md](./platform-channels.md) |
| External windows in Flutter Windows apps | Special considerations for adding external (non-Flutter) windows to Flutter Windows apps so lifecycle state updates stay correct. | [windows-external-windows.md](./windows-external-windows.md) |
