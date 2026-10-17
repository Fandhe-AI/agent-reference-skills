# @readonly

TypeScript の型上は書き込み可能でも、ドキュメント上は読み取り専用として扱うことを示すモディファイアタグ。

## 構文

```
@readonly
```

## 使用例

```typescript
export class Book {
  /**
   * Technically property has a setter, but for documentation purposes it should
   * be presented as readonly.
   * @readonly
   */
  public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    throw new Error('This property is read-only!');
  }
}
```

## 注意

- 標準化区分: Extended、構文種別: Modifier
- 典型例は、常に例外を投げる setter を持つプロパティ
- TypeDoc では、readonly タグ付き getter に対応する setter はドキュメントから除外される
- 出典: https://tsdoc.org/pages/tags/readonly/ （rushstack-websites 5c0c8b9）、https://typedoc.org/documents/Tags._readonly.html （TypeDoc v0.28.20）

## 関連

- [@virtual](./virtual.md)
