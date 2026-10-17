# 基本チュートリアル

OpenAPI 仕様から TypeScript 型と Axios クライアントを生成するステップバイステップガイド（Kubb 5.11.0 / docs 5.x tutorials/quickstart "Generate your first client" に準拠）。Node.js 22.12 以上と npm が必要。

## 1. プロジェクトを作成する

```shell
mkdir kubb-first-client
cd kubb-first-client
npm init -y
npm pkg set type=module
npm install -D kubb typescript @kubb/plugin-ts @kubb/plugin-axios
npm install axios
```

## 2. 仕様を追加する

プロジェクトルートに `petStore.yaml` を作成する。

```yaml
openapi: 3.0.3
info:
  title: Petstore
  version: 1.0.0
servers:
  - url: https://petstore.swagger.io/v2
paths:
  /pet/{petId}:
    get:
      operationId: getPetById
      parameters:
        - name: petId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: A pet
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Pet'
components:
  schemas:
    Pet:
      type: object
      required: [id, name]
      properties:
        id:
          type: integer
        name:
          type: string
```

`getPetById` operation は pet ID を受け取り、ID と name を持つ pet を返す。

## 3. 生成を設定する

仕様の隣に `kubb.config.ts` を作成する。

```typescript
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginAxios } from '@kubb/plugin-axios'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen', clean: true },
  plugins: [
    pluginTs({ output: { path: 'models' } }),
    pluginAxios({ output: { path: 'clients' } }),
  ],
})
```

型は `src/gen/models`、クライアントは `src/gen/clients` に書き出される。`clean: true` は実行のたびに `src/gen` の中身を削除するため、`src/gen` は生成物専用にする。

## 4. クライアントを生成する

```shell
npx kubb generate
```

`src/gen/clients/getPetById.ts` は型付きの path パラメーターを受け取り型付きの結果を返す。import される型は `src/gen/models`（`GetPetById.ts` / `Pet.ts`）にある。`.kubb` ディレクトリは共有のクライアント・シリアライズ用ヘルパーを保持する。

## 5. 変更後に再生成する

`petStore.yaml` の `Pet` スキーマに `tag`（`type: string`）プロパティを `id` / `name` と並べて追加し、`npx kubb generate` を再実行する。`src/gen/models/Pet.ts` に、`required` に無いため省略可能な `tag` フィールドが加わる。クライアントは再生成された型を import し続ける。

## 次のステップ

- 生成された Axios クライアントの呼び出し方・`baseURL` の設定（plugin-guides の axios 系ページ）
- 構成ごとの設定（[recipes.md](./recipes.md)）
- 追加プラグイン（React Query、Zod 等）の探索

## Notes

- The official tutorial is now named "quickstart" (docs 5.x tutorials/quickstart, "Generate your first client"). The same content is summarized in [quick-start.md](../getting-started/quick-start.md)
- v5: `input` takes the path directly (`input: { path }` fails with `KUBB_LEGACY_INPUT`), `defineConfig` is imported from `kubb/config`, and `pluginOas()` is no longer used. The tutorial generates an Axios client with `@kubb/plugin-axios` rather than types only
- 旧版チュートリアルの `@kubb/cli` / `@kubb/core` / `@kubb/plugin-oas` を使う設定は v5 では不要

## Related

- [quick-start](../getting-started/quick-start.md)
- [recipes](./recipes.md)
- [migration-guide](./migration-guide.md)
