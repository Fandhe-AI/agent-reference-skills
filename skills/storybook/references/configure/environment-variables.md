# Environment Variables

Manage application behavior across environments using environment variables in Storybook.

## Overview

Variables prefixed with `STORYBOOK_` are automatically available throughout preview code. Variables can be set via the command line, `.env` files, or defined directly in `main.ts`.

## Configuration

### Command Line

```bash
STORYBOOK_THEME=red STORYBOOK_DATA_KEY=12345 npm run storybook
```

### .env Files

Create a `.env` file in your project root:

```
STORYBOOK_API_URL=https://api.example.com
STORYBOOK_FEATURE_FLAG=true
```

Use `.env.development` or `.env.production` for environment-specific values.

### Define in main.ts

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  env: (config) => ({
    ...config,
    EXAMPLE_VAR: 'An environment variable configured in Storybook',
  }),
};

export default config;
```

## Accessing Variables in Stories

| Builder | Syntax |
|---------|--------|
| Webpack | `process.env.STORYBOOK_THEME` |
| Vite | `import.meta.env.STORYBOOK_DATA_KEY` |

```typescript
// In a story or preview file
const theme = process.env.STORYBOOK_THEME; // Webpack
const theme = import.meta.env.STORYBOOK_THEME; // Vite
```

## Browser Selection

Control which browser opens during `storybook dev`:

```bash
BROWSER="firefox" npm run storybook
# Options: safari, firefox, chromium
# Default: Chrome
```

## Notes

- Do **not** store secrets (private API keys, tokens) in Storybook environment variables; they are embedded into the build
- Only variables prefixed with `STORYBOOK_` are exposed to preview code automatically
- Framework-specific variables (e.g., `VUE_APP_`) may require additional framework configuration to be recognized

## Related

- [Story Rendering](./story-rendering.md)
- [Features and Behavior](./features-and-behavior.md)
