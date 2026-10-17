---
source: https://docs.flutter.dev/tools/flutter-fix
---

# Analyze, Fix, and Format

Commands for static analysis, automated deprecation fixes, and code formatting.

## Analyze Dart source

Source: https://docs.flutter.dev/reference/flutter-cli

```sh
flutter analyze
```

The official CLI table lists `flutter analyze -d <DEVICE_ID>`; `-d` is the global target-device option and has no role in static analysis, so it is omitted here (corrected from the official docs).

## Preview project-wide fixes

Source: https://docs.flutter.dev/tools/flutter-fix

```sh
dart fix --dry-run
```

Lists all available changes without applying them.

## Apply project-wide fixes

> **Warning**: Rewrites source files in bulk. Commit or stash your work first.

Source: https://docs.flutter.dev/tools/flutter-fix

```sh
dart fix --apply
```

## Format code

Source: https://docs.flutter.dev/tools/formatting

```sh
dart format path1 path2 [...]
```

## Migrate to the standalone material_ui and cupertino_ui packages

> **Warning**: Rewrites imports in bulk. Commit or stash your work first.

Source: https://docs.flutter.dev/release/breaking-changes/material-ui-and-cupertino-ui

Opt-in in Flutter 3.47. The in-framework Material and Cupertino libraries are scheduled for formal deprecation in an upcoming stable release and are not deprecated in 3.47.7.

```sh
dart fix --apply --code=migrate_design_widgets
```

Updates imports from `package:flutter/material.dart` and `package:flutter/cupertino.dart` to the standalone packages. If the packages are not added to `pubspec.yaml` automatically:

```sh
flutter pub add material_ui
flutter pub add cupertino_ui
```

Run `dart fix` once more to apply other automated migrations and address lint warnings such as import sorting.
