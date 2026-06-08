# studio.getStudioProject

Returns the internal Theatre.js `IProject` that Studio uses for its own sheets and objects. Extensions use this to persist configuration data across reloads.

## Signature / Usage

```ts
studio.getStudioProject(): IProject
```

```ts
import studio from '@theatre/studio'
import { types } from '@theatre/core'

const studioProject = studio.getStudioProject()

const configObj = studioProject
  .sheet('my-extension')
  .object('config', {
    mode: types.stringLiteral('default', { default: 'Default', advanced: 'Advanced' }),
  })

// React to config changes
configObj.onValuesChange((values) => {
  applyMode(values.mode)
})
```

## Notes

- The returned project is managed by Studio itself; do not call `project.ready` checks or load external state into it
- Ideal for storing lightweight per-extension UI state that should survive page reloads (Studio serializes it alongside the user's project state)
- Combine with `studio.onSelectionChange` to build custom inspector panes that update when the user selects different objects

## Related

- [studio.extend](./studio-extend.md)
- [Authoring Extensions](./authoring-extensions.md)
