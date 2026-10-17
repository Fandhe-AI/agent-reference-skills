---
source: https://api.flutter.dev/flutter/material/ThemeData-class.html
---

# ThemeData

Defines the configuration of the overall visual `Theme` for a `MaterialApp` or a widget subtree within the app (`package:flutter/material.dart`).

## Signature / Usage

The factory constructors (selected parameters of the default constructor are shown; it has roughly 100 optional named parameters, mostly per-component `*Theme` objects):

```dart
factory ThemeData({
  Iterable<Adaptation<Object>>? adaptations,
  bool? applyElevationOverlayColor,
  NoDefaultCupertinoThemeData? cupertinoOverrideTheme,
  Iterable<ThemeExtension>? extensions,
  Object? inputDecorationTheme,
  MaterialTapTargetSize? materialTapTargetSize,
  PageTransitionsTheme? pageTransitionsTheme,
  TargetPlatform? platform,
  ScrollbarThemeData? scrollbarTheme,
  InteractiveInkFeatureFactory? splashFactory,
  bool? useMaterial3,
  bool? useSystemColors,
  VisualDensity? visualDensity,
  ColorScheme? colorScheme,
  Brightness? brightness,
  Color? colorSchemeSeed,
  // ... color properties, fontFamily, fontFamilyFallback, package,
  // iconTheme, textTheme, typography, and one *Theme per component
})

ThemeData.light({bool? useMaterial3})
ThemeData.dark({bool? useMaterial3})
ThemeData.fallback({bool? useMaterial3})
ThemeData.from({required ColorScheme colorScheme, TextTheme? textTheme, bool? useMaterial3})
const ThemeData.raw({/* all values required */})
```

Applying a theme app-wide (from the MaterialApp page of the same API docs):

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

## Options / Props

Selected parameters of the default `ThemeData(...)` factory:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| colorScheme | ColorScheme? | — | Color scheme; Material components typically depend exclusively on `colorScheme` and `textTheme` |
| colorSchemeSeed | Color? | — | Seed color from which a `ColorScheme` is generated |
| brightness | Brightness? | — | Light or dark |
| useMaterial3 | bool? | — | Whether to use Material 3 |
| textTheme | TextTheme? | — | Text styles |
| primaryTextTheme | TextTheme? | — | Text styles contrasting with the primary color |
| typography | Typography? | — | Platform-specific typographic scales |
| iconTheme / primaryIconTheme | IconThemeData? | — | Icon themes |
| fontFamily / fontFamilyFallback / package | String? / List<String>? / String? | — | Font selection |
| visualDensity | VisualDensity? | — | Density of components |
| materialTapTargetSize | MaterialTapTargetSize? | — | Tap target size |
| platform | TargetPlatform? | — | Platform to adapt to |
| pageTransitionsTheme | PageTransitionsTheme? | — | Page transition builders per platform |
| splashFactory | InteractiveInkFeatureFactory? | — | Ink splash factory |
| extensions | Iterable<ThemeExtension>? | — | Custom theme extensions |
| adaptations | Iterable<Adaptation<Object>>? | — | Adaptations |
| cupertinoOverrideTheme | NoDefaultCupertinoThemeData? | — | Overrides for Cupertino widgets |
| appBarTheme, buttonTheme, cardTheme, dialogTheme, listTileTheme, navigationBarTheme, snackBarTheme, tabBarTheme, ... | per-component `*ThemeData` | — | Per-component theme overrides |

## Notes

- The `MaterialApp.theme` property configures the appearance of the entire app. Widget subtrees can override it by including a `Theme` widget at the top of the subtree.
- Widgets obtain the current theme with `Theme.of`, which finds the `ThemeData` for the nearest `BuildContext` ancestor (an inexpensive lookup, essentially a single HashMap access). `Theme.of` cannot see a `Theme` widget defined in the current build method's context; create a new custom widget for the subtree below the new `Theme`, or insert a widget that creates a new `BuildContext`, like `Builder`.
- The documented example builds a `ColorScheme` from a single "seed" color that matches the platform's light or dark configuration, and overrides the default `FloatingActionButton` configuration to customize a class of components.
- Deprecated constructor parameters shown in the API docs: `buttonBarTheme` ("Use OverflowBar instead", deprecated after v3.21.0-10.0.pre), `dialogBackgroundColor` ("Use DialogThemeData.backgroundColor instead", after v3.27.0-0.1.pre), `indicatorColor` ("Use TabBarThemeData.indicatorColor instead", after v3.28.0-1.0.pre).
- `ThemeData.raw` requires most values to be specified and all non-null except `cupertinoOverrideTheme` and deprecated members.
- Migration (Flutter 3.44): `CupertinoPageTransitionsBuilder` moved from the Material library to the Cupertino library (`package:cupertino_ui/cupertino_ui.dart`). When a `PageTransitionsTheme` passed as `pageTransitionsTheme` uses it and only `package:material_ui/material_ui.dart` is imported, add an import for `package:cupertino_ui/cupertino_ui.dart`. The other builders (`FadeUpwardsPageTransitionsBuilder`, `OpenUpwardsPageTransitionsBuilder`, `ZoomPageTransitionsBuilder` (Material 3 default), `PredictiveBackPageTransitionsBuilder`) stay in the Material library.
- Opt-in (Flutter 3.47): the Material library is also available as the standalone `material_ui` package (1.0). This page documents the in-framework `package:flutter/material.dart` surface of the 3.47 stable SDK, which is scheduled for formal deprecation in an upcoming stable release.
- Flutter `ThemeData` (Dart, `package:flutter/material.dart`). Distinct from Jetpack Compose Material3 `MaterialTheme` / `ColorScheme` in the android-compose-components skill and from SwiftUI / UIKit theming in apple-swiftui and apple-uikit.

## Related

- [MaterialApp](./MaterialApp.md)
- [Scaffold](./Scaffold.md)
- [typography](./typography.md)
- [material](./material.md)
