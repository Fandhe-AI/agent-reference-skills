# Project

The top-level container for animations and tweaks. Created via `getProject()`.

## Signature / Usage

```ts
import { getProject } from '@theatre/core'

const project = getProject('My Project', { state })

// Wait for project to load before playing animations
await project.ready

// Create a sheet
const sheet = project.sheet('Scene')
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `project.ready` | `Promise<void>` | Resolves when the project finishes loading its state |
| `project.isReady` | `boolean` | `true` once state is loaded |
| `project.address` | `{ projectId: string }` | Unique identifier for this project |
| `project.sheet(name, instanceId?)` | `(string, string?) => Sheet` | Creates or returns a named Sheet |
| `project.getAssetUrl(handle)` | `(AssetHandle) => string` | Returns URL for an asset handle (v0.6.0+) |

## Notes

- `project.sheet(name)` always returns the same `Sheet` for a given name; use `instanceId` to create independent instances of the same sheet
- `getAssetUrl()` is only available when using `@theatre/studio` or a configured asset pipeline (v0.6.0+)
- Saved state is exported from Studio as a JSON file and imported at runtime

## Related

- [getProject](./get-project.md)
- [Sheet](./sheet.md)
