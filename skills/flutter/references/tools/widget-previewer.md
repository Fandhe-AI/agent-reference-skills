---
source: https://docs.flutter.dev/tools/widget-previewer
---

# Flutter Widget Previewer

Instantly render, inspect, and iterate on individual UI components in real time, separate from a full app, in your IDE or browser. Stable as of Flutter 3.47.

## Signature / Usage

Start from the terminal in the Flutter project's root directory (launches a local server and opens a preview environment in the browser; builds are cached in `.widget_preview/`):

```shell
flutter widget-preview start
```

Annotate with `@Preview` from `package:flutter/widget_previews.dart`:

```dart
import 'package:flutter/widget_previews.dart';
import 'package:material_ui/material_ui.dart'; // For Material widgets

@Preview(name: 'My Sample Text')
Widget mySampleText() {
  return const Text('Hello, World!');
}
```

`@Preview` can be applied to top-level functions that return a `Widget` or `WidgetBuilder`, static methods within a class that return a `Widget` or `WidgetBuilder`, and public Widget constructors and factories with no required arguments.

## Opening the previewer

- Android Studio, IntelliJ, and Visual Studio Code automatically start the previewer on launch; open the "Flutter Widget Preview" tab in the sidebar.
- Command line: `flutter widget-preview start`.

Each preview has controls (left to right): Zoom in, Zoom out, Reset zoom, Toggle between light and dark mode, and Perform a hot restart for the individual preview. If global state has been modified (for example a static initializer), hot restart the entire previewer with the button at the bottom right.

## Options / Props

`@Preview` parameters:

| Name | Type | Description |
| --- | --- | --- |
| `name` | String | A descriptive name for the preview. |
| `group` | String | A name used to group related previews together in the previewer. |
| `size` | Size | Artificial size constraints using a `Size` object. |
| `textScaleFactor` | double | A custom font scale. |
| `wrapper` | function | Wraps the previewed widget in a specific widget tree (for example, to inject application state with an `InheritedWidget`). |
| `theme` | function | Returns a `PreviewThemeData` instance to provide custom and generic theming data with sequential theme layering support for complex matrix testing. |
| `brightness` | Brightness | The initial theme brightness. |
| `localizations` | function | Applies a localization configuration. |

## Search and filter

The search bar filters in real time; the filter dropdown chooses the criteria: Preview name, Group name (`@Preview(group: ...)`), Containing script (URI of the Dart file), Containing package.

```dart
@Preview(name: 'Submit Button', group: 'Form Controls')
Widget submitButtonPreview() => const SubmitButton();
```

In IDEs, the **Filter previews by selected file** option at the bottom of the environment filters by the currently selected file.

## Custom preview annotations

Extend `Preview` to reduce boilerplate:

```dart
final class const MyCustomPreview({
  super.name,
  super.group,
  super.size,
  super.textScaleFactor,
  super.wrapper,
  super.brightness,
  super.localizations,
}) extends Preview {
  this : super(theme: PreviewMaterialThemeData.new);
}

final class const PreviewMaterialThemeData() extends PreviewThemeData {
  @override
  Widget apply(BuildContext context, Widget child) => Theme(
    data: .from(colorScheme: .fromSeed(seedColor: Colors.lime)),
    child: child,
  );
}
```

Overriding `Preview.transform()` (invoked by the previewer) modifies the preview at runtime, allowing configurations not possible in a `const` context:

```dart
@override
Preview transform() {
  final originalPreview = super.transform();

  final themeVariant = switch (brightness) {
    null => 'Responsive',
    final b => b.name,
  };

  // Creates a PreviewBuilder that can be used to modify
  // the preview contents.
  final builder = originalPreview.toBuilder();
  builder
    ..name = 'Transformed - ${originalPreview.name}[$themeVariant]'
    ..theme = _themeBuilder;

  // Returns the updated Preview instance.
  return builder.build();
}
```

(`TransformativePreview` in the source extends `Preview` with the same `super.*` parameters and a `_themeBuilder()` returning `PreviewMaterialThemeData(brightness: brightness)`.)

## Multiple preview configurations

Apply multiple `@Preview` annotations to one function or constructor:

```dart
@Preview(
  group: 'Brightness',
  name: 'Example - light',
  brightness: Brightness.light,
)
@Preview(
  group: 'Brightness',
  name: 'Example - dark',
  brightness: Brightness.dark,
)
Widget buttonPreview() => const ButtonShowcase();
```

Or extend `MultiPreview`:

```dart
/// Creates light and dark mode previews.
final class MultiBrightnessPreview extends MultiPreview {
  const MultiBrightnessPreview();

  @override
  List<Preview> get previews => const [
        Preview(
          group: 'Brightness',
          name: 'Example - light',
          brightness: Brightness.light,
        ),
        Preview(
          group: 'Brightness',
          name: 'Example - dark',
          brightness: Brightness.dark,
        ),
      ];
}

@MultiBrightnessPreview()
Widget buttonPreview() => const ButtonShowcase();
```

`MultiPreview` also provides `MultiPreview.transform()` to transform each preview at runtime:

```dart
@override
List<Preview> transform() {
  final previews = super.transform();
  return previews.map((preview) {
    final builder = preview.toBuilder()
      ..group = 'Brightness'
      // Building names based on values provided to the annotation
      // isn't possible within a constant constructor. However,
      // there's no such restriction when building a Preview at
      // runtime.
      ..name = '$name - ${preview.brightness!.name}';
    return builder.toPreview();
  }).toList();
}
```

## Notes

- Restriction, public callback names: all callback arguments provided to preview annotations must be public and constant (required for the previewer's code generation).
- Restriction, unsupported APIs: native plugins and any APIs from `dart:io` or `dart:ffi` are not supported because the previewer is built with Flutter Web. Widgets with transitive dependencies on `dart:io` / `dart:ffi` load correctly, but all APIs from these libraries throw when invoked. Use conditional imports for platform-specific libraries.
- Restriction, asset paths: with `fromAsset` APIs from `dart:ui`, use package-based paths such as `'packages/my_package_name/assets/my_image.png'` instead of `'assets/my_image.png'`. When previewing web widgets, assets from the host project's `web/` directory are synchronized automatically.
- Restriction, unconstrained widgets are automatically constrained to approximately half the height and width of the previewer; this is likely to change, so use the `size` parameter when possible.
- Restriction, multi-project: only previews within a single project or Pub workspace are displayed (flutter/flutter issue 173550).
- Flutter Widget Previews (`@Preview`) are an in-IDE preview feature, not Storybook stories (storybook skill).

## Related

- [Flutter Property Editor](./property-editor.md)
- [Hot reload](./hot-reload.md)
