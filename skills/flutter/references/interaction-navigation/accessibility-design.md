---
source: https://docs.flutter.dev/ui/accessibility/ui-design-and-styling
---

# UI design & styling

Key aspects of accessible UI design and styling in Flutter: large fonts, sufficient contrast, tap target size, and other platform accessibility features.

## Signature / Usage

Test contrast and tap target size with Flutter's Accessibility Guideline API (`AccessibilityGuideline`, from `flutter_test`); check platform accessibility features through the `AccessibilityFeatures` class (`dart:ui`). The guideline test, from the accessibility testing page:

```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:your_accessible_app/main.dart';

void main() {
  testWidgets('Follows a11y guidelines', (tester) async {
    final SemanticsHandle handle = tester.ensureSemantics();
    await tester.pumpWidget(const AccessibleApp());

    // Checks that tappable nodes have a minimum size of 48 by 48 pixels
    // for Android.
    await expectLater(tester, meetsGuideline(androidTapTargetGuideline));
    handle.dispose();
  });
}
```

(This page itself has no code block; the snippet above is an excerpt of the example on https://docs.flutter.dev/ui/accessibility/accessibility-testing.)

## Large fonts

Both Android and iOS contain system settings to configure the desired font sizes used by apps. Flutter text widgets respect this OS setting when determining font sizes, calculated automatically. Make sure your layout has enough room to render all its contents when font sizes are increased, for example by testing on a small-screen device configured to the largest font setting.

To adjust font sizes: on iOS, Settings > Accessibility > Display & Text Size; on Android, Settings > Font size.

## Sufficient contrast

The W3C recommends:

| Text | Minimum contrast |
|------|------------------|
| Small text (below 18 point regular or 14 point bold) | At least 4.5:1 |
| Large text (18 point and above regular or 14 point and above bold) | At least 3.0:1 |

## Tap target size

| Source | Recommended minimum |
|--------|---------------------|
| Android | 48x48 dp |
| iOS | 44x44 pts |
| W3C | 44 by 44 CSS pixels |

## Notes

- Other accessibility features that may be enabled by the platform, such as bold text, high contrast, and inverted colors, are exposed by the `AccessibilityFeatures` class.

## Related

- [Accessibility](./accessibility.md)
- [Accessibility testing](./accessibility-testing.md)
