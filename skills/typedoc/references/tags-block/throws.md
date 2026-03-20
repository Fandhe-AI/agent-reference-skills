# @throws

関数やメソッドがスローする可能性のある例外を文書化するブロックタグ。

## 構文

```
@throws 例外の説明
```

```
@throws {@link エラー型} 条件の説明
```

## 詳細説明

`@throws` タグは関数やメソッドから発生する可能性のある例外を文書化するために使用される。TSDocの仕様に準拠している。

`{@link}` 構文を使用してエラー型を参照し、条件の説明を含めることができる。

## コード例

```typescript
/**
 * @throws {@link UserError} if `max < min`
 */
export function rand(min: number, max: number): number;
```

## 注意点

- `{@link}` 構文でエラー型への参照が可能
- 複数の `@throws` タグを1つのコメントに含めることが可能
- 例外が発生する条件の説明を含めることが推奨される

## 関連

- [@returns](./returns.md) -- 戻り値の文書化
- [@param](./param.md) -- パラメータの文書化
- [TSDoc @throws](https://tsdoc.org/pages/tags/throws/)
