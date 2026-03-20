# Configure

`kubb.config.ts` の全オプションリファレンス。

## 基本構造

`defineConfig` ヘルパーを使うことで型安全な設定が得られる:

```typescript
import { defineConfig } from '@kubb/core'

export default defineConfig({
  input: { path: './petStore.yaml' },
  output: { path: './src/gen' },
  plugins: [],
})
```

## 設定オプション一覧

### `name`

| 項目 | 内容 |
|------|------|
| 型 | `string` |
| デフォルト | - |
| 説明 | CLI出力に表示される設定の表示名 |

### `root`

| 項目 | 内容 |
|------|------|
| 型 | `string` |
| デフォルト | `process.cwd()` |
| 説明 | プロジェクトのルートディレクトリ |

### `input`

OpenAPI仕様のソースを指定する。`path` と `data` のどちらか一方を使う。

#### `input.path`

| 項目 | 内容 |
|------|------|
| 型 | `string` |
| 説明 | OpenAPI仕様ファイルのパス（YAML/JSONまたはURL） |

#### `input.data`

| 項目 | 内容 |
|------|------|
| 型 | `string \| unknown` |
| 説明 | インラインOpenAPI仕様（文字列またはオブジェクト） |

### `output`

#### `output.path`（必須）

| 項目 | 内容 |
|------|------|
| 型 | `string` |
| 説明 | 生成ファイルの出力ディレクトリ（rootからの相対パスまたは絶対パス） |

#### `output.clean`

| 項目 | 内容 |
|------|------|
| 型 | `boolean` |
| デフォルト | `false` |
| 説明 | 生成前に出力ディレクトリを削除するか |

#### `output.format`

| 項目 | 内容 |
|------|------|
| 型 | `'auto' \| 'prettier' \| 'biome' \| 'oxfmt' \| false` |
| デフォルト | `'prettier'` |
| 説明 | コードフォーマッターの選択。`'auto'` はインストール済みのものを自動検出 |

#### `output.lint`

| 項目 | 内容 |
|------|------|
| 型 | `'auto' \| 'eslint' \| 'biome' \| 'oxlint' \| false` |
| デフォルト | `false` |
| 説明 | 実行するリンター。`'auto'` はインストール済みのものを自動検出 |

#### `output.write`（非推奨）

| 項目 | 内容 |
|------|------|
| 型 | `boolean` |
| デフォルト | `true` |
| 説明 | ファイルをディスクに書き込むか（dry-runモード用）。`storage` の使用を推奨 |

#### `output.storage`

| 項目 | 内容 |
|------|------|
| 型 | `Storage` |
| デフォルト | `fsStorage()` |
| 説明 | カスタムストレージバックエンド（S3, Redis, インメモリ等） |

#### `output.extension`

| 項目 | 内容 |
|------|------|
| 型 | `Record<string, string>` |
| デフォルト | `{ '.ts': '.ts' }` |
| 説明 | インポート文のファイル拡張子を上書きする |

#### `output.barrelType`

| 項目 | 内容 |
|------|------|
| 型 | `'all' \| 'named' \| false` |
| デフォルト | `'named'` |
| 説明 | バレルファイル（`index.ts`）の生成方法 |

#### `output.defaultBanner`

| 項目 | 内容 |
|------|------|
| 型 | `'simple' \| 'full' \| false` |
| デフォルト | `'simple'` |
| 説明 | 生成ファイル冒頭の自動生成コメントのスタイル |

#### `output.override`

| 項目 | 内容 |
|------|------|
| 型 | `boolean` |
| デフォルト | `false` |
| 説明 | 既存の外部ファイルを上書きするか |

### `plugins`

| 項目 | 内容 |
|------|------|
| 型 | `Array<KubbUserPlugin>` |
| デフォルト | `[]` |
| 説明 | コード生成プラグインの配列 |

## 高度な設定

### カスタムストレージ

ファイルシステム以外のバックエンド（S3, Redis, インメモリ等）に出力する場合は `createStorage` を使用:

```typescript
import { createStorage, defineConfig } from '@kubb/core'

const memoryStorage = createStorage(() => {
  const store = new Map<string, string>()
  return {
    name: 'memory',
    async hasItem(key) { return store.has(key) },
    async getItem(key) { return store.get(key) ?? null },
    async setItem(key, value) { store.set(key, value) },
    async removeItem(key) { store.delete(key) },
    async getKeys(base) { /* ... */ },
    async clear(base) { /* ... */ },
  }
})

export default defineConfig({
  input: { path: './petStore.yaml' },
  output: {
    path: './src/gen',
    storage: memoryStorage,
  },
  plugins: [],
})
```

### 条件付き設定（CLI引数を動的に参照）

```typescript
import { defineConfig } from '@kubb/core'

export default defineConfig(({ config, watch, logLevel }) => ({
  input: { path: './petStore.yaml' },
  output: {
    path: './src/gen',
    clean: !watch,
  },
  plugins: [],
}))
```

### 複数設定（配列エクスポート）

複数のOpenAPI仕様を処理したり、異なる設定で複数回生成する場合:

```typescript
import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'

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

## 設定ファイルの検索順序

Kubbは以下の順序で設定ファイルを検索する:

1. `kubb.config.ts`
2. `kubb.config.js`
3. `kubb.config.mjs`
4. `kubb.config.cjs`
5. `.kubbrc`
6. 上記の `configs/` または `.config/` サブディレクトリ内のバリエーション

## Related

- [quick-start.md](./quick-start.md)
- [troubleshooting.md](./troubleshooting.md)
