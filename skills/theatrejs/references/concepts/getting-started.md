# Getting Started

Minimal setup to author and play back a Theatre.js animation in a browser without a bundler (CDN approach). The same Project / Sheet / Object / `onValuesChange` pattern applies to all integrations.

## Signature / Usage

```html
<script type="module">
  // 1. Import core + studio bundle from CDN (development)
  import 'https://cdn.jsdelivr.net/npm/@theatre/browser-bundles@0.5.0-insiders.88df1ef/dist/core-and-studio.js'

  // We can now access Theatre.core and Theatre.studio from here
  const { core, studio } = Theatre

  studio.initialize() // Start the Theatre.js UI

  // 2. Create the Project → Sheet → Object hierarchy
  const project = core.getProject('My Animation')
  const sheet = project.sheet('Scene')
  const box = document.getElementById('box')

  const obj = sheet.object('Box', {
    y: core.types.number(0, { range: [-200, 200] }),
    opacity: core.types.number(1, { range: [0, 1] }),
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
// With a bundler: core-only, no Studio
import { getProject } from '@theatre/core'
import projectState from './state.json'

const project = getProject('My Animation', { state: projectState })
project.ready.then(() =>
  project.sheet('Scene').sequence.play({ iterationCount: Infinity })
)
```

## Notes

- Version basis: the CDN URL pins `@theatre/browser-bundles@0.5.0-insiders.88df1ef` verbatim from the official HTML/SVG getting-started guide (`/docs/latest/getting-started/with-html-svg`, fetched 2026-10). The tag is a pre-release ("insiders") build, not a stable release; the guide does not explain why it is pinned. Check the guide for a newer pin before reusing it
- Three.js and React Three Fiber have dedicated getting-started guides with framework-specific idioms
- The core-only bundle (`@theatre/core`) is used in production; the combined bundle (`core-and-studio`) is for development only
- CDN production step (official HTML/SVG guide): replace `core-and-studio.js` in the import URL with `core-only.min.js`; only `Theatre.core` is then available, so remove all `Theatre.studio.initialize()` calls. With a bundler, do not import `@theatre/studio` in production builds
- The CDN snippet needs no bundler because the bundle exposes a global `Theatre`; the bare specifier `@theatre/studio` only resolves with a bundler (as in the THREE.js guide)
- `obj.onValuesChange()` fires on every tick while the Sequence is playing and also fires once immediately with current values

## Related

- [Overview](./overview.md)
- [Project](./project.md)
- [Sheet](./sheet.md)
- [Sheet Object](./sheet-object.md)
- [State](./state.md)
