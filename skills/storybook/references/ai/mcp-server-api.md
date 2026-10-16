# MCP server API (addon options / toolsets)

Options accepted by `@storybook/addon-mcp` when registered in `main.js|ts`.

## Signature / Usage

```ts
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-mcp',
      options: {
        toolsets: {
          dev: false,
        },
      },
    },
  ],
};

export default config;
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `toolsets` | `{ dev?: boolean; docs?: boolean; test?: boolean }` | `{ dev: true, docs: true, test: true }` | Toggles which toolsets are enabled. |
| `toolsets.dev` | `boolean` | `true` | Development toolset: `stories-changed`, `get-storybook-story-instructions`, `stories-preview`, `stories-find-by-component`, `review-create` (when their feature requirements are enabled). |
| `toolsets.docs` | `boolean` | `true` | Docs toolset: `docs-show`, `docs-show-story`, `docs-list` (when a components manifest is generated for your framework). |
| `toolsets.test` | `boolean` | `true` | Testing toolset: `test-run` (when `@storybook/addon-vitest` is installed and enabled). |

## Notes

- Preview feature; API may change.
- Source: https://storybook.js.org/docs/ai/mcp/api (Storybook v10.6.2).

## Related

- [MCP server](./mcp-server.md)
- [Manifests](./manifests.md)
