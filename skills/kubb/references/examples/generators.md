# Custom Generators Example

カスタムジェネレーターを使って生成コードをカスタマイズする設定例。

## 概要

Kubb のジェネレーターシステムにより、プラグインの出力をカスタマイズできる。`generators` オプションにカスタム関数を渡すことで、スキーマやオペレーションの生成ロジックを制御する。

## kubb.config.ts

```typescript
import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginClient } from '@kubb/plugin-client'

export default defineConfig({
  input: { path: './petStore.yaml' },
  output: { path: './src/gen', clean: true },
  plugins: [
    pluginOas({
      generators: [],  // JSON スキーマ生成を無効化
    }),
    pluginTs({
      output: { path: 'models' },
      generators: undefined,  // デフォルトのジェネレーターを使用
    }),
    pluginClient({
      output: { path: './clients' },
      transformers: {
        name: (name, type) => {
          if (type === 'file') {
            return `${name}Client`
          }
          return name
        },
      },
    }),
  ],
})
```

## ポイント

- `generators: []` — 特定のプラグインの生成を無効化
- `generators: undefined` — デフォルトのジェネレーターを使用
- `transformers.name` — 生成されるファイル名・関数名をカスタマイズ
- カスタムジェネレーターの詳細は `@kubb/plugin-oas` の generators オプションを参照

## Notes

- Removed in v5: there is no v5 example for this page. The plugin-level `generators` option was removed (migration guide, "Shared plugin options": `generators` → a custom plugin), `@kubb/plugin-oas` no longer exists (replaced by `adapterOas`), and `transformers.name` is now `resolver.name`. The config above documents v3/v4 only
- To customize generated output in v5, write a custom plugin with generators: see [../guides/creating-plugins.md](../guides/creating-plugins.md) and [../kit/generators.md](../kit/generators.md)
