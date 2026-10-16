# AtomicFunctionNode

Represents any function that can operate on atomic variable types within a shader. Any modification to an atomic variable occurs as an indivisible step with a defined order relative to other modifications, so concurrent atomic operations do not interfere with each other. Can only be used with a WebGPU backend.

## Signature / Usage

```js
class AtomicFunctionNode extends Node {
	constructor( method, pointerNode, valueNode ) {}
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `method` | `string` | The signature of the atomic function to construct |
| `pointerNode` | `Node` | An atomic variable or element of an atomic buffer |
| `valueNode` | `Node` | The value that mutates the atomic variable |
| `parents` | `boolean` (default `true`) | Creates a list of parents to detect whether the node needs to return a value (overrides `Node#parents`) |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `generateNodeType(builder)` | `string` | Node type inferred from the input type |
| `getInputType(builder)` | `string` | Returns the type of the pointer node |

## Notes

- WebGPU backend only.
- Source: `src/nodes/gpgpu/AtomicFunctionNode.js` (three.js r186 docs).

## Related

- [WorkgroupInfoNode](./WorkgroupInfoNode.md)
- [BarrierNode](./BarrierNode.md)
- [ComputeNode](./ComputeNode.md)
