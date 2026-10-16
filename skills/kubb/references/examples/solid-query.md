# Solid Query Example

OpenAPI 仕様から Solid Query hooks を生成する設定例（v4 専用、v5 で削除）。

## kubb.config.ts

```typescript
import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginSolidQuery } from '@kubb/plugin-solid-query'

export default defineConfig({
  input: { path: './petStore.yaml' },
  output: { path: './src/gen', clean: true },
  plugins: [
    pluginOas({ generators: [] }),
    pluginTs({ output: { path: 'models' } }),
    pluginSolidQuery({
      output: { path: './hooks' },
      group: {
        type: 'tag',
        name: ({ group }) => `${group}Hooks`,
      },
    }),
  ],
})
```

## 依存関係

```bash
npm install --save-dev @kubb/cli @kubb/core @kubb/plugin-oas @kubb/plugin-ts @kubb/plugin-solid-query
npm install @tanstack/solid-query
```

## Notes

- Removed in v5: `@kubb/plugin-solid-query` has no v5 replacement. The last release is 4.39.3 (migration guide, "Before you start"). This page documents v4 only
- The config above also uses the v3/v4 shape (`@kubb/core`, `pluginOas`, `input: { path }`)
