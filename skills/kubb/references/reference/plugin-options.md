# Shared plugin options

全 generator plugin が受け付ける共通オプション（`output` / `group` / `include` / `exclude` / `override` / `resolver` / `macros`）。

## Signature / Usage

```typescript
import { pluginTs } from '@kubb/plugin-ts'

pluginTs({
  output: {
    path: 'models',
    barrel: { type: 'named' },
    banner: '/* eslint-disable */',
  },
})
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `output` | `Output` | plugin ごとに設定（例: `@kubb/plugin-ts` は `{ path: 'types', barrel: { type: 'named' } }`） | ファイルの出力先とエクスポート方法。渡した `output` は plugin 既定を丸ごと置換 |
| `output.path` | `string` | plugin ごと | 出力フォルダ（global の `output.path` 基準）。`output` 設定時は必須。単一ファイルは拡張子付き名（`'types.ts'`） |
| `output.mode` | `'directory' \| 'file'` | `output.path` に拡張子があれば `'file'`、なければ `'directory'` | ファイルへの集約方法 |
| `output.barrel` | `{ type: 'all' \| 'named', nested?: boolean } \| false` | plugin 既定の `{ type: 'named' }`、`barrel` なしで独自 `output` を渡すと `false` | `index.ts` の re-export 方式 |
| `output.banner` | `string \| ((meta: BannerMeta) => string)` | — | 各生成ファイルの先頭テキスト |
| `output.footer` | `string \| ((meta: BannerMeta) => string)` | — | 各生成ファイルの末尾テキスト |
| `group` | `{ type: 'tag' \| 'path', name?: (context: { group: string }) => string }` | グルーピングなし | `{output.path}/{groupName}/` のサブフォルダに分割 |
| `group.type` | `'tag' \| 'path'` | — (`group` 設定時は必須) | `'tag'` は operation の最初のタグ、`'path'` は URL の最初のセグメント。タグなしは `default` グループ |
| `group.name` | `(context: { group: string }) => string` | `'tag'` は camelCase 化（`pet store` → `petStore`）、`'path'` は生のセグメント | グループキーをサブフォルダ名（と集約ファイルの接尾辞）に変換。指定すれば常に優先 |
| `include` | `Array<Include>` | 全て生成 | 少なくとも 1 件に一致する operation / schema のみ生成 |
| `exclude` | `Array<Exclude>` | `[]` | 一致するものをスキップ。`include` と両方一致なら `exclude` 優先 |
| `override` | `Array<Override>` | `[]` | 一致した operation に別のオプションを適用 |
| `resolver` | `ResolverPatch<Resolver>` | — | ファイル名・シンボル名の決定を上書き。省略メンバーは plugin 既定を維持 |
| `macros` | `Array<Macro>` | `[]` | 出力前に AST ノードを書き換える |

### output.mode

- `'directory'`: operation / schema ごとに 1 ファイルを `output.path` 配下に書く。`group` でサブフォルダに分割可
- `'file'`: 全てを単一ファイルに書く。`output.path` に拡張子が必要
- `'directory'` を明示するのは推論を上書きしたい場合のみ（例: `'clients.v2'` のようにドットを含むディレクトリ名）

### output.barrel

- `'named'`: シンボルを名前で re-export（明示的 import・tree-shaking 向け）
- `'all'`: `export *`
- `false`: この plugin の barrel 生成をスキップし、root barrel からも除外
- `nested: true`（例 `{ type: 'named', nested: true }`）: 各サブディレクトリに直下のみ re-export する `index.ts` を書く。`defineConfig` の root `output.barrel` に `nested` はない
- 解決順: plugin の `output.barrel` → `config.output.barrel` → `false`

```typescript
pluginZod({ output: { path: 'zod', barrel: { type: 'all', nested: true } } })
```

### output.banner

関数は document 情報（`title` / `description` / `version` / `baseURL`）と per-file の文脈（`filePath` / `baseName` / `isBarrel` / `isAggregation`）を受け取る。

```typescript
pluginFetch({
  output: {
    path: 'clients',
    banner: (meta) => (meta.isBarrel || meta.isAggregation ? '' : "'use server'"),
  },
})
```

`banner: '/* eslint-disable */'` と `footer: '/* eslint-enable */'` の組で lint disable を生成ファイルに限定できる。

### group

```typescript
pluginTs({ group: { type: 'tag' } }) // src/gen/types/pet/, src/gen/types/store/, ...
```

```typescript
pluginTs({
  group: {
    type: 'tag',
    name: ({ group }) => `${group}Api`, // src/gen/types/petApi/
  },
})
```

### include / exclude

各エントリは `tag` / `operationId` / `path` / `method` / `contentType` / `schemaName` を `pattern`（string または `RegExp`）で絞る。string は `new RegExp(pattern)` でコンパイルされ完全一致ではない（`'pet'` は `'petType'` / `'superpet'` にも一致。完全一致は `'^pet$'`）。`type: 'method'` の string は大文字の HTTP メソッド（`'GET'`）。`extension` エントリは source operation の vendor extension（`x-*` キー、任意の `value` は厳密等価）で operation を選ぶ。schema には適用されない。

```typescript
export type Include =
  | {
      type: 'tag' | 'operationId' | 'path' | 'method' | 'contentType' | 'schemaName'
      pattern: string | RegExp
    }
  | {
      type: 'extension'
      key: `x-${string}`
      value?: unknown
    }
