# ComponentSetNode

A container for component variants. All direct children must be `ComponentNode` objects. Behaves like a frame, but is variant-aware.

## Signature / Usage

```ts
// ComponentSetNode is typically created by Figma when you combine components as variants
// Accessing an existing component set:
const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET') as ComponentSetNode;

console.log(set.defaultVariant.name);
console.log(set.componentPropertyDefinitions);
```

## Options / Props

### Properties

| Name | Type | Description |
|------|------|-------------|
| `type` | `'COMPONENT_SET'` (readonly) | Node type identifier |
| `defaultVariant` | `ComponentNode` (readonly) | Top-left-most variant spatially |
| `children` | `ReadonlyArray<SceneNode>` (readonly) | All child component nodes |
| `componentPropertyDefinitions` | `ComponentPropertyDefinitions` (readonly) | All variant properties and options |
| `description` | `string` | Plain-text annotation |
| `descriptionMarkdown` | `string` | Markdown annotation |
| `documentationLinks` | `DocumentationLink[]` | Reference links |
| `remote` | `boolean` (readonly) | Whether from team library |
| `key` | `string` (readonly) | Key for importing |

### Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `clone()` | `() => ComponentSetNode` | Duplicate as new components with no instances |
| `addComponentProperty()` | `(name, type, defaultValue) => string` | Add BOOLEAN, TEXT, INSTANCE_SWAP, VARIANT, or SLOT property |
| `editComponentProperty()` | `(name, newValue) => string` | Modify existing property |
| `deleteComponentProperty()` | `(name) => void` | Remove property |
| `getPublishStatusAsync()` | `() => Promise<PublishStatus>` | Check library status |

## Notes

- A component set with no children **deletes itself**.
- Variant properties define dimensions like `"Size"` or `"State"` with enumerated values.
- `defaultVariant` is used as the preview and initial instance when dragging from the assets panel.

## Related

- [ComponentNode](./node-component.md)
- [InstanceNode](./node-instance.md)
