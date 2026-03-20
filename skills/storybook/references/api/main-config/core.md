# core

Configures Storybook's internal features including the dev server, build system, and telemetry.

## Type

```typescript
{
  allowedHosts?: string[] | true;
  builder?: string | { name: string; options?: BuilderOptions };
  channelOptions?: { maxDepth?: number };
  crossOriginIsolated?: boolean;
  disableProjectJson?: boolean;
  disableTelemetry?: boolean;
  disableWebpackDefaults?: boolean;
  disableWhatsNewNotifications?: boolean;
  enableCrashReports?: boolean;
  renderer?: RendererName;
}
```

## Usage

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  core: {
    allowedHosts: ['storybook.example.local'],
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
  },
};

export default config;
```

## Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `allowedHosts` | `string[] \| true` | `[]` | Allowed hosts for dev server; `true` disables hostname validation |
| `builder` | `string \| { name, options? }` | — | Specifies Vite or Webpack5 as the build tool |
| `channelOptions.maxDepth` | `number` | `3` | Max nesting depth for serialized objects in manager-preview channel |
| `crossOriginIsolated` | `boolean` | `false` | Enables CORS headers for SharedArrayBuffer support |
| `disableProjectJson` | `boolean` | `false` | Prevents `project.json` metadata file generation |
| `disableTelemetry` | `boolean` | `false` | Disables telemetry data collection |
| `disableWebpackDefaults` | `boolean` | `false` | Disables Storybook's default Webpack configuration |
| `disableWhatsNewNotifications` | `boolean` | `false` | Hides "What's New" UI notifications |
| `enableCrashReports` | `boolean` | `false` | Includes crash reports in telemetry |
| `renderer` | `RendererName` | — | Specifies the rendering engine |

## Notes

- `allowedHosts: true` disables security validation — do not use in production
- `channelOptions.maxDepth` larger values may cause serialization slowdowns
- `framework.options.builder` is preferred over `core.builder.options`

## Related

- [framework.md](./framework.md)
- [vite-final.md](./vite-final.md)
- [webpack-final.md](./webpack-final.md)
