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
- Deprecated in Flutter 3.50 (opt-in since 3.47): the in-framework Material library (`package:flutter/material.dart`) is formally deprecated; use the standalone `material_ui` package (migration: release/material-ui-and-cupertino-ui). `dart fix --apply --code=migrate_design_widgets` migrates imports. Contributions to Material and Cupertino inside the core SDK were frozen starting in Flutter 3.44.
- Flutter's Material widgets (Dart). Distinct from Jetpack Compose Material3 (`MaterialTheme`, `Scaffold`) in the android-compose-components skill, and from SwiftUI / UIKit in apple-swiftui and apple-uikit.

## Related

- [MaterialApp](./MaterialApp.md)
- [Scaffold](./Scaffold.md)
- [ThemeData](./ThemeData.md)
- [cupertino](./cupertino.md)
