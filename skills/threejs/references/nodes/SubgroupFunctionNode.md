# SubgroupFunctionNode

Represents a set of built-in WGSL shader functions that synchronously execute an operation across a subgroup (or "warp") of compute or fragment shader invocations within a workgroup. They typically execute an operation using data from all active invocations in the subgroup, then broadcast the result to all active invocations. In other graphics APIs these are called wave intrinsics (DirectX/HLSL) or warp intrinsics (CUDA).

## Signature / Usage

```js
class SubgroupFunctionNode extends TempNode {
	constructor( method, aNode = null, bNode = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `method` | `string` | — | The subgroup/wave intrinsic method to construct |
| `aNode` | `Node` | `null` | The method's first argument |
| `bNode` | `Node` | `null` | The method's second argument |

## Notes

- The r186 docs page documents only the constructor and these properties.
- Source: https://threejs.org/docs/pages/SubgroupFunctionNode.html (three.js r186, `src/nodes/gpgpu/SubgroupFunctionNode.js`)

## Related

- [ComputeBuiltinNode](./ComputeBuiltinNode.md)
- [WorkgroupInfoNode](./WorkgroupInfoNode.md)
