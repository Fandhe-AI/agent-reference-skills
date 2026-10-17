---
source: https://reactnative.dev/docs/0.87/layout-props
---

# Layout Props

Layout (Flexbox, sizing, spacing, positioning) style props. More detailed examples can be found on the Layout with Flexbox page.

## Signature / Usage

Excerpt from the official example (the style values cycled by the buttons; in the official example `hookedStyles` is computed inside the App component from state):

```tsx
const flexDirections: ViewStyle['flexDirection'][] = [
  'row',
  'row-reverse',
  'column',
  'column-reverse',
];
const justifyContents: ViewStyle['justifyContent'][] = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
];
const alignItemsArr: ViewStyle['alignItems'][] = [
  'flex-start',
  'flex-end',
  'center',
  'stretch',
  'baseline',
];
const wraps: ViewStyle['flexWrap'][] = ['nowrap', 'wrap', 'wrap-reverse'];
const directions: ViewStyle['direction'][] = ['inherit', 'ltr', 'rtl'];

const hookedStyles = {
  flexDirection: flexDirections[flexDirection],
  justifyContent: justifyContents[justifyContent],
  alignItems: alignItemsArr[alignItems],
  direction: directions[direction],
  flexWrap: wraps[wrap],
};

<View style={[styles.container, styles.playingSpace, hookedStyles]}>
  {squares.map(elem => elem)}
</View>
```

## Options / Props

All props are optional. `number, string` means points or percentage strings; in React Native you must use points or percentages (ems and other units are not supported).

