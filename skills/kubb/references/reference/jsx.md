# JSX renderer

`kubb/jsx` は `@kubb/renderer-jsx` を背景とする JSX ベースの renderer。`kubb/kit` の `ast.factory` ノードビルダーの代替として、JSX ランタイムと組み込みコンポーネントでファイルと markdown を出力する。

## Signature / Usage

tsconfig で `kubb/jsx` ランタイムを指定する:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "kubb/jsx"
  }
}
```

```tsx
import { jsxRenderer } from 'kubb/jsx'
import { File, Function, Type } from 'kubb/jsx'

const renderer = jsxRenderer()

await renderer.render(
  <File baseName="petStore.ts" path="src/gen/petStore.ts">
    <File.Source>
      <Type name="Pet">{'{ id: number; name: string }'}</Type>
      <Function name="getPet" async>
        {"return fetch('/pets')"}
      </Function>
    </File.Source>
  </File>,
)

const files = renderer.files
```

## Renderers

- renderer は generator が返す要素を `FileNode` に変換する。generator の `renderer` フィールドに `renderer: jsxRenderer` で設定する。`ast.factory` で直接 `FileNode` を作る場合は未設定か `renderer: null`
- `jsxRenderer()` は `render`（JSX 要素を渡す）と `files`（生成ファイルを読み戻す）を持つインスタンスを作る
- `createRenderer`（`kubb/kit`）はビルダー関数を取り `Renderer` を作るファクトリを返す。別のテンプレート形式が必要なときのみ使う

## Built-in components

| Component | Category | Emits |
|-----------|----------|-------|
| `File` | Core | File entry |
| `File.Source` | Core | Source block |
| `File.Import` | Core | Import statement |
| `File.Export` | Core | Export statement |
| `Const` | JavaScript | TypeScript |
| `Function` | JavaScript | TypeScript |
| `Function.Arrow` | JavaScript | TypeScript |
| `Type` | JavaScript | TypeScript |
| `Callout` | Markdown | Markdown |
| `Frontmatter` | Markdown | Markdown |
| `Heading` | Markdown | Markdown |
| `List` | Markdown | Markdown |
| `Paragraph` | Markdown | Markdown |
| `Jsx` | JSX | Raw JSX |

### File

出力ファイルを宣言する。`baseName` と `path` の両方を渡すとファイルエントリを登録。両方省略するとファイルを作らず children をインライン描画する。

| Prop | Type | Description |
|------|------|-------------|
| `baseName` | `` `${string}.${string}` `` | 拡張子付きファイル名（例 `petStore.ts`） |
| `path` | `string` | 生成ファイルの完全パス |
| `meta?` | `object \| null` | plugin が読むメタデータ |
| `banner?` | `string \| null` | source の前に追加するテキスト |
| `footer?` | `string \| null` | source の後に追加するテキスト |
| `copy?` | `string \| null` | parser を経由せず出力にそのままコピーする絶対パス |
| `children?` | `KubbReactNode` | source / import / export |

```tsx
<File baseName="petStore.ts" path="src/models/petStore.ts">
  <File.Source name="Pet" isExportable isIndexable>
    {`export type Pet = { id: number; name: string }`}
  </File.Source>
</File>
```

### File.Source

囲む `File` に属する source テキストのブロック。children が source 文字列。

| Prop | Type | Description |
|------|------|-------------|
| `name?` | `string \| null` | 重複排除と barrel 生成のための識別子 |
| `isExportable?` | `boolean \| null` | `export` キーワードを付ける |
| `isIndexable?` | `boolean \| null` | barrel / index 生成に含める |
| `isTypeOnly?` | `boolean \| null` | type-only export として扱う |
| `children?` | `KubbReactNode` | ブロックの source テキスト |

### File.Import

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string \| Array<string \| { propertyName: string; name?: string }>` | string は default / namespace import、配列は named import |
| `path` | `string` | import 元のモジュール指定子 |
| `root?` | `string \| null` | ファイル相対で import パスを解決する root |
| `isTypeOnly?` | `boolean \| null` | `import type` を出力 |
| `isNameSpace?` | `boolean \| null` | `import * as name` を出力 |

```tsx
<File.Import name={['useState']} path="react" />
// import { useState } from 'react'

<File.Import name="z" path="zod" isNameSpace />
// import * as z from 'zod'
```

### File.Export

| Prop | Type | Description |
|------|------|-------------|
| `name?` | `string \| Array<string> \| null` | export する binding。省略は wildcard export |
| `path` | `string` | export 元のモジュール指定子 |
| `isTypeOnly?` | `boolean \| null` | `export type` を出力 |
| `asAlias?` | `boolean \| null` | `export * as name` を出力 |

```tsx
<File.Export name={['Pet']} path="./models/petStore" />
// export { Pet } from './models/petStore'

<File.Export path="./models/petStore" isTypeOnly />
// export type * from './models/petStore'
```

### Const

