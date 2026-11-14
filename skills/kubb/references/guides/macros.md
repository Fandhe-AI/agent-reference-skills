# Macro の作成

Macro は Kubb の [AST](./ast.md) に対する、名前付きで合成可能な変換。Adapter が生成する schema・operation ノードを Generator がコードを印字する前に書き換える。シンボルのリネーム・フィールドの型変更・メタデータの削除を、出力対象をまたいで行える。Macro は共有された AST 上で動作するため、同じ Macro が全ての入力 Adapter と全ての出力対象（TypeScript、Zod、任意の [Printer](./printers.md)）で動作する。

`defineMacro` は `kubb/kit` から import する。Macro を適用するエンジン `ast.macro.apply` は同じパッケージの `ast` にある。コールバックのシグネチャとコンテキストの各プロパティは AST リファレンス（`reference/kit/ast` の Macros）を参照。

## Signature / Usage

Macro は `name` とノード種別ごとのコールバック（`schema` / `operation` 等）を持つ。コールバックは置き換え後のノードを返すか、そのままにする場合は `undefined` を返す。

```typescript
import { defineMacro } from 'kubb/kit'

const macroIntegerToString = defineMacro({
  name: 'integer-to-string',
  schema(node) {
    return node.type === 'integer' ? { ...node, type: 'string' } : undefined
  },
})
```

`match` 述語は関心のないノードに対して Macro をスキップし、`enforce` は無指定の Macro より前・後に配置する。

```typescript
import { defineMacro } from 'kubb/kit'

const macroUntagged = defineMacro({
  name: 'untagged',
  enforce: 'post',
  match: (node) => node.kind === 'Operation',
  operation(node) {
    return node.tags?.length ? undefined : { ...node, tags: ['untagged'] }
  },
})
```

### Plugin での Macro 利用

Plugin の `macros` オプション経由で渡すか、`setup` から `addMacro`・`setMacros` で登録する。Macro は Plugin ごとに実行されるため、ある Plugin の Macro が他の Plugin が見るノードを変えることはない。

```typescript
import { defineExtension, defineMacro } from 'kubb/kit'

const macroDropDescriptions = defineMacro({
  name: 'drop-descriptions',
  schema(node) {
    return 'description' in node && node.description ? { ...node, description: undefined } : undefined
  },
})

export const pluginRename = defineExtension({
  kind: 'plugin',
  meta: { name: 'plugin-rename' },
  setup(options, kubb) {
    kubb.addMacro(macroDropDescriptions)
    return options
  },
})
```

Macro は Resolver が何かを命名する前に実行される。したがってリネームされた `operationId` や `SchemaNode.name` は生成される名前・パス・ファイルに反映される。

Macro は純粋に保つこと。全 Plugin が同じ AST ノードを共有するため、入力を mutate せず新しいノードを構築して返す。

### schema のリネーム

宣言の `name` だけを変更してはいけない。そのスキーマを指す全ての `$ref` は旧名を解決したままになり、import と印字済み参照が Plugin がもう出力しないファイルを指してしまう。宣言のリネームと、それを指す全 ref への `targetName` 設定を 1 つの Macro で行い、その schema を読む全 Plugin に登録する。

次の Macro をプロジェクトへコピーして使う。宣言と、それを指す全 ref を 1 回のパスでリネームする。

```typescript
import { ast, defineMacro } from 'kubb/kit'

export function macroRenameSchema({ from, to }: { from: string; to: string }) {
  return defineMacro({
    name: 'rename-schema',
    schema(node) {
      const refNode = ast.schema.narrow(node, 'ref')

      if (!refNode) {
        return node.name === from ? { ...node, name: to } : undefined
      }

      // A ref node can be the renamed schema's own declaration, a pointer to it, or both at once.
      const renamesDeclaration = refNode.name === from
      const renamesTarget = ast.ref.getName(refNode) === from
      if (!renamesDeclaration && !renamesTarget) return undefined

      return {
        ...refNode,
        ...(renamesDeclaration ? { name: to } : {}),
        ...(renamesTarget ? { targetName: to } : {}),
      }
    },
  })
}
```

Plugin 間で名前と import を一致させるため、その schema を読む全 Plugin へ共有の `macros` 配列を 1 つ渡す。

```typescript
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginZod } from '@kubb/plugin-zod'
import { macroRenameSchema } from './macroRenameSchema.ts'

const macros = [macroRenameSchema({ from: 'Order', to: 'StoreOrder' })]

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  plugins: [pluginTs({ macros }), pluginZod({ macros })],
})
```

### 標準搭載 Macro

`kubb/kit` は一般的な正規化用の Macro を export する。Plugin の `macros` オプションで自作のものと組み合わせる。各 Macro の内容は AST リファレンスの built-in macros 表を参照。

```typescript
import { ast, macroDedupeUnion, macroDiscriminatorEnum } from 'kubb/kit'

const root = ast.factory.createInput({ schemas: [], operations: [] })
const next = ast.macro.apply(root, [macroDedupeUnion, macroDiscriminatorEnum({ propertyName: 'kind', values: ['cat', 'dog'] })])
```

Macro を共有モジュールから export すれば、Plugin・プロジェクト間で再利用できる。

## Notes

- Source: https://kubb.dev/docs/5.x/how-to/macros (docs/5.x/how-to/macros.md of kubb@5.20.0, retrieved 2026-11-14)
- Migration (5.11 → 5.20): `ast.defineMacro` is deprecated in favor of `defineMacro` from `kubb/kit`, and the macro engine `ast.applyMacros` moved to `ast.macro.apply` (deprecated in 5.18.6; Kubb v6 removes the old names). `ast.composeMacros` was removed in 5.15.2 (changelog v5.18.6 / v5.15.2)
- Migration (5.11 → 5.20): `macroSimplifyUnion` was renamed to `macroDedupeUnion` (5.16.0; the old name stays as a deprecated alias until the next major), and `macroRenameSchema` was removed from `kubb/kit` in 5.15.2, so copy the source shown above into the project (changelog v5.16.0 / v5.15.2)
- The plugin example uses `defineExtension({ kind: 'plugin' })` with `kubb.addMacro(...)` in `setup`; `definePlugin` is deprecated. The `match` / `enforce` shape and the callback context are documented in [ast.md](../kit/ast.md)
- Macro と [Printer](./printers.md) の使い分けは printers.md の「Printer override or macro」セクションを参照
- Macro は AST の 2 回目のパスとして [architecture.md](./architecture.md) のパイプラインに位置づけられる

## Related

- [ast](./ast.md)
- [printers](./printers.md)
- [architecture](./architecture.md)
- [concepts-plugins](./concepts-plugins.md)
