# Addon API

Programmatic API for building addons. `storybook/manager-api` interacts with the manager UI and Storybook API; `storybook/preview-api` controls and configures addon behavior.

## Signature / Usage

```js
import { addons, types } from 'storybook/manager-api';
import { AddonPanel } from 'storybook/internal/components';

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

## Options / Props

Core addon API:

| Method | Description |
|--------|-------------|
| `addons.add(id, { type, title, render })` | Registers a UI component (panel / toolbar / tab). `render` receives `active` (true when the panel is focused) |
| `addons.register(id, (api) => {})` | Entry point for all addons; gives access to the Storybook API |
| `addons.getChannel()` | Channel with a NodeJS `EventEmitter`-compatible API (manager and preview) |
| `makeDecorator({ name, parameterName, skipIfNoParametersOrOptions?, wrapper })` | Creates decorators in the style of official addons; `wrapper(getStory, context, { options, parameters })` |
| `addons.setConfig(config)` | Overrides default UI configuration |

If a story's parameters include `{ [parameterName]: { disable: true } }`, the `makeDecorator` decorator is not called.

Storybook API (`api` from `register`, or `useStorybookApi`):

| Method | Description |
|--------|-------------|
| `api.selectStory(kind, story?)` | Select a story by kind name and optional story name |
| `api.selectInCurrentKind(story)` | Like `selectStory`, takes only the story |
| `api.setQueryParams(params)` | Set query-string params (temporary storage); set a value to `null` to remove it |
| `api.getQueryParam(key)` | Read a query param set via `setQueryParams` |
| `api.getUrlState(overrideParams)` | Application URL state including overridden or custom params |
| `api.getStoryHrefs(storyId, options?)` | Manager and preview URLs for a story. Options: `base`, `inheritArgs`, `inheritGlobals` (default true), `queryParams`, `refId`, `viewMode` (default `'story'`) |
| `api.on(eventName, fn)` | Handler called when the user navigates between stories |
| `api.openInEditor({ file, line?, column? })` | Opens a file in the configured editor; returns a Promise |
| `api.getCurrentStoryData()` | Current story's id, kind, name, parameters |
| `api.toggleFullscreen(toggled?)` | Toggle / set fullscreen |
| `api.togglePanel(toggled?)` | Toggle / set addon panel visibility |
| `api.addNotification(notification)` | Show a notification (`id`, `content`, optional `duration`, `icon`) |

`addons.setConfig` options:

| Name | Type | Description | Example |
|------|------|-------------|---------|
| `navSize` | number (px) | Sidebar size | `300` |
| `bottomPanelHeight` | number (px) | Addon panel size at bottom | `200` |
| `rightPanelWidth` | number (px) | Addon panel size at right | `200` |
| `panelPosition` | string | Where to show the addon panel | `'bottom'` or `'right'` |
| `enableShortcuts` | boolean | Enable/disable shortcuts | `true` |
| `showToolbar` | boolean | Show/hide toolbar | `true` |
| `theme` | object | Storybook theme | `undefined` |
| `selectedPanel` | string | Id to select an addon panel | `storybook/actions/panel` |
| `initialActive` | string | Default active tab on mobile | `sidebar` / `canvas` / `addons` |
| `sidebar` | object | `showRoots` (boolean), `collapsedRoots` (array of root IDs), `renderLabel` (function returning ReactNode) | `{ showRoots: false }` |
| `toolbar` | object | Toggle visibility per toolbar item id | `{ fullscreen: { hidden: false } }` |

Hooks (from `storybook/manager-api`):

| Hook | Description |
|------|-------------|
| `useStorybookState` | Access Storybook's internal state |
| `useStorybookApi` | Full access to the Storybook API methods |
| `useChannel` | Subscribe to events and get an emitter for custom events (works on iframe and manager) |
| `useAddonState` | Persist addon data across the UI lifecycle or between multiple UI types |
| `useParameter(key, default)` | Current story's parameter; falls back to the second argument |
| `useGlobals` | Read and update globals |
| `useArgs` | Retrieve or update a story's args |

`useParameter` example:

```js
import { AddonPanel } from 'storybook/internal/components';

import { useParameter } from 'storybook/manager-api';

export const Panel = () => {
  // Connects to Storybook's API and retrieves the value of the custom parameter for the current story
  const value = useParameter('custom-parameter', 'initial value');

  return (
    <AddonPanel key="custom-panel" active="true">
      {value === 'initial value' ? (
        <h2>The story doesn't contain custom parameters. Defaulting to the initial value.</h2>
      ) : (
        <h2>You've set {value} as the parameter.</h2>
      )}
    </AddonPanel>
  );
};
```

`useChannel` example:

```js
import { useChannel } from 'storybook/manager-api';
import { AddonPanel, Button } from 'storybook/internal/components';
import { STORY_CHANGED } from 'storybook/internal/core-events';

export const Panel = () => {
  // Creates a Storybook API channel and subscribes to the STORY_CHANGED event
  const emit = useChannel({
    STORY_CHANGED: (...args) => console.log(...args),
  });

  return (
    <AddonPanel key="custom-panel" active="true">
      <Button onClick={() => emit('my-event-type', { sampleData: 'example' })}>
        Emit a Storybook API event with custom data
      </Button>
    </AddonPanel>
  );
};
```

## Notes

- The docs' snippets import `addons` from `storybook/preview-api` in some register/getChannel examples while `types` and hooks come from `storybook/manager-api`; the panel/toolbar examples import `addons` from `storybook/manager-api`.
- Optimize addons using `useStorybookState` / `useGlobals` with `React.memo`, `useMemo`, or `useCallback` to avoid excessive re-renders.
- Source: https://storybook.js.org/docs/addons/addons-api (Storybook v10.6.2).

## Related

- [Types of addons](./addon-types.md)
- [Configure addons](./configure-addons.md)
- [Write an addon](./writing-addons.md)
