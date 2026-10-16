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

Local development scripts (`package.json`):

```json
{
  "scripts": {
    "start": "npm run build -- --watch"
  }
}
```

## Options / Props

Components from `storybook/internal/components` and UI primitives (source paths under `code/` in the Storybook repo):

| Name | Source | Description |
|------|--------|-------------|
| Action Bar | `core/src/components/components/ActionBar/ActionBar.tsx` | Component |
| Addon Panel | `core/src/components/components/addon-panel/addon-panel.tsx` | Component |
| Badge | `core/src/components/components/Badge/Badge.tsx` | Component |
| Button | `core/src/components/components/Button/Button.tsx` | Component |
| Form | `core/src/components/components/form/index.tsx` | Component |
| Loader | `core/src/components/components/Loader/Loader.tsx` | Component |
| PlaceHolder | `core/src/components/components/placeholder/placeholder.tsx` | Component |
| Scroll Area | `core/src/components/components/ScrollArea/ScrollArea.tsx` | Component |
| Space (`Spaced`) | `core/src/components/components/spaced/Spaced.tsx` | Component |
| Syntax Highlighter | `core/src/components/components/syntaxhighlighter/syntaxhighlighter.tsx` | Component |
| Tabs | `core/src/components/components/tabs/tabs.tsx` | Component |
| ToolBar | `core/src/components/components/bar/bar.tsx` | Component |
| ToolTip | `core/src/components/components/tooltip/Tooltip.tsx` | Component |
| Zoom | `core/src/components/components/Zoom/Zoom.tsx` | Component |
| Color Palette | `addons/docs/src/blocks/components/ColorPalette.tsx` | UI primitive (see Notes) |
| Icon | `core/src/components/components/icon/icon.tsx` | UI primitive |
| Typography | `core/src/components/components/typography` | UI primitive |

## Notes

- Storybook styles with Emotion and a customizable theme; Emotion's `withTheme` HOC passes the theme as a prop. Inline styles or another css-in-js lib also work.
- Addon UIs can use any React library; Storybook components give native look and feel and theming support.
- The Color Palette from `@storybook/addon-docs/blocks` is a high-level abstraction of the `storybook/theming` module.
- `npm link` does not work for packaged addons; list the addon as a local dependency, for example `"@storybook/addon-controls": "file:///home/username/myrepo"`, then run `yarn` or `npm install`.
- HMR: standalone addons use the `start` watch script shown under Signature / Usage; local addons built on an existing Storybook installation get HMR out of the box.
- Source: https://storybook.js.org/docs/addons/addon-knowledge-base (Storybook v10.6.2).

## Related

- [Write an addon](./writing-addons.md)
- [Write a preset addon](./writing-presets.md)
- [Addon API](./addons-api.md)
