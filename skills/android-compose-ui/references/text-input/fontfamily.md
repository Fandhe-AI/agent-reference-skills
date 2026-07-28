# FontFamily / Font

`FontFamily` is the primary typography interface for Compose; it groups one or more `Font`s (or a preloaded `Typeface`) that together represent a typeface across weights/styles. `Font(...)` constructs an individual font reference from a resource, a downloadable Google Font, or a variable font.

## Signature / Usage

```kotlin
@Stable public fun FontFamily(fonts: List<Font>): FontFamily
@Stable public fun FontFamily(vararg fonts: Font): FontFamily
@Stable public fun FontFamily(typeface: Typeface): FontFamily

public fun Font(
    resId: Int,
    weight: FontWeight = FontWeight.Normal,
    style: FontStyle = FontStyle.Normal,
    loadingStrategy: FontLoadingStrategy = FontLoadingStrategy.Blocking,
): Font
```

```kotlin
val firaSansFamily = FontFamily(
    Font(R.font.firasans_light, FontWeight.Light),
    Font(R.font.firasans_regular, FontWeight.Normal),
    Font(R.font.firasans_bold, FontWeight.Bold),
)

Text(text = "Styled", fontFamily = firaSansFamily, fontWeight = FontWeight.Bold)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fonts` | `List<Font>` / `vararg Font` | — | Set of `Font`s (different weights/styles) composing the family. |
| `resId` | `Int` | — | Resource ID of a font file under `res/font`. |
| `weight` | `FontWeight` | `FontWeight.Normal` | Weight this `Font` represents within the family. |
| `style` | `FontStyle` | `FontStyle.Normal` | Style (normal/italic) this `Font` represents. |
| `loadingStrategy` | `FontLoadingStrategy` | `FontLoadingStrategy.Blocking` | Whether the font loads synchronously or asynchronously. |
| `variationSettings` | `FontVariation.Settings` | derived from `weight`/`style` | Variable-font axis values (`FontVariation.weight/width/slant/italic`, Android O+). |

## Notes

- Package: `androidx.compose.ui.text.font`.
- Built-in generic families: `FontFamily.Default`, `FontFamily.SansSerif`, `FontFamily.Serif`, `FontFamily.Monospace`, `FontFamily.Cursive`.
- Downloadable Google Fonts (Compose 1.2.0+) require the `androidx.compose.ui:ui-text-google-fonts` artifact; construct with `Font(googleFont = GoogleFont("Name"), fontProvider = GoogleFont.Provider(...))` instead of `resId`.
- Variable fonts (Android O+) use a single font file with `FontVariation.Settings(...)` to configure weight/width/slant/custom axes instead of listing multiple static `Font`s.

## Related

- [TextStyle](./textstyle.md)
- [SpanStyle](./spanstyle.md)
