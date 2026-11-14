# plugin-ts: Customization

生成される型をカスタマイズする。TypeScript の名前に prefix を付ける、schema 型の出力を変える、description を削除する。

## Signature / Usage

[TypeScript plugin の設定例](https://kubb.dev/extensions/kubb-labs/plugin-ts#example)から始め、その `pluginTs()` に以下を適用する。

### Prefix type names

プラグインの PascalCase ルールを保つため、prefix を付ける前に `resolverTs.name` を使う:

```typescript
import { pluginTs, resolverTs } from '@kubb/plugin-ts'

pluginTs({
  resolver: {
    name(name) {
      return 'Api' + resolverTs.name(name)
    },
  },
})
```

生成される `Pet` は `ApiPet` になる。ファイルリゾルバーもカスタマイズしない限りファイル名は変わらない。

### Map schema types

[printer handler](https://kubb.dev/extensions/kubb-labs/plugin-ts/options#printer) を自前のものに置き換える。各 handler は TypeScript の型を文字列で返す:

```typescript
import { pluginTs } from '@kubb/plugin-ts'

pluginTs({
  printer: {
    nodes: {
      date() {
        return 'Date'
      },
      integer() {
        return 'bigint'
      },
    },
  },
})
```

`date` フィールドを `Date` に、`int32` 整数を `bigint` に対応付ける。

### Remove descriptions

[macro](https://kubb.dev/docs/5.x/reference/plugin-options#macros) で schema の description を消す:

```typescript
import { pluginTs } from '@kubb/plugin-ts'
import { defineMacro } from 'kubb/kit'

const dropDescriptions = defineMacro({
  name: 'drop-descriptions',
  schema(node) {
    return 'description' in node && node.description
      ? { ...node, description: undefined }
      : undefined
  },
})

pluginTs({ macros: [dropDescriptions] })
```

## Notes

- `int64` フィールドは別の `bigint` handler が制御し、既定で既に `bigint`。`date-time` フィールドは `datetime` handler を使う
- 生成型から description の JSDoc が消える。OpenAPI ドキュメントは変わらない。同じ macro は `pluginZod` でも使える（例外あり。zod-customization の Remove descriptions を参照）
- コンパイラーノードを返す handler は deprecated で次のメジャーで削除。`@kubb/parser-ts` と `typescript` 5 / 6（TypeScript 7 では `@typescript/typescript6`）が入っていれば動作し（いずれも optional peer dependency）、`@kubb/parser-ts` が無いとビルドはインストールを促すエラーで止まる
- Migration (5.11 → 5.20): `ast.defineMacro` from `kubb/kit` is now imported as `defineMacro`; printer handlers return type strings instead of `ts.factory` nodes
- Source: https://kubb.dev/extensions/kubb-labs/plugin-ts/guides/customization （`@kubb/plugin-ts@5.5.1`、取得日 2026-11-14）

## Related

- [plugin-ts](../plugins/plugin-ts.md)
- [zod-customization](./zod-customization.md)
