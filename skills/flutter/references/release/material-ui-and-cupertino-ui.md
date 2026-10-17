---
source: https://docs.flutter.dev/release/breaking-changes/material-ui-and-cupertino-ui
---

# Migrate to standalone material_ui and cupertino_ui packages

The Material and Cupertino design libraries are available as standalone packages, `package:material_ui` and `package:cupertino_ui`, decoupling design systems from the Flutter SDK. In Flutter 3.47, developers can opt in ahead of the formal deprecation of the in-framework libraries.

## Signature / Usage

Automated migration with `dart fix`:

```console
$ dart fix --apply --code=migrate_design_widgets
```

Manual migration: add the packages, then change imports.

```console
$ flutter pub add material_ui
$ flutter pub add cupertino_ui
```

```dart
// Before
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

// After
import 'package:cupertino_ui/cupertino_ui.dart';
import 'package:material_ui/material_ui.dart';
```

Compatibility bridge for dependencies that still import the legacy libraries:

```dart
import 'package:material_ui/material_ui.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF6750A4),
        ),
      ),
      builder: (BuildContext context, Widget? child) {
        return MaterialUiCompatibilityBridge(child: child!);
      },
      home: const HomeScreen(),
    );
  }
}
```

Decoupled localizations: `localizationsDelegates: GlobalMaterialLocalizations.delegates` (from `package:material_ui/material_ui.dart`) replaces the three-delegate list (`GlobalCupertinoLocalizations.delegate`, `GlobalMaterialLocalizations.delegate`, `GlobalWidgetsLocalizations.delegate`) and automatically includes the Cupertino and Widgets delegates.

## Notes

- Opt-in only in 3.47. The in-framework design libraries (`package:flutter/material.dart`, `package:flutter/cupertino.dart`) are "scheduled for formal deprecation in an upcoming stable release" and are not deprecated in 3.47.7. This page appears under "Not yet released to stable" in the breaking changes index.
- Starting in Flutter 3.47, version 1.0 of `material_ui` and `cupertino_ui` is published on pub.dev. Contributions to Material and Cupertino inside the core SDK were frozen starting in Flutter 3.44; the initial 1.0.0 versions match the frozen framework code. Future releases use semantic versioning; releases are planned weekly.
- If `dart fix` doesn't add the packages to `pubspec.yaml`, run `flutter pub add material_ui` / `flutter pub add cupertino_ui`, then run `dart fix` once more for remaining migrations and lint warnings such as import sorting.
- `MaterialUiCompatibilityBridge` injects theme and localization data downward so unmigrated children reading `Theme.of(context)` or `MaterialLocalizations.of(context)` keep working. It cannot resolve type mismatches when a dependency exposes, accepts, or returns in-framework SDK types in its public API (for example `FloatingActionButtonLocation`, `ColorScheme`, `TextTheme`); such dependencies must migrate first.
- Package authors: symbols and class names stay the same but are referenced from a new library, so treat the migration as a major version bump.
- Distance: this is Flutter's own Material (Dart) and Cupertino design library, distinct from Compose Material3 (android-compose-components) and from SwiftUI / UIKit (apple-swiftui, apple-uikit).

## Related

- [Breaking changes and migration guides](./breaking-changes.md)
- [Page transition builders reorganization](./decouple-page-transition-builders.md)
- [What's new in Flutter 3.47](./whats-new-3-47.md)
