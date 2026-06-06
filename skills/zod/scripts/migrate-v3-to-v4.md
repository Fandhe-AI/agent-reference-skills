# Migrate v3 to v4

Zod 3 から Zod 4 への移行手順とコマンド。

## v4 へのアップグレード

```sh
npm install zod@^4
```

## pnpm でのアップグレード

```sh
pnpm upgrade zod@latest
```

## コミュニティ codemod による自動移行

> **警告**: codemod は自動でコードを書き換える。適用前にバックアップまたは Git コミットを作成すること。

```sh
npx zod-v3-to-v4
```

`zod-v3-to-v4` はコミュニティメンテナンスの codemod。公式ではなく、適用後は手動確認を推奨。

## 主な破壊的変更のクイックリファレンス

| Zod 3 | Zod 4 |
| --- | --- |
| `{ message: "..." }` | `"..."` または `{ error: "..." }` |
| `{ errorMap: fn }` | `{ error: fn }` |
| `error.format()` | `z.prettifyError(error)` |
| `z.string().email()` | `z.email()` |
| `z.string().uuid()` | `z.uuid()` |
| `z.string().ip()` | `z.ipv4()` / `z.ipv6()` |
| `z.string().datetime()` | `z.iso.datetime()` |
| `z.object({}).strict()` | `z.strictObject({})` |
| `z.object({}).passthrough()` | `z.looseObject({})` |
| `z.object({}).deepPartial()` | 削除（手動で定義）|
| `schema1.merge(schema2)` | `schema1.extend(schema2.shape)` |
| `z.nativeEnum(E)` | `z.enum(E)` |
| `z.record(valueSchema)` | `z.record(z.string(), valueSchema)` |
| `z.preprocess(fn, schema)` | `z.pipe(z.unknown(), z.transform(fn), schema)` |
| `schema._def` | `schema._zod.def` |

## ライブラリの peer dependency 更新

```sh
npm install zod@"^3.25.0 || ^4.0.0"
```

`package.json` の `peerDependencies` を更新する:

```jsonc
{
  "peerDependencies": {
    "zod": "^3.25.0 || ^4.0.0"
  }
}
```
