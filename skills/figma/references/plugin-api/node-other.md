# Other Node Types

Reference for less commonly used node types: `SliceNode`, `EmbedNode`, `LinkUnfurlNode`, `MediaNode`, `TableNode`, `TableCellNode`, `WidgetNode`, `CodeBlockNode`, `RemovedNode`, `HighlightNode`, `ShapeWithTextNode`, `StampNode`, `WashiTapeNode`, `TextPathNode`, `TransformGroupNode`, `InteractiveSlideElementNode`, and `SlotNode`.

## SliceNode (`type: 'SLICE'`)

Defines an export region on the canvas. Does not render visually.

```ts
const slice = figma.createSlice();
slice.resize(200, 100);
slice.exportSettings = [{ format: 'PNG', constraint: { type: 'SCALE', value: 2 } }];
```

---

## EmbedNode (`type: 'EMBED'`)

An embedded external content node (e.g. a Loom video embed in FigJam).

| Property | Type | Description |
|----------|------|-------------|
| `embedData` | `EmbedData` (readonly) | Source URL and metadata |

---

## LinkUnfurlNode (`type: 'LINK_UNFURL'`)

An unfurled link preview card in FigJam.

| Property | Type | Description |
|----------|------|-------------|
| `linkUnfurlData` | `LinkUnfurlData` (readonly) | URL and preview metadata |

---

## MediaNode (`type: 'MEDIA'`)

A video or GIF node. Only in FigJam.

| Property | Type | Description |
|----------|------|-------------|
| `mediaData` | `MediaData` (readonly) | Media source information |

---

## TableNode (`type: 'TABLE'`) and TableCellNode (`type: 'TABLE_CELL'`)

A table in FigJam. Created via `figma.createTable()`.

```ts
const table = figma.createTable(3, 4); // 3 rows, 4 columns
const cell  = table.cellAt(0, 0) as TableCellNode;
```

| Property | Type | Description |
|----------|------|-------------|
| `numRows` | `number` (readonly) | Row count |
| `numColumns` | `number` (readonly) | Column count |

`TableCellNode` inherits text and fill properties.

---

## WidgetNode (`type: 'WIDGET'`)

A FigJam widget. Read-only from a plugin context.

| Property | Type | Description |
|----------|------|-------------|
| `widgetId` | `string` (readonly) | Widget definition ID |
| `widgetSyncedState` | `Record<string, any>` (readonly) | Widget state snapshot |

---

## CodeBlockNode (`type: 'CODE_BLOCK'`)

A code block sticky in FigJam.

| Property | Type | Description |
|----------|------|-------------|
| `code` | `string` | Code content |
| `codeLanguage` | `CodeLanguage` | Syntax highlighting language |

---

## RemovedNode

Returned by some APIs when a node has been deleted. Check `node.removed === true` before use.

| Property | Type | Description |
|----------|------|-------------|
| `removed` | `true` (readonly) | Always `true` for removed nodes |

---

## HighlightNode (`type: 'HIGHLIGHT'`)

A highlight annotation node (FigJam). Created by users on top of other content.

---

## ShapeWithTextNode (`type: 'SHAPE_WITH_TEXT'`)

A FigJam shape that contains text (e.g. rounded rectangle with label). Has a `text` sublayer property for accessing the text content.

| Property | Type | Description |
|----------|------|-------------|
| `shapeType` | `ShapeType` | The shape variant (e.g. `'SQUARE'`, `'ELLIPSE'`, `'DIAMOND'`, etc.) |
| `text` | `TextSublayerNode` (readonly) | Text sublayer |

---

## StampNode (`type: 'STAMP'`)

A reaction stamp in FigJam (emoji reaction).

---

## WashiTapeNode (`type: 'WASHI_TAPE'`)

A decorative washi tape strip in FigJam.

---

## TextPathNode (`type: 'TEXT_PATH'`)

Text that follows a vector path.

| Property | Type | Description |
|----------|------|-------------|
| `textPathData` | `TextPathStartData` | Path start position and offset |

---

## TransformGroupNode (`type: 'TRANSFORM_GROUP'`)

A group node created by certain transform operations. Behaves similarly to `GroupNode`.

---

## InteractiveSlideElementNode (`type: 'INTERACTIVE_SLIDE_ELEMENT'`)

An interactive element within a Figma Slides presentation (e.g. a poll or quiz component).

---

## SlotNode (`type: 'SLOT'`)

A slot placeholder within a component, used with slot-based component properties. Created via `component.createSlot()`.

## Notes

- `EmbedNode`, `LinkUnfurlNode`, `MediaNode`, `TableNode`, `WidgetNode`, and `CodeBlockNode` are FigJam-only.
- `SliceNode` is Design-only; it has no visual representation.
- Always check `node.removed` before operating on nodes obtained from long-lived references.

## Related

- [editor-types](./editor-types.md)
- [node-properties](./node-properties.md)
