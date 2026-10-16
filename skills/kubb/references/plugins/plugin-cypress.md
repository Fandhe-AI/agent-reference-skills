# @kubb/plugin-cypress

OpenAPI 仕様から operation ごとの型付き `cy.request()` ヘルパーを生成するプラグイン（plugin-cypress 5.0.14 の docs に準拠）。

各ヘルパーは仕様名どおりの grouped `path` / `query` / `headers` / `body` を取り、`Cypress.Chainable<{Operation}Response>` としてレスポンスボディを返す。

## インストール

```bash
npm install --save-dev @kubb/plugin-cypress
```

`@kubb/plugin-ts` が必要。テストを実行するプロジェクトに `cypress` v15 または v16 を入れる。ヘルパーはグローバルの `Cypress` 名前空間を使うため、生成ファイルを含む tsconfig に `"types": ["cypress"]` を追加する。

## 設定オプション（v5）

`paramsType` / `pathParamsType` / `paramsCasing` / `contentType` / `generators` は削除され、`transformers.name` は `resolver` に置き換わった。

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output` | `Output` | `{ path: 'cypress', barrel: { type: 'named' } }` | 出力先（`path` / `mode` / `barrel` / `banner` / `footer`） |
| `group` | `Group` | None | tag / path によるフォルダー分割（`output.mode: 'directory'` 必須） |
| `baseURL` | `string` | None | 各リクエストに付与するベース URL。省略時はホストを付けず spec の相対パスを使い、Cypress 自身の `baseUrl` に対して解決される。ホストは各ヘルパーの URL に埋め込まれる |
| `include` | `Array<Include>` | None | 対象を絞り込む |
| `exclude` | `Array<Exclude>` | `[]` | 対象を除外する |
| `override` | `Array<Override>` | `[]` | パターン単位のオプション上書き |
| `resolver` | `ResolverPatch<ResolverCypress>` | `resolverCypress` | 生成名・ファイルパスのカスタマイズ。独自の名前空間は持たず共通の `name` / `file` / `imports` のみ |
| `macros` | `Array<Macro>` | `[]` | 出力前の AST ノード書き換え |

## 設定例

```typescript
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginCypress } from '@kubb/plugin-cypress'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  plugins: [
    pluginTs(),
    pluginCypress({ output: { path: 'cypress', mode: 'directory' } }),
  ],
})
```

```typescript
import { getPetById } from '../../src/gen/cypress/getPetById'

getPetById({ path: { petId: 1n } }).then((pet) => {
  expect(pet.name).to.be.a('string')
})
```

## Notes

- `petId` のような `int64` は既定のアダプターで `bigint` 型になる（例: `1n`）
- Migration (v4 → v5): リクエストヘルパーは grouped `*Options` の後に変更なしの `Partial<Cypress.RequestOptions>` を取る。`dataReturnType` は削除され、ヘルパーはボディを `Cypress.Chainable<T>` として返す。HTTP メソッドは大文字、import は `*Options` / `*Response` 名。`baseURL` / `exclude` / `include` / `override` の形は変わらない。validator オプションは無い

## Related

- [@kubb/plugin-ts](./plugin-ts.md)
