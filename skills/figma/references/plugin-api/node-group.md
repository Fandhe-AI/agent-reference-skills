# GroupNode

A semantic grouping container. Unlike `FrameNode`, a group auto-resizes to fit its children and does not establish layout boundaries.

## Signature / Usage

```ts
// Groups are typically created by the user; plugins create them via:
const group = figma.group([rect, ellipse], figma.currentPage);
group.name = 'Icons';
```

## Options / Props

### Properties

| Name | Type | Description |
|------|------|-------------|
| `type` | `'GROUP'` (readonly) | Node type identifier |
| `children` | `ReadonlyArray<SceneNode>` (readonly) | Child nodes |
| `expanded` | `boolean` | Whether expanded in layers panel |
| `x`, `y` | `number` | Position (auto-computed from children bounds) |
| `width`, `height` | `number` (readonly) | Size (auto-computed from children bounds) |
| `opacity` | `number` | 0–1 |
| `blendMode` | `BlendMode` | Blend mode |
| `visible` | `boolean` | Visibility |
| `locked` | `boolean` | Lock state |

### Methods

| Name | Description |
|------|-------------|
| `clone()` | Duplicate the group |
| `appendChild(child)` | Add a child node |
| `insertChild(index, child)` | Insert at position |
| `findAll(cb?)` | Search descendants |
| `findOne(cb)` | First matching descendant |

## Notes

- A group with no children **deletes itself automatically**.
- Position and size always reflect bounding box of children; setting `x`/`y` translates the group.
- Do not assume a node type is stable during long-running operations — users can convert frames to groups via the UI.

## Related

- [FrameNode](./node-frame.md)
- [BooleanOperationNode](./node-boolean-operation.md)
