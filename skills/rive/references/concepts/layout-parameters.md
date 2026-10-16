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
| Layout type: Grid | Lay out children in cells defined by columns and rows (starts with one column and one row); children fill each row left to right in hierarchy order |
| Layout type: Stack | Place all children in the same space, layered; topmost child in the hierarchy is drawn in front. Position with Alignment; Fill children cover the whole Stack, Fixed/Hug children follow alignment |
| Grid tracks (columns / rows) | Each track is Fill (`fr` fill-ratio units, e.g. three `1fr` columns share width equally, `2fr` takes twice a `1fr`), Fixed, or Hug; drag to reorder, Shift+click track numbers to edit several |
| Grid Cell (on children of a Grid) | **Position**: column and row (default: next available cell); **Span**: number of columns and/or rows occupied |
| Styles | Fills, strokes, feathers, blend modes and corner radii like other objects; rendered in the background (behind children) or foreground (in front). Corner radius also applies to the clipping bounds |
| Wrap / No Wrap / Wrap Reverse | Whether content overflowing the container wraps to a new row/column |
| Alignment | Aligns content within the container along the cross axis |
| Justify | Expands content to fill available space along the main axis |
| Gap | Spacing between content, horizontally/vertically, in points or percentage |
| Left-to-Right / Right-to-Left | Horizontal direction, cascades to child Layouts; affects Row direction and Text alignment for RTL languages |

## Notes

- Layout parameters generally only affect other Layout containers, often requiring nested Layouts to achieve the desired reflow.
- Hug and Fill scale options only surface when applicable (e.g., Fill requires a Layout parent; Hug requires children).
- Layout children: shapes, text and images can become Layout children directly by selecting **Layout** instead of **Node** at the top of the Inspector; groups and paths must be wrapped in an additional layout container.
- Grid vs flex: Grid and Stack are layout types distinct from the flex Row/Column options. Wrap applies to Row and Column layouts only. Use Gap for space between grid columns and rows.
- Grid: children after a spanning child are pushed to the next available cells; if there are more children than cells, Rive adds rows to fit (add them explicitly and set their scale type to control sizing). To make a child fill its cell set width and height to **Fill**; to use Grid Cell options such as span with a component instance, wrap the instance in a Layout with Fill width and height.
- The number of grid columns and rows cannot be animated; track sizes, gaps, and Grid Cell spans and positions can be keyed.
- Flex parameters (row/column, wrap, alignment, gap) apply only to Layout children — non-Layout content must itself be wrapped in a Layout to participate in the flow.

## Related

- [Layout](./layout.md)
- [Layout Styles](./layout-styles.md)
- [Layout Tools](./layout-tools.md)
- [Layout Animation](./layout-animation.md)
