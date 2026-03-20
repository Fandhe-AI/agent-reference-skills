# Quick Start

2分以内にOpenAPI仕様からコードを生成するためのガイド。

## 前提条件

- Node.js 20以上
- TypeScript 4.7以上（任意）
- 有効なOpenAPI 2.0, 3.0, または 3.1 ファイル（YAML or JSON）

## 方法1: インタラクティブセットアップ（推奨）

```bash
npx kubb init
```

ウィザードが以下を順に実行する:

1. `package.json` を検出または作成
2. OpenAPI仕様ファイルのパスを確認
3. 出力ディレクトリパスを確認
4. プラグインを選択（React Query, Zod など）
5. 依存パッケージを自動インストール
6. `kubb.config.ts` を生成

その後、コードを生成:

```bash
npx kubb generate
```

## 方法2: 手動セットアップ

### Step 1: コアパッケージをインストール

```bash
npm install --save-dev @kubb/cli @kubb/core
```

### Step 2: `kubb.config.ts` を作成

```typescript
import { defineConfig } from '@kubb/core'

export default defineConfig({
  root: '.',
  input: {
    path: './petStore.yaml',
  },
  output: {
    path: './src/gen',
  },
  plugins: [],
})
```

### Step 3: npm スクリプトを追加

```json
{
  "scripts": {
    "generate": "kubb generate"
  }
}
```

### Step 4: コードを生成

```bash
npm run generate
```

## 設定例

### TypeScript + React Query

```typescript
import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginReactQuery } from '@kubb/plugin-react-query'

export default defineConfig({
  root: '.',
  input: { path: './petStore.yaml' },
  output: { path: './src/gen', clean: true },
  plugins: [
    pluginOas(),
    pluginTs(),
    pluginReactQuery(),
  ],
})
```

### 複数OpenAPI仕様を同時処理

```typescript
export default defineConfig([
  {
    name: 'petStore',
    input: { path: './petStore.yaml' },
    output: { path: './src/gen/petStore' },
    plugins: [pluginOas(), pluginTs()],
  },
  {
    name: 'userApi',
    input: { path: './userApi.yaml' },
    output: { path: './src/gen/userApi' },
    plugins: [pluginOas(), pluginTs()],
  },
])
```

## プログラマティック利用

`@kubb/core` の `build` 関数を使ってNode.jsスクリプトやビルドシステムに組み込める:

```typescript
import { build } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'

const { error, files } = await build({
  config: {
    root: '.',
    input: { path: './petStore.yaml' },
    output: { path: './gen' },
    plugins: [pluginOas(), pluginTs()],
  },
})
```

## Notes

- `input.path` にはURLも指定可能
- `output.clean: true` で生成前に出力ディレクトリをクリーンアップ
- プラグインの `include` / `exclude` オプションで生成するエンドポイントを絞り込める
- 仕様変更後は `npx kubb generate` を再実行するだけ

## Related

- [installation.md](./installation.md)
- [configure.md](./configure.md)
- [troubleshooting.md](./troubleshooting.md)
