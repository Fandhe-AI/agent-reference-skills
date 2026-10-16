# @public

API 項目のリリースステージが "public" であることを示すモディファイアタグ。サードパーティ開発者へ正式公開済みで、シグネチャは安定（Semantic Versioning 準拠など）が保証される。

## 構文

```
@public
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
   * @internal
   */
  public get _title(): string;

  /**
   * The author of the book.
   */
  public get author(): string;
}
```

`Book.author` は含むクラスから `@public` を継承し、`Book._title` は internal と指定される。

## 注意

- 標準化区分: Discretionary、構文種別: Modifier
- TypeDoc では `@public` は member の可視性を public に上書きする（TSDoc 仕様では member の可視性とリリース可視性は別扱いのため非準拠）。通常は使用しない
- TypeDoc は `@public` バッジを含まれる member へ継承表示せず、注釈した member にのみ表示する
- `@alpha` / `@beta` / `@experimental` / `@internal` で明示しない export は public として扱い、`@public` を省略することが推奨される

## 関連

- [@internal](./internal.md)
- [@alpha](./alpha.md)
- [@beta](./beta.md)
- [@experimental](./experimental.md)
