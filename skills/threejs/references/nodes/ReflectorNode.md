# ReflectorNode

Implements mirror-like flat reflective surfaces.

## Signature / Usage

```js
const groundReflector = reflector();
material.colorNode = groundReflector;
const plane = new Mesh( geometry, material );
plane.add( groundReflector.target );
```

```js
class ReflectorNode extends TextureNode {
	constructor( parameters = {} ) {}
}
```

## Options / Props

Constructor `parameters`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `target` | `Object3D` | `new Object3D()` | The 3D object the reflector is linked to |
| `resolutionScale` | `number` | `1` | The resolution scale |
| `generateMipmaps` | `boolean` | `false` | Whether mipmaps are generated |
| `bounces` | `boolean` | `true` | Whether reflectors can render other reflector nodes |
| `depth` | `boolean` | `false` | Whether depth data is generated |
| `samples` | `number` | — | Anti-aliasing samples of the internal render target |
| `defaultTexture` | `Node` | — | The default texture node |
| `reflector` | `ReflectorBaseNode` | — | The reflector base node |

Properties:

| Name | Type | Description |
|------|------|-------------|
| `reflector` | `ReflectorBaseNode` | Reference to the internal reflector node |
| `target` | `Object3D` | Reference to the 3D object the reflector is linked to |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `dispose()` | `void` | Frees internal resources; call when the node is no longer in use |
| `getDepthNode()` | `Node` | Node representing the mirror's depth, usable for effects like distance attenuation |

## Notes

- Source: https://threejs.org/docs/pages/ReflectorNode.html (three.js r186, `src/nodes/utils/ReflectorNode.js`)

## Related

- [TextureNode](./TextureNode.md)
- [RTTNode](./RTTNode.md)
