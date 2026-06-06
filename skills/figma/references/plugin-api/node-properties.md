# Shared Node Properties

Properties and methods shared across multiple node types via mixins. Not all nodes implement every property — check the specific node type's documentation.

## Signature / Usage

```ts
// Accessing shared properties on any SceneNode
const node = figma.currentPage.selection[0]

node.name         // string — layer name
node.x            // number — local x position
node.y            // number — local y position
node.visible      // boolean — layer visibility
node.opacity      // number — 0 to 1

// Resize and export
node.resize(200, 100)
const bytes = await node.exportAsync({ format: 'PNG' })

// Plugin data
node.setPluginData('key', JSON.stringify({ version: 1 }))
const raw = node.getPluginData('key')
```

## Options / Props

### Identity

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` (readonly) | Unique node identifier |
| `name` | `string` | Layer name |
| `parent` | `BaseNode \| null` (readonly) | Parent node |
| `removed` | `boolean` (readonly) | Whether node has been deleted |
| `type` | `string` (readonly) | Node type literal |

### Visibility & Locking

| Name | Type | Description |
|------|------|-------------|
| `visible` | `boolean` | Layer visibility |
| `locked` | `boolean` | Lock state |
| `opacity` | `number` | 0–1 |
| `blendMode` | `BlendMode` | Compositing blend mode |

### Layout & Transform

| Name | Type | Description |
|------|------|-------------|
| `x`, `y` | `number` | Local position |
| `width`, `height` | `number` (readonly for most) | Bounding dimensions |
| `rotation` | `number` | Rotation in degrees (-180 to 180) |
| `relativeTransform` | `Transform` | 2×3 affine transform relative to parent |
| `absoluteTransform` | `Transform` (readonly) | 2×3 affine transform in page coordinates |
| `absoluteBoundingBox` | `Rect \| null` (readonly) | Axis-aligned bounding box in page coords |
| `absoluteRenderBounds` | `Rect \| null` (readonly) | Bounding box including effects |
| `constraints` | `Constraints` | Resize constraints within parent frame |
| `constrainProportions` | `boolean` | Lock aspect ratio |

#### Auto-layout child properties

| Name | Type | Description |
|------|------|-------------|
| `layoutAlign` | `'MIN' \| 'CENTER' \| 'MAX' \| 'STRETCH' \| 'INHERIT'` | Cross-axis alignment in auto-layout parent |
| `layoutGrow` | `number` | Flex grow factor (0 or 1) |
| `layoutPositioning` | `'AUTO' \| 'ABSOLUTE'` | Whether child follows auto-layout or is absolutely positioned |
| `layoutSizingHorizontal` | `'FIXED' \| 'HUG' \| 'FILL'` | Horizontal sizing behavior |
| `layoutSizingVertical` | `'FIXED' \| 'HUG' \| 'FILL'` | Vertical sizing behavior |
| `minWidth`, `maxWidth` | `number \| null` | Size constraints |
| `minHeight`, `maxHeight` | `number \| null` | Size constraints |

### Fills & Strokes

| Name | Type | Description |
|------|------|-------------|
| `fills` | `ReadonlyArray<Paint>` | Fill paints |
| `strokes` | `ReadonlyArray<Paint>` | Stroke paints |
| `strokeWeight` | `number` | Uniform stroke width |
| `strokeTopWeight` / `strokeBottomWeight` / `strokeLeftWeight` / `strokeRightWeight` | `number` | Per-side stroke widths |
| `strokeAlign` | `'INSIDE' \| 'OUTSIDE' \| 'CENTER'` | Stroke position |
| `strokeCap` | `StrokeCap` | Endpoint style |
| `strokeJoin` | `StrokeJoin` | Join style |
| `strokeMiterLimit` | `number` | Miter join limit |
| `dashPattern` | `ReadonlyArray<number>` | Dash/gap pattern |
| `fillStyleId` | `string \| typeof figma.mixed` | Linked paint style ID |
| `strokeStyleId` | `string` | Linked stroke style ID |

### Effects & Styles

| Name | Type | Description |
|------|------|-------------|
| `effects` | `ReadonlyArray<Effect>` | Shadow and blur effects |
| `effectStyleId` | `string` | Linked effect style ID |
| `layoutGrids` | `ReadonlyArray<LayoutGrid>` | Layout grids (frames only) |
| `gridStyleId` | `string` | Linked grid style ID |

### Children (container nodes only)

| Name | Signature | Description |
|------|-----------|-------------|
| `children` | `ReadonlyArray<SceneNode>` | Child nodes |
| `appendChild(child)` | `(child: SceneNode) => void` | Add child at end |
| `insertChild(index, child)` | `(index: number, child: SceneNode) => void` | Insert at position |
| `findAll(cb?)` | `(cb?) => SceneNode[]` | Search all descendants |
| `findOne(cb)` | `(cb) => SceneNode \| null` | First matching descendant |
| `findAllWithCriteria(criteria)` | `(criteria: FindAllCriteria) => NodeType[]` | Typed descendant search |
| `findChildren(cb?)` | `(cb?) => SceneNode[]` | Search immediate children only |
| `findChild(cb)` | `(cb) => SceneNode \| null` | First matching immediate child |

### Resize & Transform Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `resize(w, h)` | `(width: number, height: number) => void` | Resize respecting constraints |
| `resizeWithoutConstraints(w, h)` | `(width: number, height: number) => void` | Resize ignoring constraints |
| `rescale(scale)` | `(scale: number) => void` | Scale node and content |
| `remove()` | `() => void` | Delete the node |

### Export

| Name | Signature | Description |
|------|-----------|-------------|
| `exportAsync(settings?)` | `(settings?: ExportSettings) => Promise<Uint8Array>` | Export node as image/SVG/PDF |
| `exportSettings` | `ReadonlyArray<ExportSettings>` | Saved export configurations |
| `getCSSAsync()` | `() => Promise<Record<string, string>>` | CSS property equivalents |

### Plugin Data

| Name | Signature | Description |
|------|-----------|-------------|
| `getPluginData(key)` | `(key: string) => string` | Read plugin-private data |
| `setPluginData(key, value)` | `(key: string, value: string) => void` | Write plugin-private data (empty string deletes) |
| `getPluginDataKeys()` | `() => string[]` | All plugin data keys |
| `getSharedPluginData(namespace, key)` | `(ns: string, key: string) => string` | Read shared cross-plugin data |
| `setSharedPluginData(namespace, key, value)` | `(ns: string, key: string, value: string) => void` | Write shared data |
| `getSharedPluginDataKeys(namespace)` | `(ns: string) => string[]` | All keys in namespace |

### Variables (Binding)

| Name | Signature | Description |
|------|-----------|-------------|
| `boundVariables` | `Record<string, VariableAlias>` (readonly) | Bound variable aliases |
| `setBoundVariable(field, variable)` | `(field: string, variable: Variable \| null) => void` | Bind/unbind a variable |
| `resolvedVariableModes` | `Record<string, string>` (readonly) | Resolved mode IDs for collections |
| `explicitVariableModes` | `Record<string, string>` (readonly) | Explicitly set mode IDs |
| `setExplicitVariableModeForCollection(collection, modeId)` | — | Set mode for a collection |
| `clearExplicitVariableModeForCollection(collection)` | — | Reset to resolved mode |

### Relaunch

| Name | Signature | Description |
|------|-----------|-------------|
| `getRelaunchData()` | `() => Record<string, string>` | Relaunch button data |
| `setRelaunchData(data)` | `(data: Record<string, string>) => void` | Set relaunch button entries |

## Notes

- `x`/`y` are local coordinates — relative to the parent's origin, not the canvas.
- `absoluteBoundingBox` is axis-aligned (ignores rotation); `absoluteRenderBounds` includes effects like drop shadows.
- `pluginData` values are always strings; serialize objects with `JSON.stringify`.
- Prefer async style-setting methods (`setFillStyleIdAsync`, `setEffectStyleIdAsync`, etc.) over synchronous setters for compatibility with `documentAccess: "dynamic-page"`.

## Related

- [FrameNode](./node-frame.md)
- [data-types](./data-types.md)
- [figma.variables](./figma-variables.md)
