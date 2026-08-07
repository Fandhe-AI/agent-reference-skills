# @kubb/plugin-redoc

OpenAPI 仕様から Redoc HTML ドキュメントを生成するプラグイン。Redocly を使用。

## インストール

```bash
npm install --save-dev @kubb/plugin-redoc
```

## 設定オプション（v5 でも変更なし）

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output.path` | `string` | `'docs.html'` | 生成される HTML ファイルのパス（ディレクトリではなく単一ファイルを指す） |

## 設定例

```typescript
import { defineConfig } from '@kubb/core'
import { pluginRedoc } from '@kubb/plugin-redoc'

export default defineConfig({
  input: { path: './petStore.yaml' },
  output: { path: './src/gen' },
  plugins: [
    pluginRedoc({
      output: { path: './docs/index.html' },
    }),
  ],
})
```
