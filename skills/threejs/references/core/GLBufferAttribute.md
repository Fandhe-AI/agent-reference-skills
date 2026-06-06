# GLBufferAttribute

A buffer attribute that wraps a raw WebGL `WebGLBuffer` (VBO) directly, bypassing Three.js's internal VBO management. Primarily used for GPGPU workflows where a compute pass produces a VBO consumed by the renderer.

> **Compatibility:** WebGLRenderer only.

## Signature / Usage

```js
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);

const attr = new THREE.GLBufferAttribute(buffer, gl.FLOAT, 3, 4, vertexCount);
geometry.setAttribute('position', attr);
```

## Constructor

```js
new GLBufferAttribute(buffer, type, itemSize, elementSize, count, normalized?)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `buffer` | WebGLBuffer | The native WebGL buffer |
| `type` | number | Native GL data type (e.g., `gl.FLOAT`) |
| `itemSize` | number | Number of components per vertex |
| `elementSize` | number | Byte size of one element (e.g., 4 for `gl.FLOAT`) |
| `count` | number | Expected number of vertices in the VBO |
| `normalized` | boolean | Whether data is normalized. Default: `false` |

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `buffer` | WebGLBuffer | The underlying native buffer |
| `count` | number | Expected vertex count |
| `elementSize` | number | Byte size per element |
| `isGLBufferAttribute` | boolean (readonly) | Type flag |
| `itemSize` | number | Components per vertex |
| `name` | string | Attribute name |
| `needsUpdate` | boolean | Flag GPU re-upload |
| `normalized` | boolean | Whether data is normalized |
| `type` | number | Native GL data type |
| `version` | number | Increments on `needsUpdate` |

## Methods

| Method | Description |
|--------|-------------|
| `setBuffer(buffer)` | Replace the underlying WebGL buffer |
| `setCount(count)` | Update the expected vertex count |
| `setItemSize(itemSize)` | Update the item size |
| `setType(type, elementSize)` | Update the native type and element byte size |

## Notes

- The renderer does not create a VBO for this attribute; it uses the one you provide.
- Use `setBuffer()` to swap the VBO after a GPGPU computation completes.

## Related

- [BufferAttribute](./BufferAttribute.md)
