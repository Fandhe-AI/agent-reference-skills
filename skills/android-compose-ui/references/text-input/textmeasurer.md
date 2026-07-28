# rememberTextMeasurer / TextMeasurer

`TextMeasurer` measures text outside of the normal layout pass (e.g. for custom `Canvas` drawing), producing a `TextLayoutResult`. It caches layout results internally (LRU) to optimize repeated `measure()` calls with the same input. `rememberTextMeasurer` creates and remembers one using composition-local defaults (font resolver, density, layout direction).

## Signature / Usage

```kotlin
public class TextMeasurer(
    private val defaultFontFamilyResolver: FontFamily.Resolver,
    private val defaultDensity: Density,
    private val defaultLayoutDirection: LayoutDirection,
    private val cacheSize: Int = DefaultCacheSize,
)

@Stable
public fun measure(
    text: AnnotatedString,
    style: TextStyle = TextStyle.Default,
    overflow: TextOverflow = TextOverflow.Clip,
    softWrap: Boolean = true,
    maxLines: Int = Int.MAX_VALUE,
    placeholders: List<AnnotatedString.Range<Placeholder>> = listOf(),
    constraints: Constraints = Constraints(),
    layoutDirection: LayoutDirection = this.defaultLayoutDirection,
    density: Density = this.defaultDensity,
    fontFamilyResolver: FontFamily.Resolver = this.defaultFontFamilyResolver,
    skipCache: Boolean = false,
): TextLayoutResult

@Composable
public fun rememberTextMeasurer(cacheSize: Int = TextMeasurer.DefaultCacheSize): TextMeasurer
```

```kotlin
val textMeasurer = rememberTextMeasurer()

Canvas(Modifier.fillMaxSize()) {
    val layoutResult = textMeasurer.measure(
        text = AnnotatedString("Hello Canvas"),
        style = TextStyle(fontSize = 24.sp),
    )
    drawText(layoutResult)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `AnnotatedString` / `String` | — | Text to measure. |
| `style` | `TextStyle` | `TextStyle.Default` | Styling applied during measurement. |
| `overflow` | `TextOverflow` | `TextOverflow.Clip` | Overflow handling. |
| `softWrap` | `Boolean` | `true` | Whether to break at soft line breaks. |
| `maxLines` | `Int` | `Int.MAX_VALUE` | Maximum number of lines. |
| `constraints` | `Constraints` | `Constraints()` | Layout constraints to measure within. |
| `skipCache` | `Boolean` | `false` | Bypasses the internal LRU cache when `true`. |
| `cacheSize` | `Int` | implementation default | Number of layout results cached by the `TextMeasurer` instance. |

## Notes

- Package: `androidx.compose.ui.text`.
- Reuses cached layouts when only draw-affecting parameters change (color, brush, shadow, decoration, draw style), which is useful when animating text color/brush.
- Draw the result with `DrawScope.drawText(textLayoutResult, ...)` inside a `Canvas`/custom draw modifier.

## Related

- [TextStyle](./textstyle.md)
- [AnnotatedString](./annotatedstring.md)
