# Overview

Theatre.js is an animation library with a professional-grade motion design toolset. It bridges the gap between designer and developer by providing a visual Studio editor for authoring animations and a lightweight runtime for playing them back in production.

## Core Idea

Theatre.js decouples **animation authoring** (done in Studio at development time) from **animation playback** (done by `@theatre/core` at runtime). Once animations are authored, the Studio is removed and only the core runtime ships to production.

## Signature / Usage

```javascript
import { getProject } from '@theatre/core'
import studio from '@theatre/studio'

// Development: enable the Studio editor
studio.initialize()

// Create a project (auto-saves to localStorage while Studio is active)
const project = getProject('My Project')
const sheet = project.sheet('Animated Scene')
const obj = sheet.object('Box', { x: 0, opacity: 1 })

// Sync Theatre.js values to your rendering
obj.onValuesChange((values) => {
  box.style.transform = `translateX(${values.x}px)`
  box.style.opacity = String(values.opacity)
})

// Production: remove studio.initialize(), load exported state, and play
// const project = getProject('My Project', { state: projectState })
// project.ready.then(() => sheet.sequence.play())
```

## Notes

- Works with any front-end framework — dedicated integrations exist for Three.js, React Three Fiber, and HTML/SVG
- The Studio UI is toggled with `Alt/Option + \`
- Animation state is exported as a JSON file and embedded at runtime for production

## Related

- [Project](./project.md)
- [Sheet](./sheet.md)
- [Sheet Object](./sheet-object.md)
- [Sequence](./sequence.md)
- [Studio](./studio.md)
- [State](./state.md)
