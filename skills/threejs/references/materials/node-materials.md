# Node Material Variants

Node materials are the WebGPU-native counterparts of the classic materials. They replace static texture maps with composable `Node` objects (Three.js Shading Language / TSL), enabling dynamic and procedural shader control. They work with both `WebGPURenderer` and `WebGLRenderer` (via GLSL transpilation).

## NodeMaterial (base)

Base class for all node materials. Extends `Material`.

```js
// All *NodeMaterial classes share these override-able node properties:
material.colorNode       = color(0xff0000);              // override diffuse color
material.normalNode      = normalMap(texture, scale);    // override surface normal
material.opacityNode     = float(0.5);                   // override opacity
material.positionNode    = positionLocal.add(displace);  // override vertex position
material.outputNode      = vec4(1, 0, 0, 1);             // fully custom output
material.emissiveNode    = color(0x0000ff).mul(2.0);     // emissive via node
material.lightsNode      = lights([light1, light2]);     // selective lighting
material.envNode         = pmremTexture(rt.texture);     // custom env
material.backdropNode    = saturation(viewportSharedTexture().rgb, 0); // filter
```

### NodeMaterial Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `isNodeMaterial` | boolean | `true` | Read-only type testing flag |
| `fog` | boolean | `true` | Affected by fog |
| `lights` | boolean | `false` | Affected by scene lights (overridden per subclass) |
| `hardwareClipping` | boolean | `false` | Use hardware-level clipping |
| `vertexNode` | Node\<vec4\> | `null` | Custom vertex stage |
| `fragmentNode` | Node\<vec4\> | `null` | Custom fragment stage |
| `outputNode` | Node\<vec4\> | `null` | Final material output |
| `positionNode` | Node\<vec3\> | `null` | Override local vertex positions |
| `geometryNode` | function | `null` | GPU-based geometry modifications |
| `colorNode` | Node\<vec3\> | `null` | Override diffuse color (replaces `color`/`map`) |
| `normalNode` | Node\<vec3\> | `null` | Override surface normals |
| `opacityNode` | Node\<float\> | `null` | Override opacity |
| `depthNode` | Node\<float\> | `null` | Override fragment depth |
| `alphaTestNode` | Node\<float\> | `null` | Override alpha test threshold |
| `lightsNode` | LightsNode | `null` | Selective lighting control |
| `aoNode` | Node\<float\> | `null` | Override AO |
| `envNode` | Node\<vec3\> | `null` | Override environment lighting |
| `castShadowNode` | Node\<vec4\> | `null` | Control shadow casting (colored shadows) |
| `receivedShadowNode` | function | `null` | Control shadow receiving |
| `maskNode` | Node\<bool\> | `null` | Fragment discard mask |
| `backdropNode` | Node\<vec3\> | `null` | Background filter (requires transparency) |
| `backdropAlphaNode` | Node\<float\> | `null` | Modulate backdrop influence |
| `mrtNode` | MRTNode | `null` | MRT target overrides |

---

## Variant Overview

| Class | Classic Equivalent | Notes |
|-------|--------------------|-------|
| `MeshBasicNodeMaterial` | `MeshBasicMaterial` | Unlit; uses `BasicLightingModel` |
| `MeshLambertNodeMaterial` | `MeshLambertMaterial` | Lambertian; adds `emissiveNode` |
| `MeshPhongNodeMaterial` | `MeshPhongMaterial` | Blinn-Phong; adds `shininessNode`, `specularNode` |
| `MeshStandardNodeMaterial` | `MeshStandardMaterial` | PBR; adds `metalnessNode`, `roughnessNode`, `emissiveNode` |
| `MeshPhysicalNodeMaterial` | `MeshPhysicalMaterial` | Advanced PBR; adds nodes for all physical effects |
| `MeshNormalNodeMaterial` | `MeshNormalMaterial` | Normal debug |
| `MeshMatcapNodeMaterial` | `MeshMatcapMaterial` | MatCap; adds `matcapNode` |
| `MeshToonNodeMaterial` | `MeshToonMaterial` | Toon shading |
| `LineBasicNodeMaterial` | `LineBasicMaterial` | Line rendering |
| `LineDashedNodeMaterial` | `LineDashedMaterial` | Dashed lines |
| `PointsNodeMaterial` | `PointsMaterial` | Point clouds; adds `sizeNode` |
| `SpriteNodeMaterial` | `SpriteMaterial` | Sprites |
| `ShadowNodeMaterial` | `ShadowMaterial` | Shadow-only |
| `NodeMaterial` | `ShaderMaterial` | Fully custom via `fragmentNode`/`vertexNode` |
| `MeshSSSNodeMaterial` | — | Sub-surface scattering (SSS) |
| `VolumeNodeMaterial` | — | Volumetric rendering |
| `Line2NodeMaterial` | — | Wide lines (replaces `Line2` addon material) |

