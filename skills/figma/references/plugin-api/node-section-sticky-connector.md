# FigJam Nodes: SectionNode, StickyNode, ConnectorNode

FigJam-specific node types for organizing content (sections), adding notes (stickies), and drawing relationships (connectors).

## SectionNode

An organizational container in FigJam. Does not constrain children the way a frame does.

```ts
const section = figma.createSection(); // FigJam only
section.name = 'Ideation';
section.resize(800, 600);
section.sectionContentsHidden = false;
```

### Properties

| Name | Type | Description |
|------|------|-------------|
| `type` | `'SECTION'` (readonly) | Node type identifier |
| `sectionContentsHidden` | `boolean` | Toggle content visibility |
| `devStatus` | `DevStatus \| null` | Dev Mode readiness status |

### Methods: `resize()`, `resizeWithoutConstraints()`, `clone()`

---

## StickyNode

A sticky note in FigJam. Created via `figma.createSticky()`.

```ts
const sticky = figma.createSticky();
await figma.loadFontAsync(sticky.text.fontName as FontName);
sticky.text.characters = 'Idea!';
sticky.authorVisible = false;
```

### Properties

| Name | Type | Description |
|------|------|-------------|
| `type` | `'STICKY'` (readonly) | Node type identifier |
| `text` | `TextSublayerNode` (readonly) | Text sublayer |
| `authorName` | `string` | Creator display name |
| `authorVisible` | `boolean` | Show/hide author attribution |
| `isWideWidth` | `boolean` | Wide (rectangular) vs. square format |

---

## ConnectorNode

A connector arrow between elements in FigJam. Created via `figma.createConnector()`.

```ts
const connector = figma.createConnector();
connector.connectorStart = { endpointNodeId: rect.id, magnet: 'TOP' };
connector.connectorEnd   = { endpointNodeId: ellipse.id, magnet: 'BOTTOM' };
connector.connectorLineType = 'ELBOWED';
```

### Properties

| Name | Type | Description |
|------|------|-------------|
| `type` | `'CONNECTOR'` (readonly) | Node type identifier |
| `connectorStart` | `ConnectorEndpoint` | Start endpoint definition |
| `connectorEnd` | `ConnectorEndpoint` | End endpoint definition |
| `connectorLineType` | `'ELBOWED' \| 'STRAIGHT' \| 'CURVED'` | Path style |
| `connectorStartStrokeCap` | `ConnectorStrokeCap` | Start arrowhead |
| `connectorEndStrokeCap` | `ConnectorStrokeCap` | End arrowhead |
| `text` | `TextSublayerNode` | Connector label |
| `strokeWeight` | `number` | Line weight |
| `strokes` | `ReadonlyArray<Paint>` | Line color/style |

## Notes

- All three types are only available when `editorType` includes `"figjam"`.
- `StickyNode` author is automatically set to the current user on creation.
- `ConnectorEndpoint` can be a floating point (`{ position: Vector }`) or attached to a node (`{ endpointNodeId, magnet }`).

## Related

- [editor-types](./editor-types.md)
- [figma global object](./figma-global.md)