| Name | Type | Description |
| --- | --- | --- |
| `alignContent` | enum('flex-start', 'flex-end', 'center', 'stretch', 'space-between', 'space-around', 'space-evenly') | Defines the distribution of lines along the cross-axis within this container; only has effect when items are wrapped to multiple lines using `flexWrap`. |
| `alignItems` | enum('flex-start', 'flex-end', 'center', 'stretch', 'baseline') | Aligns children in the cross direction. Works like `align-items` in CSS (default: stretch). |
| `alignSelf` | enum('auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline') | Controls how a child aligns in the cross direction, overriding the `alignItems` of the parent (default: auto). |
| `aspectRatio` | number, string | Controls the size of the undefined dimension of a node (see below). |
| `borderBottomWidth` | number | Works like `border-bottom-width` in CSS. |
| `borderEndWidth` | number | When direction is `ltr`, equivalent to `borderRightWidth`. When `rtl`, equivalent to `borderLeftWidth`. |
| `borderLeftWidth` | number | Works like `border-left-width` in CSS. |
| `borderRightWidth` | number | Works like `border-right-width` in CSS. |
| `borderStartWidth` | number | When direction is `ltr`, equivalent to `borderLeftWidth`. When `rtl`, equivalent to `borderRightWidth`. |
| `borderTopWidth` | number | Works like `border-top-width` in CSS. |
| `borderWidth` | number | Works like `border-width` in CSS. |
| `bottom` | number, string | Number of logical pixels to offset the bottom edge of this component. |
| `boxSizing` | enum('border-box', 'content-box') | Defines how `width`, `height`, `minWidth`, `minHeight`, etc. are computed: border box or content box. The default value is `border-box`. |
| `columnGap` | number, string | Works like `column-gap` in CSS. Percentage values are supported on the New Architecture. |
| `direction` | enum('inherit', 'ltr', 'rtl') | Directional flow of the user interface. The default is `inherit`, except for root node which will have value based on the current locale. |
| `display` | enum('none', 'flex', 'contents') | Only supports the values 'flex', 'none', and 'contents'. The default is `flex`. |
| `end` | number, string | When direction is `ltr`, equivalent to `right`; when `rtl`, equivalent to `left`. Takes precedence over the `left` and `right` styles. |
| `flex` | number | Yoga-based flex (see below). |
| `flexBasis` | number, string | Axis-independent way of providing the default size of an item along the main axis. |
| `flexDirection` | enum('row', 'row-reverse', 'column', 'column-reverse') | Works like `flex-direction` in CSS, except the default is `column`. |
| `flexGrow` | number | How remaining space is distributed among children along the main axis. Accepts any floating point value >= 0, default 0. |
| `flexShrink` | number | How to shrink children along the main axis when they overflow. Accepts any floating point value >= 0, default 0. |
| `flexWrap` | enum('wrap', 'nowrap', 'wrap-reverse') | Whether children can wrap after they hit the end of a flex container (default: nowrap). |
| `gap` | number, string | Shorthand for `rowGap` and `columnGap`. Percentage values are supported on the New Architecture. |
| `height` | number, string | Sets the height of this component. |
| `inset` | number, string | Same effect as setting each of `top`, `bottom`, `right` and `left`. New Architecture only. |
| `insetBlock` | number, string | Equivalent to `top` and `bottom`. New Architecture only. |
| `insetBlockEnd` | number, string | Equivalent to `bottom`. New Architecture only. |
| `insetBlockStart` | number, string | Equivalent to `top`. New Architecture only. |
| `insetInline` | number, string | Equivalent to `right` and `left`. New Architecture only. |
| `insetInlineEnd` | number, string | `ltr`: equivalent to `right`; `rtl`: equivalent to `left`. New Architecture only. |
| `insetInlineStart` | number, string | `ltr`: equivalent to `left`; `rtl`: equivalent to `right`. New Architecture only. |
| `isolation` | enum('auto', 'isolate') | Forms a stacking context. `auto` (default) does nothing; `isolate` forms a stacking context. New Architecture only. |
| `justifyContent` | enum('flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly') | Aligns children in the main direction (default: flex-start). |
| `left` | number, string | Number of logical pixels to offset the left edge of this component. |
| `margin` | number, string | Same effect as setting each of `marginTop`, `marginLeft`, `marginBottom`, and `marginRight`. |
| `marginBottom` | number, string | Works like `margin-bottom` in CSS. |
| `marginBlock` | number, string | Equivalent to `marginVertical`. |
| `marginBlockEnd` | number, string | Equivalent to `marginBottom`. |
| `marginBlockStart` | number, string | Equivalent to `marginTop`. |
| `marginEnd` | number, string | `ltr`: equivalent to `marginRight`; `rtl`: equivalent to `marginLeft`. |
| `marginHorizontal` | number, string | Same effect as setting both `marginLeft` and `marginRight`. |
| `marginInline` | number, string | Equivalent to `marginHorizontal`. |
| `marginInlineEnd` | number, string | `ltr`: equivalent to `marginEnd` (i.e. `marginRight`); `rtl`: `marginLeft`. |
| `marginInlineStart` | number, string | `ltr`: equivalent to `marginStart` (i.e. `marginLeft`); `rtl`: `marginRight`. |
| `marginLeft` | number, string | Works like `margin-left` in CSS. |
| `marginRight` | number, string | Works like `margin-right` in CSS. |
| `marginStart` | number, string | `ltr`: equivalent to `marginLeft`; `rtl`: equivalent to `marginRight`. |
| `marginTop` | number, string | Works like `margin-top` in CSS. |
| `marginVertical` | number, string | Same effect as setting both `marginTop` and `marginBottom`. |
| `maxHeight` | number, string | Maximum height for this component, in logical pixels. |
| `maxWidth` | number, string | Maximum width for this component, in logical pixels. |
| `minHeight` | number, string | Minimum height for this component, in logical pixels. |
| `minWidth` | number, string | Minimum width for this component, in logical pixels. |
| `overflow` | enum('visible', 'hidden', 'scroll') | `hidden` clips views; `scroll` measures views independently of their parents' main axis (default: visible). |
| `padding` | number, string | Same effect as setting each of `paddingTop`, `paddingBottom`, `paddingLeft`, and `paddingRight`. |
| `paddingBottom` | number, string | Works like `padding-bottom` in CSS. |
| `paddingBlock` | number, string | Equivalent to `paddingVertical`. |
| `paddingBlockEnd` | number, string | Equivalent to `paddingBottom`. |
| `paddingBlockStart` | number, string | Equivalent to `paddingTop`. |
| `paddingEnd` | number, string | `ltr`: equivalent to `paddingRight`; `rtl`: equivalent to `paddingLeft`. |
| `paddingHorizontal` | number, string | Like setting both `paddingLeft` and `paddingRight`. |
| `paddingInline` | number, string | Equivalent to `paddingHorizontal`. |
| `paddingInlineEnd` | number, string | `ltr`: equivalent to `paddingEnd` (i.e. `paddingRight`); `rtl`: `paddingLeft`. |
| `paddingInlineStart` | number, string | `ltr`: equivalent to `paddingStart` (i.e. `paddingLeft`); `rtl`: `paddingRight`. |
| `paddingLeft` | number, string | Works like `padding-left` in CSS. |
| `paddingRight` | number, string | Works like `padding-right` in CSS. |
| `paddingStart` | number, string | `ltr`: equivalent to `paddingLeft`; `rtl`: equivalent to `paddingRight`. |
| `paddingTop` | number, string | Works like `padding-top` in CSS. |
| `paddingVertical` | number, string | Like setting both `paddingTop` and `paddingBottom`. |
| `position` | enum('absolute', 'relative', 'static') | Similar to CSS, but everything is `relative` by default (see below). |
| `right` | number, string | Number of logical pixels to offset the right edge of this component. |
| `rowGap` | number, string | Works like `row-gap` in CSS. Percentage values are supported on the New Architecture. |
| `start` | number, string | `ltr`: equivalent to `left`; `rtl`: equivalent to `right`. Takes precedence over `left`, `right`, and `end`. |
| `top` | number, string | Number of logical pixels to offset the top edge of this component. |
| `width` | number, string | Sets the width of this component. |
| `zIndex` | number | Controls which components display on top of others. |

