# Project

The top-level container for all Theatre.js work. A project groups related sheets and their objects together and owns the persisted animation state.

## Signature / Usage

```javascript
import { getProject } from '@theatre/core'

// Create or retrieve a project by name
const project = getProject('My Project')

// Load with previously exported state (production pattern)
import projectState from './state.json'
const project = getProject('My Project', { state: projectState })

// Wait until state is fully loaded before playing
project.ready.then(() => sheet.sequence.play({ iterationCount: Infinity }))
```

## Options / Props

`getProject(name, config?)` accepts:

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | Unique project identifier; used as the key in localStorage |
| `config.state` | `object` | Previously exported JSON state to initialise the project |

## Notes

- Calling `getProject()` with the same name returns the existing instance (idempotent)
- While Studio is active, state is automatically persisted to `localStorage`
- Export state via Studio UI ("Export" button); embed the resulting JSON at runtime
- `project.ready` is a `Promise`; `project.isReady` is a synchronous boolean
- Multiple projects can coexist on a single page, but one is usually sufficient

## Related

- [Sheet](./sheet.md)
- [State](./state.md)
- [Overview](./overview.md)
