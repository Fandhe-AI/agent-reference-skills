# Authoring Extensions

Guide to building custom Theatre.js Studio extensions that add toolbar buttons, custom panes, and programmatic scene control.

## Overview

Extensions are plain JavaScript objects registered via `studio.extend()` before `studio.initialize()`. They can:

- Add buttons and switches to the Global Toolbar
- Open custom draggable/resizable pane windows
- Listen to and modify the current selection
- Persist configuration using the Studio project

## Minimal Extension

```ts
import studio from '@theatre/studio'

studio.extend({
  id: 'my-extension',
  toolbars: {
    global(set, studio) {
      return [
        {
          type: 'Icon',
          title: 'Open My Pane',
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
      mount({ node }) {
        node.innerHTML = '<p>Hello from extension!</p>'
        return () => { /* cleanup on close */ }
      },
    },
  ],
})

studio.initialize()
```

## Switch Toolbar Item

```ts
let currentMode = 'view'

studio.extend({
  id: 'mode-switcher',
  toolbars: {
    global(set) {
      return [
        {
          type: 'Switch',
          value: currentMode,
          options: [
            { value: 'view', label: 'View', svgSource: '👁' },
            { value: 'edit', label: 'Edit', svgSource: '✏️' },
          ],
          onChange(value) {
            currentMode = value
            set(/* re-render by returning updated config */)
          },
        },
      ]
    },
  },
  panes: [],
})
```

## Reacting to Selection

```ts
studio.onSelectionChange((selection) => {
  const obj = selection.find((item) => 'props' in item)
  if (obj) updateMyEditor(obj)
})
```

## Persisting Extension State

```ts
import { types } from '@theatre/core'

const configObj = studio.getStudioProject()
  .sheet('my-extension')
  .object('config', {
    theme: types.stringLiteral('light', { light: 'Light', dark: 'Dark' }),
  })

configObj.onValuesChange(({ theme }) => applyTheme(theme))
```

## Hot Reloading (v0.7.0+)

```ts
studio.extend(extension, { __experimental_reconfigure: true })
```

## Notes

- `studio.extend()` must be called **before** `studio.initialize()`
- Extension `id` must be globally unique
- Render a registered toolbar inside a pane's DOM node: `studio.ui.renderToolset('global', node)`
- The `mount` function's return value (cleanup) is called when the pane is closed

## Related

- [studio.extend](./studio-extend.md)
- [studio.createPane](./studio-create-pane.md)
- [studio.selection](./studio-selection.md)
- [studio.getStudioProject](./studio-get-studio-project.md)
