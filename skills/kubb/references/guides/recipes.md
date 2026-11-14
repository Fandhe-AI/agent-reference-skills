# Configure generation (recipes)

Kubb をインストール済みで OpenAPI 仕様があるプロジェクトで使う設定例。`./petStore.yaml` を自分の仕様パスに置き換え、スタックに必要なパッケージを入れて `npx kubb generate` を実行する。各 Plugin ページは単一 Plugin の設定を示し、以下は複数 Plugin を組み合わせたスタック。

## Pick a stack

### React Query

Types、Axios client、React 向け TanStack Query hooks。

```shell
npm install -D kubb typescript @kubb/plugin-ts @kubb/plugin-axios @kubb/plugin-react-query
npm install axios react @tanstack/react-query
```

```typescript
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginAxios } from '@kubb/plugin-axios'
import { pluginReactQuery } from '@kubb/plugin-react-query'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen', clean: true },
  plugins: [pluginTs(), pluginAxios(), pluginReactQuery({ hooks: true })],
})
```

### Vue Query

Types、Axios client、Vue 向け TanStack Query composables。

```shell
npm install -D kubb typescript @kubb/plugin-ts @kubb/plugin-axios @kubb/plugin-vue-query
npm install axios vue @tanstack/vue-query
```

```typescript
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginAxios } from '@kubb/plugin-axios'
import { pluginVueQuery } from '@kubb/plugin-vue-query'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen', clean: true },
  plugins: [pluginTs(), pluginAxios(), pluginVueQuery({ hooks: true })],
})
```

### Zod and MSW

Zod による runtime validation と、Faker.js のモックデータを使う MSW request handlers。

```shell
npm install -D kubb typescript @kubb/plugin-ts @kubb/plugin-zod @kubb/plugin-faker @kubb/plugin-msw
npm install zod msw @faker-js/faker
```

```typescript
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginZod } from '@kubb/plugin-zod'
import { pluginFaker } from '@kubb/plugin-faker'
import { pluginMsw } from '@kubb/plugin-msw'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen', clean: true },
  plugins: [pluginTs(), pluginZod(), pluginFaker(), pluginMsw({ parser: 'faker', handlers: true })],
})
```

Axios の代わりにグローバル `fetch` を使う場合は、`pluginAxios` を `@kubb/plugin-fetch` の `pluginFetch` に置き換える。

## Format, lint, and run commands after generation

`format` と `lint` にツール名、または `'auto'`（インストール済みのツールを選択）を設定する。`output.postGenerate` はフォーマットと lint の後にシェルコマンドを実行する。事前にツールをインストールする（例: `npm install -D @biomejs/biome oxlint`）。

```typescript
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'

export default defineConfig({
  input: './petStore.yaml',
  output: {
    path: './src/gen',
    clean: true,
    format: 'biome',
    lint: 'oxlint',
    postGenerate: ['npm run typecheck'],
  },
  plugins: [pluginTs()],
})
```

### Read the spec from a git repository

仕様が別リポジトリ（API 自身のリポジトリなど）にある場合は、`input` を git リポジトリ内のファイルに向ける。`git+<repo>#<ref>:<path>` 形式で書き、毎回同じ仕様から生成されるよう `<ref>` をタグまたはコミットに固定する。

```typescript
import { defineConfig } from 'kubb/config'

export default defineConfig({
  input: 'git+https://github.com/org/api.git#v2.1.0:specs/openapi.yaml',
  output: { path: './src/gen' },
})
```

Kubb は `PATH` 上の `git` と自身の git 認証情報を使うため、private リポジトリも既存の credential helper や SSH key で動く。CI ではジョブにそのリポジトリへの読み取り権限を与える。完全な形式は `reference/configuration` の `input` を参照。

## Watch mode, several specifications, and scripts

- `kubb generate --watch` でローカルの仕様ファイルが変わったときに再生成する。URL や git の input は 1 回だけ生成されるため、リモートの仕様が変わったら Kubb を再実行する。`defineConfig` に関数を渡すと `watch` を読めるため、増分実行中は `clean` を off にできる（Config formats 参照）。
- `defineConfig` に配列を渡すと、複数の仕様から 1 回の実行で生成できる。各要素が独自の Plugin と出力ディレクトリを持つ。CLI 出力で区別できるよう要素ごとに `name` を設定する。
- ビルドを組み立てたり diagnostics を調べたりする場合は `createKubb`（`kubb/kit` の engine）でスクリプトから Kubb を駆動する。
- CI では生成前に `kubb validate` を実行し、不正な仕様で失敗させる。

## Notes

- 例は `./src/gen` に書き出す。`clean: true` では生成前にそのディレクトリが削除されるため、手書きファイルは別の場所に置く。
- Source: https://kubb.dev/docs/5.x/how-to/recipes (docs/5.x/how-to/recipes.md of kubb@5.20.0, retrieved 2026-11-14)

## Related

- [barrel-files.md](./barrel-files.md)
