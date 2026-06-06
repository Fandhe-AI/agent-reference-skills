# ShaderMaterial

A material rendered with custom GLSL shaders. Three.js automatically prepends built-in uniform/attribute definitions to the shader code.

## Signature / Usage

```js
const material = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0.0 },
    resolution: { value: new THREE.Vector2() },
  },
  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */`
    uniform float time;
    varying vec2 vUv;
    void main() {
      gl_FragColor = vec4(vUv, sin(time), 1.0);
    }
  `,
});

// Update uniforms each frame
material.uniforms.time.value = clock.getElapsedTime();
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `vertexShader` | string | — | GLSL vertex shader source |
| `fragmentShader` | string | — | GLSL fragment shader source |
| `uniforms` | Object | `{}` | Uniforms map: `{ name: { value: ... } }` |
| `defines` | Object | `{}` | Custom `#define` directives injected into both shaders |
| `glslVersion` | Constant | `null` | GLSL version (`GLSL1` or `GLSL3`) |
| `lights` | boolean | `false` | Enable Three.js lighting uniforms |
| `fog` | boolean | `false` | Apply global fog settings |
| `clipping` | boolean | `false` | Enable clipping plane support |
| `wireframe` | boolean | `false` | Render as wireframe |
| `wireframeLinewidth` | number | `1` | Wireframe thickness (ignored in WebGL/WebGPU) |
| `linewidth` | number | `1` | Line thickness (ignored in WebGL/WebGPU) |
| `forceSinglePass` | boolean | `true` | Force single-pass rendering |
| `uniformsNeedUpdate` | boolean | `false` | Force uniform update inside `Object3D#onBeforeRender` |
| `index0AttributeName` | string | `undefined` | Bind generic vertex index to attribute |
| `defaultAttributeValues` | Object | `{color:[1,1,1], uv:[0,0], uv1:[0,0]}` | Fallback values when geometry lacks attributes |
| `extensions` | Object | — | Enable WebGL 2 extensions (e.g., `clipCullDistance`, `multiDraw`) |
| `isShaderMaterial` | boolean | `true` | Read-only type testing flag |

## Notes

- Works with **WebGLRenderer only**
- Three.js automatically prepends built-in uniforms/attributes (`projectionMatrix`, `modelViewMatrix`, `position`, `uv`, etc.) — see [RawShaderMaterial](./raw-shader-material.md) to skip this
- To include fog, merge `UniformsLib['fog']` into `uniforms` and set `fog: true`
- Loop unrolling is supported via `#pragma unroll_loop_start` / `#pragma unroll_loop_end`
- Inherits all properties from [Material](./material.md)

## Related

- [Material](./material.md)
- [RawShaderMaterial](./raw-shader-material.md)
- [NodeMaterial (node variants)](./node-materials.md)
