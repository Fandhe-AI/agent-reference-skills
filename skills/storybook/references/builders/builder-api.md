# Builder API

Interface for implementing custom Storybook builders that compile components and stories into browser-runnable JavaScript bundles.

## Overview

The Builder API allows developers to create custom builders for Storybook. A builder is responsible for starting a development server with HMR support and producing static production builds. This area is under rapid development; open an RFC with the Storybook community before implementing a custom builder.

## Signature / Usage

All builders must implement the following TypeScript interface:

```typescript
export interface Builder<Config, BuilderStats extends Stats = Stats> {
  getConfig: (options: Options) => Promise<Config>;
  start: (args: {
    options: Options;
    startTime: ReturnType<typeof process.hrtime>;
    router: ServerApp;
    server: HttpServer;
    channel: ServerChannel;
  }) => Promise<void | {
    stats?: BuilderStats;
    totalTime: ReturnType<typeof process.hrtime>;
    bail: (e?: Error) => Promise<void>;
  }>;
  build: (arg: {
    options: Options;
    startTime: ReturnType<typeof process.hrtime>;
  }) => Promise<void | BuilderStats>;
  bail: (e?: Error) => Promise<void>;
  corePresets?: string[];
  overridePresets?: string[];
}
```

## Options / Props

| Method | Description |
|--------|-------------|
| `getConfig` | Retrieves the builder's resolved configuration options |
| `start` | Initializes the development server with file watching and HMR |
| `build` | Generates a static production build |
| `bail` | Gracefully terminates the development server |
| `corePresets` | Optional list of core preset paths |
| `overridePresets` | Optional list of preset overrides |

## Configuration

Specify a builder in `.storybook/main.ts`:

```typescript
const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  core: {
    builder: '@storybook/builder-vite', // or any custom builder
  },
};
```

## Notes

- Builders must handle story loading via glob patterns from the `stories` config field.
- MDX support, `preview.js` exports conversion, source code snippet generation, and HMR are all required capabilities.
- Reference implementations: Vite builder, Webpack 5 builder (`code/builders/builder-webpack5`), and Modern Web's `dev-server-storybook`.
- This API is under active development — consult the Storybook community via RFC before building a custom builder.

## Related

- [Vite Builder](./vite.md)
- [Webpack Builder](./webpack.md)
