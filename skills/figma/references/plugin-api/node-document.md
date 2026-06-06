# DocumentNode

The root node of the Figma document. There is exactly one `DocumentNode` per browser tab. Its children must be `PageNode` objects.

## Signature / Usage

```ts
const doc = figma.root; // DocumentNode

// Iterate pages
for (const page of doc.children) {
  console.log(page.name);
}

// Search entire document
const allTexts = doc.findAll(n => n.type === 'TEXT');
```

## Options / Props

### Properties

| Name | Type | Description |
|------|------|-------------|
| `type` | `'DOCUMENT'` (readonly) | Node type identifier |
| `children` | `ReadonlyArray<PageNode>` (readonly) | Pages in the document |
| `documentColorProfile` | `'LEGACY' \| 'SRGB' \| 'DISPLAY_P3'` (readonly) | Document color management setting |
| `id` | `string` (readonly) | Node ID |
| `name` | `string` | Document name |

### Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `appendChild()` | `(child: PageNode) => void` | Add a page at the end |
| `insertChild()` | `(index: number, child: PageNode) => void` | Insert a page at position |
| `findChildren()` | `(cb?) => PageNode[]` | Search immediate children |
| `findChild()` | `(cb) => PageNode \| null` | First matching page |
| `findAll()` | `(cb?) => SceneNode[]` | Search entire document tree |
| `findOne()` | `(cb) => SceneNode \| null` | First match across all nodes |
| `findAllWithCriteria()` | `(criteria: FindAllCriteria) => NodeType[]` | Typed search across document |
| `findWidgetNodesByWidgetId()` | `(widgetId: string) => WidgetNode[]` | Find widgets by ID |

## Notes

- `figma.root` always points to the `DocumentNode`.
- Only `PageNode` objects can be direct children.
- `documentColorProfile` is read-only; it reflects the file's color space setting.

## Related

- [PageNode](./node-page.md)
- [figma global object](./figma-global.md)
