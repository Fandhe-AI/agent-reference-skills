# THREE.js Vanilla Integration

Animate the rotation of a THREE.js mesh with Theatre.js (no React Three Fiber), then export the project state and play it in production.

```bash
npm install --save @theatre/core @theatre/studio
```

```ts
import * as THREE from 'three'
import { getProject, types } from '@theatre/core'

// Minimal THREE.js scene
const scene = new THREE.Scene()
const mesh = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1, 0.3, 100, 16),
  new THREE.MeshNormalMaterial(),
)
scene.add(mesh)

// Create a project for the animation
const project = getProject('THREE.js x Theatre.js')

// Create a sheet
const sheet = project.sheet('Animated scene')

// Create a Theatre.js object with the props you want to animate
const torusKnotObj = sheet.object('Torus Knot', {
  // Note that the rotation is in radians
  // (full rotation: 2 * Math.PI)
  rotation: types.compound({
    x: types.number(mesh.rotation.x, { range: [-2, 2] }),
    y: types.number(mesh.rotation.y, { range: [-2, 2] }),
    z: types.number(mesh.rotation.z, { range: [-2, 2] }),
  }),
})

torusKnotObj.onValuesChange((values) => {
  const { x, y, z } = values.rotation
  mesh.rotation.set(x * Math.PI, y * Math.PI, z * Math.PI)
})
```

Initialize Studio only in development, using a dynamic import so it stays out of the production bundle (Vite shown; use `process.env.NODE_ENV === 'development'` with create-react-app).

```ts
if (import.meta.env.DEV) {
  import('@theatre/studio').then(({ default: studio }) => {
    studio.initialize()
  })
}
```

Production: export the project state to `state.json` from Studio, then pass it to `getProject` and play.

```ts
import projectState from './state.json'

const project = getProject('THREE.js x Theatre.js', { state: projectState })
const sheet = project.sheet('Animated scene')

// ...create the same objects as above, then play the animation on repeat
project.ready.then(() => sheet.sequence.play({ iterationCount: Infinity }))
```

## Notes

- The code is verbatim from the official guide. `onValuesChange` multiplies each value by `Math.PI`, so values in Studio are in units of π (1 = π rad, range `[-2, 2]` = one full turn). The initial values passed from `mesh.rotation.*` are radians, so the two units match only when the initial rotation is 0
- The official starter repo is github.com/fulopkovacs/vanilla-threejs-project (Vite); any bundler with a basic THREE.js scene works
- The install command assumes an existing THREE.js project that already includes `three` (e.g. the official starter repo); in a new project, install `three` separately
- Project state is kept in the browser's localStorage until it is exported; when `state` is passed to `getProject`, edits made in Studio still persist to localStorage (source: https://www.theatrejs.com/docs/latest/getting-started/with-three-js)
- Press Alt/Option + `\` to hide the Studio UI (source: https://www.theatrejs.com/docs/latest/getting-started/with-three-js)
- This sample uses plain THREE.js with `@theatre/core` and `@theatre/studio` only; for React Three Fiber see react-three-fiber-integration.md
