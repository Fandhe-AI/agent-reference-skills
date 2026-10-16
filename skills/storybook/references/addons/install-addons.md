# Install addons

Add addons automatically with the `storybook add` CLI command, or manually by installing the package and registering it in the `addons` array of `.storybook/main.js|ts`.

## Signature / Usage

Automatic installation:

```shell
npx storybook@latest add @storybook/addon-a11y
# pnpm dlx storybook@latest add @storybook/addon-a11y
# yarn dlx storybook@latest add @storybook/addon-a11y
```

Manual installation:

```shell
npm install @storybook/addon-a11y --save-dev
# pnpm add --save-dev @storybook/addon-a11y
# yarn add --dev @storybook/addon-a11y
```

```ts
// .storybook/main.ts
// Replace your-framework with the framework you are using (e.g., react-vite, vue3-vite, angular, etc.)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    // Other Storybook addons
    '@storybook/addon-a11y', //👈 The a11y addon goes here
  ],
};

export default config;
```

Removing an addon:

```shell
npx storybook@latest remove @storybook/addon-a11y
```

## Notes

- `storybook add` works for several community-led addons, but not for preset addons; read the addon's own documentation for its installation process.
- Installing multiple addons in one `storybook add` call installs only the first one specified (documented known limitation, to be addressed in a future release).
- You can also remove an addon manually: uninstall the package and delete it from `.storybook/main.js|ts`.
- Source: https://storybook.js.org/docs/addons/install-addons (Storybook v10.6.2).

## Related

- [Introduction to addons](./introduction.md)
- [Configure addons](./configure-addons.md)
- [Addons main config](../api/main-config/addons.md)
