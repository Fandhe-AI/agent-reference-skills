# Modal (wireframe)

`fandhe-frontend-wireframe-ui` のモーダルダイアログ風プレースホルダー。「中央に置かれたダイアログ枠（タイトル・本文・アクション行）」の配置イメージだけを示す非インタラクティブな部品。API は `modal(title, body, actions, size)` の 4 引数で、`body` / `actions` は既存の wireframe-ui 部品（`paragraph` / `text` / `button` 等）の戻り値をそのまま渡す `Node` スロット。blocks.pm に対応部品がなく wireframe-ui 独自追加。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/modal.rs
#[must_use]
pub fn modal(title: &str, body: Node, actions: Vec<Node>, size: Size) -> Node

// 呼び出し例（docs-site demo より）
use fandhe_frontend_wireframe_ui::{button, modal, paragraph, Bold, Disabled, Primary, Size};

modal(
    "アカウントを削除しますか？",
    paragraph(
        "この操作は取り消せません。関連するデータもすべて削除されます。",
        Size::Md,
        Bold(false),
    ),
    vec![
        button("キャンセル", None, Size::Md, Primary(false), Disabled(false)),
        button("削除する", None, Size::Md, Primary(true), Disabled(false)),
    ],
    Size::Md,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| title | `&str` | - | ダイアログのタイトル（常に太字で表示、見出し要素は使わない）。 |
| body | `Node` | - | 本文のスロット。`paragraph` / `text` 等の戻り値をそのまま渡す。 |
| actions | `Vec<Node>` | - | アクション行のスロット群。空のときはアクション行のパート要素自体を出力しない。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。パネルの最大幅にのみ効く。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/modal/
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の同名コンポーネントとは別物（名称は Dialog）。開閉状態・フォーカストラップ・Esc 操作などの対話は一切実装しない。操作可能なダイアログが必要な場合は Themes / Primitives の Dialog を使う
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- `actions` は `&[Node]` ではなく `Vec<Node>` の所有渡し（core のノード木 API・他の wireframe-ui 部品と同じ。`&[Node]` だと呼び出し側で不要な `clone()` が必要になるため）
- `position: fixed` / `absolute` / `z-index` は使わない。ルートは in-flow のブロック（`display: grid; place-items: center;`）で、内側のパネルを中央寄せする
- `<dialog>` / `role` / `aria-*`（`aria-modal` 含む）/ `tabindex` / `style` / `<button>` / `<form>` / `<input>` / `<a href>` は出力しない
- タイトルは `h1`〜`h6` ではなく `div`（見た目は `font-weight: 600`）。docs ページの目次・検索インデックスに見出しとして混入させないため
- 閉じるボタン・開閉状態の表示軸（`Active` / `Disabled` 等）は持たず、パネルの中身は常に「開いた状態」の 1 枚絵
- `size` はパネル最大幅にのみ効き、共有 `fw-wire-size-*` class は使わない（Modal 専用の `fw-wire-modal-max-width-<段階>` 修飾 class）。`body` / `actions` スロットへフォントサイズが暗黙に継承されない
- 配色はグレースケール（`--fw-wire-ink` / `--fw-wire-ink-muted` / `--fw-wire-paper` / `--fw-wire-fill-subtle` / `--fw-wire-line`）。docs-site では `fandhe_frontend_core::text` と同名のため `fandhe_frontend_wireframe_ui::text` を `wireframe_text` にリネームして import している

## Related

- [Overlay & Feedback overview](./overview.md)
- [共通型 (Size / Primary / Disabled ほか)](../foundations/common-types.md)
- [Dialog (Themes)](../../themes/overlays/dialog.md)
- [Dialog (Primitives)](../../primitives/overlays/dialog.md)