---

## MeshStandardNodeMaterial — Node Properties

Extends `MeshStandardMaterial` properties with:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `emissiveNode` | Node\<vec3\> | `null` | Override emissive (replaces `emissive`/`emissiveMap`) |
| `metalnessNode` | Node\<float\> | `null` | Override metalness |
| `roughnessNode` | Node\<float\> | `null` | Override roughness |
| `isMeshStandardNodeMaterial` | boolean | `true` | Read-only type testing flag |

---

## MeshPhysicalNodeMaterial — Node Properties

Extends `MeshPhysicalMaterial` properties with one `Node` override per physical effect:

| Name | Type | Description |
|------|------|-------------|
| `anisotropyNode` | Node\<float\> | Override anisotropy |
| `clearcoatNode` | Node\<float\> | Override clearcoat |
| `clearcoatRoughnessNode` | Node\<float\> | Override clearcoat roughness |
| `clearcoatNormalNode` | Node\<vec3\> | Override clearcoat normal |
| `iridescenceNode` | Node\<float\> | Override iridescence |
| `iridescenceIORNode` | Node\<float\> | Override iridescence IOR |
| `iridescenceThicknessNode` | Node\<float\> | Override iridescence thickness |
| `sheenNode` | Node\<vec3\> | Override sheen |
| `sheenRoughnessNode` | Node\<float\> | Override sheen roughness |
| `specularIntensityNode` | Node\<float\> | Override specular intensity |
| `specularColorNode` | Node\<vec3\> | Override specular color |
| `transmissionNode` | Node\<float\> | Override transmission |
| `thicknessNode` | Node\<float\> | Override thickness |
| `attenuationColorNode` | Node\<vec3\> | Override attenuation color |
| `attenuationDistanceNode` | Node\<float\> | Override attenuation distance |
| `dispersionNode` | Node\<float\> | Override dispersion |
| `iorNode` | Node\<float\> | Override IOR |
| `isMeshPhysicalNodeMaterial` | boolean | Read-only type testing flag |

Feature flags (boolean, default `true`): `useAnisotropy`, `useClearcoat`, `useDispersion`, `useIridescence`, `useSheen`, `useTransmission`.

---

## Usage Example (MeshStandardNodeMaterial)

```js
import { MeshStandardNodeMaterial } from 'three/nodes';
import { color, sin, timerGlobal } from 'three/tsl';

const material = new MeshStandardNodeMaterial();
// Animate emissive color procedurally
material.emissiveNode = color(0x0044ff).mul(sin(timerGlobal()).abs());
// Node-driven roughness from a texture lookup
material.roughnessNode = texture(roughnessMap).r;
```

## Notes

- Node properties set to a non-null value take **precedence** over their classic texture/value counterparts
- Use TSL accessor functions (e.g., `materialMetalness`, `materialRoughness`) when you want to *modify* rather than fully *replace* the existing value
- All `*NodeMaterial` classes still accept the same constructor parameters as their classic equivalents

## Related

- [Material](./material.md)
- [MeshBasicMaterial](./mesh-basic-material.md)
- [MeshStandardMaterial](./mesh-standard-material.md)
- [MeshPhysicalMaterial](./mesh-physical-material.md)
- [ShaderMaterial](./shader-material.md)
