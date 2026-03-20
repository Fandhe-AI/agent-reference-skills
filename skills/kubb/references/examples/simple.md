# Simple Example

最小限の Kubb 設定例。OpenAPI 仕様から基本的なコードを生成する。

## kubb.config.ts

```typescript
import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'

export default defineConfig({
  root: '.',
  input: {
    path: './petStore.yaml',
  },
  output: {
    path: './src/gen',
    clean: true,
  },
  plugins: [
    pluginOas(),
  ],
})
```

## 依存関係

```bash
npm install --save-dev @kubb/cli @kubb/core @kubb/plugin-oas
```

## 実行

```bash
npx kubb generate
```
