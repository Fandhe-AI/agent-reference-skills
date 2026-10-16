---
source: https://docs.flutter.dev/ui/design/text/typography
---

# Flutter's fonts and typography

Typography covers the style and appearance of type or fonts: how heavy the font is, the slant, the spacing between letters, and other visual aspects of the text.

## Signature / Usage

Using the `google_fonts` package from pub.dev, by font name or customized via the resulting `TextStyle`:

```dart
Text(
  'This is Google Fonts',
  style: GoogleFonts.lato(),
),
```

```dart
Text(
  'This is Google Fonts',
  style: GoogleFonts.lato(
    textStyle: Theme.of(context).textTheme.displayLarge,
    fontSize: 48,
    fontWeight: FontWeight.w700,
    fontStyle: FontStyle.italic,
  ),
),
```

## Options / Props

APIs to programmatically alter a static font (this only works if the font was designed to support the feature):

| Name | Type | Description |
| --- | --- | --- |
| FontFeature | dart:ui class | Select glyphs; corresponds to an OpenType feature tag, like a boolean flag to enable or disable a feature of a given font |
| FontWeight | dart:ui class | Modify weight |
| FontStyle | dart:ui enum | Italicize |
| FontVariation | dart:ui class | Specify a range of values for a specific property (design axes of variable fonts); conforms to the OpenType font variables spec |

## Notes

- A font style is defined by, at minimum, a typeface (for example Roboto or Noto), a font weight, and a style (Regular, Italic, etc.); together with pre-set attributes this makes a static font. Variable fonts allow some attributes to be modified at runtime and store what would normally be multiple static fonts in a single file; they support axes such as width, weight, and slant, and the user can select any value along the continuous axis.
- Typographic scale: the common type scale in Flutter, provided by `TextTheme`, has five categories (Display, Headline, Title, Label, Body), each with three size variations (Small, Medium, Large). Each of the fifteen combinations is represented by a single `TextStyle`. All platform-specific scales Flutter exposes are contained in the `Typography` class; usually you do not reference it directly because `TextTheme` is localized to the target platform.
- The Google Fonts Type Tester shows the variable-font axes of fonts on Google Fonts. Google Fonts also contains static fonts; you can download them and install them manually, or use the `google_fonts` package on pub.dev.
- The page links the Flutter blog post "Playful typography with Flutter" (customizing variable fonts and animating them, with a custom shader).

## Related

- [ThemeData](./ThemeData.md)
- [assets-and-images](./assets-and-images.md)
- [fragment-shaders](./fragment-shaders.md)
