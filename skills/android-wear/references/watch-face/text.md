# Text and Fonts (PartText, Text, Font)

`<PartText>` renders non-time text via a `<Text>` (or `<TextCircular>`) child, styled with `<Font>` or `<BitmapFont>`.

## Signature / Usage

```xml
<PartText x="0" y="50" width="450" height="250">
    <Text align="CENTER" maxLines="2">
        <Font family="pacifico" size="96" weight="BOLD" color="#e2a0ff">
            <![CDATA[Hello Wear OS world]]>
        </Font>
    </Text>
</PartText>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Text.align` | enum | — | Text alignment, e.g. `"CENTER"`, `"START"`. |
| `Text.maxLines` | int | — | Maximum number of lines for multiline text. |
| `Font.family` | string | — | Custom font from `res/font`, or `"SYNC_TO_DEVICE"` for the system font. |
| `Font.size` | int (px) | — | Font size. |
| `Font.color` | color | — | Text color, hex. |
| `Font.weight` | enum | — | e.g. `"BOLD"`. |
| `Template.<Parameter expression>` | expression | — | Child of `Font`; substitutes `%s` placeholders with an evaluated expression (see [expressions](./expressions.md)). |
| `BitmapFont.name` | string | — | Name of a bitmap font defined in `<BitmapFonts>`. |
| `OutGlow.color` / `radius` | color / float | — | Optional glow effect wrapping the font content. |

## Notes

- This is the Wear OS Watch Face Format / watch face API — distinct from the same-named concept in other skills.
- Dynamic text uses `<Template>`: `<Template>Day: %s<Parameter expression="[DAY_OF_WEEK_S]" /></Template>`.
- Bitmap fonts are declared via `<BitmapFonts><BitmapFont name="myhandwriting"><Character name="1" resource="digit1" width="50" height="100"/><Word name="12" resource="digit12" width="80" height="100"/></BitmapFont></BitmapFonts>`; all character/word images must share a consistent height to avoid memory bloat (see [memory-optimization](./memory-optimization.md)).
- `TimeText` (child of `DigitalClock`) is the specialized time-formatted counterpart of `Text`; see [time](./time.md).
- WFF v5 added `minSize` on `<Font>` and line spacing / vertical alignment on `<Text>` / auto-sizing on `<TextCircular>` (see [versions](./versions.md)).

## Related

- [time](./time.md)
- [expressions](./expressions.md)
- [memory-optimization](./memory-optimization.md)
