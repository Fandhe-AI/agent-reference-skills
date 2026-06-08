# Projects

Top-level organizational unit in Theatre.js. All animations and state belong to a project. Multiple projects can coexist on a single page, though one typically suffices.

## Signature / Usage

```javascript
import { getProject } from '@theatre/core'
import projectState from './state.json'

// Create or retrieve a project
const project = getProject('My Project')

// Load with persisted state
const project = getProject('My Project', { state: projectState })

// Wait for project to be ready (when using Studio)
project.ready.then(() => console.log('Project loaded!'))
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `state` | `object` | Previously exported JSON state to initialize the project |

## Notes

- Calling `getProject()` with an existing name returns the same instance (no duplicate)
- When Studio is active, state is automatically persisted to `localStorage`
- Export state as JSON via the Studio UI; load it back via the `state` option
- `project.ready` is a Promise; `project.isReady` is a boolean for synchronous checks
- Use `project.ready` to defer animation start until state is fully loaded

## Related

- [Sheets](./sheets.md)
- [Sheet Objects](./objects.md)
- [Assets](./assets.md)
