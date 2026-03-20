# @returns / @return

関数の戻り値を文書化するブロックタグ。

## 構文

```
@returns 戻り値の説明
```

または

```
@return 戻り値の説明
```

## 詳細説明

`@returns` タグは関数の戻り値を文書化するために使用される。TSDocの仕様に準拠している。

TypeDocは `@return` を `@returns` の同等のエイリアスとして認識する。

1つのコメントにつき最大1つの `@returns` タグのみ含めるべきである。

## コード例

```typescript
/**
 * @param a - the first number
 * @param b - the second number
 * @returns The sum of `a` and `b`
 */
export function sum(a: number, b: number): number;
```

## 注意点

- 1つのコメントにつき最大1つの `@returns` のみ使用すべき
- `@returns` と `@return` はどちらも同じ動作をする
- TSDoc仕様では `@returns` が推奨される

## 関連

- [@param](./param.md) -- パラメータの文書化
- [TSDoc @returns](https://tsdoc.org/pages/tags/returns/)
