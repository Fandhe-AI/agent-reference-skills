# Three.js (threeEffect, motion/three)

Animate Three.js objects, materials, shader uniforms and TSL nodes with Motion's `animate()`.

## Signature / Usage

```
npm install motion three
```

Register `threeEffect` once, before the first animation:

```
import { animate } from "motion"
import { threeEffect } from "motion/three"

animate.addEffect(threeEffect)
```

Objects (initial values are read from the object):

```
animate(
  mesh,
  { x: 2, rotateY: 180, scale: 1.25 },
  { type: "spring", visualDuration: 0.7, bounce: 0.25 }
)
```

Materials (looked up on the object first, then on its `material`):

```
// Via the mesh
animate(mesh, { color: "#f43f5e", opacity: 0.5 })

// Directly
animate(mesh.material, { roughness: 0.1, metalness: 1 })
```

Vector axes via suffix:

```
animate(material, { normalScaleX: 2, normalScaleY: 2 })
```

Shader uniforms:

```
const uniforms = {
  progress: { value: 0 },
  tint: { value: new THREE.Color("#22d3ee") },
  mouse: { value: new THREE.Vector2() },
}

const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader })

// Several at once
animate(uniforms, { progress: 1, tint: "#fbbf24" })

// Via the mesh, alongside transforms
animate(mesh, { rotateY: 90, progress: 1, mouseX: 0.5 })
```

TSL `uniform()` nodes:

```
import { uniform } from "three/tsl"
import { MeshStandardNodeMaterial } from "three/webgpu"

const material = new MeshStandardNodeMaterial()
material.colorNode = uniform(new THREE.Color("#8b5cf6"))
material.opacityNode = uniform(1)

// Animates colorNode.value and opacityNode.value
animate(mesh, { color: "#f43f5e", opacity: 0.5 })
```

Sequences and stagger:

```
animate([
  ["h1", { opacity: 1 }],
  [mesh, { rotateY: 180 }, { at: "<" }],
  [uniforms, { progress: 1 }, { at: "-0.5" }],
])

animate(meshes, { y: 1 }, { delay: stagger(0.1) })
```

Binding your own motion values:

```
import { animate, motionValue, transformValue } from "motion"
import { threeEffect } from "motion/three"

const x = motionValue(0)
const progress = transformValue(() => x.get() / 100)

const cancelObject = threeEffect(mesh, { x })
const cancelUniforms = threeEffect(uniforms, { progress })

// Moves the mesh and updates the uniform together
animate(x, 100, { type: "spring" })
```

Scroll-driven:

```
import { motionValue, scroll, transformValue } from "motion"

const progress = motionValue(0)

threeEffect(mesh, {
  rotateY: transformValue(() => progress.get() * 90),
})
threeEffect(material, { opacity: progress })

scroll((value) => progress.set(value), { target: section })
```

Rendering (Motion writes during `preRender`; render in the `render` step):

```
import { cancelFrame, frame } from "motion"

function render() {
  renderer.render(scene, camera)
}

frame.render(render, true)

// Later
cancelFrame(render)
```

## Options / Props

Transform shorthands for any `Object3D` (meshes, groups, lights, cameras):

| Name | Type | Description |
|------|------|-------------|
| `x`, `y`, `z` | number | Translate |
| `rotateX`, `rotateY`, `rotateZ` | number (degrees) | Rotate |
| `scale`, `scaleX`, `scaleY`, `scaleZ` | number | Scale |

## Notes

- `motion/three` ships inside the `motion` package; install Three.js alongside it.
- `threeEffect` handles `Object3D`s, materials, uniforms objects and uniform nodes; it writes once per frame and returns a cleanup function.
- Three.js stores rotation in radians; Motion reads and writes degrees, matching DOM `rotate`.
- Anything else is a plain property (e.g. `animate(camera, { fov: 70 })`), though a camera still needs `updateProjectionMatrix()` in your render loop.
- Per-value transition overrides and returned controls work like regular `animate`.
- TSL nodes that are not uniforms (e.g. `mix()` or `sin()` expressions) are compiled into the shader and cannot be animated at runtime.
- Repeated `animate()` calls on the same property reuse its motion value, so a spring picks up the velocity of the animation it interrupts.

## Related

- [animate](./animate.md)
- [prop-effect](./prop-effect.md)
- [vgpu](./vgpu.md)
- [frame](./frame.md)
- [scroll](./scroll.md)
