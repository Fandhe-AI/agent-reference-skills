# Attachment

「添付ファイル 1 件の表示」を表現するスタイル済み部品。横並びの行カード（`file` 形態）と縦積みのサムネイルカード（`image` 形態）の 2 意匠、アップロード失敗時の枠色を持つ。

## Signature / Usage

```rust
use fandhe_frontend_core::text;
use fandhe_frontend_pre_styled_ui::attachment::{
    self, AttachmentRootProps, AttachmentState, AttachmentVariant,
};

let node = attachment::root(
    AttachmentRootProps {
        variant: AttachmentVariant::File,
        state: AttachmentState::Idle,
        disabled: false,
    },
    vec![],
    vec![
        attachment::media(vec![], vec![text("icon")]),
        attachment::content(
            vec![],
            vec![
                attachment::name(vec![], vec![text("report.pdf")]),
                attachment::meta(vec![], vec![text("PDF · 128 KB")]),
            ],
        ),
        attachment::actions(vec![], vec![attachment::action("Delete", false, vec![], vec![])]),
    ],
);
let css = attachment::stylesheet();
```

## Anatomy

`root` → `media` / `content`（→ `name` / `meta`）/ `progress` / `actions`（→ `action`）

## Options / Props

`AttachmentRootProps`（headless 層の型を再エクスポート。`Default` 実装あり）:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `AttachmentVariant`（`File` \| `Image`） | `File` | 表示形態（`data-variant` = `file` / `image`） |
| `state` | `AttachmentState`（`Idle` \| `Uploading` \| `Error`） | `Idle` | アップロード状態（`data-state` = `idle` / `uploading` / `error`） |
| `disabled` | `bool` | `false` | `true` で `data-disabled` 存在属性を付与 |

パーツ関数（すべて `#[must_use]`、呼び出し側 `class` は除去される）:

| Function | Signature |
|----------|-----------|
| `root` | `(props: AttachmentRootProps, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node` |
| `media` / `content` / `name` / `meta` / `progress` / `actions` | `(attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node` |
| `action` | `(label: &str, disabled: bool, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node`（`label` は `aria-label` へ出力） |
| `stylesheet` | `() -> String`（決定的な静的 CSS 全量） |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/themes/attachment/
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- `variant` / `state` / `disabled` は headless 層が出力する `data-variant` / `data-state` / `data-disabled` を CSS セレクタとして参照するだけで、class ベースの軸も `ColorPalette` 軸も持たない
- `image` 形態の `actions` は `@media (hover: hover)` 配下でのみ既定非表示（`root` の hover / focus-within で表示）。hover 機構を持たないタッチ端末では `opacity: 1`（常時表示）のまま残り、操作不能にならない
- `progress` は attachment scope の単純なスロットで `Progress`（headless-ui）を委譲しない。アップロード進捗の表示は呼び出し側がスタイル済み `progress`（root / track / range）を中身へ入れ子にする
- `name` / `meta` は整形済み文字列を受け取るだけ。byte → KB 変換、アップロード進捗の判定、エラー分類、削除処理は実装しない
- `action` はゴーストボタン（`type="button"` 固定、`label` が空文字列でないときのみ `aria-label`）。`disabled` はネイティブ `disabled` と `data-disabled` の両方に反映され、`root` の disabled（opacity 0.5 + cursor: not-allowed）とは独立（二重減衰回避のため `action` 自身は `cursor: not-allowed` のみ）
- `error` 状態は `root` の枠色と `meta` の文字色を `var(--fandhe-color-danger)` に切り替える
- 画像形態の幅は `--fandhe-attachment-image-width`（既定 `12rem`）

## Related

- [Primitives: Attachment](../../primitives/display/attachment.md)
- [Message](./message.md)
- [Bubble](./bubble.md)
