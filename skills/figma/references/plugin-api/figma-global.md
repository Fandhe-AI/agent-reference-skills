# figma (Global Object)

The `figma` global object is the main entry point for all Plugin API operations. It provides access to the document tree, node creation, styles, events, and all sub-APIs.

## Signature / Usage

```ts
// Access document root and current page
const page = figma.currentPage;
const doc  = figma.root;

// Create nodes
const frame = figma.createFrame();
const text  = figma.createText();

// Show UI
figma.showUI(__html__, { width: 300, height: 400 });

// Notify user
figma.notify('Done!');

// Close plugin
figma.closePlugin();
```

## Options / Props

### Properties

| Name | Type | Description |
|------|------|-------------|
| `apiVersion` | `string` | API version string |
| `command` | `string` | Currently executing manifest command |
| `editorType` | `'figma' \| 'figjam' \| 'dev' \| 'slides' \| 'buzz'` | Active editor |
| `mode` | `'default' \| 'textreview' \| 'inspect' \| 'codegen' \| 'linkpreview' \| 'auth'` | Plugin run context |
| `currentPage` | `PageNode` | Visible page (settable) |
| `root` | `DocumentNode` (readonly) | Document root |
| `mixed` | `unique symbol` | Sentinel for mixed property values |
| `hasMissingFont` | `boolean` | Whether document has missing fonts |
| `fileKey` | `string \| undefined` | File identifier (private plugins only) |
| `pluginId` | `string \| undefined` | Plugin ID from manifest |
| `widgetId` | `string \| undefined` | Widget ID from manifest |

### Core Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `showUI()` | `(html: string, options?: ShowUIOptions) => void` | Render iframe UI |
| `closePlugin()` | `(message?: string) => void` | Terminate plugin |
| `notify()` | `(message: string, options?: NotificationOptions) => NotificationHandler` | Toast notification |
| `commitUndo()` | `() => void` | Commit current actions to undo history |
| `triggerUndo()` | `() => void` | Trigger undo |
| `openExternal()` | `(url: string) => void` | Open URL in browser |

### Node Creation

| Method | Returns |
|--------|---------|
| `createRectangle()` | `RectangleNode` |
| `createEllipse()` | `EllipseNode` |
| `createPolygon()` | `PolygonNode` |
| `createStar()` | `StarNode` |
| `createVector()` | `VectorNode` |
| `createText()` | `TextNode` |
| `createFrame()` | `FrameNode` |
| `createAutoLayout()` | `FrameNode` (auto-layout enabled) |
| `createComponent()` | `ComponentNode` (Design only) |
| `createPage()` | `PageNode` (Design only) |
| `createSticky()` | `StickyNode` (FigJam only) |
| `createTable()` | `TableNode` (FigJam only) |
| `createConnector()` | `ConnectorNode` (FigJam only) |

### Boolean Operations

| Method | Returns |
|--------|---------|
| `union(nodes, parent, index?)` | `BooleanOperationNode` |
| `subtract(nodes, parent, index?)` | `BooleanOperationNode` |
| `intersect(nodes, parent, index?)` | `BooleanOperationNode` |
| `exclude(nodes, parent, index?)` | `BooleanOperationNode` |
| `flatten(nodes, parent?, index?)` | `VectorNode` |

### Node Query

| Method | Signature |
|--------|-----------|
| `getNodeByIdAsync()` | `(id: string) => Promise<BaseNode \| null>` |
| `getNodeById()` | `(id: string) => BaseNode \| null` (deprecated) |

### Style Management

| Method | Returns |
|--------|---------|
| `createPaintStyle()` | `PaintStyle` |
| `createTextStyle()` | `TextStyle` |
| `createEffectStyle()` | `EffectStyle` |
| `createGridStyle()` | `GridStyle` |
| `getLocalPaintStylesAsync()` | `Promise<PaintStyle[]>` |
| `getLocalTextStylesAsync()` | `Promise<TextStyle[]>` |
| `getLocalEffectStylesAsync()` | `Promise<EffectStyle[]>` |
| `getLocalGridStylesAsync()` | `Promise<GridStyle[]>` |

### Image / Font

| Method | Signature |
|--------|-----------|
| `createImage()` | `(data: Uint8Array) => Image` |
| `getImageByHash()` | `(hash: string) => Image \| null` |
| `loadFontAsync()` | `(fontName: FontName) => Promise<void>` |
| `listAvailableFontsAsync()` | `() => Promise<Font[]>` |

### Event Handling

| Method | Description |
|--------|-------------|
| `on(type, callback)` | Register event callback |
| `once(type, callback)` | Single-use callback |
| `off(type, callback)` | Remove callback |

Supported events: `'run'`, `'close'`, `'selectionchange'`, `'currentpagechange'`, `'documentchange'`, `'drop'`, `'nodechange'`, `'stylechange'`, `'canvasviewchange'`

### Sub-APIs

| Property | Description |
|----------|-------------|
| `figma.ui` | Iframe UI communication |
| `figma.util` | Color/paint helpers |
| `figma.constants` | FigJam color palettes |
| `figma.viewport` | Canvas view control |
| `figma.clientStorage` | Local persistent storage |
| `figma.variables` | Variables and collections |
| `figma.codegen` | Dev Mode codegen |
| `figma.payments` | Payment flow |
| `figma.parameters` | Quick-action parameters |
| `figma.textreview` | Text review plugin lifecycle |
| `figma.timer` | FigJam timer (FigJam only) |
| `figma.teamLibrary` | Team library access |
| `figma.annotations` | Annotation categories |

## Notes

- `figma.mixed` is returned by properties with inconsistent values across a mixed selection.
- Always call `await figma.loadFontAsync(...)` before modifying `TextNode.characters` or text style properties.
- Prefer `getNodeByIdAsync()` over the deprecated synchronous `getNodeById()`.

## Related

- [figma.ui](./figma-ui.md)
- [figma.viewport](./figma-viewport.md)
- [figma.clientStorage](./figma-clientStorage.md)
- [figma.variables](./figma-variables.md)
- [DocumentNode](./node-document.md)
- [PageNode](./node-page.md)
