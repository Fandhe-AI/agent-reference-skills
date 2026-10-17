---
source: https://docs.flutter.dev/release/breaking-changes/decouple-page-transition-builders
---

# Page transition builders reorganization

`CupertinoPageTransitionsBuilder` has moved from `package:material_ui/material_ui.dart` to the Cupertino package, `package:cupertino_ui/cupertino_ui.dart`.

## Signature / Usage

Before migration:

```dart
import 'package:material_ui/material_ui.dart';

final pageTransitionsTheme = PageTransitionsTheme(
  builders: {
    TargetPlatform.android: ZoomPageTransitionsBuilder(),
    TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),
  },
);
```

After migration:

```dart
import 'package:cupertino_ui/cupertino_ui.dart';
import 'package:material_ui/material_ui.dart';

final pageTransitionsTheme = PageTransitionsTheme(
  builders: {
    TargetPlatform.android: ZoomPageTransitionsBuilder(),
    TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),
  },
);
```

## Options / Props

| Builder | Library | Description |
| --- | --- | --- |
| `FadeUpwardsPageTransitionsBuilder` | Material | Default transition before Material 3 |
| `OpenUpwardsPageTransitionsBuilder` | Material | Vertical slide transition |
| `ZoomPageTransitionsBuilder` | Material | Zoom transition (Material 3 default) |
| `PredictiveBackPageTransitionsBuilder` | Material | Android predictive back gesture support |
| `CupertinoPageTransitionsBuilder` | Cupertino | iOS-style horizontal slide transition |

## Notes

- Timeline: landed in version 3.43.0-0.1.pre; in stable release 3.44.
- Migration (Flutter 3.44): if you use `CupertinoPageTransitionsBuilder` and import only `package:material_ui/material_ui.dart`, add an import for `package:cupertino_ui/cupertino_ui.dart`. If the app already imports both, no changes are needed.
- The builders are used with `PageTransitionsTheme` to customize route transitions per platform. The class is semantically Cupertino (it uses Cupertino transition mixins), so Cupertino apps can now use it without depending on the Material library.
- The page's imports use the standalone packages; with the in-framework libraries the same classes are in `package:flutter/material.dart` and `package:flutter/cupertino.dart` (see the material_ui / cupertino_ui opt-in page).
- Flutter's route transitions are not Jetpack Navigation or React Router transitions (android-navigation, react-router).

## Related

- [Migrate to standalone material_ui and cupertino_ui packages](./material-ui-and-cupertino-ui.md)
- [Breaking changes and migration guides](./breaking-changes.md)