```

```typescript
pluginTs({
  include: [
    { type: 'tag', pattern: 'pet' },
    { type: 'path', pattern: /^\/store/ },
  ],
})
```

```typescript
pluginTs({
  exclude: [
    { type: 'tag', pattern: 'internal' },
    { type: 'operationId', pattern: /^deprecated_/ },
    { type: 'extension', key: 'x-internal', value: true },
  ],
})
```

### override

各エントリは `include` と同じフィールドに加え、`override` 以外の任意の plugin オプションを受ける `options` を持つ（ネスト不可）。上から順に評価し、最初の一致が plugin 既定にマージされる。後続は積み重ならない。

```typescript
export type Override = Include & {
  options: Omit<Partial<Options>, 'override'>
}
```

```typescript
pluginTs({
  override: [
    {
      type: 'tag',
      pattern: 'admin',
      options: { output: { path: 'admin' }, enum: { type: 'enum' } },
    },
  ],
})
```

### resolver

全 resolver が共有するメンバー。plugin ごとに独自の名前空間が追加される（`@kubb/plugin-ts` の `param` / `response`、`@kubb/plugin-react-query` の `query` / `mutation` 等）。メソッド内の `this` は完全な resolver で、`this.default.name(name)` で組み込みのケーシングを再利用できる。

```typescript
type ResolverPatch = {
  name?(name: string): string
  file?: {
    baseName?(params: { name: string; extname: string }): string
    path?(params: { baseName: string; output: Output }): string
  }
  imports?(options: ResolveImportsOptions): Array<ImportNode>
}
```

```typescript
pluginTs({
  resolver: {
    name(name) {
      return `${this.default.name(name)}Model`
    },
  },
})
```

### macros

各 macro のコールバック（`schema` / `operation` 等）はノードとコンテキストを受け取り、置換ノードか、そのままにする `undefined` を返す。macro は順に実行され後続は先行の出力を見る。client plugin（`@kubb/plugin-fetch` / `@kubb/plugin-axios` / `@kubb/plugin-client`）は組み込み macro を先に、ユーザー macro を後に実行する。組み込み `macroDiscriminatorEnum` / `macroEnumName` / `macroRenameSchema` / `macroSimplifyUnion` は `kubb/kit` から export される。

```typescript
import { ast } from 'kubb/kit'
import { pluginTs } from '@kubb/plugin-ts'

const macroUntagged = ast.defineMacro({
  name: 'untagged',
  operation(node) {
    return node.tags?.length ? undefined : { ...node, tags: ['untagged'] }
  },
})

pluginTs({ macros: [macroUntagged] })
```

## Notes

- `@kubb/plugin-barrel` は例外で引数を取らず、`output.barrel` で設定する。`@kubb/plugin-redoc` は `output.path` のみ受け付ける
- `output` を自前で渡すときは `barrel` も再指定する。省略すると `config.output.barrel` にフォールバックする
- `group` はディレクトリ出力が前提。`output.mode: 'file'` との併用は `KUBB_INVALID_PLUGIN_OPTIONS` でビルド停止
- client plugin（`@kubb/plugin-fetch` / `@kubb/plugin-axios`）が operation を `exclude` すると、それを土台とする plugin（`@kubb/plugin-react-query` / `@kubb/plugin-vue-query` / `@kubb/plugin-swr` / `@kubb/plugin-mcp`）も同じ operation をスキップする。`returnType` / `output` / `group` の `override` も同様に追従する
- 出典: https://kubb.dev/docs/5.x/reference/plugin-options （kubb@5.11.0 の docs/5.x/reference/plugin-options.md）

## Related

- [configuration](./configuration.md)
- [diagnostics](./diagnostics.md)
- [kit-api](./kit-api.md)
