# Types of addons

Each addon is either UI-based (panels, toolbars, tabs) or a preset. This page gives boilerplate for each.

## Signature / Usage

Panel (most common; used by `@storybook/addon-a11y`):

```js
import React from 'react';

import { AddonPanel } from 'storybook/internal/components';

import { useGlobals, addons, types } from 'storybook/manager-api';

addons.register('my/panel', () => {
  addons.add('my-panel-addon/panel', {
    title: 'Example Storybook panel',
    //👇 Sets the type of UI element in Storybook
    type: types.PANEL,
    render: ({ active }) => (
      <AddonPanel active={active}>
        <h2>I'm a panel addon in Storybook</h2>
      </AddonPanel>
    ),
  });
});
```

Toolbar (used by `@storybook/addon-themes`):

```js
import React from 'react';

import { addons, types } from 'storybook/manager-api';
import { ToggleButton } from 'storybook/internal/components';
import { OutlineIcon } from '@storybook/icons';

addons.register('my-addon', () => {
  addons.add('my-addon/toolbar', {
    title: 'Example Storybook toolbar',
    //👇 Sets the type of UI element in Storybook
    type: types.TOOL,
    //👇 Shows the Toolbar UI element if the story canvas is being viewed
    match: ({ tabId, viewMode }) => !tabId && viewMode === 'story',
    render: ({ active }) => (
      <ToggleButton
        key="Example"
        padding="small"
        variant="ghost"
        pressed={active}
        ariaLabel="Addon feature"
        tooltip="Toggle addon feature"
      >
        <OutlineIcon />
      </ToggleButton>
    ),
  });
});
```

Tab:

```js
import React from 'react';

import { addons, types } from 'storybook/manager-api';

addons.register('my-addon', () => {
  addons.add('my-addon/tab', {
    type: types.TAB,
    title: 'Example Storybook tab',
    render: () => (
      <div>
        <h2>I'm a tabbed addon in Storybook</h2>
      </div>
    ),
  });
});
```

Preset (grouped `babel`, `webpack`, `addons` configuration, e.g. `preset-create-react-app`):

```js
export default {
  managerWebpack: async (config, options) => {
    // Update config here
    return config;
  },
  webpackFinal: async (config, options) => {
    return config;
  },
  babel: async (config, options) => {
    return config;
  },
};
```

## Options / Props

| Type | `types.*` | Where it appears |
|------|-----------|------------------|
| Panel | `types.PANEL` | Addon panel |
| Toolbar | `types.TOOL` | Storybook toolbar |
| Tab | `types.TAB` | Custom tab |

## Notes

- `match` conditionally renders a toolbar addon based on the current view; toolbar icons come from `@storybook/icons`.
- The preset boilerplate shows `managerWebpack`; Storybook's manager is built with esbuild, so `managerWebpack` no longer works (see Write a preset addon).
- Source: https://storybook.js.org/docs/addons/addon-types (Storybook v10.6.2).

## Related

- [Addon API](./addons-api.md)
- [Write an addon](./writing-addons.md)
- [Write a preset addon](./writing-presets.md)
