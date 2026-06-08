# Studio Editing Workflow

Use Theatre.js Studio to interactively edit animations during development and export state for production.

```javascript
import { getProject, types } from '@theatre/core'
import studio from '@theatre/studio'

// --- Development: initialize Studio ---
studio.initialize()

const project = getProject('My Project')
const sheet = project.sheet('Scene')

const obj = sheet.object('Torus Knot', {
  rotation: types.compound({
    x: types.number(0, { range: [-2, 2] }),
    y: types.number(0, { range: [-2, 2] }),
    z: types.number(0, { range: [-2, 2] }),
  }),
  color: types.rgba({ r: 1, g: 0.5, b: 0.2, a: 1 }),
})

obj.onValuesChange(({ rotation, color }) => {
  mesh.rotation.set(
    rotation.x * Math.PI,
    rotation.y * Math.PI,
    rotation.z * Math.PI,
  )
  mesh.material.color.setRGB(color.r, color.g, color.b)
})

// --- Production: load exported state, omit studio.initialize() ---
// import projectState from './state.json'
// const project = getProject('My Project', { state: projectState })
// project.ready.then(() =>
//   sheet.sequence.play({ iterationCount: Infinity })
// )
```

## Notes

- Right-click a prop name in the Details Panel and choose "Sequence" to enable keyframe editing for that prop
- After authoring keyframes, export state via the Outline Panel → click project name → "Export [Project Name] to JSON"
- Pass the downloaded `state.json` as the second argument `{ state }` to `getProject` in production
- Remove `studio.initialize()` in production builds; tree-shaking (Vite/webpack) strips the studio bundle automatically when not imported
- Toggle Studio visibility at runtime with **Alt/Option + \\** (backslash)
