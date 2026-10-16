# {@label}

宣言にラベルを付け、TSDoc 宣言参照記法のセレクターで参照できるようにするインラインタグ。

## 構文

```
{@label IDENTIFIER}
```

## 使用例

```typescript
export interface InterfaceL1 {
  /**
   * Shortest name:  {@link InterfaceL1.(:STRING_INDEXER)}
   * Full name:      {@link (InterfaceL1:interface).(:STRING_INDEXER)}
   *
   * {@label STRING_INDEXER}
   */
  [key: string]: number;

  /**
   * Shortest name:  {@link InterfaceL1.(:FUNCTOR)}
   * Full name:      {@link (InterfaceL1:interface).(:FUNCTOR)}
   *
   * {@label FUNCTOR}
   */
  (source: string, subString: string): boolean;
}
```

## 注意

- 標準化区分: Core、構文種別: Inline tag
- `{@label}` の記法は未確定（microsoft/tsdoc の issue #9）
- TypeDoc ではオーバーロードシグネチャに名前を付けて宣言参照から指す用途で使う。識別子は `A-Z` / `0-9` / `_` のみで、数字で始めない（不一致だと宣言参照で使えない）
- TypeDoc の `{@link round:PRECISION}` 形式の参照は TypeDoc による宣言参照文法の拡張で、TSDoc 標準には含まれない
- 公式例（tsdoc.org）は宣言名が `Interface`、参照が `InterfaceL1` で一致しないため、ここでは宣言名を `InterfaceL1` に揃えた
- 出典: https://tsdoc.org/pages/tags/label/ （rushstack-websites 5c0c8b9）、https://typedoc.org/documents/Tags.__label_.html （TypeDoc v0.28.20）

## 関連

- [{@link}](./link.md)
