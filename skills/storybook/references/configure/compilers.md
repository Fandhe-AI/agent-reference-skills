# Compilers

Storybook integrates with SWC and Babel for JavaScript compilation and bundling.

## Overview

Two major compilers are supported. SWC is the recommended default for Webpack-based projects due to its performance. Babel remains available for projects requiring its extensive plugin ecosystem.

## SWC (Recommended)

SWC is a Rust-powered compiler that automatically becomes the default for Webpack-based projects (excluding Angular, Create React App, Ember.js, and Next.js).

### Configuration

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  swc: (config, options) => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
  }),
};

export default config;
```

## Babel

Babel offers a modular architecture and extensive plugin system for broad compatibility.

### Configuration Methods

- **Project-wide**: `babel.config.js` in the project root
- **File-relative**: `.babelrc.json` for granular per-directory control

## Notes

- SWC with React: if React imports are missing, configure `runtime: 'automatic'` in `.storybook/main.ts` as shown above
- Babel debugging: use the `BABEL_SHOW_CONFIG_FOR` environment variable to inspect config without blocking the build

## Related

- [Frameworks](./frameworks.md)
- [TypeScript](./typescript.md)
