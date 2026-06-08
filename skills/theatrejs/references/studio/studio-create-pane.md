# studio.createPane

Opens a new pane window from an extension-registered pane class.

## Signature / Usage

```ts
studio.createPane(paneClass: string): void
```

```ts
import studio from '@theatre/studio'

// Open a pane whose class was registered via studio.extend()
studio.createPane('my-pane')
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `paneClass` | `string` | The `class` identifier defined in the extension's `panes` array |

## Notes

- The pane class must be registered via `studio.extend()` before calling `createPane()`
- Each call opens a new independent pane instance
- The pane's `mount` callback receives `{ paneId, node }` — use `node` to insert custom HTML, and return a cleanup function to run when the pane closes
- Render extension toolbars inside the pane with `studio.ui.renderToolset(toolbarName, node)`

## Related

- [studio.extend](./studio-extend.md)
- [Studio UI](./studio-ui.md)
- [Authoring Extensions](./authoring-extensions.md)
