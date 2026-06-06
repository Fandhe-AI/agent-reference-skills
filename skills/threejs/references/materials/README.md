# Materials

| Name | Description | Path |
|------|-------------|------|
| Material | Abstract base class for all materials; common properties (blending, depth, stencil, clipping) and lifecycle methods | [material.md](./material.md) |
| MeshBasicMaterial | Flat-shaded, unlit material; not affected by lights | [mesh-basic-material.md](./mesh-basic-material.md) |
| MeshDepthMaterial | Renders geometry by camera depth (white = near, black = far); used for shadow maps | [mesh-depth-material.md](./mesh-depth-material.md) |
| MeshDistanceMaterial | Internal material for point-light shadow mapping; assign to `customDistanceMaterial` | [mesh-distance-material.md](./mesh-distance-material.md) |
| MeshLambertMaterial | Non-physically based Lambertian material; matte surfaces, no specular highlights | [mesh-lambert-material.md](./mesh-lambert-material.md) |
| MeshMatcapMaterial | MatCap (Lit Sphere) material; lighting baked into texture, no dynamic lights needed | [mesh-matcap-material.md](./mesh-matcap-material.md) |
| MeshNormalMaterial | Maps surface normals to RGB; useful for debugging | [mesh-normal-material.md](./mesh-normal-material.md) |
| MeshPhongMaterial | Blinn-Phong shading with specular highlights; faster than PBR alternatives | [mesh-phong-material.md](./mesh-phong-material.md) |
| MeshPhysicalMaterial | Advanced PBR extending MeshStandardMaterial; clearcoat, sheen, transmission, iridescence, anisotropy | [mesh-physical-material.md](./mesh-physical-material.md) |
| MeshStandardMaterial | PBR Metallic-Roughness material; realistic lighting across all scenarios | [mesh-standard-material.md](./mesh-standard-material.md) |
| MeshToonMaterial | Cel/toon shading with quantised steps via a gradient map | [mesh-toon-material.md](./mesh-toon-material.md) |
| LineBasicMaterial | Material for Line/LineSegments/LineLoop primitives | [line-basic-material.md](./line-basic-material.md) |
| LineDashedMaterial | Dashed line material; extends LineBasicMaterial with dash/gap pattern | [line-dashed-material.md](./line-dashed-material.md) |
| PointsMaterial | Material for Points (particle/point-cloud) objects | [points-material.md](./points-material.md) |
| ShaderMaterial | Custom GLSL shaders; Three.js built-ins auto-prepended | [shader-material.md](./shader-material.md) |
| RawShaderMaterial | Custom GLSL shaders without any automatic Three.js preamble | [raw-shader-material.md](./raw-shader-material.md) |
| ShadowMaterial | Transparent material that only receives shadows | [shadow-material.md](./shadow-material.md) |
| SpriteMaterial | Material for camera-facing Sprite objects | [sprite-material.md](./sprite-material.md) |
| Node Material Variants | WebGPU/TSL node-based versions of all classic materials (MeshBasicNodeMaterial, MeshStandardNodeMaterial, MeshPhysicalNodeMaterial, etc.) | [node-materials.md](./node-materials.md) |
