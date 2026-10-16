# @privateRemarks

公開対象外の追加ドキュメントを開始するブロックタグ。

## 構文

```
@privateRemarks
```

## 使用例

```typescript
/**
 * The summary section should be brief. On a documentation web site,
 * it will be shown on a page that lists summaries for many different
 * API items.  On a detail page for a single item, the summary will be
 * shown followed by the remarks section (if any).
 *
 * @remarks
 *
 * The main documentation for an API item is separated into a brief
 * "summary" section optionally followed by an `@remarks` block containing
 * additional details.
 *
 * @privateRemarks
 *
 * The `@privateRemarks` tag starts a block of additional commentary that is not meant
 * for an external audience.  A documentation tool must omit this content from an
 * API reference web site.  It should also be omitted when generating a normalized
 * *.d.ts file.
 */
```

## 注意

- 標準化区分: Core、構文種別: Block tag
- ツールは API リファレンスサイト・生成 `*.d.ts` などの出力から、このセクション全体を除外しなければならない
- TypeDoc は既定で除外するが、`--excludeTags` を設定している場合はリストへ含める責任はユーザー側にある
- 出典: https://tsdoc.org/pages/tags/privateremarks/ （rushstack-websites 5c0c8b9）、https://typedoc.org/documents/Tags._privateRemarks.html （TypeDoc v0.28.20）

## 関連

- [@remarks](./remarks.md)
