# {@label}

宣言にラベルを付け、TSDoc 宣言参照記法のセレクターで参照できるようにするインラインタグ。

## 構文

```
{@label IDENTIFIER}
```

## 使用例

```typescript
export interface Interface {
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

## 関連

- [{@link}](./link.md)
