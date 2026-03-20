# @typeParam

関数、メソッド、クラス、インターフェース、型エイリアスの型パラメータを文書化するブロックタグ。

## 構文

```
@typeParam 型パラメータ名 - 説明
```

## 詳細説明

`@typeParam` タグは関数、メソッド、クラス、インターフェース、型エイリアスの型パラメータを文書化するために使用される。TypeDocは `@template` を同等のエイリアスとして認識する。

TSDocの仕様に準拠している。

**TSDoc互換性に関する補足**: TSDoc標準では以下の2つの要件を規定している：
1. タグに型情報を含めるべきではない
2. パラメータ名の後にハイフンで区切って説明を記述する

ただし、TypeDocはJavaScriptファイルでのTypeScript型注釈との互換性向上のため、これらの制約を緩和している。以下のすべてのバリエーションが同一に処理される：

- `@typeParam test - description`
- `@typeParam test description`
- `@typeParam {string} test - description`
- `@typeParam {string} test description`

## コード例

```typescript
/**
 * @typeParam T - the identity type
 */
export function identity<T>(x: T): T {
    return x;
}
```

## 注意点

- TypeDocは柔軟な構文をサポートし、ハイフン区切りや型情報の有無に関わらず処理する
- `@template` は `@typeParam` のエイリアスとして扱われる
- TypeScriptプロジェクトでは `@typeParam` の使用が推奨される

## 関連

- [@template](./template.md) -- JavaScriptプロジェクト向けの代替構文
- [@param](./param.md) -- 通常のパラメータの文書化
- [TSDoc @typeParam](https://tsdoc.org/pages/tags/typeParam/)
