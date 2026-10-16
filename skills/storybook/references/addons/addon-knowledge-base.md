# Addon knowledge base

Quick reference for common addon enhancements: disabling the panel per story, styling, Storybook UI components, local development, and composing addons in presets.

## Signature / Usage

Disable the addon panel for a story: pass `paramKey` when registering the panel, then set `disable` in the story parameters.

```js
addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'My Addon',
    render: () => <div>Addon tab content</div>,
    paramKey: 'myAddon', // this element
  });
});
```

Compose third-party addons inside a preset:

```js
function managerEntries(entry = []) {
  return [...entry, import.meta.resolve('my-other-addon/manager')];
}

const previewAnnotations = (entry = [], options) => {
  return [...entry, import.meta.resolve('my-other-addon/preview')];
};

export default {
  managerEntries,
  previewAnnotations,
};
```

## Options / Props

Components from `storybook/internal/components`: Action Bar, Addon Panel, Badge, Button, Form, Loader, PlaceHolder, Scroll Area, Space (`Spaced`), Syntax Highlighter, Tabs, ToolBar, ToolTip, Zoom. UI primitives: Color Palette, Icon, Typography.

Local development scripts:

```json
{
  "scripts": {
    "start": "npm run build -- --watch"
  }
}
```

## Notes

- Storybook styles with Emotion and a customizable theme; Emotion's `withTheme` HOC passes the theme as a prop. Inline styles or another css-in-js lib also work.
- Addon UIs can use any React library; Storybook components give native look and feel and theming support.
- The Color Palette from `@storybook/addon-docs/blocks` is a high-level abstraction of the `storybook/theming` module.
- `npm link` does not work for packaged addons; list the addon as a local dependency, for example `"@storybook/addon-controls": "file:///home/username/myrepo"`, then run `yarn` or `npm install`.
- HMR: standalone addons use the `start` watch script above; local addons built on an existing Storybook installation get HMR out of the box.
- Source: https://storybook.js.org/docs/addons/addon-knowledge-base (Storybook v10.6.2).

## Related

- [Write an addon](./writing-addons.md)
- [Write a preset addon](./writing-presets.md)
- [Addon API](./addons-api.md)
