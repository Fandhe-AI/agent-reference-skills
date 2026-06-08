# studio.createContentOfSaveFile

Generates an exportable JSON object representing the current state of a project. Use this to implement custom persistence (e.g., saving to a server instead of the default `localStorage`).

## Signature / Usage

```ts
studio.createContentOfSaveFile(projectId: string): Record<string, unknown>
```

```ts
import studio from '@theatre/studio'

async function saveToServer(projectId: string) {
  const content = studio.createContentOfSaveFile(projectId)
  await fetch('/api/save', {
    method: 'POST',
    body: JSON.stringify(content),
  })
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `projectId` | `string` | The ID of the project to export (matches the ID passed to `getProject()`) |

## Notes

- The returned object is plain JSON-serializable data; store and load it however you like
- To restore state from a custom save file, pass the loaded JSON as the second argument to `getProject(id, { state: savedJSON })`
- By default, Theatre.js stores state in `localStorage`; this API is the escape hatch for custom backends

## Related

- [studio.getStudioProject](./studio-get-studio-project.md)
