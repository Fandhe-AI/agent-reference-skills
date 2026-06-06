# RawShaderMaterial

Like `ShaderMaterial`, but does **not** automatically prepend Three.js built-in uniform and attribute definitions to the GLSL code. Gives full manual control over shader source.

## Signature / Usage

```js
const material = new THREE.RawShaderMaterial({
  uniforms: {
    time: { value: 1.0 },
  },
  vertexShader: /* glsl */`
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    attribute vec3 position;
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */`
    precision mediump float;
    uniform float time;
    void main() {
      gl_FragColor = vec4(sin(time), 0.0, 0.0, 1.0);
    }
  `,
});
```

## Options / Props

Inherits all `ShaderMaterial` properties (`vertexShader`, `fragmentShader`, `uniforms`, `defines`, `glslVersion`, `lights`, `fog`, etc.).

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `isRawShaderMaterial` | boolean | `true` | Read-only type testing flag |

## Notes

- All uniforms and attributes (`projectionMatrix`, `modelViewMatrix`, `position`, `uv`, etc.) must be declared manually in shader source
- Works with **WebGLRenderer only**
- Use when you need complete control over shader preamble, or when porting external GLSL shaders
- Inherits from [ShaderMaterial](./shader-material.md) → [Material](./material.md)

## Related

- [ShaderMaterial](./shader-material.md)
- [Material](./material.md)
