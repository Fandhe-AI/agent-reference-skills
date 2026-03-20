# @template

関数、メソッド、クラス、インターフェース、型エイリアスの型パラメータを文書化するブロックタグ。

## 構文

```
@template 型パラメータ名 - 説明
```

```
@template {制約型} 型パラメータ名 - 説明
```

## 詳細説明

`@template` タグは関数、メソッド、クラス、インターフェース、型エイリアスの型パラメータを文書化するために使用される。

TypeDocはJavaScriptプロジェクトとの互換性を維持するため、`@template` を `@typeParam` のエイリアスとして扱う。TypeScriptプロジェクトでは、TSDoc標準の `@typeParam` タグの使用が推奨される。

## コード例

```javascript
/**
 * @template {string} T - the identity type
 */
export function identity(x) {
    return x;
}
```

## 注意点

- TypeDocは `@template` を `@typeParam` のエイリアスとして処理する
- 主にJavaScriptプロジェクトでTypeScriptをドキュメントコメント経由で利用する場合に使用
- TypeScriptプロジェクトでは `@typeParam` の使用を推奨
- 型制約（`{string}` など）を含めることが可能

## 関連

- [@typeParam](./typeParam.md) -- TypeScriptプロジェクト向けの推奨代替タグ
