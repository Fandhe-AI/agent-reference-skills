# Addons

Extend and customize Storybook through the addon ecosystem.

## Overview

Addons are tools that customize Storybook to match team workflows. Many core features, including documentation, are implemented as addons. They integrate via the toolbar, the addons panel, decorators, or build configuration.

## Configuration

### Install an Addon

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
    // addon with options
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        // addon-specific options
      },
    },
  ],
};

export default config;
```

## Addon Categories

| Category | Description | Example |
|----------|-------------|---------|
| Core addons | Maintained by Storybook team; serve as reference implementations | `@storybook/addon-docs` |
| Community addons | Contributed by the wider developer community | Various npm packages |

## Where Addons Appear

| Location | Description |
|----------|-------------|
| Toolbar | Top of the Storybook interface |
| Addons panel | Bottom or right sidebar |
| Preview (decorators) | Wraps story rendering |
| Build config | Modifies webpack/Vite configuration |

## Preset Addons

Some addons function as "presets" that provide pure infrastructure enhancements (e.g., configuring loaders, babel plugins) without adding UI elements.

## Notes

- Addons are listed in the `addons` array in `.storybook/main.ts`
- Discover addons at the official Storybook addon catalog on storybook.js.org
- Core addons demonstrate idiomatic addon development patterns

## Related

- [Features and Behavior](./features-and-behavior.md)
- [Theming](./theming.md)
- [Styling and CSS](./styling-and-css.md)
