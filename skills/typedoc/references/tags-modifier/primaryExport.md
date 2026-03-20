# @primaryExport

再エクスポート（re-export）の処理方法を制御し、TypeDoc にシンボルを即座に変換させるモディファイアタグ。

## 構文

```
/** @primaryExport */
```

## 詳細説明

デフォルトでは、TypeDoc は再エクスポートされたシンボルの変換を遅延させ、利用可能な場合は元のモジュールをドキュメントの参照先として使用する。`@primaryExport` タグは、この動作をオーバーライドし、TypeDoc にシンボルを遅延させずに即座に変換させる。

名前空間コメントに適用すると、その名前空間内の再エクスポートが元のソースを参照するのではなく、直接その名前空間内で変換・ドキュメント化される。

これは、階層的なエクスポート構造とフラットなエクスポート構造の両方を維持しつつ、ドキュメントを特定の場所に向けたい場合に有用。

## コード例

```typescript
/**
 * モデルの主要なドキュメントをこの名前空間にしたいが、
 * 後方互換性のためにフラットなエクスポート構造も維持する。
 * @primaryExport
 */
export * as Models from "./models/index.js";
export * from "./models/index.js";
```

```typescript
/**
 * すべてのユーティリティ関数。
 * @primaryExport
 */
export * as Utils from "./utils/index.js";
// フラットなアクセスも可能
export * from "./utils/index.js";
```

## 注意点

- 再エクスポートを含む名前空間宣言に適用する
- TypeDoc のデフォルトの遅延変換戦略をオーバーライドする
- 階層的エクスポートとフラットエクスポートの共存に有用

## 関連

- [@packageDocumentation](./packageDocumentation.md)
- [@namespace](./namespace.md)
