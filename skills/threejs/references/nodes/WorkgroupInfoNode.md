# WorkgroupInfoNode

Creates a "workgroup" scoped buffer within a compute shader. Typically used to hold data transferred from global storage into local workgroup scope, where access can be significantly faster than on globally accessible storage buffers. Can only be used with a WebGPU backend.

## Signature / Usage

```js
class WorkgroupInfoNode extends Node {
	constructor( scope, bufferType, bufferCount = 0 ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `scope` | `string` | — | Address space the buffer is scoped to; currently only `'Workgroup'` is used |
| `bufferType` | `string` | — | Data type of a workgroup scoped buffer element |
| `bufferCount` | `number` | `0` | Number of elements in the buffer |
| `elementType` | `string` | — | Data type of the array buffer |
| `isAtomic` | `boolean` | `false` | Whether the node is atomic |
| `isWorkgroupInfoNode` | `boolean` (readonly) | `true` | Type-testing flag |
| `name` | `string` | `''` | Name of the buffer (overrides `Node#name`) |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `element(indexNode)` | `WorkgroupInfoElementNode` | Access elements via an index node |
| `getElementType()` | `string` | Data type of the array buffer |
| `getInputType(builder)` | `string` | Input type inferred from the scope |
| `label(name)` | `WorkgroupInfoNode` | Sets the name (deprecated) |
| `setAtomic(value)` | `WorkgroupInfoNode` | Defines whether the node is atomic |
| `setName(name)` | `WorkgroupInfoNode` | Sets the name |
| `setScope(scope)` | `WorkgroupInfoNode` | Sets the scope |
| `toAtomic()` | `WorkgroupInfoNode` | Convenience method for making this node atomic |

## Notes

- WebGPU backend only.
- `label()` is marked deprecated in the r186 docs; use `setName()`.
- Source: `src/nodes/gpgpu/WorkgroupInfoNode.js` (three.js r186 docs).

## Related

- [AtomicFunctionNode](./AtomicFunctionNode.md)
- [BarrierNode](./BarrierNode.md)
- [ComputeNode](./ComputeNode.md)
