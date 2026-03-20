# logLevel

Controls the verbosity of Storybook's browser console logging.

## Type

```typescript
type logLevel = 'debug' | 'error' | 'info' | 'trace' | 'warn'
```

## Usage

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  logLevel: 'debug',
};

export default config;
```

## Options

| Level | Description |
|-------|-------------|
| `'trace'` | Most verbose; trace-level diagnostics |
| `'debug'` | Detailed debugging information |
| `'info'` | Standard informational messages (default) |
| `'warn'` | Warning and error messages |
| `'error'` | Error messages only |

## Notes

- Default value is `'info'`
- Applies to browser console logs, not the terminal/server logs
