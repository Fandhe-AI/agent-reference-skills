# Attachment

添付ファイル 1 件の表示を表現する shadcn/ui Attachment 相当の部品。`root` / `media` / `content` / `name` / `meta` / `progress` / `actions` / `action` の 8 anatomy パーツを持つ。File Upload（選択・ドロップの入力側）とは異なり「表示側」を担う、状態機械を持たない静的部品。

## Signature / Usage

```rust
use fandhe_frontend_core::text;
use fandhe_frontend_headless_ui::attachment::{
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
        attachment::media(vec![], vec![]),
        attachment::content(vec![], vec![
            attachment::name(vec![], vec![text("report.pdf")]),
            attachment::meta(vec![], vec![text("PDF · 1.2 MB")]),
        ]),
        attachment::actions(vec![], vec![
            attachment::action("Remove report.pdf", false, vec![], vec![text("x")]),
        ]),
    ],
);
```

```rust
attachment::root(props: AttachmentRootProps, attrs, children) -> Node
attachment::media / content / name / meta / progress / actions (attrs, children) -> Node
attachment::action(label: &str, disabled: bool, attrs, children) -> Node
```

## Anatomy

典型的な入れ子の一例。ソースで裏付けられるのは `content` が `name` / `meta` を束ねること、`actions` が `action` 群を束ねること、`progress` が Progress のパーツを入れ子にするスロットであることのみ。

```
root
  media
  content
    name
    meta
  progress
  actions
    action
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `AttachmentRootProps.variant` | `AttachmentVariant` | `File` | `File`（種別アイコン）\| `Image`（画像プレビュー）。`data-variant` |
| `AttachmentRootProps.state` | `AttachmentState` | `Idle` | `Idle` \| `Uploading` \| `Error`。`data-state` |
| `AttachmentRootProps.disabled` | `bool` | `false` | `true` のとき `data-disabled`（presence） |
| `action: label` | `&str` | 必須 | 空文字列でないときのみ `aria-label`。アイコンのみのボタンでは必ず渡す |
| `action: disabled` | `bool` | 必須 | ネイティブ `disabled` と `data-disabled` の両方に反映 |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| root | `data-variant` | `file` \| `image` |
| root | `data-state` | `idle` \| `uploading` \| `error` |
| root / action | `data-disabled` | presence |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/primitives/attachment/
- 会話系部品（message / bubble / attachment / marker）が共有する `data-role` / `data-align` は意図的に持たない。添付ファイルは常に message / bubble の `content` スロット内に置かれ、整列は親から継承する。
- `media` は画像プレビューまたは種別アイコンを受けるスロットで、独自の `data-variant` は持たない（`[data-variant="image"] [data-part="media"]` の子孫セレクタで分岐する）。
- `name` / `meta` は整形済み文字列を children で受けるだけのスロット。byte → KB 変換等の整形は行わない。
- `progress` は attachment scope の単純なスロット。Progress のパーツ（`root` / `track` / `range` 等）を入れ子にする契約で、両 scope は独立して残る。
- `action` は `button type="button"` 固定（フォーム内での意図しない submit を防ぐ）。削除処理自体はアプリケーション側の責務。
- 自前 CSS の最小例: `[data-scope="attachment"][data-part="root"][data-state="error"] { border-color: #dc2626; }`。
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）。

## Related

- [File Upload](../form/file-upload.md)
- [Progress](./progress.md)
- [Message](./message.md)
- [Bubble](./bubble.md)
- [Attachment（Themes 版）](../../themes/data-display/attachment.md)
