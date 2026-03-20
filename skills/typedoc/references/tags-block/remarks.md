# @remarks

ドキュメントのサマリーセクションと詳細な説明を分離するブロックタグ。

## 構文

```
@remarks
詳細な説明文
```

## 詳細説明

`@remarks` タグはドキュメントコメントのサマリーセクションと追加の詳細情報を分離するために使用できる。

TSDocの仕様に準拠している。

**制限**: 1つのコメントにつき最大1つの `@remarks` ブロックのみ許可される。

**継承**: 他のほとんどのタグとは異なり、`{@inheritDoc}` が使用された場合に `@remarks` の内容も伝播される。

**テーマの処理**: テーマによって表示方法が異なる場合がある。デフォルトのTypeDocテーマでは、他のブロックタグと同様に `# Remarks` ヘッダーの下に表示され、特別なスタイリングは適用されない。

## コード例

```typescript
/**
 * Some docs here
 *
 * @remarks
 * Much longer documentation here that provides
 * detailed information about the implementation
 * and usage patterns.
 */
export function rand(): number;
```

## 注意点

- 1つのコメントにつき最大1つの `@remarks` のみ使用可能
- `{@inheritDoc}` 使用時に内容が継承される
- デフォルトテーマでは `# Remarks` ヘッダー下にレンダリングされる
- テーマによっては異なる表示が可能

## 関連

- [@privateRemarks](./privateRemarks.md) -- 非公開の内部メモ
- [@summary](./summary.md) -- サマリーのカスタマイズ
- `{@inheritDoc}` -- ドキュメントの継承
- [TSDoc @remarks](https://tsdoc.org/pages/tags/remarks/)
