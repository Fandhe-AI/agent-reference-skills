# ComponentNode

A reusable UI element. Behaves like a `FrameNode` but can produce auto-updating instances. Only available in the Design editor.

## Signature / Usage

```ts
const component = figma.createComponent();
component.name = 'Button';
component.resize(120, 40);

// Add a component property
component.addComponentProperty('Label', 'TEXT', 'Click me');

// Create an instance
const instance = component.createInstance();
instance.x = 200;

// Find all instances in the document
const instances = await component.getInstancesAsync();
```

## Options / Props

### Properties

| Name | Type | Description |
|------|------|-------------|
| `type` | `'COMPONENT'` (readonly) | Node type identifier |
| `componentPropertyDefinitions` | `ComponentPropertyDefinitions` (readonly) | All defined properties and defaults |
| `description` | `string` | Plain-text annotation |
| `descriptionMarkdown` | `string` | Markdown annotation |
| `documentationLinks` | `DocumentationLink[]` | Reference links |
| `remote` | `boolean` (readonly) | Whether from a team library |
| `key` | `string` (readonly) | Key for importing published component |

### Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `createInstance()` | `() => InstanceNode` | Create an instance of this component |
| `createSlot()` | `() => SlotNode` | Add a slot node within the component |
| `getInstancesAsync()` | `() => Promise<InstanceNode[]>` | All instances in the document |
| `addComponentProperty()` | `(name, type, defaultValue) => string` | Add property (BOOLEAN, TEXT, INSTANCE_SWAP, VARIANT, SLOT); returns unique prop name |
| `editComponentProperty()` | `(name, newValue) => string` | Modify property; returns updated name |
| `deleteComponentProperty()` | `(name) => void` | Remove property |
| `getPublishStatusAsync()` | `() => Promise<PublishStatus>` | Check library publication status |
| `clone()` | `() => ComponentNode` | Duplicate (no instances transferred) |

## Notes

- `ComponentNode` inherits all `FrameNode` layout, geometry, and prototyping properties.
- Property names returned by `addComponentProperty()` are unique; store the returned value for future edits.
- A component set (`ComponentSetNode`) is needed for variant support.

## Related

- [ComponentSetNode](./node-component-set.md)
- [InstanceNode](./node-instance.md)
- [FrameNode](./node-frame.md)
