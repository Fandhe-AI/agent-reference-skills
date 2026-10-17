---
source: https://api.flutter.dev/flutter/widgets/Text-class.html
---

# Text class

A run of text with a single style. (inherits `Object` > `DiagnosticableTree` > `Widget` > `StatelessWidget`)

## Signature / Usage

```dart
Container(
  width: 100,
  decoration: BoxDecoration(border: Border.all()),
  child: const Text(
    'Hello, how are you?',
    overflow: TextOverflow.ellipsis,
  ),
)
```

`maxLines: 1` is not equivalent to `softWrap: false` (visible with `TextOverflow.fade`):

```dart
const Text(
  'Hello, how are you?',
  overflow: TextOverflow.fade,
  maxLines: 1,
)

// ...

const Text(
  'Hello, how are you?',
  overflow: TextOverflow.fade,
  softWrap: false,
)
```

Differently styled spans with `Text.rich`:

```dart
const Text.rich(
  TextSpan(
    text: 'Hello', // default text style
    children: <TextSpan>[
      TextSpan(text: ' beautiful ', style: TextStyle(fontStyle: FontStyle.italic)),
      TextSpan(text: 'world', style: TextStyle(fontWeight: FontWeight.bold)),
    ],
  ),
)
```

Constructors:

```dart
const Text(String data, {Key? key, TextStyle? style, StrutStyle? strutStyle, TextAlign? textAlign, TextDirection? textDirection, Locale? locale, bool? softWrap, TextOverflow? overflow, double? textScaleFactor /* deprecated */, TextScaler? textScaler, int? maxLines, String? semanticsLabel, String? semanticsIdentifier, TextWidthBasis? textWidthBasis, TextHeightBehavior? textHeightBehavior, Color? selectionColor})
const Text.rich(InlineSpan textSpan, {Key? key, TextStyle? style, StrutStyle? strutStyle, TextAlign? textAlign, TextDirection? textDirection, Locale? locale, bool? softWrap, TextOverflow? overflow, double? textScaleFactor /* deprecated */, TextScaler? textScaler, int? maxLines, String? semanticsLabel, String? semanticsIdentifier, TextWidthBasis? textWidthBasis, TextHeightBehavior? textHeightBehavior, Color? selectionColor})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| data | String (positional, `Text`) | required | The text to display. |
| textSpan | InlineSpan (positional, `Text.rich`) | required | The text to display as a `InlineSpan`. |
| style | TextStyle? | — | If non-null, the style to use for this text. |
| strutStyle | StrutStyle? | — | The strut style to use. Strut style defines the strut, which sets minimum vertical layout metrics. |
| textAlign | TextAlign? | — | How the text should be aligned horizontally. |
| textDirection | TextDirection? | — | Text direction used to resolve alignment. |
| locale | Locale? | — | Used to select a font when the same Unicode character can be rendered differently, depending on the locale. |
| softWrap | bool? | — | Whether the text should break at soft line breaks. |
| overflow | TextOverflow? | — | How visual overflow should be handled. |
| textScaleFactor | double? | — | Deprecated: "Use textScaler instead. Use of textScaleFactor was deprecated in preparation for the upcoming nonlinear text scaling support. This feature was deprecated after v3.12.0-2.0.pre." (`Text` and `Text.rich` constructors; `Text.rich` also lists it) |
| textScaler | TextScaler? | — | The font scaling strategy to use when laying out and rendering the text. |
| maxLines | int? | — | An optional maximum number of lines for the text to span, wrapping if necessary. If the text exceeds the given number of lines, it will be truncated according to `overflow`. |
| semanticsLabel | String? | — | An alternative semantics label for this text. |
| semanticsIdentifier | String? | — | Semantics identifier for this text. |
| textWidthBasis | TextWidthBasis? | — | Defines how to measure the width of the rendered text. |
| textHeightBehavior | TextHeightBehavior? | — | Text height behavior for first/last line. |
| selectionColor | Color? | — | The color to use when painting the selection. |

## Notes

- Flutter widget API (Dart, `package:flutter/widgets.dart`) — distinct from Jetpack Compose / SwiftUI / WinUI / Ark UI / Chakra UI / fandhe-frontend components of the same name.
- Displays a string of text with a single style. The string might break across multiple lines or be displayed on the same line depending on the layout constraints.
- The `style` argument is optional. When omitted, the text uses the style from the closest enclosing `DefaultTextStyle`. If the given style's `TextStyle.inherit` is true (the default), the given style is merged with the closest enclosing `DefaultTextStyle` (e.g., to make the text bold while using the default font family and size).
- Using `maxLines: 1` is not equivalent to `softWrap: false`: with `TextOverflow.fade` and `maxLines: 1`, soft wrapping is enabled and a second line overflows, so the fade appears in a horizontal direction at the bottom; with `softWrap: false`, the single line overflows and the fade appears in a vertical direction at the right.
- Interactivity: to make `Text` react to touch events, wrap it in a `GestureDetector` with an `onTap` handler. In a Material Design application, consider a `TextButton` instead, or at least an `InkWell` instead of `GestureDetector`. To make sections of the text interactive, use `RichText` and specify a `TapGestureRecognizer` as the `TextSpan.recognizer` of the relevant part.
- Selection: `Text` is not selectable by default. Wrap a subtree with a `SelectionArea` widget to make it selectable; to exclude part of a subtree under `SelectionArea`, wrap it with `SelectionContainer.disabled`. (DartPad sample `widgets.Text.4` demonstrates disabling selection; the code is not included in the API page HTML.)
- See also `RichText` (more control over text styles), `DefaultTextStyle`, and `SelectableRegion` (overview of the selection system).

## Related

- [GestureDetector](./GestureDetector.md)
- [Container](./Container.md)
- [Row](./Row.md)
- [Column](./Column.md)
