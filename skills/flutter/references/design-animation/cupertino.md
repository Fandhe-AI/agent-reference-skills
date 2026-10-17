---
source: https://docs.flutter.dev/ui/design/cupertino
---

# Cupertino design for Flutter

The Flutter Cupertino package is a collection of widgets that implement Apple's iOS design language for Flutter apps. The widgets have a similar look and feel to iOS, including rounded corners, gradients, and minimalistic design. They also include iOS interactions and animations.

## Signature / Usage

Run a Cupertino API example from the flutter/flutter repository (for example `CupertinoSwitch`):

```console
cd path/to/flutter
cd examples/api
flutter run lib/cupertino/switch/cupertino_switch.0.dart
```

## Notes

- Previously, Cupertino was part of the core Flutter SDK, but it has been decoupled from the framework. You can access Cupertino from the `cupertino_ui` package on pub.dev.
- The source page lists widget-of-the-week videos for `CupertinoRadio`, `CupertinoSheetRoute`, `CupertinoSlidingSegmentedControl`, `CupertinoCheckbox`, and `CupertinoSwitch`, and links to the (mostly visual) Cupertino widget catalog, the Cupertino library page on pub.dev, and the Cupertino API examples in flutter/flutter.
- Opt-in (Flutter 3.47): standalone `cupertino_ui` 1.0 is published alongside `material_ui`; the in-framework `package:flutter/cupertino.dart` is scheduled for formal deprecation in an upcoming stable release. `dart fix --apply --code=migrate_design_widgets` migrates imports.
- Flutter Cupertino widgets (Dart) imitate iOS design in Flutter; they are not native iOS UI. Use the apple-swiftui and apple-uikit skills for SwiftUI / UIKit APIs.

## Related

- [CupertinoApp](./CupertinoApp.md)
- [material](./material.md)
- [MaterialApp](./MaterialApp.md)
