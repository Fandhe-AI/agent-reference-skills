# Object3DNode

Accesses transformation related metrics of 3D objects. Depending on the selected scope, a different metric is represented as a uniform in the shader.

## Signature / Usage

```js
class Object3DNode extends Node {
	constructor( scope, object3d = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `scope` | `'position' \| 'viewPosition' \| 'direction' \| 'scale' \| 'worldMatrix'` | — | The transformation metric the node reports |
| `object3d` | `Object3D` | `null` | The 3D object |
| `uniformNode` | `UniformNode` | — | Holds the node value as a uniform |
| `updateType` | `string` | `'object'` | Updated per object |

Scopes:

- `POSITION`: the object's position in world space.
- `VIEW_POSITION`: the object's position in view/camera space.
- `DIRECTION`: the object's direction in world space.
- `SCALE`: the object's scale in world space.
- `WORLD_MATRIX`: the object's matrix in world space.

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `generate(builder)` | `string` | Generates the code snippet of the uniform node; its type depends on the scope |
| `generateNodeType()` | `'mat4' \| 'vec3' \| 'float'` | Node type inferred from the scope |
| `update(frame)` | `void` | Updates the uniform value depending on the scope |

## Notes

- Source: https://threejs.org/docs/pages/Object3DNode.html (three.js r186, `src/nodes/accessors/Object3DNode.js`)

## Related

- [ModelNode](./ModelNode.md)
- [UniformNode](./UniformNode.md)
