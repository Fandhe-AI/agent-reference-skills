# @beta

API 項目のリリースステージが "beta" であることを示すモディファイアタグ。フィードバック収集目的で試験的に公開済みで、本番利用は非推奨（契約が予告なく変更されうる）。

## 構文

```
@beta
```

## 使用例

```typescript
/**
 * Represents a book in the catalog.
 * @public
 */
export class Book {
  /**
   * The title of the book.
   * @beta
   */
  public get title(): string;

  /**
   * The author of the book.
   */
  public get author(): string;
}
```

`Book.author` は含むクラスから `@public` を継承し、`Book.title` は beta と指定される。

## 注意

- 標準化区分: Discretionary、構文種別: Modifier、同義: `@experimental`
- ツールは公開リリースから宣言を除外（trim）してよいが、developer preview リリースには含めてよい
- TypeDoc では `@beta` と `@experimental` は意味的に等価。どちらか一方のみ使う
- TypeDoc の `--visibilityFilters` オプションで表示を制御できる

## 関連

- [@alpha](./alpha.md)
- [@experimental](./experimental.md)
- [@public](./public.md)
- [@internal](./internal.md)
