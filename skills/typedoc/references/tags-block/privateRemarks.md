# @privateRemarks

生成されるAPIリファレンスドキュメントに含めるべきでないドキュメントテキストを追加するブロックタグ。

## 構文

```
@privateRemarks
内部メモやコメント
```

## 詳細説明

`@privateRemarks` タグはAPIコンシューマー向けではない実装メモや内部コメントを含めるために使用できる。このタグ内のテキストは生成されるドキュメント出力からデフォルトで除外される。

TSDocの仕様に準拠している。

ただし、`--excludeTags` オプションがカスタム設定されている場合は、このタグを手動でリストに追加して除外を維持する必要がある。

## コード例

```typescript
/**
 * Some docs here
 *
 * @privateRemarks
 * Implementation detail notes not useful to the API consumer
 */
export function rand(): number;
```

## 注意点

- デフォルトで生成されるドキュメントから除外される
- `--excludeTags` オプションをカスタマイズしている場合は、手動でこのタグをリストに追加する必要がある
- 実装の詳細や内部メモの記録に適している

## 関連

- [@remarks](./remarks.md) -- 公開される詳細説明
- `--excludeTags` オプション -- タグの除外設定
- [TSDoc @privateRemarks](https://tsdoc.org/pages/tags/privateRemarks/)
