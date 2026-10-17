# カスタムプラグインの作成

`listPets.ts` に 1 つの API operation の method と path を書き出すプラグインを作成し、テストする（Kubb 5.11.0 / docs 5.x tutorials/creating-plugins に準拠。旧パスから `/docs/5.x/tutorials/creating-plugins` へ移動）。Node.js 22.12 以上・npm・TypeScript の知識が必要。すべての作成 API は `kubb` に含まれる `kubb/kit` から利用する。

## 手順

### 1. プロジェクトを作成する

```shell
mkdir kubb-first-plugin
cd kubb-first-plugin
npm init -y
npm pkg set type=module
npm install -D kubb typescript @types/node vitest
mkdir src
```

### 2. 仕様を追加する

プロジェクトルートに `petStore.yaml` を作成する（`GET /pets`、`operationId: listPets`、`200` レスポンスのみの最小仕様）。

### 3. プラグインを作成する

`defineExtension`（`kind: 'plugin'`）は `meta` と `setup` 関数を取る。`setup` 内で `setResolver` / `addGenerator` の composable を使って generator と resolver を登録し、プラグインのオプションを返す。

```typescript
import { addGenerator, ast, createResolver, defineExtension, defineGenerator, setResolver } from 'kubb/kit'

const resolver = createResolver({ pluginName: 'plugin-example' })

const operationsGenerator = defineGenerator({
  name: 'operation-comments',
  operation(node, ctx) {
    const name = ctx.resolver.name(node.operationId)
    return [
      ast.factory.createFile({
        baseName: `${name}.ts`,
        path: `${ctx.root}/${name}.ts`,
        sources: [
          ast.factory.createSource({
            nodes: [ast.factory.createText(`// ${node.method} ${node.path}\n`)],
          }),
        ],
      }),
    ]
  },
})

export const pluginExample = defineExtension({
  kind: 'plugin',
  meta: { name: 'plugin-example', version: '1.0.0' },
  setup(options) {
    setResolver(resolver)
    addGenerator(operationsGenerator)
    return options
  },
})
```

`operation` ハンドラーは operation の HTTP method と path を含むコメントを書き出す。

### 4. 生成する

```typescript
import { defineConfig } from 'kubb/config'
import { pluginExample } from './src/plugin'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  plugins: [pluginExample()],
})
```

```shell
npx kubb generate
```

`src/gen/listPets.ts` に `GET` と `/pets` を示すコメントが入る。

### 5. 出力をテストする

メモリストレージと小さなフィクスチャでインプロセスビルドを実行する。`kubb` の `createKubb` は `defineConfig` と同じ adapter・parser の既定値を供給する。

```typescript
import { describe, expect, it } from 'vitest'
import { createKubb } from 'kubb'
import { memoryStorage } from 'kubb/kit'
import { pluginExample } from './plugin'

const input = {
  openapi: '3.0.3',
  info: { title: 'Pets', version: '1.0.0' },
  paths: {
    '/pets': {
      get: {
        operationId: 'listPets',
        responses: { '200': { description: 'A list of pets' } },
      },
    },
  },
}

describe('pluginExample', () => {
  it('emits an operation comment', async () => {
    const { files, storage } = await createKubb({
      input,
      output: { path: './gen' },
      storage: memoryStorage(),
      plugins: [pluginExample()],
    }).build()

    const file = files.find((file) => file.baseName === 'listPets.ts')
    expect(file).toBeDefined()
    expect(await storage.readItem(file!.path)).toContain('/pets')
  })
})
```

```shell
npx vitest run src/plugin.test.ts
```

## Notes

- 5.11.0 のチュートリアルは `defineExtension` と composable（`setResolver` / `addGenerator`）を使う。旧版ページの `definePlugin(() => ({ name, hooks: { 'kubb:plugin:setup'(ctx) { ... } } }))` 形式は動作するが非推奨（`@kubb/kit` README）。setup context の詳細は [plugins.md](../kit/plugins.md) を参照
- 旧版ページの命名規則（公式 `@kubb/plugin-<name>`、コミュニティ `kubb-plugin-<name>`、ランタイム名 `plugin-<name>`）・プロジェクトレイアウト・依存宣言（`dependencies`）の記述は 5.11.0 のチュートリアルに無い。依存は plugin 名をキーとするレコードで宣言し、必須の依存が欠けると `KUBB_MISSING_DEPENDENCY` でビルドが失敗する（[overview.md](../plugins/overview.md)）
- 公開は [publish-a-plugin.md](./publish-a-plugin.md)、レジストリへの申請は [submit-to-the-registry.md](./submit-to-the-registry.md) を参照
- Generator・Resolver の概念的な役割は [generators.md](./generators.md)・[resolvers.md](./resolvers.md) を参照
- 命名・パスのカスタマイズだけが目的なら、独自プラグインではなく [resolver-customization.md](./resolver-customization.md) を使う方が簡潔

## Related

- [concepts-plugins](./concepts-plugins.md)
- [generators](./generators.md)
- [resolvers](./resolvers.md)
- [resolver-customization](./resolver-customization.md)
- [publish-a-plugin](./publish-a-plugin.md)
- [submit-to-the-registry](./submit-to-the-registry.md)