`aspectRatio`:

- On a node with a set width/height, aspect ratio controls the size of the unset dimension
- On a node with a set flex basis, aspect ratio controls the size of the node in the cross axis if unset
- On a node with a measure function, aspect ratio works as though the measure function measures the flex basis
- On a node with flex grow/shrink, aspect ratio controls the size of the node in the cross axis if unset
- Aspect ratio takes min/max dimensions into account

`flex`: In React Native `flex` does not work the same way that it does in CSS. `flex` is a number rather than a string, and it works according to the Yoga layout engine.

- When `flex` is a positive number, the component is flexible and sized proportional to its flex value. A component with `flex` set to `2` will take twice the space as a component with `flex` set to 1. `flex: <positive number>` equates to `flexGrow: <positive number>, flexShrink: 1, flexBasis: 0`.
- When `flex` is `0`, the component is sized according to `width` and `height`, and it is inflexible.
- When `flex` is `-1`, the component is normally sized according to `width` and `height`. However, if there's not enough space, the component will shrink to its `minWidth` and `minHeight`.

`position`:

- `relative` will position an element according to the normal flow of the layout. Insets (`top`, `bottom`, `left`, `right`) will offset relative to this layout.
- `absolute` takes the element out of the normal flow of the layout. Insets will offset relative to its containing block.
- `static` will position an element according to the normal flow of the layout. Insets will have no effect. `static` elements do not form a containing block for absolute descendants.

## Notes

- `flex` and layout are computed by the Yoga layout engine, not by a CSS engine; behaviors differ from CSS (e.g. `flexDirection` defaults to `column`, `position` defaults to `relative`).
- `alignContent`: the official Layout Props page says it overrides the parent's `alignContent`; this is inaccurate — it aligns the wrapped lines of the container it is set on (as described on the official Flexbox page).
- `flexWrap`: it does not work anymore with `alignItems: stretch` (the default), so you may want to use `alignItems: flex-start` for example (breaking change introduced in v0.28.0).
- `zIndex`: Normally you don't use it; components render according to their order in the document tree, so later components draw over earlier ones. On iOS, `zIndex` may require `View`s to be siblings of each other for it to work as expected.
- `inset*`, `isolation` and percentage `gap` / `columnGap` / `rowGap` values are available only on the New Architecture.

## Related

- [View Style Props](./view-style-props.md)
- [Text Style Props](./text-style-props.md)
- [Shadow Props](./shadow-props.md)
