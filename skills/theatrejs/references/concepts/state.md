# State

The project state is a plain JSON object that captures all keyframes, prop values, and tweaks authored in Studio. It is the serialisation format Theatre.js uses to move animations from development into production.

## Signature / Usage

```javascript
// Development: state is auto-saved to localStorage by Studio
studio.initialize()
const project = getProject('My Project')  // reads/writes localStorage

// Export state via Studio UI → saves state.json

// Production: embed the exported JSON and pass it to getProject()
import projectState from './state.json'
const project = getProject('My Project', { state: projectState })

// Defer animation start until state is fully loaded
project.ready.then(() => {
  sheet.sequence.play({ iterationCount: Infinity })
})
```

## Notes

- State is keyed by project name — the name passed to `getProject()` must match the exported state's project name exactly
- While Studio is active, state is stored in `localStorage` automatically; no manual save needed during development
- Exporting via the Studio UI produces a JSON file; commit it to source control alongside your code
- `project.ready` is a Promise that resolves once the state is hydrated; always await it before calling `sequence.play()` in production
- `project.isReady` provides a synchronous boolean check when a Promise is inconvenient
- State JSON contains only data — no code — so it is safe to commit and diff in version control

## Related

- [Project](./project.md)
- [Studio](./studio.md)
- [Overview](./overview.md)
