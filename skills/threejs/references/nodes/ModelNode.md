# ModelNode

A specialized `Object3DNode` with a larger set of model related metrics. Unlike `Object3DNode`, `ModelNode` extracts the reference to the 3D object from the current node frame state.

## Signature / Usage

```js
class ModelNode extends Object3DNode {
	constructor( scope ) {}
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `scope` | `'position' \| 'viewPosition' \| 'direction' \| 'scale' \| 'worldMatrix'` | The type of transformation the node represents |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `update(frame)` | `void` | Extracts the model reference from the frame state and updates the uniform value depending on the scope |

## Notes

- Source: https://threejs.org/docs/pages/ModelNode.html (three.js r186, `src/nodes/accessors/ModelNode.js`)

## Related

- [Object3DNode](./Object3DNode.md)
