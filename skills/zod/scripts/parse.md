---
source: https://zod.dev/basics
---

# Parse

スキーマを使ったデータ検証の実行パターン。

## 前提パッケージのインストール

```sh
npm install zod
```

以降のコード例の前提。詳細は `install.md` を参照。

## 同期パース（失敗時に例外）

```typescript
import * as z from "zod";

const schema = z.string();
const data: unknown = "hello";

const result = schema.parse(data);
```

検証に失敗した場合 `ZodError` をスローする。

## 同期セーフパース（例外なし）

```typescript
const result = schema.safeParse(data);

if (result.success) {
  result.data;  // 検証済みデータ
} else {
  result.error; // ZodError インスタンス
}
```

`try/catch` を避けたい場合に使う。戻り値は discriminated union。

## 非同期パース（失敗時に例外）

```typescript
const result = await schema.parseAsync(data);
```

非同期 refine / transform を使う場合に必要。

## 非同期セーフパース（例外なし）

```typescript
const result = await schema.safeParseAsync(data);

if (result.success) {
  result.data;
} else {
  result.error;
}
```

## Zod Core（ライブラリ作者向け）

Zod Core の `$ZodType` にはメソッドがないため、トップレベル関数を使う:

```typescript
import * as z from "zod/v4/core";

// schema / data は上のブロックで定義したものを使う
z.parse(schema, data);
z.safeParse(schema, data);
await z.parseAsync(schema, data);
await z.safeParseAsync(schema, data);
```

## エラー内容の確認

```typescript
import * as z from "zod";

const schema = z.string();
const invalidData: unknown = 42;

try {
  schema.parse(invalidData);
} catch (error) {
  if (error instanceof z.ZodError) {
    error.issues; // バリデーションエラーの配列
  }
}
```

## エラーの文字列化

```typescript
try {
  schema.parse(invalidData);
} catch (error) {
  if (error instanceof z.ZodError) {
    z.prettifyError(error);
  }
}
```

`error.format()` / `error.flatten()` は Zod 4 で非推奨。代わりにトップレベル関数 `z.treeifyError()`（ネスト構造）または `z.flattenError()`（フラットなフォーム向け）を使う。人間向けの文字列が欲しい場合は `z.prettifyError()`。
