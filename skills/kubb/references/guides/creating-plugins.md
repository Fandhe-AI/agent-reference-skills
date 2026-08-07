# カスタムプラグインの作成

Plugin は Kubb に新しい生成対象を教える拡張機能。出力フォルダとファイル命名を所有し、AST を走査する Generator を実行し、ビルドライフサイクルにフックする。すべて `kubb/kit` とその `kubb/kit/testing` サブパスから利用する。

## 前提条件

- Node.js 22 以上と pnpm（または npm/yarn）
- TypeScript の知識
- 有効な設定を持つ Kubb プロジェクト
- [concepts-plugins.md](./concepts-plugins.md) を先に読んでおくこと

## クイックスタート

Plugin は `kubb/kit` の `definePlugin` で構築するファクトリ関数。`name` 文字列と `hooks` マップを持つオブジェクトを返す。`kubb:plugin:setup` フックで Generator と Resolver をビルドへ配線する。

```typescript
import { ast, definePlugin, defineGenerator } from 'kubb/kit'

const helloGenerator = defineGenerator({
  name: 'hello-generator',
  operation(node, ctx) {
    return [
      ast.factory.createFile({
        baseName: `${node.operationId}.ts`,
        path: `${ctx.root}/${node.operationId}.ts`,
        sources: [
          ast.factory.createSource({
            nodes: [ast.factory.createText(`// ${node.method} ${node.path}\n`)],
          }),
        ],
      }),
    ]
  },
})

export const pluginHello = definePlugin(() => ({
  name: 'plugin-hello',
  hooks: {
    'kubb:plugin:setup'(ctx) {
      ctx.addGenerator(helloGenerator)
    },
  },
}))
```

`kubb.config.ts` へ配線:

```typescript
import { defineConfig } from 'kubb/config'
import { pluginHello } from './my-plugin.ts'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  plugins: [pluginHello()],
})
```

```shell
kubb generate
```

## プロジェクトレイアウト

公式の Kubb Plugin はすべて同じレイアウトを使う。関心事ごとに 1 フォルダ: `generators/`・`resolvers/`・`components/`・`templates/`。参照実装は `@kubb/plugin-axios`。

`@kubb/plugin-axios` では、`src/index.ts` が各 Generator・Resolver・Plugin ファクトリを名前付きで re-export する。`src/plugin.ts` は `pluginAxiosName satisfies PluginAxios['name']` 定数を宣言し、他の Plugin がそれを参照する。

## 命名規則

| 対象 | パターン | 例 |
|---|---|---|
| npm パッケージ（公式） | `@kubb/plugin-<name>` | `@kubb/plugin-ts` |
| npm パッケージ（コミュニティ） | `kubb-plugin-<name>` | `kubb-plugin-example` |
| ランタイム Plugin 名 | `plugin-<name>`（kebab-case、小文字） | `'plugin-example'` |
| ファクトリ export | `plugin<Name>`（camelCase） | `pluginExample` |
| 名前定数 | `plugin<Name>Name` | `pluginExampleName` |

`satisfies` で型付き name 定数を export すると、他の Plugin がタイプミスなく参照できる:

```typescript
import type { Plugin } from 'kubb/kit'

export const pluginExampleName = 'plugin-example' satisfies Plugin['name']
```

コミュニティパッケージは `kubb-plugin-<name>` を使う。`@kubb/plugin-*` namespace は公式 Kubb Labs パッケージ専用。

## Plugin の構造

読む順に: option 型 → 実処理を行う Generator と Resolver → それらを配線する Plugin → export する barrel。

```typescript [src/types.ts]
import type { PluginFactoryOptions } from 'kubb/kit'

export interface PluginExampleOptions {
  filename?: string
  generateIndex?: boolean
}

export type PluginExample = PluginFactoryOptions<'plugin-example', PluginExampleOptions, Required<PluginExampleOptions>>
```

```typescript [src/generators/exampleGenerator.ts]
import { ast, defineGenerator } from 'kubb/kit'
import type { PluginExample } from '../types'

