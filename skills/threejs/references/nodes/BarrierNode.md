# BarrierNode

Represents a GPU control barrier that synchronizes compute operations within a given scope. Can only be used with a WebGPU backend.

## Signature / Usage

```js
class BarrierNode extends Node {
	constructor( scope ) {}
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `scope` | `string` | Defines the behavior of the node |

## Notes

- WebGPU backend only.
- The r186 docs page documents only the constructor.
- Source: `src/nodes/gpgpu/BarrierNode.js` (three.js r186 docs).

## Related

- [AtomicFunctionNode](./AtomicFunctionNode.md)
- [WorkgroupInfoNode](./WorkgroupInfoNode.md)
- [ComputeNode](./ComputeNode.md)
