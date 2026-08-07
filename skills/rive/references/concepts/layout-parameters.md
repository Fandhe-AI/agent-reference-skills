# Layout Parameters

Editor-level parameters for Layout containers, split into those that affect the parent container itself (sizing, padding, clip, position) and those that affect its child Layouts (row/column, wrap, alignment, gap).

## Options / Props

| Parameter | Description |
| --- | --- |
| Absolute | Layout positions itself within an artboard or parent Layout via 2+ pinned edges; independent of flex flow |
| Relative | Layout position is determined by the parent's flex properties (row/column flow) |
| Fixed (scale type) | Fixed width/height in points or percentage |
| Hug (scale type) | Width/height shrinks to fit children |
| Fill (scale type) | Width/height expands to fill available space in the parent; uses `fr` (fill ratio) units + a base size field |
| Min/Max size constraints | Optional minimum/maximum width and height, in points or percentage |
| Clip | Hides child elements extending beyond the Layout's bounds |
| Position (Absolute only) | At least 2 pinned edges (1 horizontal, 1 vertical); hold `Shift` to pin a second edge on the same axis |
| Padding | Inner space between Layout bounds and relative Layout children (affects Layout children only) |
| Margin | Outer space between the Layout and its relative parent Layout |
| Row / Column / Row Reverse / Column Reverse | Direction children lay out along |
| Wrap / No Wrap / Wrap Reverse | Whether content overflowing the container wraps to a new row/column |
| Alignment | Aligns content within the container along the cross axis |
| Justify | Expands content to fill available space along the main axis |
| Gap | Spacing between content, horizontally/vertically, in points or percentage |
| Left-to-Right / Right-to-Left | Horizontal direction, cascades to child Layouts; affects Row direction and Text alignment for RTL languages |

## Notes

- Layout parameters generally only affect other Layout containers, often requiring nested Layouts to achieve the desired reflow.
- Hug and Fill scale options only surface when applicable (e.g., Fill requires a Layout parent; Hug requires children).
- Flex parameters (row/column, wrap, alignment, gap) apply only to Layout children — non-Layout content must itself be wrapped in a Layout to participate in the flow.

## Related

- [Layout](./layout.md)
- [Layout Styles](./layout-styles.md)
- [Layout Tools](./layout-tools.md)
- [Layout Animation](./layout-animation.md)
