# @example

関数や機能の使用例を示すためのブロックタグ。

## 構文

```
@example
使用例のコードまたはテキスト
```

## 詳細説明

`@example` タグは、続くテキストが関数の使用方法の例であることを示す。TSDocの仕様に準拠している。

TypeDocは `@example` の内容を2つの方法で処理する：

1. **コードブロックなしの場合**: マークダウンコードブロックが含まれていない場合、TypeDocはタグ内容全体をコード例として扱う。このアプローチは厳密にはTSDoc準拠ではないが、VSCodeとの互換性のためにサポートされている。

2. **コードブロックありの場合**: トリプルバッククォートでマークされたコードブロックが含まれている場合、TypeDocとVSCodeの両方がコードブロック外のテキストを通常のドキュメントテキストとして、マークされたセクションのみをコードとして扱う。

## コード例

### コードブロックなし

```typescript
/**
 * @example
 * factorial(3) // => 6
 */
export function factorial(n: number): number;
```

### コードブロックあり

````typescript
/**
 * @example
 * Here's a simple example:
 * ```typescript
 * factorial(3) // => 6
 * ```
 */
export function factorial(n: number): number;
````

## 注意点

- コードブロックなしの場合はタグ内容全体がコードとして扱われる
- コードブロックありの場合は明示的にマークされた部分のみがコードとして表示される
- 複数の `@example` タグを1つのコメントに含めることが可能
- TSDoc仕様ではコードブロック形式が推奨される

## 関連

- [TSDoc @example](https://tsdoc.org/pages/tags/example/)
