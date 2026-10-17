---
source: https://docs.flutter.dev/tools/devtools/inspector
---

# Use the Flutter inspector

The Flutter widget inspector visualizes and explores Flutter widget trees, to understand existing layouts and diagnose layout issues. It works with all Flutter applications and is enabled by default; configure it from the inspector settings dialog.

## Signature / Usage

Slow animations, guidelines, baselines, repaint highlighting and oversized-image highlighting can also be toggled in code:

```dart
import 'package:flutter/scheduler.dart';

void setSlowAnimations() {
  timeDilation = 5.0;
}
```

```dart
import 'package:flutter/rendering.dart';

void showLayoutGuidelines() {
  debugPaintSizeEnabled = true;
}
```

## Toolbar

| Button | Description |
| --- | --- |
| Select widget mode | Select a widget on the device to inspect it. |
| Show implementation widgets | Show implementation widgets in the widget tree. |
| Refresh tree | Reload the current widget info. |
| Slow animations | Run animations 5 times slower. |
| Show guidelines | Overlay guidelines to assist with fixing layout issues. |
| Show baselines | Show baselines, which are used for aligning text. |
| Highlight repaints | Show borders that change color when elements repaint. |
| Highlight oversized images | Highlight images using too much memory by inverting colors and flipping them. |

## Inspecting a widget

Click **Select Widget Mode**, then click any widget in the app's UI; this selects the widget and scrolls the widget tree to the corresponding node. Toggle the button again to exit. When debugging layout issues, the key fields are `size` and `constraints`: constraints flow down the tree, and sizes flow back up.

## Widget Tree

By default the tree includes all widgets created in the root project's directory. Parent-child relationships are shown by a single vertical line (a single child) or indentation (multiple children). Toggle on "Show implementation widgets" to view all widgets, including those created outside the project; they are shown in a lighter font and hidden behind collapsible groups.

## Widget Explorer

Select a widget to show the Widget Explorer on the right. Depending on the widget it includes: Widget properties tab (mini-view of width, height, padding and a property list, including whether each value matches the default), Render object tab (properties set on the render object), Flex explorer tab (for `Row`, `Column`, `Flex`, or a direct child of a flex widget).

The flex explorer visualizes main axis and cross axis, alignment, flex factor, flex fit, and layout constraints; violated constraints are red and overflow errors use the "yellow-tape" pattern. It supports modifying `mainAxisAlignment`, `crossAxisAlignment`, and `FlexParentData.flex`:

| Property | Supported values |
| --- | --- |
| `mainAxisAlignment` | `MainAxisAlignment.start`, `end`, `center`, `spaceBetween`, `spaceAround`, `spaceEvenly` |
| `crossAxisAlignment` | `CrossAxisAlignment.start`, `center`, `end`, `stretch` |
| `FlexParentData.flex` | null, 0, 1, 2, 3, 4, 5 in the UI (technically any int) |
| `Flexible.fit` | `FlexFit` `loose` and `tight` |

## Visual debugging

- Slow animations: runs animations 5 times slower (`timeDilation = 5.0`).
- Show guidelines: render boxes (bright blue border), alignments (yellow arrows), padding (semi-transparent blue), scroll views (green arrows), clipping (dashed pink line with scissors icon), spacers (grey background).
- Show baselines: alphabetic baselines green, ideographic yellow; use the `Baseline` widget to adjust.

```dart
import 'package:flutter/rendering.dart';

void showBaselines() {
  debugPaintBaselinesEnabled = true;
}
```

- Highlight repaints: draws a border around all render boxes that changes color each repaint. Wrapping an animation in `RepaintBoundary` limits repainting to just the animation.

```dart
class AreaRepaintsPage extends StatelessWidget {
  const AreaRepaintsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Repaint Example')),
      body: const Center(
        child: RepaintBoundary(child: CircularProgressIndicator()),
      ),
    );
  }
}
```

```dart
import 'package:flutter/rendering.dart';
import 'package:material_ui/material_ui.dart';

void highlightRepaints() {
  debugRepaintRainbowEnabled = true;
}
```

- Highlight oversized images: inverts colors and flips vertically. Images are deemed too large if they use at least 128KB more than required. Info is printed in the debug console:

```console
dash.png has a display size of 213×392 but a decode size of 2130×392, which uses an additional 2542KB.
```

Best fix: resize the image asset. Otherwise use `cacheHeight` and `cacheWidth` on the `Image` constructor:

```dart
class ResizedImage extends StatelessWidget {
  const ResizedImage({super.key});

  @override
  Widget build(BuildContext context) {
    return Image.asset('dash.png', cacheWidth: 213, cacheHeight: 392);
  }
}
```

```dart
import 'package:flutter/rendering.dart';

void showOversizedImages() {
  debugInvertOversizedImages = true;
}
```

## Track widget creation

The inspector instruments application code to learn where widgets are created, so the tree matches how the UI was defined in source. Disable with `--no-track-widget-creation` on `flutter run` (not recommended).

## Inspector settings

- Enable hover inspection: hovering over any widget displays its properties and values.
- Enable widget tree auto-refreshing: the tree refreshes after a hot reload or navigation event.
- Package directories: DevTools limits the tree to widgets created in the project's root directory; to include others, add a parent directory of theirs to the Package Directories (for example `project_foo/pkgs/widgets_A`, or `project_foo` for all). Changes persist the next time the inspector is opened for the app.

## Notes

- Track widget creation prevents otherwise-identical `const` Widgets from being considered equal in debug builds.
- Changes made from the flex explorer don't modify source code and are reverted on hot reload.
- Corrected from the official docs: the source example passes `cacheHeight: 213, cacheWidth: 392`, which swaps the 213×392 (width×height) display size shown in the log message; here it is `cacheWidth: 213, cacheHeight: 392`.
- The source shows no import for the `showOversizedImages` excerpt; `import 'package:flutter/rendering.dart';` was added here (`debugInvertOversizedImages` is exported by `package:flutter/rendering.dart`). The `AreaRepaintsPage` and `ResizedImage` class snippets are kept as in the source, without imports.
- Flutter DevTools inspector (Dart) is distinct from React DevTools (react skill).

## Related

- [Flutter and Dart DevTools](./devtools.md)
- [Flutter Property Editor](./property-editor.md)
- [Use the Performance view](./devtools-performance.md)