export function createExampleGenerator(filename: `${string}.${string}`, generateIndex: boolean) {
  const collected: string[] = []

  return defineGenerator<PluginExample>({
    name: 'example-generator',
    operation(node, ctx) {
      collected.push(node.operationId)
      return [
        ast.factory.createFile({
          baseName: `${node.operationId}.ts`,
          path: `${ctx.root}/${node.operationId}.ts`,
          sources: [
            ast.factory.createSource({
              nodes: [ast.factory.createText(`// ${node.method} ${node.path}\n`), ast.factory.createText(`export const operationId = '${node.operationId}'\n`)],
            }),
          ],
        }),
      ]
    },
    async operations(_nodes, ctx) {
      if (!generateIndex) return
      return [
        ast.factory.createFile({
          baseName: filename,
          path: `${ctx.root}/${filename}`,
          sources: [
            ast.factory.createSource({
              nodes: [ast.factory.createText(`export const operations = ${JSON.stringify(collected)}\n`)],
            }),
          ],
        }),
      ]
    },
  })
}
```

```typescript [src/resolvers/resolverExample.ts]
import { createResolver } from 'kubb/kit'
import type { PluginExample } from '../types'

export const resolverExample = createResolver<PluginExample>({
  pluginName: 'plugin-example',
})
```

```typescript [src/plugin.ts]
import { definePlugin } from 'kubb/kit'
import type { Plugin } from 'kubb/kit'
import type { PluginExample } from './types'
import { createExampleGenerator } from './generators/exampleGenerator'
import { resolverExample } from './resolvers/resolverExample'

export const pluginExampleName = 'plugin-example' satisfies Plugin['name']

export const pluginExample = definePlugin<PluginExample>((options) => {
  const filename = (options?.filename ?? 'operations.ts') as `${string}.${string}`
  const generateIndex = options?.generateIndex ?? true

  return {
    name: pluginExampleName,
    hooks: {
      'kubb:plugin:setup'(ctx) {
        ctx.setResolver(resolverExample)
        ctx.addGenerator(createExampleGenerator(filename, generateIndex))
        ctx.setOptions({ filename, generateIndex })
      },
    },
  }
})
```

## Generators

Generator は Adapter が生成した AST を走査し `FileNode` を出力する。`kubb:plugin:setup` 内で `ctx.addGenerator` により登録する。各 Generator は 3 種のハンドラーを任意の組み合わせで実装できる。

| ハンドラー | 呼ばれるタイミング | 戻り値の型 |
|---|---|---|
| `schema` | AST 内の各 `SchemaNode` ごと | `Array<FileNode>`、element、または `null`/`undefined` |
| `operation` | AST 内の各 `OperationNode` ごと | `Array<FileNode>`、element、または `null`/`undefined` |
| `operations` | operation 走査後に全 `OperationNode` を対象に 1 度 | `Array<FileNode>`、element、または `null`/`undefined` |

各ハンドラーはこれらの Promise を返してもよい。

### Emit 経路

ほとんどの Generator は `kubb/kit` の `create*` ファクトリ（`ast.factory`）で構築した `Array<FileNode>` を返す（デフォルト）。他に 2 つの経路がある:

- Printer が 1 つの `SchemaNode` を文字列（TypeScript の型や `z.object({ ... })` 等）にレンダリングし、ハンドラーがそれを `FileNode` にステージする
- `renderer: jsxRenderer` を設定し element を返すと、Renderer が JSX を `FileNode` に変換する

シリアライズ自体は Generator の責務ではない。全 Plugin が完了すると、対応する Parser が各 `FileNode` を最終文字列として書き出す。

## Resolvers

Resolver は Plugin のファイル名・出力パスを決定する。他の Plugin は `ctx.getResolver('plugin-example')` を呼び、パスをハードコードせずにこれらの名前を再利用する。

```typescript [src/resolvers/resolverExample.ts]
import { createResolver } from 'kubb/kit'
import type { PluginFactoryOptions, Resolver } from 'kubb/kit'

type PluginExample = PluginFactoryOptions<'plugin-example', object, object, Resolver>

