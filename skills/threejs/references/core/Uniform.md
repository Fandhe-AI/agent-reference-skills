# Uniform

Represents a single global shader variable passed to `ShaderMaterial` shader programs.

> **Compatibility:** WebGLRenderer with `ShaderMaterial` only.

## Signature / Usage

```js
const material = new THREE.ShaderMaterial({
  uniforms: {
    time: new THREE.Uniform(0.0),
    resolution: new THREE.Uniform(new THREE.Vector2(800, 600)),
  },
  vertexShader: `...`,
  fragmentShader: `...`,
});

// Update each frame
material.uniforms.time.value += delta;
```

## Constructor

```js
new Uniform(value: any)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `value` | any | The uniform's current value |
| `name` | string | Uniform name |
| `boundary` | number | STD140 alignment boundary (set by derived types) |
| `index` | number | Position index in `UniformsGroup` array |
| `itemSize` | number | Item size (set by derived types) |
| `offset` | number | Byte offset in `UniformsGroup` buffer |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `clone()` | Uniform | Deep clone (calls `value.clone()` if available) |
| `getValue()` | any | Returns `value` |
| `setValue(value)` | void | Sets `value` |

## Notes

- The shorthand object literal `{ value: ... }` is also accepted by `ShaderMaterial.uniforms`; `new Uniform(...)` is equivalent but more explicit.

## Related

- [UniformsGroup](./UniformsGroup.md)
