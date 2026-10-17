---
source: https://api.flutter.dev/flutter/cupertino/CupertinoApp-class.html
---

# CupertinoApp

An application that uses Cupertino design (`package:flutter/cupertino.dart`). A convenience widget that wraps a number of widgets commonly required for an iOS-design targeting application. It builds upon a `WidgetsApp` by iOS-specific defaulting such as fonts and scrolling physics.

## Signature / Usage

```dart
const CupertinoApp(
  home: CupertinoPageScaffold(
    navigationBar: CupertinoNavigationBar(
      middle: Text('Home'),
    ),
    child: Center(child: Icon(CupertinoIcons.share)),
  ),
  debugShowCheckedModeBanner: false,
)
```

Routes table:

```dart
CupertinoApp(
  routes: <String, WidgetBuilder>{
    '/': (BuildContext context) {
      return const CupertinoPageScaffold(
        navigationBar: CupertinoNavigationBar(
          middle: Text('Home Route'),
        ),
        child: Center(child: Icon(CupertinoIcons.share)),
      );
    },
    '/about': (BuildContext context) {
      return const CupertinoPageScaffold(
        navigationBar: CupertinoNavigationBar(
          middle: Text('About Route'),
        ),
        child: Center(child: Icon(CupertinoIcons.share)),
      );
    }
  },
)
```

Theme:

```dart
const CupertinoApp(
  theme: CupertinoThemeData(
    brightness: Brightness.dark,
    primaryColor: CupertinoColors.systemOrange,
  ),
  home: CupertinoPageScaffold(
    navigationBar: CupertinoNavigationBar(
      middle: Text('CupertinoApp Theme'),
    ),
    child: Center(child: Icon(CupertinoIcons.share)),
  ),
)
```

`CupertinoApp.router(...)` is the `Router`-based constructor (`routeInformationProvider`, `routeInformationParser`, `routerDelegate`, `backButtonDispatcher`, `routerConfig` in place of the Navigator-related parameters).

## Options / Props

Selected named parameters of the default constructor:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| navigatorKey | GlobalKey<NavigatorState>? | — | Key for the top-level Navigator |
| home | Widget? | — | Widget for the default `/` route |
| theme | CupertinoThemeData? | — | Cupertino theme |
| routes | Map<String, WidgetBuilder> | const <String, WidgetBuilder>{} | Application routes table |
| initialRoute | String? | — | Name of the first route shown |
| onGenerateRoute | RouteFactory? | — | Called for routes not handled by `home` and `routes` |
| onUnknownRoute | RouteFactory? | — | Called when all else fails |
| navigatorObservers | List<NavigatorObserver> | const <NavigatorObserver>[] | Observers for the top-level Navigator |
| builder | TransitionBuilder? | — | Wraps the widget produced by the Navigator / Router |
| title | String? | — | One-line description of the app |
| color | Color? | — | Primary color used by the OS for the app |
| locale | Locale? | — | Initial locale |
| localizationsDelegates | Iterable<LocalizationsDelegate>? | — | Localization delegates |
| supportedLocales | Iterable<Locale> | const <Locale>[Locale('en', 'US')] | Locales the app supports |
| showPerformanceOverlay | bool | false | Show the performance overlay |
| showSemanticsDebugger | bool | false | Show the semantics debugger |
| debugShowCheckedModeBanner | bool | true | Show the debug banner |
| shortcuts / actions | Map? | — | Intent shortcuts and actions |
| restorationScopeId | String? | — | State restoration scope |
| scrollBehavior | ScrollBehavior? | — | Scroll behavior for the app |

## Notes

- The top-level `Navigator` looks up routes in this order: `home` for `/` if non-null; the `routes` table; `onGenerateRoute`; finally `onUnknownRoute`. If all four are null and `builder` is not null, no `Navigator` is created. The top-level Navigator's observer is configured to perform `Hero` animations.
- `CupertinoApp` is not a required ancestor for other Cupertino widgets, but many depend on the `CupertinoTheme` widget it composes. If you use Material widgets, a `MaterialApp` also creates the needed dependencies for Cupertino widgets.
- `CupertinoApp` automatically creates a `DefaultSelectionStyle` with `selectionColor` set to `CupertinoThemeData.primaryColor` at 0.2 opacity and `cursorColor` set to `CupertinoThemeData.primaryColor`.
- Use with caution on Android: pages become dismissible via a back swipe, scrolling past extremities triggers iOS-style spring overscrolls, and the San Francisco font family is unavailable on Android, which can result in undefined font behavior.
- Opt-in (Flutter 3.47): the Cupertino library is also available as the standalone `cupertino_ui` package (1.0); the Cupertino docs page notes that Cupertino has been decoupled from the framework. This page documents the in-framework `package:flutter/cupertino.dart` surface of the 3.47 stable SDK, which is scheduled for formal deprecation in an upcoming stable release. `dart fix --apply --code=migrate_design_widgets` migrates imports.
- Flutter `CupertinoApp` (Dart) implements an iOS-style look in Flutter widgets. It is not SwiftUI or UIKit; use the apple-swiftui and apple-uikit skills for native iOS APIs, and the android-compose-components skill for Compose Material3 apps.

## Related

- [MaterialApp](./MaterialApp.md)
- [cupertino](./cupertino.md)
- [ThemeData](./ThemeData.md)
