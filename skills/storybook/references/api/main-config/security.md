# security

Configures security behavior of Storybook (iframe messaging and iframe embedding).

## Signature / Usage

```typescript
{
  insecureIframeMessaging?: boolean;
  insecureRemoteIframeEmbed?: boolean;
}
```

```typescript
// .storybook/main.ts
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  security: {
    insecureIframeMessaging: true,
  },
};

export default config;
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `insecureIframeMessaging` | `boolean` | `false` | Turns off the origin checks on `postMessage` exchange between the manager and preview iframes, restoring earlier Storybook behavior |
| `insecureRemoteIframeEmbed` | `boolean` | `false` | Lets the dev server's manager and preview be embedded in an `<iframe>` hosted on any origin |

## Notes

- `insecureIframeMessaging`: by default the manager only accepts messages from its own preview iframes, and a preview in dev mode only accepts messages from a manager on a local host such as `localhost` or `127.0.0.1`. In dev mode, both also address their messages to the expected origin. This prevents other websites from sending messages to your Storybook or reading the ones it sends
- With `insecureIframeMessaging` on, any website that embeds your Storybook can exchange messages with it. To compose a dev-mode Storybook from a Storybook opened on another host, the safe alternative is to build the composed Storybook and compose the build output
- `insecureRemoteIframeEmbed`: by default the dev server's manager and preview can only be embedded in iframes by pages served on `localhost` or `127.0.0.1`, preventing malicious websites from embedding your local Storybook
- With `insecureRemoteIframeEmbed` on, any website you visit can embed your local Storybook. The safe alternative is to build your composed Storybook and compose the build output

```typescript
// .storybook/main.ts
const config: StorybookConfig = {
  security: {
    insecureRemoteIframeEmbed: true,
  },
};
```
- Source: https://storybook.js.org/docs/api/main-config/main-config-security (Storybook v10.6.2).

## Related

- [core.md](./core.md)
- [refs.md](./refs.md)
