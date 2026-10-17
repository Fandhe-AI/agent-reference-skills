---
source: https://docs.flutter.dev/ui/navigation/deep-linking
---

# Deep linking

Navigate to routes when the app receives a new URL. Flutter supports deep linking on iOS, Android, and the web, using named routes (`routes` or `onGenerateRoute`) or the `Router` widget.

## Signature / Usage

To opt out of Flutter's default deep link handler (when migrating from a plugin-based deep linking implementation):

```text
Info.plist             FlutterDeepLinkingEnabled = false
AndroidManifest.xml    flutter_deeplinking_enabled = false
```

In a web browser no additional setup is required. By default, web apps read the deep link path from the URL fragment using the pattern `/#/path/to/app/screen`; this can be changed by configuring the URL strategy.

### Behavior

The behavior varies slightly based on the platform and whether the app is launched and running.

| Platform / Scenario | Using Navigator | Using Router |
|---------------------|-----------------|--------------|
| iOS (not launched) | App gets initialRoute ("/") and a short time after gets a pushRoute | App gets initialRoute ("/") and a short time after uses the RouteInformationParser to parse the route and call RouterDelegate.setNewRoutePath, which configures the Navigator with the corresponding Page. |
| Android (not launched) | App gets initialRoute containing the route ("/deeplink") | App gets initialRoute ("/deeplink") and passes it to the RouteInformationParser to parse the route and call RouterDelegate.setNewRoutePath, which configures the Navigator with the corresponding Pages. |
| iOS (launched) | pushRoute is called | Path is parsed, and the Navigator is configured with a new set of Pages. |
| Android (launched) | pushRoute is called | Path is parsed, and the Navigator is configured with a new set of Pages. |

When using the `Router` widget, your app can replace the current set of pages when a new deep link is opened while the app is running.

## Notes

- Named routes are no longer recommended for most applications; see Limitations on the navigation overview page.
- Getting started: the page points to Flutter cookbook recipes for Android (`/cookbook/navigation/set-up-app-links`) and iOS (`/cookbook/navigation/set-up-universal-links`).
- Migrating from plugin-based deep linking: if you wrote a plugin to handle deep links, opt out of Flutter's default deep link handler by setting `FlutterDeepLinkingEnabled` to false in `Info.plist` _or_ `flutter_deeplinking_enabled` to false in `AndroidManifest.xml`.
- Flutter deep linking (Dart `Navigator` / `Router`, platform App Links and Universal Links setup); distinct from React Router and TanStack Router URL handling and from Jetpack Navigation deep links (`navDeepLink`) in the other skills.

## Related

- [Navigation and routing](./navigation.md)
- [Configuring the URL strategy on the web](./url-strategies.md)
