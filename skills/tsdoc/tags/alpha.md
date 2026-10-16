# @alpha

API 項目のリリースステージが "alpha" であることを示すモディファイアタグ。最終的にサードパーティ開発者向けに提供する予定だが、まだ未リリース。

## 構文

```
@alpha
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
   * @alpha
   */
  public get title(): string;

  /**
   * The author of the book.
   */
  public get author(): string;
}
```

`Book.author` は含むクラスから `@public` を継承し、`Book.title` は alpha と指定される。

## 注意

- 標準化区分: Discretionary、構文種別: Modifier
- ツールは公開リリースから宣言を除外（trim）してよい
- TypeDoc では、安定性（semantic versioning 準拠）が未達の member を示す用途で使う
- TypeDoc の `--visibilityFilters` オプションで表示を制御できる

## 関連

- [@beta](./beta.md)
- [@experimental](./experimental.md)
- [@public](./public.md)
- [@internal](./internal.md)
