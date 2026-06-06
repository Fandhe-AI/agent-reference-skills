# FrameNode

A container that defines layout hierarchy — analogous to `<div>` in HTML. Supports auto-layout, CSS grid layout, and prototyping reactions.

## Signature / Usage

```ts
const frame = figma.createFrame();
frame.name = 'Card';
frame.resize(320, 200);

// Enable auto-layout
frame.layoutMode = 'HORIZONTAL';
frame.itemSpacing = 16;
frame.paddingLeft = 24;
frame.paddingRight = 24;

// Add children
const rect = figma.createRectangle();
frame.appendChild(rect);
```

## Options / Props

### Type

| Name | Type | Description |
|------|------|-------------|
| `type` | `'FRAME'` (readonly) | Node type identifier |

### Layout

| Name | Type | Description |
|------|------|-------------|
| `layoutMode` | `'NONE' \| 'HORIZONTAL' \| 'VERTICAL' \| 'GRID'` | Auto-layout or grid direction |
| `layoutWrap` | `'NO_WRAP' \| 'WRAP'` | Whether auto-layout children wrap |
| `primaryAxisSizingMode` | `'FIXED' \| 'AUTO'` | Sizing along main axis |
| `counterAxisSizingMode` | `'FIXED' \| 'AUTO'` | Sizing along cross axis |
| `primaryAxisAlignItems` | `'MIN' \| 'CENTER' \| 'MAX' \| 'SPACE_BETWEEN'` | Main axis alignment |
| `counterAxisAlignItems` | `'MIN' \| 'CENTER' \| 'MAX' \| 'BASELINE'` | Cross axis alignment |
| `counterAxisAlignContent` | `'AUTO' \| 'SPACE_BETWEEN'` | Multi-line cross axis alignment |
| `itemSpacing` | `number` | Gap between items |
| `counterAxisSpacing` | `number \| null` | Gap between rows/columns when wrapping |
| `paddingTop/Bottom/Left/Right` | `number` | Inner padding |
| `clipsContent` | `boolean` | Clip children to frame bounds |
| `overflowDirection` | `OverflowDirection` | Scrolling direction |

### Grid Layout

| Name | Type | Description |
|------|------|-------------|
| `gridRowCount` | `number \| null` | Number of grid rows |
| `gridColumnCount` | `number \| null` | Number of grid columns |
| `gridRowGap` | `number` | Row gap |
| `gridColumnGap` | `number` | Column gap |

### Geometry

| Name | Type | Description |
|------|------|-------------|
| `fills` | `ReadonlyArray<Paint>` | Background fills |
| `strokes` | `ReadonlyArray<Paint>` | Border strokes |
| `strokeWeight` | `number` | Stroke weight |
| `cornerRadius` | `number \| typeof figma.mixed` | Uniform corner radius |
| `topLeftRadius` / `topRightRadius` / `bottomLeftRadius` / `bottomRightRadius` | `number` | Per-corner radii |
| `effects` | `ReadonlyArray<Effect>` | Shadow and blur effects |

### Prototyping

| Name | Type | Description |
|------|------|-------------|
| `reactions` | `ReadonlyArray<Reaction>` | Prototype interactions |
| `numberOfFixedChildren` | `number` | Count of fixed scroll-pinned children |

### Methods

| Name | Description |
|------|-------------|
| `clone()` | Duplicate the frame |
| `appendChild(child)` | Add a child node |
| `insertChild(index, child)` | Insert at position |
| `findAll(cb?)` | Search descendants |
| `findOne(cb)` | First matching descendant |
| `resize(w, h)` | Resize frame |
| `resizeWithoutConstraints(w, h)` | Resize ignoring child constraints |
| `getTopLevelFrame()` | Nearest ancestor frame |

## Notes

- `layoutMode = 'NONE'` means absolute positioning; children use `x`/`y` for placement.
- Frames persist their size when children are removed (unlike `GroupNode`).
- Use `createAutoLayout()` for a pre-configured horizontal auto-layout frame.

## Related

- [GroupNode](./node-group.md)
- [ComponentNode](./node-component.md)
- [InstanceNode](./node-instance.md)
- [node-properties](./node-properties.md)
