# @summary

モジュールページでの関数やモジュールの説明表示をカスタマイズするブロックタグ。

## 構文

```
@summary
モジュールページ用の説明文
```

## 詳細説明

モジュールをレンダリングする際、TypeDocはコメントのサマリーテキストの最初の段落を使用する。これがスタンドアロン表示に常に適しているとは限らないため、`@summary` タグが存在する場合、TypeDocはそのブロックの内容を代わりにレンダリングする。

`@summary` が省略されている場合でも `--useFirstParagraphOfCommentAsSummary` フラグが有効であれば、TypeDocは最初の段落をフォールバックとして使用する。

**オーバーロード関数の場合**: タグは最初のシグネチャのコメントまたは関数実装のコメントに配置できる。

## コード例

```typescript
/**
 * Description for member page
 * @summary
 * Description for module page
 */
export function forkProcess(): void;
```

この例では、メンバーページでは「Description for member page」が表示され、モジュールページでは「Description for module page」が表示される。

## 注意点

- モジュールページとメンバーページで異なる説明を表示するのに有用
- オーバーロード関数では最初のシグネチャまたは実装のコメントに配置可能
- `--useFirstParagraphOfCommentAsSummary` フラグとの連携がある

## 関連

- [@remarks](./remarks.md) -- サマリーと詳細の分離
- `--useFirstParagraphOfCommentAsSummary` オプション
- [JSDoc @summary](https://jsdoc.app/tags-summary)
