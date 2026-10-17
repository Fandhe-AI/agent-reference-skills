---
source: https://docs.flutter.dev/ui/accessibility/assistive-technologies
---

# Accessibility technologies

Screen readers for users with visual impairments and mobility support tools for users with motor limitations, and how to turn them on to test a Flutter app.

## Signature / Usage

On web, screen reader users must toggle the "Enable accessibility" button to build the semantics tree. Users can skip this step if you programmatically auto-enable accessibility:

```dart
import 'package:material_ui/material_ui.dart';
import 'package:flutter/semantics.dart';

void main() {
  runApp(const MyApp());
  SemanticsBinding.instance.ensureSemantics();
}
```

## Screen readers

Mobile screen readers (TalkBack, VoiceOver) give spoken feedback about screen contents and let users interact through gestures on mobile and keyboard shortcuts on desktop.

| Platform | Steps / supported readers |
|----------|---------------------------|
| Android | Open **Settings**, select **Accessibility** and then **TalkBack**, turn 'Use TalkBack' on or off, select Ok. |
| iOS or iPadOS | Open **Settings > Accessibility > VoiceOver**, turn the VoiceOver setting on or off. |
| Browsers (mobile) | iOS: VoiceOver; Android: TalkBack. |
| Browsers (desktop) | macOS: VoiceOver; Windows: JAWS and NVDA. |
| Desktop apps | Windows: Narrator (some developers recommend the more popular NVDA); macOS: VoiceOver (included in macOS); Linux: Orca (pre-installed with some distributions, available on package repositories such as `apt`). |

## Mobility support

| OS | Feature | Function |
|----|---------|----------|
| Android | Switch Access | As an alternate input method, you can use Switch Access and Camera Switches |
| Android | Voice Access | Control your device with your voice |
| Android | Accessibility Menu | A floating, on-screen menu that provides simplified buttons to control essential phone functions |
| iOS | Switch Control | Use switches as an alternate input methods |
| iOS | Voice Control | Control your device with your voice |
| iOS | AssistiveTouch | Use AssistiveTouch to replace multi-finger gestures or hardware button actions |

## Notes

- Flutter's standard widgets generate an accessibility tree automatically. If your app needs something different, customize it with the `Semantics` widget.
- When text should be voiced with a specific voice, inform the screen reader by calling `TextSpan.locale`. `MaterialApp.locale` and `Localizations.override` affect screen reader voices starting from the Flutter 3.38 release. Usually, the screen reader uses the system voice except where you explicitly set it with `TextSpan.locale`.
- The page refers to the now-archived Flutter Gallery web app for a VoiceOver video demo.
- Migration (Flutter 3.47): when customizing semantics, the `header` property of `Semantics` / `SemanticsProperties` is now a no-op on iOS and Android; use `headingLevel` with a value greater than `0` (for example `headingLevel: 1`) to declare a heading. On web, values `1` through `6` map to `<h1>` through `<h6>`.
- Snippet imports `package:material_ui/material_ui.dart` exactly as on the source page; the standalone `material_ui` / `cupertino_ui` packages are an opt-in in Flutter 3.47.

## Related

- [Accessibility](./accessibility.md)
- [Web accessibility](./web-accessibility.md)
- [Accessibility testing](./accessibility-testing.md)
