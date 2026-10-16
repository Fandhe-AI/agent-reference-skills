# @experimental

`@beta` と同じ意味を持つモディファイアタグ。`@alpha` リリースステージを持たないツール向け。

## 構文

```
@experimental
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
   * @experimental
   */
  public get title(): string;

  /**
   * The author of the book.
   */
  public get author(): string;
}
```

`Book.author` は含むクラスから `@public` を継承し、`Book.title` は experimental と指定される。

## 注意

- 標準化区分: Discretionary、構文種別: Modifier、同義: `@beta`
- TypeDoc では `@beta` と `@experimental` は意味的に等価。どちらか一方のみ使う
- TypeDoc の `--visibilityFilters` オプションで表示を制御できる

## 関連

- [@alpha](./alpha.md)
- [@beta](./beta.md)
- [@public](./public.md)
- [@internal](./internal.md)
