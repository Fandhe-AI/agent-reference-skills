# UniformsGroup

Manages a collection of `Uniform` objects and maps them to a single Uniform Buffer Object (UBO) on the GPU. Extends `EventDispatcher`.

> **Compatibility:** WebGLRenderer with `ShaderMaterial` only.

## Signature / Usage

```js
const uniformsGroup = new THREE.UniformsGroup();
uniformsGroup.setName('PerFrame');

uniformsGroup.add(new THREE.Uniform(camera.projectionMatrix));  // projection
uniformsGroup.add(new THREE.Uniform(camera.matrixWorldInverse)); // view

// Attach to material
material.uniformsGroups = [uniformsGroup];

// Update per frame
uniformsGroup.uniforms[1].value.copy(camera.matrixWorldInverse);
```

## Constructor

```js
new UniformsGroup()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `id` | number (readonly) | Unique ID |
| `isUniformsGroup` | boolean (readonly) | Type flag |
| `name` | string | Name of the UBO |
| `uniforms` | Uniform[] | Ordered array of uniforms (must match shader layout) |
| `usage` | Usage constant | Buffer usage hint. Default: `StaticDrawUsage` |

## Methods

```js
add(uniform)              // Add a Uniform
remove(uniform)           // Remove a Uniform
setName(name)             // Set UBO name
setUsage(value)           // Set usage hint
dispose()                 // Free GPU resources
clone()                   // Clone this group
copy(source)              // Copy from another group
```

## Notes

- The official docs page merges this class with the WebGPU-side `renderers/common` UniformsGroup (extends `UniformBuffer`). `release()`, `addUniform()`, `removeUniform()`, `addUniformUpdateRange()`, `buffer`, `byteLength` and similar members marked `Overrides: UniformBuffer#...` belong to that WebGPU class, not to `THREE.UniformsGroup`.
- The order of `uniforms` in the array must exactly match the UBO binding layout in the shader.
- Call `dispose()` to free GPU resources when the group is no longer needed.

## Related

- [Uniform](./Uniform.md)
