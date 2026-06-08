# Getting Started

Minimal setup to author and play back a Theatre.js animation in a browser without a bundler (CDN approach). The same Project / Sheet / Object / `onValuesChange` pattern applies to all integrations.

## Signature / Usage

```html
<script type="module">
  // 1. Import core + studio bundle from CDN (development)
  import {
    getProject,
    types,
  } from 'https://cdn.jsdelivr.net/npm/@theatre/browser-bundles@0.5.0-insiders.88df1ef/dist/core-and-studio.js'

  import studio from '@theatre/studio'
  studio.initialize()

  // 2. Create the Project → Sheet → Object hierarchy
  const project = getProject('My Animation')
  const sheet = project.sheet('Scene')
  const box = document.getElementById('box')

  const obj = sheet.object('Box', {
    y: types.number(0, { range: [-200, 200] }),
    opacity: types.number(1, { range: [0, 1] }),
  })

  // 3. React to value changes and apply to DOM
  obj.onValuesChange(({ y, opacity }) => {
    box.style.transform = `translateY(${y}px)`
    box.style.opacity = String(opacity)
  })
</script>
```

**Production** — after exporting the state JSON via Studio:

```javascript
import { getProject } from '@theatre/core'       // core-only, no Studio
import projectState from './state.json'

const project = getProject('My Animation', { state: projectState })
project.ready.then(() =>
  project.sheet('Scene').sequence.play({ iterationCount: Infinity })
)
```

## Notes

- Three.js and React Three Fiber have dedicated getting-started guides with framework-specific idioms
- The core-only bundle (`@theatre/core`) is used in production; the combined bundle (`core-and-studio`) is for development only
- `obj.onValuesChange()` fires on every tick while the Sequence is playing and also fires once immediately with current values

## Related

- [Overview](./overview.md)
- [Project](./project.md)
- [Sheet](./sheet.md)
- [Sheet Object](./sheet-object.md)
- [State](./state.md)
