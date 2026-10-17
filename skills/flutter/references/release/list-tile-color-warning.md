---
source: https://docs.flutter.dev/release/breaking-changes/list-tile-color-warning
---

# ListTile reports an error in debug when wrapped in a colored widget

When a widget with a non-transparent background color (such as a `Container` or `ColoredBox` that sets `color`) sits between a `ListTile` and its nearest `Material` ancestor, the framework now reports an assertion error in debug mode.

## Signature / Usage

Before migration (the colored `Container` hides the ink splashes):

```dart
Material(
  child: Container(
    color: Colors.pink,
    child: ListTile(
      title: const Text('Title'),
      onTap: () {},
    ),
  ),
)
```

After migration (color on the `Material`):

```dart
Material(
  color: Colors.pink,
  child: Container(
    child: ListTile(
      title: const Text('Title'),
      onTap: () {},
    ),
  ),
)
```

Alternatively, wrap the `ListTile` in its own transparent `Material`:

```dart
Container(
  color: Colors.blue,
  child: Material(
    type: MaterialType.transparency,
    child: ListTile(
      title: const Text('Title'),
      onTap: () {},
    ),
  ),
)
```

## Notes

- Timeline: landed in version 3.43.0-0.1.pre; in stable release 3.44.
- `ListTile` paints its background color and ink splashes on the nearest `Material` ancestor, so an opaque intermediate widget makes them invisible. The error message reads "ListTile background color or ink splashes may be invisible."
- Migration (Flutter 3.44): remove the background color from the intermediate widget, or wrap the `ListTile` in its own `Material`.
- `ListTile` and `Material` are in Flutter's Material library (`package:flutter/material.dart`, or `package:material_ui` when opted in).

## Related

- [Breaking changes and migration guides](./breaking-changes.md)
- [Migrate to standalone material_ui and cupertino_ui packages](./material-ui-and-cupertino-ui.md)
