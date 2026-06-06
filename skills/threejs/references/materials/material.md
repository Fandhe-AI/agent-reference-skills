# Material

Abstract base class for all Three.js materials. Defines common properties and methods inherited by every concrete material type.

## Signature / Usage

```js
// Cannot be instantiated directly — use a concrete subclass
const material = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  opacity: 0.7,
  transparent: true,
  side: THREE.DoubleSide,
});

// Shader customization hook
material.onBeforeCompile = (shader, renderer) => {
  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <colorspace_fragment>',
    'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);'
  );
};

// Free GPU resources when done
material.dispose();
```

## Options / Props

### Visibility & Rendering

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | boolean | `true` | Whether 3D objects using this material are visible |
| `colorWrite` | boolean | `true` | Whether to render the material's color |
| `allowOverride` | boolean | `true` | Allow override via `Scene#overrideMaterial` |
| `side` | Side | `FrontSide` | Which face(s) to render: `FrontSide`, `BackSide`, `DoubleSide` |
| `shadowSide` | Side | `null` | Side for shadow casting (null = determined by `side`) |
| `forceSinglePass` | boolean | `false` | Disable two-pass rendering for transparent double-sided objects |

### Transparency & Alpha

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `transparent` | boolean | `false` | Marks material transparent; affects render order |
| `opacity` | number | `1` | Transparency (0 = fully transparent, 1 = fully opaque) |
| `alphaTest` | number | `0` | Fragment alpha threshold below which fragment is discarded |
| `alphaHash` | boolean | `false` | Alpha hashed transparency (alternative to `transparent`/`alphaTest`) |
| `alphaToCoverage` | boolean | `false` | Alpha-to-coverage (requires MSAA) |
| `premultipliedAlpha` | boolean | `false` | Premultiply alpha value |

### Depth Testing

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `depthTest` | boolean | `true` | Enable depth testing |
| `depthWrite` | boolean | `true` | Enable depth buffer writes |
| `depthFunc` | DepthFunction | `LessEqualDepth` | Depth comparison function |

### Blending

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `blending` | BlendingMode | `NormalBlending` | Blending mode (set to `CustomBlending` for custom factors) |
| `blendSrc` | BlendingFactor | `SrcAlphaFactor` | Blending source factor |
| `blendDst` | BlendingFactor | `OneMinusSrcAlphaFactor` | Blending destination factor |
| `blendEquation` | BlendingEquation | `AddEquation` | Blending equation |
| `blendSrcAlpha` | BlendingFactor | `null` | Source alpha blending factor |
| `blendDstAlpha` | BlendingFactor | `null` | Destination alpha blending factor |
| `blendEquationAlpha` | BlendingEquation | `null` | Alpha blending equation |
| `blendColor` | Color | `(0,0,0)` | Constant blend color RGB |
| `blendAlpha` | number | `0` | Constant blend color alpha |

### Clipping

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `clippingPlanes` | Plane[] | `null` | User-defined clipping planes in world space |
| `clipIntersection` | boolean | `false` | Clip only the intersection of planes (default: union) |
| `clipShadows` | boolean | `false` | Clip shadows by clipping planes |

### Stencil Testing

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `stencilWrite` | boolean | `false` | Enable stencil buffer operations |
| `stencilFunc` | StencilFunction | `AlwaysStencilFunc` | Stencil comparison function |
| `stencilRef` | number | `0` | Stencil reference value |
| `stencilFuncMask` | number | `0xff` | Stencil comparison bit mask |
| `stencilFail` | StencilOp | `KeepStencilOp` | Operation on stencil fail |
| `stencilZFail` | StencilOp | `KeepStencilOp` | Operation on depth fail |
| `stencilZPass` | StencilOp | `KeepStencilOp` | Operation on depth pass |
| `stencilWriteMask` | number | `0xff` | Stencil write bit mask |

### Polygon Offset

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `polygonOffset` | boolean | `false` | Enable polygon offset |
| `polygonOffsetFactor` | number | `0` | Variable depth offset factor |
| `polygonOffsetUnits` | number | `0` | Constant depth offset multiplier |

### Misc

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `dithering` | boolean | `false` | Apply dithering to remove banding |
| `toneMapped` | boolean | `true` | Apply renderer tone mapping |
| `vertexColors` | boolean | `false` | Use per-vertex colors (RGB or RGBA) |
| `precision` | 'highp' \| 'mediump' \| 'lowp' | `null` | Override renderer shader precision |
| `needsUpdate` | boolean | `false` | Set `true` to force shader recompilation |
| `userData` | Object | `{}` | Custom data storage (avoid functions) |

### Metadata (read-only)

| Name | Type | Description |
|------|------|-------------|
| `id` | number | Unique integer ID |
| `uuid` | string | UUID |
| `name` | string | Optional name |
| `type` | string | Material type string |
| `isMaterial` | boolean | Always `true` |
| `version` | number | Incremented when `needsUpdate = true` |

## Methods

```js
// Shallow copy
material.clone(): Material

// Copy values from another material
material.copy(source: Material): this

// Free GPU resources; fires 'dispose' event
material.dispose(): void

// Serialize to JSON
material.toJSON(meta?: Object | string): Object

// Set multiple properties at once
material.setValues(values: Object): void

// Called before shader compilation (WebGLRenderer only)
// Modify shader.uniforms, shader.vertexShader, shader.fragmentShader
material.onBeforeCompile(shader: Object, renderer: WebGLRenderer): void

// Return custom cache key for shader reuse
material.customProgramCacheKey(): string

// Called before rendering with this material
material.onBeforeRender(renderer, scene, camera, geometry, object, group): void
```

## Notes

- `Material` is abstract — always use a concrete subclass
- Call `dispose()` when removing materials to free GPU resources
- Custom blending properties only take effect when `blending` is `CustomBlending`
- `clippingPlanes` requires `WebGLRenderer#localClippingEnabled = true`
- `onBeforeCompile` and `customProgramCacheKey` work with `WebGLRenderer` only

## Related

- [MeshBasicMaterial](./mesh-basic-material.md)
- [MeshStandardMaterial](./mesh-standard-material.md)
- [ShaderMaterial](./shader-material.md)
- [NodeMaterial (node variants)](./node-materials.md)
