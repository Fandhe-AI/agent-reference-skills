# getProject

Creates or retrieves a Theatre.js `Project` by ID. If a project with the given ID already exists, it is returned rather than created anew.

## Signature / Usage

```ts
import { getProject } from '@theatre/core'

const project = getProject(id: string, config?: ProjectConfig): Project
```

```ts
// Without Studio (production): pass saved state
import state from './state.json'
const project = getProject('My Project', { state })

// With Studio: state is managed automatically
const project = getProject('My Project')
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | — | Unique project identifier |
| `config.state` | `object` | `undefined` | Saved project state JSON (required in production without Studio) |

## Notes

- Project IDs must be unique per application; reusing an ID returns the same instance
- In production (without `@theatre/studio`), always pass `config.state` with exported state, otherwise animations have no keyframe data
- `project.ready` is a Promise that resolves once the project finishes loading its state

## Related

- [Project](./project.md)
- [Sheet](./sheet.md)
