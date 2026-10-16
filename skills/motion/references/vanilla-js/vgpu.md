# vgpu (vgpuEffect, motion/vgpu)

Animate vgpu (Vercel's WebGPU library) uniforms, shader bindings, scene nodes, cameras, lights, materials and orbit controls with Motion's `animate()`.

## Signature / Usage

```
npm install motion vgpu
```

Register `vgpuEffect` once, before the first animation:

```
import { animate } from "motion"
import { vgpuEffect } from "motion/vgpu"

animate.addEffect(vgpuEffect)
```

Shared uniforms (provide both keyframes the first time; vgpu keeps no readable copy):

```
import { uniforms } from "vgpu"

const globals = uniforms(gpu, { progress: 0, intensity: 1 })

animate(
  globals,
  { progress: [0, 1] },
  { duration: 1, ease: "easeInOut" }
)

animate(globals, { progress: 0 })
```

Effects, draws and compute use `"binding.member"` dot paths:

```
import { effect } from "vgpu"

const wave = effect(gpu, shader, {
  set: {
    params: { time: 0, speed: 1 }
  },
})

animate(wave, {
  "params.time": [0, 1],
  "params.speed": [1, 2],
})
```

Bare bindings are animated by name:

```
const wave = effect(gpu, shader, { set: { time: 0, speed: 1 } })

animate(wave, { time: [0, 1], speed: [1, 2] })
```

Shader materials expose `values`, so one keyframe is enough:

```
import { shaderMaterial } from "vgpu/scene"

const material = shaderMaterial(shader, {
  set: {
    params: { glow: 0 }
  },
})

animate(material, { "params.glow": 1 })
```

Colours, vectors:

```
animate(wave, { "params.tint": ["#0cc2e0", "#fbbf24"] })
animate(material, { color: "#f43f5e" })
animate(target, { clearColor: "rgba(9, 9, 11, 1)" })

animate(wave, { "params.mouse": ["0.5 0.5", "0.2 0.8"] })
animate(light, { directionX: 1 })
animate(controls, { targetX: 2, targetZ: -1 })
```

Scene nodes, cameras, lights, orbit controls:

```
import { box, mesh } from "vgpu/scene"

const cube = mesh(box({ size: 1 }), material)

animate(
  cube,
  { x: 1, rotateY: 180, scale: 1.25 },
  { type: "spring", visualDuration: 0.7, bounce: 0.25 }
)

animate(camera, { fov: 70 }, { duration: 1 })

animate(controls, {
  yaw: controls.yaw + Math.PI,
  pitch: 0.6,
  distance: 8,
})
```

Binding your own motion values:

```
import { animate, motionValue } from "motion"
import { vgpuEffect } from "motion/vgpu"

const intensity = motionValue(1)

const cancel = vgpuEffect(globals, { intensity })

animate(intensity, 2, { type: "spring" })
```

Rendering (Motion writes during `preRender`; render in the `render` step):

```
import { cancelFrame, frame } from "motion"
import { frame as vgpuFrame } from "vgpu"

function render() {
  vgpuFrame(gpu, (currentFrame) => {
    currentFrame.pass(canvasSurface, wave)
  })
}

frame.render(render, true)
```

Advance vgpu's clock from the same loop if shaders read `clock(gpu).time`:

```
const time = clock(gpu)

frame.update(({ delta }) => time.advance(delta / 1000), true)
```

## Options / Props

Scene node transform shorthands (`mesh()`, `group()`, cameras, lights):

| Name | Type | Description |
|------|------|-------------|
| `x`, `y`, `z` | number | Translate |
| `rotateX`, `rotateY`, `rotateZ` | number (degrees) | Rotate |
| `scale`, `scaleX`, `scaleY`, `scaleZ` | number | Scale |

## Notes

- `motion/vgpu` ships inside the `motion` package. `vgpuEffect` renders shared uniforms, effects, draws, compute shaders, scene nodes, materials, orbit controls and targets.
- Updates are batched in Motion's frameloop; `vgpuEffect` batches writes into one `set()` per frame and returns a cleanup function.
- Shaders work in linear RGB; any CSS colour string is converted like vgpu's `srgb()` helper. Colours are written as three components, plus alpha if the current value has four.
- Single-axis vector animation (e.g. `directionX`, `"params.mouseX"`) works once the vector is known, because the subject exposes it or it was animated before.
- Anything with a readable property and a `set()` works with no keyframes needed.
- When DOM and vgpu animate in the same frames, a layout-backed `surface()` measures its canvas every frame, forcing layout after Motion's style writes. Create the surface with `autoResize: false` and resize from a `ResizeObserver`.
- Once a value is bound, `[from, to]` keyframes are not needed; repeated `animate()` calls reuse the motion value.
- Source: https://motion.dev/docs/vgpu (fetched 2026-10).

## Related

- [three](./three.md)
- [animate](./animate.md)
- [frame](./frame.md)
- [motion-value](./motion-value.md)
