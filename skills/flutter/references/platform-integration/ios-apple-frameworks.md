---
source: https://docs.flutter.dev/platform-integration/ios/apple-frameworks
---

# Leveraging Apple's system APIs and frameworks

Maps Apple system frameworks to Flutter plugins that offer equivalent functionality, for developers coming from iOS development.

## Signature / Usage

Add a Flutter plugin from the root of your project (this adds the dependency to `pubspec.yaml`), then add an `import` statement in your Dart file:

```console
flutter pub add package_name
```

## Options / Props

Flutter plugins and Apple frameworks (the table does not endorse any particular plugin):

| Use Case | Apple Framework or Class | Flutter integration |
| --- | --- | --- |
| Access the photo library | `PhotoKit` using the `Photos` and `PhotosUI` frameworks and `UIImagePickerController` | `image_picker` |
| Access the camera | `UIImagePickerController` using the `.camera` `sourceType` | `image_picker` |
| Use advanced camera features | `AVFoundation` | `camera` |
| Offer In-app purchases | `StoreKit` | `in_app_purchase` (supports both Google Play Store on Android and Apple App Store on iOS) |
| Process payments | `PassKit` | `pay` (adds Google Pay payments on Android and Apple Pay payments on iOS) |
| Send push notifications | `UserNotifications` | `firebase_messaging` (uses Firebase Cloud Messaging and integrates with APNs) |
| Access GPS coordinates | `CoreLocation` | `geolocator` |
| Access sensor data (accelerometer, gyroscope, etc.) | `CoreMotion` | `sensors_plus` |
| Make network requests | `URLSession` | `http` |
| Store key-values | `@AppStorage` property wrapper and `NSUserDefaults` | `shared_preferences` |
| Persist to a database | `CoreData` or SQLite | `sqflite` |
| Access health data | `HealthKit` | `health` |
| Use machine learning | `CoreML` | `google_ml_kit` (Google's ML Kit; text recognition, face detection, image labeling, landmark recognition, barcode scanning; custom models with Firebase, see "Use a custom TensorFlow Lite model with Flutter") |
| Recognize text | `VisionKit` | `google_ml_kit` |
| Recognize speech | `Speech` | `speech_to_text` |
| Use augmented reality | `ARKit` | `arkit_plugin` |
| Access weather data | `WeatherKit` | `weather` (uses the OpenWeatherMap API; other packages exist for other weather APIs) |
| Access and manage contacts | `Contacts` | `flutter_contacts` |
| Expose quick actions on the home screen | `UIApplicationShortcutItem` | `quick_actions` |
| Configure, update and communicate with Widgets | `WidgetKit` | `home_widget` |
| Automate app actions with Siri/Shortcuts | `AppIntents` | `intelligence` |

## Notes

- Dart calls libraries that contain platform-specific code "plugins" (short for plugin package). You call the plugin's Dart API, which makes it work for all platforms the plugin supports.
- You might need to change app settings or initialization logic; the package's Readme page on pub.dev should provide details.
- If no package meets your needs, create your own or use platform channels directly (see the platform channels page).
- To use an Apple framework within your native project, import it into your Swift or Objective-C file. For a SwiftUI-to-Flutter comparison, the source points to "Flutter for SwiftUI developers" (`/flutter-for/swiftui-devs`).
- This page maps Apple frameworks to Flutter plugins. The Apple frameworks themselves (PhotoKit, StoreKit, HealthKit, CoreML, ARKit, WidgetKit, AppIntents and others) are covered by the apple-* skills (apple-app-services, apple-ml, apple-spatial, apple-swiftui, apple-uikit); this page does not document their APIs.

## Related

- [platform-channels](./platform-channels.md)
- [ios-app-extensions](./ios-app-extensions.md)
- [ios-platform-views](./ios-platform-views.md)
