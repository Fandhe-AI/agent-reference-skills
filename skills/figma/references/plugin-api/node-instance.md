# InstanceNode

A copy of a `ComponentNode` that auto-updates when the component changes. Created via `component.createInstance()`.

## Signature / Usage

```ts
const instance = component.createInstance();
instance.x = 100;
instance.y = 100;

// Set component property values
instance.setProperties({ 'Label#abc123': 'Submit' });

// Swap to a different component
instance.swapComponent(otherComponent);

// Detach from component (becomes a plain FrameNode)
const frame = instance.detachInstance();
```

## Options / Props

### Properties

| Name | Type | Description |
|------|------|-------------|
| `type` | `'INSTANCE'` (readonly) | Node type identifier |
| `mainComponent` | `ComponentNode \| null` | The source component (may be `null` if removed) |
| `componentProperties` | `ComponentProperties` (readonly) | Current property values |
| `scaleFactor` | `number` | Scale applied to the instance |
| `exposedInstances` | `InstanceNode[]` (readonly) | Nested instances exposed to this level |
| `isExposedInstance` | `boolean` | Whether marked as exposed |
| `overrides` | `object[]` (readonly) | Directly overridden fields on this instance |

### Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `clone()` | `() => InstanceNode` | Duplicate the instance |
| `getMainComponentAsync()` | `() => Promise<ComponentNode \| null>` | Async component retrieval (preferred) |
| `swapComponent()` | `(component: ComponentNode) => void` | Swap source component, preserving overrides where possible |
| `setProperties()` | `(properties: Record<string, any>) => void` | Set component property values |
| `detachInstance()` | `() => FrameNode` | Convert to a regular frame |
| `removeOverrides()` | `() => void` | Remove all direct overrides |

## Notes

- `mainComponent` can be `null` when the source component lives in a remote library not yet loaded — use `getMainComponentAsync()` instead.
- Property keys in `setProperties()` use the format `"propName#uniqueId"` as returned by `addComponentProperty()`.
- `detachInstance()` is irreversible.

## Related

- [ComponentNode](./node-component.md)
- [ComponentSetNode](./node-component-set.md)
- [FrameNode](./node-frame.md)
