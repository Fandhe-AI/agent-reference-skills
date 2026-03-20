# 型テスト

Vitest は `expectTypeOf` と `assertType` で型レベルのテストを行える。
`*.test-d.ts` ファイルが型テストとして自動認識される。

## セットアップ

```bash
vitest typecheck
# または
vitest --typecheck
```

```json
// package.json
{
  "scripts": {
    "test:types": "vitest --typecheck"
  }
}
```

設定で `typecheck.include` を使ってマッチパターンをカスタマイズ可能。

## expectTypeOf

流暢な API で型アサーションを行う。

```ts
import { expectTypeOf } from 'vitest'

expectTypeOf(42).toBeNumber()
expectTypeOf('hello').toBeString()
expectTypeOf(true).toBeBoolean()
expectTypeOf(undefined).toBeUndefined()
expectTypeOf(null).toBeNull()
expectTypeOf({}).toBeObject()
expectTypeOf([]).toBeArray()
expectTypeOf(() => {}).toBeFunction()
```

### 型の等値・拡張チェック

```ts
expectTypeOf<string>().toEqualTypeOf<string>()
expectTypeOf<string>().toExtend<string | number>()

// 関数の引数・戻り値
expectTypeOf(fn).parameter(0).toBeString()
expectTypeOf(fn).returns.toBeNumber()
```

### NOT

```ts
expectTypeOf<string>().not.toBeNumber()
```

## assertType

TypeScript の型システムを直接利用するシンプルな方法。

```ts
import { assertType } from 'vitest'

const answer = 42
assertType<number>(answer)

// @ts-expect-error answer is not a string
assertType<string>(answer)
```

## 仕組み

Vitest は内部で `tsc` または `vue-tsc` を呼び出し、結果をパースする。
ファイルは静的解析のみで実行されない。

## ベストプラクティス

- 型引数を使うと推論より明確なエラーメッセージが得られる: `expectTypeOf(value).toEqualTypeOf<Expected>()`
- `@ts-expect-error` と組み合わせてランタイムテストにも含めるとタイポを検出できる
- `--allowOnly` や `-t` フラグは型テストでも使用可能

## 関連

- [設定](./config.md)
- [CLI](./cli.md)
