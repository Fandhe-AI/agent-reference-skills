# Frameworks

Storybook framework packages automatically configure Storybook for popular development environments.

## Overview

When you install Storybook into an existing project, it detects your framework and automatically configures Storybook to work with it by adding necessary dependencies and adjusting configuration settings.

## Supported Frameworks

| Builder | Frameworks |
|---------|-----------|
| Webpack | React, Angular, Vue 3, Web Components, Next.js, HTML, Ember, Preact, Svelte |
| Vite | React, Vue 3, Web Components, HTML, Svelte, SvelteKit, Qwik, Solid |

## Configuration

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/your-framework',
    options: {
      // Framework-specific options
    },
  },
};

export default config;
```

### Framework-specific Options

| Framework | Option | Description |
|-----------|--------|-------------|
| Next.js | `nextConfigPath` | Path to the Next.js config file |
| React | `strictMode` | Enable React strict mode |
| React | `legacyRootApi` | Use React 18 legacy root API |
| Angular | `enableIvy` | Enable Ivy (default in Angular 9+) |
| Angular | `enableNgcc` | Enable ngcc for backwards compatibility |

## Notes

- Storybook maintains the same level of feature support across all frameworks
- Next.js 13+ support for TurboPack and Server Components is incomplete
- Legacy frameworks (Aurelia, Marionette, Mithril, Rax, Riot) are being deprecated
- Projects using custom configurations like CRACO may require additional addon or integration setup

## Related

- [Compilers](./compilers.md)
- [TypeScript](./typescript.md)
