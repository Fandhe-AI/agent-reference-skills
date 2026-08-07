# Printer の上書き

Printer はパイプラインの終端ではなく、Plugin の Generator 内部で動作する。[Adapter](../adapters/adapter-oas.md) が仕様を [AST](./ast.md) に変換し、[Macro](./macros.md) がノードを書き換え、Printer が各 schema ノードを 1 つの出力対象向けのコードへ変換する。`@kubb/plugin-ts` は TypeScript の型ノードを印字し、`@kubb/plugin-zod` は Zod 式を印字し、`@kubb/plugin-faker` は Faker 式を印字する。組み立てられたファイルをソーステキストへ変換するのは依然として Parser の役目で、その後 Storage がディスクへ書き込み、CLI の formatter・linter・`postGenerate` コマンドが続く。

これら 3 つの Plugin は `printer.nodes` オプションとして、schema 型からハンドラーへの部分マップを公開する。ハンドラーは 1 つの schema 型についての標準出力を置き換えるため、`date` schema を JavaScript の `Date` オブジェクトとして印字したり、Plugin をフォークせずに全ての Zod object へ `.openapi(...)` を追加したりできる。

## 形

マップは schema の判別用 `type`（`'string'`・`'integer'`・`'date'`・`'enum'`・`'object'` 等）をキーにする。置き換えたいハンドラーだけを渡せば、残りは標準搭載のハンドラーが埋める。

```typescript
type PrinterNodes = Partial<{
  [K in SchemaType]: (this: Context, node: SchemaNodeByType[K]) => Output | null
}>
```

ハンドラーは `this` context 付きで実行されるため、アロー関数ではなく通常の関数として書く。`this.transform(node)` はネストした schema ノードへ、上書きを含む全ハンドラーマップ経由で再帰する。`this.base(node)` は上書き元の標準ハンドラーを実行するため、出力を作り直さずにラップできる。`this.options` は `@kubb/plugin-ts` の `arrayType` のような、解決済みの Printer オプションを読む。

## TypeScript の型

`@kubb/plugin-ts` は TypeScript の AST ノードを構築するため、ハンドラーはコンパイラのファクトリで作成した `ts.TypeNode` を返す。この例は `date` schema を `string` の代わりに JavaScript の `Date` オブジェクトとして印字する。

```typescript
import ts from 'typescript'
import { pluginTs } from '@kubb/plugin-ts'

pluginTs({
  printer: {
    nodes: {
      date() {
        return ts.factory.createTypeReferenceNode('Date', [])
      },
    },
  },
})
```

## Zod schema

`@kubb/plugin-zod` は式文字列を印字するため、ハンドラーは Zod のコードを文字列で返す。`mini: true` を指定すると同じ上書きが Zod Mini Printer を対象にする。

```typescript
import { pluginZod } from '@kubb/plugin-zod'

pluginZod({
  printer: {
    nodes: {
      date() {
        return 'z.iso.date()'
      },
    },
  },
})
```

`this.base` を使うと標準出力を保ったまま装飾できる。この例は全ての object schema に `.openapi(...)` を追加し、ネストしたノードは通常のハンドラーで印字され続ける。

```typescript
import { pluginZod } from '@kubb/plugin-zod'

pluginZod({
  printer: {
    nodes: {
      object(node) {
        return `${this.base(node)}.openapi(${JSON.stringify({ description: node.description })})`
      },
    },
  },
})
```

## Faker モック

`@kubb/plugin-faker` も文字列を印字し、schema ノードごとに 1 つの Faker 式を出力する。この例は仕様が integer を宣言する箇所で float を生成する。

```typescript
import { pluginFaker } from '@kubb/plugin-faker'

pluginFaker({
  printer: {
    nodes: {
      integer() {
        return 'faker.number.float()'
      },
    },
  },
})
```

## Printer の上書きか Macro か

Macro はノードそのものを、印字される前に書き換える。Macro と `plugin-ts` で `integer` schema を `string` に retype すれば、`plugin-ts`・`plugin-zod`・`plugin-faker` はすべて書き換えられたノードを印字するため追従する。Printer の上書きは 1 つの Plugin がそのノード型に対して出力するものだけを変更し、ノード自体や他の Plugin の出力には影響しない。

出力を別の schema ノードとして表現できない場合は Printer の上書きを選ぶ。どの schema ノードも `Date` としては印字されず、`.openapi(...)` 呼び出しも持たないため、Macro ではどちらも生成できない。印字されるコード自体は問題なく、その名前やファイル位置だけを変えたい場合は [Resolver](./resolver-customization.md) を選ぶ。

両者は組み合わせられる。同一 Plugin の `macros` オプションが先にノードを書き換え、その後 Printer が（上書きを含めて）結果を印字する。

## Notes

- Macro との使い分けは上記「Printer の上書きか Macro か」を参照。命名・パスの変更は [resolver-customization.md](./resolver-customization.md) を使う

## Related

- [macros](./macros.md)
- [ast](./ast.md)
- [resolver-customization](./resolver-customization.md)
