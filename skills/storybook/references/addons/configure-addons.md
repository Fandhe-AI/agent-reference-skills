# Configure addons

The addon API gives addon authors three ways to configure and communicate with users' Storybook: presets, parameters, and channels.

## Signature / Usage

```js
// Parameters: users enable addon behavior per story (Pseudo States addon example)
export const Hover = {
  render: () => <Button>Label</Button>,
  parameters: { pseudo: { hover: true } },
};
```

## Options / Props

| Mechanism | Runs in | Use case |
|-----------|---------|----------|
| Preset | Node.js (global options) | Pre-configure Webpack loaders, Babel plugins, framework-specific config; e.g. auto-wrapping all stories in a `Provider` via a decorator |
| Parameters | Browser | Configure addon behavior globally, per component, or per story; read with the `useParameter` hook |
| Channels | Manager and preview | Two-way communication using a NodeJS `EventEmitter`-compatible API; use the `useChannel` hook (e.g. Actions captures user events and shows them in a panel) |

## Notes

- Users can set parameter defaults globally and override them at story level.
- For a complete channel example see `storybookjs/addon-kit` `src/withRoundTrip.ts`.
- Source: https://storybook.js.org/docs/addons/configure-addons (Storybook v10.6.2).

## Related

- [Write a preset addon](./writing-presets.md)
- [Addon API](./addons-api.md)
- [Write an addon](./writing-addons.md)
