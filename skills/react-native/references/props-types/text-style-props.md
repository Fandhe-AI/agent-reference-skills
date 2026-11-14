---
source: https://reactnative.dev/docs/0.88/text-style-props
---

# Text Style Props

Style props accepted by the `style` prop of `Text` (and inherited text styling).

## Signature / Usage

Excerpt from the official example (the values come from `useState` hooks driven by sliders/buttons):

```tsx
<Text
  style={[
    styles.paragraph,
    {
      fontSize,
      fontStyle: fontStyles[fontStyleIdx],
      fontWeight: fontWeights[fontWeightIdx],
      lineHeight,
      textAlign: textAlignments[textAlignIdx],
      textDecorationLine: textDecorationLines[textDecorationLineIdx],
      textTransform: textTransformations[textTransformIdx],
      textAlignVertical: textAlignmentsVertical[textVerticalAlignIdx],
      fontVariant:
        fontVariantIdx === 0
          ? undefined
          : [validFontVariants[fontVariantIdx - 1]],
      letterSpacing,
      includeFontPadding,
      textDecorationStyle:
        textDecorationStyles[textDecorationStyleIdx],
      writingDirection: writingDirections[writingDirectionIdx],
      textShadowOffset,
      textShadowRadius,
    } as TextStyle,
  ]}>
  Lorem Ipsum is simply dummy text of the printing and typesetting
  industry. 112 Likes
</Text>
```

## Options / Props

| Name | Type | Default | Platform | Description |
| --- | --- | --- | --- | --- |
| `color` | color | | | |
| `fontFamily` | string | | | The generic font families `system-ui`, `ui-sans-serif`, `ui-serif`, `ui-monospace`, and `ui-rounded` are supported on iOS. |
| `fontSize` | number | | | |
| `fontStyle` | enum(`'normal'`, `'italic'`) | | | |
| `fontWeight` | enum(`'normal'`, `'bold'`, `'100'`, `'200'`, `'300'`, `'400'`, `'500'`, `'600'`, `'700'`, `'800'`, `'900'`) or number | `'normal'` | | The values `'normal'` and `'bold'` are supported for most fonts. Not all fonts have a variant for each of the numeric values, in that case the closest one is chosen. |
| `includeFontPadding` | bool | `true` | Android | Set to `false` to remove extra font padding intended to make space for certain ascenders / descenders. With some fonts, this padding can make text look slightly misaligned when centered vertically. For best results also set `textAlignVertical` to `center`. |
| `fontVariant` | array of enum(`'small-caps'`, `'oldstyle-nums'`, `'lining-nums'`, `'tabular-nums'`, `'proportional-nums'`) or string | `[]` | | Allows you to set all the font variants for a font. Can be set by using an array of enums or a space-separated string e.g. `'small-caps common-ligatures'`. |
| `fontVariationSettings` | string or object: `{[axis: string]: number}` | | | Configures variation axes for a variable font. Each axis is identified by a four-character OpenType tag, such as `wght` for weight, `wdth` for width, `opsz` for optical size, or a custom axis supported by the font. Settings can be provided as an object or as a CSS-compatible string. |
| `letterSpacing` | number | | | Increase or decrease the spacing between characters. By default there is no extra letter spacing. |
| `lineHeight` | number | | | Controls the vertical spacing between lines of text within a text element. It specifies the distance between the baselines of consecutive lines of text. |
| `textAlign` | enum(`'auto'`, `'left'`, `'right'`, `'center'`, `'justify'`) | `'auto'` | | On Android, the value 'justify' is only supported on Oreo (8.0) or above (API level >= 26). The value will fall back to `left` on lower Android versions. |
| `textAlignVertical` | enum(`'auto'`, `'top'`, `'bottom'`, `'center'`) | `'auto'` | Android | An alias for `verticalAlign` style prop, if you use both properties, `verticalAlign` will take precedence over `textAlignVertical`. |
| `textDecorationColor` | color | | iOS | |
| `textDecorationLine` | enum(`'none'`, `'underline'`, `'line-through'`, `'underline line-through'`) | `'none'` | | |
| `textDecorationStyle` | enum(`'solid'`, `'double'`, `'dotted'`, `'dashed'`) | `'solid'` | iOS | |
| `textShadowColor` | color | | | |
| `textShadowOffset` | object: `{width?: number, height?: number}` | | | |
| `textShadowRadius` | number | | | |
| `textTransform` | enum(`'none'`, `'uppercase'`, `'lowercase'`, `'capitalize'`) | `'none'` | | |
| `verticalAlign` | enum(`'auto'`, `'top'`, `'bottom'`, `'middle'`) | `'auto'` | Android | |
| `writingDirection` | enum(`'auto'`, `'ltr'`, `'rtl'`) | `'auto'` | iOS | |
| `userSelect` | enum(`'auto'`, `'text'`, `'none'`, `'contain'`, `'all'`) | `none` | | Allows the user to select text and to use the native copy and paste functionality. Has precedence over the `selectable` prop. |

## Notes

- 0.88: `fontVariationSettings` is now supported on both `Text` and `TextInput`, on Android and iOS, per the 0.88 release blog. It is documented on the 0.88 docs page (not on the 0.88 page). Both the CSS string form and an object form are accepted; object keys are four-character axis tags with finite numeric values:

The 0.88 docs page example (the object and string forms are equivalent; both set the wght axis to 500):

```tsx
<Text
  style={{
    fontVariationSettings: {wght: 500},
    // Equivalent CSS-compatible string:
    fontVariationSettings: "'wght' 500",
  }}>
  Variable font
</Text>
```

Further examples (from the 0.88 release blog):

```tsx
<Text style={{fontVariationSettings: {wght: 700, slnt: -10}}}>Object form</Text>
<Text style={{fontVariationSettings: "'wght' 700, 'slnt' -10"}}>String form</Text>
```

- The first 0.88 docs example repeats the `fontVariationSettings` key within one style object (verbatim from the page); use only one form per style.
- Style objects are interpreted by React Native, not by a CSS engine. `Text`'s `style` prop accepts these Text Style Props plus View Style Props (see the Text component page).
- Source: https://reactnative.dev/docs/0.88/text-style-props (react-native-website commit a459a29, retrieved 2026-11-14)

## Related

- [View Style Props](./view-style-props.md)
- [Layout Props](./layout-props.md)
- [Text](../components/text.md)
