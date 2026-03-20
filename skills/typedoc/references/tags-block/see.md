# @see

関連するリソースへの参照リストを作成するブロックタグ。

## 構文

```
@see [表示テキスト](URL)
```

```
@see {@link シンボル名}
```

## 詳細説明

`@see` タグはエクスポートに関連する他のリソースへの参照リストを作成するために使用される。

TSDocの仕様に準拠している。

**重要なJSDocとの違い**: TypeDocはJSDocとは異なる方法で `@see` を処理する。JSDocではタグ内容をベアなシンボル参照として解析できるが、TypeDocでは他のシンボルを参照する際に明示的な `{@link}` 構文が必要。`{@link}` ラッパーなしの直接的なシンボル名はサポートされない。

## コード例

```typescript
/**
 * @see [Factorial - Wikipedia](https://en.wikipedia.org/wiki/Factorial)
 * @see {@link semifactorial}
 */
export function factorial(n: number): number;
```

## 注意点

- 他のシンボルを参照する場合は必ず `{@link}` 構文を使用する必要がある
- URLリンクはマークダウン形式 `[テキスト](URL)` で記述する
- JSDocのベアシンボル参照構文はTypeDocでは動作しない
- 複数の `@see` タグを1つのコメントに含めることが可能

## 関連

- [TSDoc @see](https://tsdoc.org/pages/tags/see/)
- [JSDoc @see](https://jsdoc.app/tags-see)
