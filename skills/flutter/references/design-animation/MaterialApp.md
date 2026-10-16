---
source: https://api.flutter.dev/flutter/material/MaterialApp-class.html
---

# MaterialApp

An application that uses Material Design (`package:flutter/material.dart`). A convenience widget that wraps a number of widgets commonly required for Material Design applications. It builds upon a `WidgetsApp` by adding Material-specific functionality, such as `AnimatedTheme` and `GridPaper`.

## Signature / Usage

```dart
MaterialApp(
  home: Scaffold(
    appBar: AppBar(
      title: const Text('Home'),
    ),
  ),
  debugShowCheckedModeBanner: false,
)
```

Routes table:

```dart
MaterialApp(
  routes: <String, WidgetBuilder>{
    '/': (BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Home Route'),
        ),
      );
    },
    '/about': (BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('About Route'),
        ),
      );
     }
   },
)
```

Theme:

```dart
MaterialApp(
  theme: ThemeData(
    brightness: Brightness.dark,
    primaryColor: Colors.blueGrey
  ),
  home: Scaffold(
    appBar: AppBar(
      title: const Text('MaterialApp Theme'),
    ),
  ),
)
```

Router-based constructor: `MaterialApp.router(...)` creates a `MaterialApp` that uses the `Router` instead of a `Navigator` (it takes `routeInformationProvider`, `routeInformationParser`, `routerDelegate`, `routerConfig`, `backButtonDispatcher` instead of the Navigator-related parameters).

## Options / Props

Selected named parameters of the default constructor (the constructor is `const`):

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| navigatorKey | GlobalKey<NavigatorState>? | — | Key for the top-level Navigator |
| scaffoldMessengerKey | GlobalKey<ScaffoldMessengerState>? | — | Key for the ScaffoldMessenger |
| home | Widget? | — | Widget for the default `/` route |
| routes | Map<String, WidgetBuilder> | const <String, WidgetBuilder>{} | Application routes table |
| initialRoute | String? | — | Name of the first route shown |
| onGenerateRoute | RouteFactory? | — | Called for routes not handled by `home` and `routes` |
| onUnknownRoute | RouteFactory? | — | Called when all else fails |
| navigatorObservers | List<NavigatorObserver> | const <NavigatorObserver>[] | Observers for the top-level Navigator |
| builder | TransitionBuilder? | — | Wraps the widget produced by the Navigator / Router |
| title | String? | '' | One-line description of the app for the OS |
| theme | ThemeData? | — | Theme for Material widgets |
| darkTheme | ThemeData? | — | Theme used when the platform requests dark mode |
| highContrastTheme / highContrastDarkTheme | ThemeData? | — | Themes for high-contrast modes |
| themeMode | ThemeMode? | ThemeMode.system | Which of `theme` / `darkTheme` to use |
| themeAnimationDuration | Duration | kThemeAnimationDuration | Duration of the theme change animation |
| themeAnimationCurve | Curve | Curves.linear | Curve of the theme change animation |
| themeAnimationStyle | AnimationStyle? | — | Animation style for theme changes |
| locale | Locale? | — | Initial locale |
| localizationsDelegates | Iterable<LocalizationsDelegate>? | — | Localization delegates |
| supportedLocales | Iterable<Locale> | const <Locale>[Locale('en', 'US')] | Locales the app supports |
| debugShowCheckedModeBanner | bool | true | Show the debug banner |
| debugShowMaterialGrid | bool | false | Overlay a baseline grid |
| showPerformanceOverlay | bool | false | Show the performance overlay |
| showSemanticsDebugger | bool | false | Show the semantics debugger |
| shortcuts / actions | Map? | — | Intent shortcuts and actions |
| restorationScopeId | String? | — | State restoration scope |
| scrollBehavior | ScrollBehavior? | — | Scroll behavior for the app |

## Notes

- The top-level `Navigator` looks up routes in this order: (1) for `/`, the `home` property if non-null; (2) the `routes` table if it has an entry; (3) `onGenerateRoute` if provided; (4) finally `onUnknownRoute`. If a `Navigator` is created, at least one option must handle `/`, since it is used when an invalid `initialRoute` is specified on startup.
- If `home`, `routes`, `onGenerateRoute`, and `onUnknownRoute` are all null and `builder` is not null, no `Navigator` is created.
- The observer of the top-level `Navigator` is configured to perform `Hero` animations.
- `MaterialApp` automatically creates a `DefaultSelectionStyle`: it uses `ThemeData.textSelectionTheme` colors if not null; otherwise `selectionColor` is `ColorScheme.primary` at 0.4 opacity and `cursorColor` is `ColorScheme.primary`.
- `MaterialApp` configures `WidgetsApp.textStyle` with a red/yellow text style that warns that no default text style is defined. `Text` widgets lacking a `Material` ancestor render this way; the typical fix is a `Scaffold` ancestor, which creates a `Material` widget:

  ```dart
  const MaterialApp(
    title: 'Material App',
    home: Scaffold(
      body: Center(
        child: Text('Hello World'),
      ),
    ),
  )
  ```

- `useInheritedMediaQuery` is deprecated and ignored: "MaterialApp never introduces its own MediaQuery; the View widget takes care of that. This feature was deprecated after v3.7.0-29.0.pre."
- Opt-in (Flutter 3.47): the Material library is also available as the standalone `material_ui` package (1.0). This page documents the in-framework `package:flutter/material.dart` surface of the 3.47 stable SDK. The in-framework libraries are scheduled for formal deprecation in an upcoming stable release; `dart fix --apply --code=migrate_design_widgets` migrates imports. Code samples elsewhere in the docs may already import `package:material_ui/material_ui.dart`.
- Migration (Flutter 3.44): `CupertinoPageTransitionsBuilder` moved from the Material library to the Cupertino library (now `package:cupertino_ui/cupertino_ui.dart`); if you set `PageTransitionsTheme` builders for a `MaterialApp` theme and only import `package:material_ui/material_ui.dart`, add an import for `package:cupertino_ui/cupertino_ui.dart`.
- Flutter `package:flutter/material.dart` (Dart). Distinct from Jetpack Compose Material3 (`MaterialTheme`, `Scaffold`) in the android-compose-components skill and from SwiftUI / UIKit app structure in apple-swiftui and apple-uikit.

## Related

- [Scaffold](./Scaffold.md)
- [ThemeData](./ThemeData.md)
- [CupertinoApp](./CupertinoApp.md)
- [material](./material.md)
