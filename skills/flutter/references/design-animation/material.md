---
source: https://docs.flutter.dev/ui/design/material
---

# Material Design for Flutter

Material Design is an open-source design system built and supported by Google designers and developers.

## Signature / Usage

Migration command named in the Opt-in note below:

```console
dart fix --apply --code=migrate_design_widgets
```

## Notes

- The source page contains no code example. To learn more about Material Design and Flutter, it points to the Material.io developer documentation for Flutter (`material.io/develop/flutter`).
- Opt-in (Flutter 3.47): the Material library (`package:flutter/material.dart`) is also available as the standalone `material_ui` package (1.0), and the in-framework library is scheduled for formal deprecation in an upcoming stable release. `dart fix --apply --code=migrate_design_widgets` migrates imports. Contributions to Material and Cupertino inside the core SDK were frozen starting in Flutter 3.44.
- Flutter's Material widgets (Dart). Distinct from Jetpack Compose Material3 (`MaterialTheme`, `Scaffold`) in the android-compose-components skill, and from SwiftUI / UIKit in apple-swiftui and apple-uikit.

## Related

- [MaterialApp](./MaterialApp.md)
- [Scaffold](./Scaffold.md)
- [ThemeData](./ThemeData.md)
- [cupertino](./cupertino.md)
