# @kubb/plugin-barrel

Kubb が生成したコードの `index.ts` バレルファイルを書き出すプラグイン。Kubb（`kubb` パッケージ）に標準同梱され、`defineConfig` が自動で `plugins` に追加する（docs に準拠）。

## インストール

別途インストール不要（`kubb` に同梱）。`pluginBarrel()` は引数を取らず、`output.barrel` で設定する。

## 設定オプション

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output.barrel` | `{ type: 'all' \| 'named', nested?: boolean, namespace?: boolean } \| false` | `defineConfig` では `false`、各ジェネレータープラグインの既定 `output` では `{ type: 'named' }` | バレルの再エクスポート方式。`defineConfig` に設定するとルートバレルになり、`output.barrel` を持たないプラグインがその値を継承する |
| `output.barrel.type` | `'all' \| 'named'` | `output.barrel` がオブジェクトのとき必須 | `'named'` は名前付き再エクスポート（tree-shaking 向け）、`'all'` は `export *` |
| `output.barrel.nested` | `boolean` | `false` | 各バレルがサブディレクトリのバレルを参照するか。プラグインの `output.barrel` のみ有効（ルートは常にフラット） |
| `output.barrel.namespace` | `boolean` | `false` | 直下の各サブディレクトリを名前付き namespace として、個別の export に加えて公開する。プラグインの `output.barrel` のみ有効で、`nested` が未設定・`false` でも nested barrel を有効にする。プラグインに固有の `output.path` が必要（出力ルートへ書くプラグインは警告が出て namespace なし） |

## 設定例

```typescript
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen', barrel: { type: 'named' } },
  plugins: [pluginTs()],
})
```

```typescript
// src/gen/index.ts
export { getUser } from './api/user'
export { getPost, Post } from './api/post'
```

### namespace の例

```typescript
import { defineConfig } from 'kubb/config'
import { adapterOas } from '@kubb/adapter-oas'
import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { pluginTs } from '@kubb/plugin-ts'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen', barrel: { type: 'named' } },
  adapter: adapterOas({ integerType: 'number' }),
  plugins: [
    pluginTs({ output: { path: 'types' } }),
    pluginFetch({
      output: { path: 'client', barrel: { type: 'named', namespace: true } },
      group: { type: 'tag', name: ({ group }) => `${group}Service` },
    }),
    pluginReactQuery({ output: { path: 'hooks' }, hooks: true }),
  ],
})
```

`pet` tag の operation は `src/gen/client/petService/` に置かれ、`src/gen/client/index.ts` は次を出力する。

```typescript
export * from './petService/index'
export * as PetService from './petService/index'
```

```typescript
import { PetService, getPetById } from './gen/client'

await PetService.getPetById({ path: { petId: 123 } })
await getPetById({ path: { petId: 123 } })
```

## Notes

- v5 の既定値変更: ルートバレルの既定は `false`（v4 は `'named'`）。`output.barrelType` は `barrel: { type, nested }` に置き換え（`'named'` → `{ type: 'named' }`、`'all'` → `{ type: 'all' }`、プラグインの `'propagate'` → `{ type: 'named', nested: true }`、`false` → `false`）
- プラグインに独自の `output` オブジェクトを渡すと、そのプラグインの既定 `barrel: { type: 'named' }` が置き換えられ、ルート設定にフォールバックする（例: `pluginTs({ output: { path: 'types' } })` は `config.output.barrel` を使う）
- プラグインの `output.barrel: false` はそのバレルを無効にし、ルートバレルからもそのファイルを除外する
- `output.mode: 'file'` のプラグインは自前のバレルを持たず、ルートバレルがそのファイルを直接再エクスポートする
- 同名エクスポートが衝突すると Kubb がエラーを報告し、`named` バレルは最初の 1 つだけを残す
- 旧版の `@beta` タグ配布は不要
- `namespace: true` の例は上記「namespace の例」を参照。tag で group 化した fetch client は `group.name` で service ディレクトリ名を決める。React Query が standalone の operation 関数を import できるよう fetch の `sdk` は未設定にする。有効な root barrel も `PetService` を転送する。namespace 名は PascalCase のディレクトリ名で、数字で始まる名前は `_` が前置され、英数字を含まない名前は `_` になる。export が衝突すると diagnostic が出るため `group.name` を変えて解消する。`integerType: 'number'` は `int64` を `number` にするため例では `petId: 123` を渡せるが、`Number.MAX_SAFE_INTEGER` を超える id では精度が落ちるため、大きな id には既定の `bigint` を使い `123n` を渡す
- Source: https://kubb.dev/extensions/kubb-labs/plugin-barrel (packages/plugin-barrel/docs/{overview,options}.md of kubb@5.20.0, retrieved 2026-11-14)
- Migration (5.11 → 5.20): `output.barrel.namespace` was added in 5.15.0 (changelog v5.15.0)

## Related

- [@kubb/plugin-axios](./plugin-axios.md)
- [@kubb/plugin-fetch](./plugin-fetch.md)
- [migration-guide](../guides/migration-guide.md)
