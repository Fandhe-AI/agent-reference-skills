---
source: https://docs.flutter.dev/release/breaking-changes/icondata-class-marked-final
---

# IconData class marked as final

`IconData` is now `final`, so it can no longer be extended or implemented. This is part of generalizing the mechanism for tree-shaking assets and native code.

## Signature / Usage

Code that implements or extends `IconData` fails with:

```text
The class 'IconData' is 'final' and can't be extended or implemented outside of its library.
```

Replace an enum that implements `IconData` with a wrapper class using `static const` instances and a custom widget:

```dart
final class AppIconData {
  final IconData iconData;

  const AppIconData._(this.iconData);

  static const arrowUpward = AppIconData._(
    IconData(0xe062, fontFamily: 'MaterialIcons'),
  );
  static const arrowDownward = AppIconData._(
    IconData(0xe061, fontFamily: 'MaterialIcons'),
  );

  static const values = [arrowUpward, arrowDownward];
}

class AppIcon extends StatelessWidget {
  const AppIcon(this.icon, {super.key});
  final AppIconData icon;

  @override
  Widget build(BuildContext context) {
    return Icon(icon.iconData);
  }
}

Widget build(BuildContext context) {
  // Usage preserves dot shorthand if the type can be inferred:
  return const AppIcon(AppIconData.arrowUpward);
  // Or if inferred: const AppIcon(.arrowUpward)
}
```

## Notes

- Timeline: landed in version 3.44.0-0.1.pre; in stable release 3.44.
- Migration (Flutter 3.44): the previous pattern was `enum AppIcons implements IconData { ... }` with overridden `codePoint`, `fontFamily`, `fontPackage`, and `matchTextDirection`.
- To enable tree-shaking, some `IconData` parameters are annotated `mustBeConst`. If you must use a non-const `IconData` and accept losing tree-shaking for that icon, add `// ignore: non_const_argument_for_const_parameter` before the usage.
- If you rely on `.values` for tools like Widgetbook, maintain the `values` list manually or use code generation.

## Related

- [Breaking changes and migration guides](./breaking-changes.md)