export const resolverExample = createResolver<PluginExample>({
  pluginName: 'plugin-example',
  name(name) {
    return `Example${this.default.name(name)}`
  },
  file: {
    baseName({ name, extname }) {
      return `${this.name(name)}${extname}`
    },
  },
})
```

利用者は `kubb.config.ts` の `resolver` オプション経由で Plugin の Resolver を上書きする。詳細は [resolver-customization.md](./resolver-customization.md) を参照。

## Setup context

`kubb:plugin:setup` は Plugin をビルドへ配線する `KubbPluginSetupContext` を受け取る。

| メソッド / プロパティ | 用途 |
|---|---|
| `addGenerator` | AST 走査用に Generator を 1 つ以上登録する |
| `setResolver` | Resolver（ファイル命名・パス）を設定・上書きする |
| `addMacro` | Generator の前に AST ノードを書き換える macro を追加する |
| `setMacros` | この Plugin の macro リストを新しいものへ置き換える |
| `setOptions` | 解決済みオプションをビルドループへ渡す |
| `injectFile` | Generator を経由せず生の `UserFileNode` をビルドへ注入する |
| `config` | setup 時点の解決済み `Config` |
| `options` | 利用者が指定した Plugin オプション |

`copy` を絶対パスに設定すると、Kubb はそのファイルをそのまま出力へ書き込む（`banner`/`footer` のみ適用し Parser はスキップ）。手書きテンプレートを、インライン文字列ではなく実在の `.ts` ファイルとして保持できる。

## Options

`PluginFactoryOptions` は Plugin 名・利用者向けオプション・解決済みオプションを結びつける。この型が `definePlugin`・`defineGenerator`・Resolver を通じて流れ、3 者を同期させる。

## Testing

`kubb` の `createKubb` でインプロセスビルドを実行し、Generator が期待通りのファイルを出力するか検証する。小さな OpenAPI フィクスチャと組み合わせるとテストが高速かつ予測可能になる。

`createKubb` はデフォルトの Adapter・Parser を適用しないため、`adapter: adapterOas()` と Generator が出力する Parser を渡す（`kubb` パッケージの `defineConfig` がこれらを自動配線する）。Adapter を渡さない場合 Kubb は plugin-only モードで動作し、`operation`・`schema` ハンドラーは発火しない。

```typescript [plugin.test.ts]
import { describe, it, expect } from 'vitest'
import { createKubb } from 'kubb'
import { ast, definePlugin, defineGenerator } from 'kubb/kit'
import { adapterOas } from '@kubb/adapter-oas'
import { parserTs } from '@kubb/parser-ts'

describe('pluginExample', () => {
  it('emits one file per operation', async () => {
    const kubb = createKubb({
      input: './test/fixtures/petStore.yaml',
      output: { path: './dist/test' },
      adapter: adapterOas(),
      parsers: [parserTs()],
      plugins: [pluginExample()],
    })

    const { files } = await kubb.build()
    expect(files.length).toBeGreaterThan(0)
  })
})
```

`build()` を呼ぶ前に `kubb.hooks` を購読すると、Plugin の活動をトレースしたりメトリクスを収集できる。

## 公開

`kubb` を peerDependency として v5 に固定し、ランタイムをバンドルへ含めない。ローカルビルド・型チェック・`createKubb` を呼ぶテストのために `devDependencies` にも列挙する。

公開前チェックリスト:

- export された TypeScript の型がエラーなくコンパイルされる
- 公開 API に JSDoc コメントが付いている
- README にインストールと使い方が書かれている
- 全テストが通過する
- バージョンが Semantic Versioning に従う

```shell
npm login
npm publish --access public
```

## 実例

kubb-labs/plugins リポジトリに、これらの規約に従った公式 Plugin が公開されている。

### Extending an existing plugin

`dependencies` を宣言すると、他の Plugin の後に実行される順序を制御できる。Kubb は起動時に不足している依存を検証しない。順序付け時は静かに無視し、エラーは Generator が `ctx.requirePlugin('plugin-ts')` を呼んだ時点で初めて表面化する（要求元の Plugin 名を含む例外を投げる）:

```typescript
import { ast, definePlugin, defineGenerator } from 'kubb/kit'

export const pluginCustom = definePlugin(() => ({
  name: 'plugin-custom',
  dependencies: ['plugin-ts'],
  hooks: {
    'kubb:plugin:setup'(ctx) {
      ctx.addGenerator(
        defineGenerator({
          name: 'custom-generator',
          operation(node, genCtx) {
            const resolver = genCtx.getResolver('plugin-ts')
            const name = resolver.name(node.operationId)
            return [
              ast.factory.createFile({
                baseName: `${name}.custom.ts`,
                path: `${genCtx.root}/${name}.custom.ts`,
                sources: [ast.factory.createSource({ nodes: [ast.factory.createText(`// extends ${name}\n`)] })],
              }),
            ]
          },
        }),
      )
    },
  },
}))
```

## Notes

- Generator・Resolver の概念的な役割は [generators.md](./generators.md)・[resolvers.md](./resolvers.md) を参照
- 命名・パスのカスタマイズだけが目的なら、独自 Plugin ではなく [resolver-customization.md](./resolver-customization.md) を使う方が簡潔

## Related

- [concepts-plugins](./concepts-plugins.md)
- [generators](./generators.md)
- [resolvers](./resolvers.md)
- [resolver-customization](./resolver-customization.md)
