# Features and Behavior

Configure Storybook's UI layout and behavioral features via the `addons.setConfig()` API.

## Overview

UI layout and feature flags are configured in `.storybook/manager.js|ts` using `addons.setConfig()`. This controls panel sizes, toolbar visibility, keyboard shortcuts, and more.

## Configuration

```javascript
// .storybook/manager.js
import { addons } from 'storybook/manager-api';

addons.setConfig({
  navSize: 300,
  bottomPanelHeight: 300,
  rightPanelWidth: 300,
  panelPosition: 'bottom',
  enableShortcuts: true,
  showToolbar: true,
  selectedPanel: 'storybook/actions/panel',
  initialActive: 'sidebar',
  sidebar: {
    showRoots: true,
    collapsedRoots: ['other'],
    renderLabel: (item) => <span>{item.name}</span>,
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});
```

## Layout Properties

| Property | Type | Description |
|----------|------|-------------|
| `navSize` | number (px) | Width of the sidebar showing story list |
| `bottomPanelHeight` | number (px) | Height of the addon panel in bottom position |
| `rightPanelWidth` | number (px) | Width of the addon panel in right position |
| `panelPosition` | `'bottom'` \| `'right'` | Default addon panel position |
| `enableShortcuts` | boolean | Enable/disable keyboard shortcuts |
| `showToolbar` | boolean | Toggle toolbar visibility |
| `theme` | object | Custom Storybook theme |
| `selectedPanel` | string | Default active addon panel ID |
| `initialActive` | `'sidebar'` \| `'canvas'` \| `'addons'` | Default active tab on mobile |

## Dynamic Layout via Functions

```javascript
addons.setConfig({
  showSidebar: ({ viewMode }) => viewMode !== 'story',
  showPanel: ({ storyTags }) => !storyTags.includes('no-panel'),
  showToolbar: ({ viewMode }) => viewMode !== 'docs',
});
```

## URL Parameters

| Parameter | Values | Description |
|-----------|--------|-------------|
| `shortcuts` | `false` | Disable keyboard shortcuts |
| `full` | `true\|false` | Toggle fullscreen mode |
| `nav` | `true\|false` | Show/hide sidebar |
| `panel` | `false\|'right'\|'bottom'` | Control panel visibility |
| `tabs` | `true` | Enable tabs display |

## Notes

- If hiding the sidebar via `showSidebar`, ensure the displayed page provides an alternative means of navigation
- Misusing layout customization functions can make Storybook navigation impossible

## Related

- [Theming](./theming.md)
- [Sidebar and URLs](./sidebar-and-urls.md)
- [Story Layout](./story-layout.md)
