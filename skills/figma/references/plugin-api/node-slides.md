# Slides Nodes: SlideNode, SlideRowNode, SlideGridNode

Node types specific to Figma Slides. Only available when `editorType` includes `"slides"`.

## Node Hierarchy

```
SlideGridNode  (root of slides canvas)
  └── SlideRowNode  (row container)
        └── SlideNode  (individual 1920×1080 slide)
```

## SlideNode

The fundamental unit of a Figma Slides presentation. Fixed at 1920×1080, non-resizable, non-rotatable.

```ts
const slide = figma.currentPage.children[0] as SlideGridNode;
const row   = slide.children[0] as SlideRowNode;
const s     = row.children[0] as SlideNode;

s.isSkippedSlide = true;

const transition = s.getSlideTransition();
s.setSlideTransition({ type: 'DISSOLVE', duration: 300 });
```

### Properties

| Name | Type | Description |
|------|------|-------------|
| `type` | `'SLIDE'` (readonly) | Node type identifier |
| `isSkippedSlide` | `boolean` | Whether slide is skipped in presentation |

### Methods: `getSlideTransition()`, `setSlideTransition()`, `clone()`

---

## SlideRowNode

A row grouping slides. Direct child of `SlideGridNode`.

### Properties

| Name | Type | Description |
|------|------|-------------|
| `type` | `'SLIDE_ROW'` (readonly) | Node type identifier |
| `children` | `ReadonlyArray<SlideNode>` (readonly) | Slides in this row |

---

## SlideGridNode

Root container for all slide rows. Typically accessed via `figma.currentPage.children[0]`.

### Properties

| Name | Type | Description |
|------|------|-------------|
| `type` | `'SLIDE_GRID'` (readonly) | Node type identifier |
| `children` | `ReadonlyArray<SlideRowNode>` (readonly) | Rows of slides |

## Notes

- Slides are not direct children of the page — they must reside inside a `SlideRow` inside a `SlideGrid`.
- `SlideNode` dimensions (1920×1080) are fixed and cannot be changed.
- Use `figma.viewport.slidesView` to toggle between `'grid'` and `'single-slide'` view modes.

## Related

- [editor-types](./editor-types.md)
- [figma.viewport](./figma-viewport.md)