TypeScript の定数宣言。children は初期化式。

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | 定数の識別子 |
| `export?` | `boolean \| null` | `export` を付ける |
| `type?` | `string \| null` | `const name:` の後の型注釈 |
| `asConst?` | `boolean \| null` | 初期化式の後に `as const` |
| `JSDoc?` | `JSDoc \| null` | 宣言の前に置く JSDoc |
| `children?` | `KubbReactNode` | 初期化式 |

```tsx
<Const export name="petSchema" type="z.ZodType<Pet>">
  {`z.object({ id: z.number() })`}
</Const>
// export const petSchema: z.ZodType<Pet> = z.object({ id: z.number() })
```

### Function

TypeScript の関数宣言。children は関数本体。

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | 関数の識別子 |
| `export?` | `boolean \| null` | `export` を付ける |
| `default?` | `boolean \| null` | `export` の後に `default` を出力 |
| `async?` | `boolean \| null` | `async` を出力。`returnType` を `Promise<…>` で包む |
| `params?` | `string \| null` | 括弧内の引数リスト |
| `generics?` | `string \| Array<string> \| null` | ジェネリクス。配列はカンマ結合 |
| `returnType?` | `string \| null` | `:` の後の戻り値型 |
| `JSDoc?` | `JSDoc \| null` | 宣言の前に置く JSDoc |
| `children?` | `KubbReactNode` | 関数本体 |

```tsx
<Function export async name="getPet" generics={['TData = Pet']} params="petId: string" returnType="TData">
  {'return client.get("/pets/" + petId)'}
</Function>
// export async function getPet<TData = Pet>(petId: string): Promise<TData> { … }
```

### Function.Arrow

`const` に代入するアロー関数。`Function` の全 prop に加えて:

| Prop | Type | Description |
|------|------|-------------|
| `singleLine?` | `boolean \| null` | ブロックではなく波括弧なしの式本体にする |

```tsx
<Function.Arrow export name="double" params="n: number" returnType="number" singleLine>
  {`n * 2`}
</Function.Arrow>
// export const double = (n: number): number => n * 2
```

### Type

TypeScript の type alias。children は型式。

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | 大文字で始まる識別子 |
| `export?` | `boolean \| null` | `export` を付ける |
| `JSDoc?` | `JSDoc \| null` | 宣言の前に置く JSDoc |
| `children?` | `KubbReactNode` | 右辺の型式 |

```tsx
<Type export name="PetId">
  {`string | number`}
</Type>
// export type PetId = string | number
```

### Markdown components

markdown コンポーネントは自前の source ブロックを出力するため、`File.Source` ではなく `File` 直下に置く。`parserMd` で markdown として書き出す。

```tsx
import { jsxRenderer } from 'kubb/jsx'
import { File, Frontmatter, Heading, Paragraph, List, Callout } from 'kubb/jsx'

const renderer = jsxRenderer()

await renderer.render(
  <File baseName="pets.md" path="src/docs/pets.md">
    <Frontmatter data={{ title: 'Pets', layout: 'doc' }} />
    <Heading level={2}>Pets</Heading>
    <Paragraph>{'A pet object with an id and a name.'}</Paragraph>
    <List items={['id: number', 'name: string']} />
    <Callout type="tip">Keep the generator hot with kubb generate --watch.</Callout>
  </File>,
)
```

| Component | Props | Output |
|-----------|-------|--------|
| `Callout` | `type: 'tip' \| 'note' \| 'important' \| 'warning' \| 'caution'`, `title?: string \| null`, `children: string` | GitHub 風 `> [!WARNING] Heads up` ブロック引用 |
| `Frontmatter` | `data: Record<string, unknown>` | `---` で囲んだ YAML。`File` の最初の child に置く |
| `Heading` | `level: 1..6`, `children: string` | ATX 見出し |
| `List` | `items: ReadonlyArray<string>`, `ordered?: boolean \| null` | markdown リスト（既定は bullet） |
| `Paragraph` | `children: string` | 段落。inline markdown はそのまま通る |

### Jsx

生の JSX 文字列（fragment 含む）を生成 source に埋め込む。`Function` 内でコンポーネント本体を出力するのに使う。children は plain string 必須。

| Prop | Type | Description |
|------|------|-------------|
| `children?` | `string` | そのまま埋め込む JSX 文字列 |

```tsx
<Function name="MyComponent" export>
  <Jsx>{'return (\n  <>\n    <div>Hello</div>\n  </>\n)'}</Jsx>
</Function>
```

## Notes

- `jsxRenderer` は React を使わない。コンポーネントは素の関数として実行されるため hooks と suspense は使えない
- 設定後、plugin 内の `.tsx` は `jsx-runtime` / `jsx-dev-runtime` を `kubb/jsx` から自動解決する
- `Type` の `name` が大文字で始まらないとコンポーネントが throw する
- JavaScript コンポーネントは `File.Source` 内にネストして `.ts` ファイルへ書き出す
- 出典: https://kubb.dev/docs/5.x/reference/jsx （kubb@5.11.0 の docs/5.x/reference/jsx.md）

## Related

- [kit-api](./kit-api.md)
- [serialization](./serialization.md)
