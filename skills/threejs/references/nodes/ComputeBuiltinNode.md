# ComputeBuiltinNode

Represents a compute-scope builtin value that exposes information about the currently running dispatch and/or the device it is running on. Can only be used with a WebGPU backend.

## Signature / Usage

```js
class ComputeBuiltinNode extends Node {
	constructor( builtinName, nodeType ) {}
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `builtinName` | `string` | The built-in name |
| `nodeType` | `string` | The node type |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `generateNodeType(builder)` | `string` | Node type derived from `nodeType` |
| `getBuiltinName(builder)` | `string` | Returns the builtin name |
| `getHash(builder)` | `string` | Hash derived from the built-in name |
| `hasBuiltin(builder)` | `boolean` | Whether the current node builder has the builtin |
| `setBuiltinName(builtinName)` | `ComputeBuiltinNode` | Sets the builtin name |

## Notes

- WebGPU backend only.
- Source: https://threejs.org/docs/pages/ComputeBuiltinNode.html (three.js r186, `src/nodes/gpgpu/ComputeBuiltinNode.js`)

## Related

- [ComputeNode](./ComputeNode.md)
- [SubgroupFunctionNode](./SubgroupFunctionNode.md)
