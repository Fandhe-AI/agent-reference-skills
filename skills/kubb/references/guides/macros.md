# Macro の作成

Macro は Kubb の [AST](./ast.md) に対する、名前付きで合成可能な変換。Adapter が生成する schema・operation ノードを Generator がコードを印字する前に書き換える。これにより Adapter や Generator をフォークせずに、シンボルのリネーム・フィールドの型変更・メタデータの削除・形状の正規化ができる。Macro は共有された AST 上で動作するため、同じ Macro が全ての入力 Adapter（OpenAPI、AsyncAPI、JSON Schema）と全ての出力対象（TypeScript、Zod、任意の [Printer](./printers.md)）で動作する。

エンジン（`defineMacro`、`composeMacros`、`applyMacros`、`Macro` 型）は `kubb/kit` の `ast` namespace に、変換対象のノードツリーと並んで含まれる。標準搭載の Macro プリセットは `kubb/kit` 自体の named export。

## 形

Macro は visitor のノード種別ごとのコールバックに加え、`name`・任意の `enforce` 順序・任意の `match` 述語を持つ。

```typescript
type Macro = {
  name: string
  enforce?: 'pre' | 'post'
  match?: (node: Node) => boolean
  schema?(node: SchemaNode, context): SchemaNode | null | undefined
  operation?(node: OperationNode, context): OperationNode | null | undefined
  // input, output, property, parameter, response
}
```

各コールバックは置き換え後のノードを返すか、ノードに変更を加えない場合は `undefined` を返す。何も変更しない Macro は元の参照をそのまま返すため、変更のないツリーは再構築されず再利用される。

## Macro を書く

`defineMacro` は Macro に型を付け、`definePlugin` が Plugin に対して行うのと同様に定義を 1 箇所にまとめる。

```typescript
import { ast } from 'kubb/kit'

const macroIntegerToString = ast.defineMacro({
  name: 'integer-to-string',
  schema(node) {
    return node.type === 'integer' ? { ...node, type: 'string' } : undefined
  },
})
```

`match` 述語は関心のないノードに対して Macro をスキップし、`enforce` は無指定の Macro より前・後に配置する。

```typescript
import { ast } from 'kubb/kit'

const macroUntagged = ast.defineMacro({
  name: 'untagged',
  enforce: 'post',
  match: (node) => node.kind === 'Operation',
  operation(node) {
    return node.tags?.length ? undefined : { ...node, tags: ['untagged'] }
  },
})
```

## Macro の合成

Plugin は Macro のリストを実行する。順に適用されるため、後の Macro は前の Macro の出力を見る。`composeMacros` はリストを 1 つの visitor に畳み込み、`applyMacros` はそのリストをツリーに対して実行する。

```typescript
import { ast } from 'kubb/kit'

const macroDto = ast.defineMacro({
  name: 'dto',
  schema(node) {
    return node.type === 'object' ? { ...node, name: node.name ? `${node.name}Dto` : node.name } : undefined
  },
})

const macroFetchPrefix = ast.defineMacro({
  name: 'fetch-prefix',
  operation(node) {
    return { ...node, operationId: node.operationId.replace(/^get/, 'fetch') }
  },
})

const root = ast.factory.createInput({ schemas: [], operations: [] })
const next = ast.applyMacros(root, [macroDto, macroFetchPrefix])
```

## Plugin での Macro 利用

Plugin の `macros` オプション経由で渡すか、`kubb:plugin:setup` から `addMacro`・`setMacros` で登録する。Macro は Plugin ごとに実行されるため、ある Plugin の Macro が他の Plugin が見るノードを変えることはない。

```typescript
import { ast, definePlugin } from 'kubb/kit'

const macroDropDescriptions = ast.defineMacro({
  name: 'drop-descriptions',
  schema(node) {
    return 'description' in node && node.description ? { ...node, description: undefined } : undefined
  },
})

export const pluginRename = definePlugin(() => ({
  name: 'plugin-rename',
  hooks: {
    'kubb:plugin:setup'(ctx) {
      ctx.addMacro(macroDropDescriptions)
    },
  },
}))
```

Macro は Resolver のオプションが計算される前に実行される。したがってリネームされた `operationId` や `SchemaNode.name` は `resolveOptions`・`resolvePath`・`resolveFile` に反映される。

Macro は純粋に保つこと。AST は参照共有されるため、入力を mutate せず新しいノードを構築して返す。

schema をリネームする際、宣言の `name` だけを変更してはいけない。それを指す全ての `$ref` は旧名を解決したままになり、import と印字済み参照が Plugin がもう出力しないファイルを指してしまう。`macroRenameSchema` を使えば、宣言のリネームと ref の retarget を 1 回のパスで行える。

## 標準搭載 Macro

Kubb はどの Adapter でも適用できる共通の schema 正規化用 Macro を標準搭載する。通常の Macro と同様に import し、自作のものと合成できる。

- `macroSimplifyUnion` — より広いメンバーが既にカバーしている union メンバーを削除する（例: 複数値の string enum の隣にある plain `string`）。単一値 enum は型を絞り込むため残る
- `macroDiscriminatorEnum` — discriminator プロパティを許可値の string enum へ書き換える。オプションを読むため、呼び出して Macro を構築する
- `macroEnumName` — inline enum に、それが属する schema とプロパティから名前を付ける。オプションを読むため、呼び出して Macro を構築する
- `macroRenameSchema` — schema を一貫してリネームする。宣言の `name` を変更し、旧名を指すすべての ref に `targetName` を刻印するため、`resolveRefName` と `resolver.imports` がどこでも新名を出力する

```typescript
import { ast, macroSimplifyUnion, macroDiscriminatorEnum, macroRenameSchema } from 'kubb/kit'

const root = ast.factory.createInput({ schemas: [], operations: [] })
const next = ast.applyMacros(root, [
  macroSimplifyUnion,
  macroDiscriminatorEnum({ propertyName: 'kind', values: ['cat', 'dog'] }),
  macroRenameSchema({ from: 'Order', to: 'StoreOrder' }),
])
```

他の Plugin の出力を import する Plugin は、自分が見るノードから名前を計算する。そのため schema に触れる全ての Plugin に対して rename を登録する必要がある（例: 1 つの共有 `macros` 配列を各 Plugin のオプションに渡す）。

## Macro の共有

Macro はただの値なので、export して必要な場所で import できる。関連する Macro を 1 つのモジュールにまとめ、Plugin と同様に任意の Plugin・プロジェクトへ取り込める。

## Notes

- Macro と [Printer](./printers.md) の使い分けは printers.md の「Printer override or macro」セクションを参照
- Macro は AST の 2 回目のパスとして [architecture.md](./architecture.md) のパイプラインに位置づけられる

## Related

- [ast](./ast.md)
- [printers](./printers.md)
- [architecture](./architecture.md)
- [concepts-plugins](./concepts-plugins.md)
