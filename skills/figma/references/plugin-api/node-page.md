# PageNode

A page within a Figma document. Always a child of `DocumentNode`. The active page is accessible via `figma.currentPage`.

## Signature / Usage

```ts
const page = figma.currentPage;

// Find all frames
const frames = page.findAll(n => n.type === 'FRAME');

// Listen for node changes
page.on('nodechange', (event) => {
  console.log('Changed nodes:', event.changedNode);
});

// Store plugin data
page.setPluginData('key', 'value');
const val = page.getPluginData('key');

// Load page before accessing nodes (dynamic-page mode)
await page.loadAsync();
```

## Options / Props

### Properties

| Name | Type | Description |
|------|------|-------------|
| `type` | `'PAGE'` (readonly) | Node type identifier |
| `children` | `ReadonlyArray<SceneNode>` (readonly) | Top-level nodes on the page |
| `selection` | `ReadonlyArray<SceneNode>` (read/write) | Currently selected nodes |
| `selectedTextRange` | `{ node: TextNode; start: number; end: number } \| null` | Active text selection range |
| `guides` | `Guide[]` (read/write) | Guides on the page |
| `backgrounds` | `ReadonlyArray<Paint>` (read/write) | Canvas background (solid only) |
| `prototypeBackgrounds` | `ReadonlyArray<Paint>` (read/write) | Prototype background color |
| `prototypeStartNode` | `FrameNode \| ComponentNode \| null` | Starting node for prototype |
| `flowStartingPoints` | `ReadonlyArray<{ nodeId: string; name: string }>` (readonly) | Prototype flow starting points |
| `isPageDivider` | `boolean` (readonly) | Whether this page is a divider |
| `focusedSlide` | `SlideNode \| null` | Focused slide (Figma Slides only) |
| `focusedNode` | `SceneNode \| null` | Focused node in Dev Mode / Asset View |

### Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `loadAsync()` | `() => Promise<void>` | Load page contents (required with `documentAccess: "dynamic-page"`) |
| `clone()` | `() => PageNode` | Duplicate the page under `figma.root` |
| `appendChild()` | `(child: SceneNode) => void` | Add a node to the page |
| `insertChild()` | `(index, child) => void` | Insert a node at a position |
| `findAll()` | `(cb?) => SceneNode[]` | Search all descendants |
| `findOne()` | `(cb) => SceneNode \| null` | First matching descendant |
| `findAllWithCriteria()` | `(criteria) => NodeType[]` | Typed search |
| `on/once/off()` | `(type, cb)` | Event listeners (`'nodechange'`, etc.) |
| `getMeasurements()` | `() => Measurement[]` | All measurements on page |
| `addMeasurement()` | `(opts) => Measurement` | Add measurement (Dev Mode only) |
| `getPluginData/setPluginData()` | `(key, value?)` | Per-plugin private data |
| `getSharedPluginData/setSharedPluginData()` | `(namespace, key, value?)` | Shared cross-plugin data |

## Notes

- In `documentAccess: "dynamic-page"` mode, you must call `page.loadAsync()` before accessing `page.children` on non-current pages.
- `selection` is writable; assigning a new array changes the active selection.

## Related

- [DocumentNode](./node-document.md)
- [FrameNode](./node-frame.md)
- [figma global object](./figma-global.md)
