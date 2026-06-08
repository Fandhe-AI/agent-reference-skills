# Basic Animation Setup

Set up a Theatre.js project with getProject → sheet → object → sequence playback.

```javascript
import { getProject, types } from '@theatre/core'
import studio from '@theatre/studio'

// Initialize Studio (development only)
if (import.meta.env.DEV) {
  studio.initialize()
}

// 1. Create a project (acts as a save file)
const project = getProject('My Project')

// 2. Create a sheet to group related objects
const sheet = project.sheet('Animated Scene')

// 3. Define an object with animatable props
const obj = sheet.object('Box', {
  position: types.compound({
    x: types.number(0, { range: [-5, 5] }),
    y: types.number(0, { range: [-5, 5] }),
  }),
  opacity: types.number(1, { range: [0, 1] }),
})

// 4. React to value changes
obj.onValuesChange((values) => {
  mesh.position.x = values.position.x
  mesh.position.y = values.position.y
  mesh.material.opacity = values.opacity
})

// 5. Play the sequence after project is ready
project.ready.then(() => {
  sheet.sequence.play({ iterationCount: Infinity, range: [0, 3] })
})
```

## Notes

- `getProject` returns the same instance if a project with that name already exists
- A sheet groups objects that animate together; one scene typically uses one sheet
- `onValuesChange` fires on every frame during playback and on manual edits in Studio
- Use `{ state: projectState }` in `getProject` to load exported animation JSON in production
