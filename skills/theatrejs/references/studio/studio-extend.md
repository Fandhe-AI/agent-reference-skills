# studio.extend

Registers an extension to enhance Studio's UI and functionality. Must be called before `studio.initialize()`.

## Signature / Usage

```ts
studio.extend(extension: IExtension, options?: { __experimental_reconfigure?: boolean }): void
```

```ts
import studio from '@theatre/studio'

const myExtension = {
  id: 'my-extension',
  toolbars: {
    global(set, studio) {
      return [
        {
          type: 'Icon',
          title: 'My Tool',
          svgSource: '🔧',
          onClick() {
            studio.createPane('my-pane')
          },
        },
      ]
    },
  },
  panes: [
    {
      class: 'my-pane',
      mount({ paneId, node }) {
        node.innerHTML = '<p>Hello from pane</p>'
        return () => { /* cleanup */ }
      },
    },
  ],
}

studio.extend(myExtension)
studio.initialize()
```

## Options / Props

### IExtension object

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique identifier for the extension |
| `toolbars` | `object` | Map of toolbar names to functions returning toolbar items |
| `panes` | `array` | Pane class definitions with `class` and `mount` |

### Toolbar item — Button

| Name | Type | Description |
|------|------|-------------|
| `type` | `'Icon'` | Renders as an icon button |
| `title` | `string` | Tooltip text |
| `svgSource` | `string` | Icon content (emoji or SVG string) |
| `onClick` | `() => void` | Click handler |

### Toolbar item — Switch

| Name | Type | Description |
|------|------|-------------|
| `type` | `'Switch'` | Renders as a mutually exclusive option group |
| `value` | `string` | Currently selected option value |
| `options` | `array` | Items with `value`, `label`, and `svgSource` |
| `onChange` | `(value: string) => void` | Called when user changes selection |

### Pane definition

| Name | Type | Description |
|------|------|-------------|
| `class` | `string` | Unique pane class identifier |
| `mount` | `(instance: { paneId: string, node: HTMLElement }) => (() => void) \| void` | Called when pane opens; return cleanup function |

### extend() options

| Name | Type | Description |
|------|------|-------------|
| `__experimental_reconfigure` | `boolean` | Enable hot-reloading of the extension (since v0.7.0) |

## Notes

- `studio.extend()` must be called **before** `studio.initialize()`
- Open a pane programmatically with `studio.createPane(paneClass)`
- Render a toolset inside a pane's `node` with `studio.ui.renderToolset(toolbarName, node)`
- To persist extension state across reloads, use `studio.getStudioProject().sheet(...).object(...)`

## Related

- [studio.initialize](./studio-initialize.md)
- [studio.createPane](./studio-create-pane.md)
- [Authoring Extensions](./authoring-extensions.md)
