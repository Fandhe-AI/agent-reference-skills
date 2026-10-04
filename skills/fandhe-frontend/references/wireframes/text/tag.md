# Tag

分類・キーワードラベルを示す、ピル形状の非インタラクティブなローファイ・プレースホルダー。`label`（タグ文言）・`size`・`primary`（強調・反転色）・`remove`（削除「×」アイコンスロット。見た目のみ）を受け取る。

## Signature / Usage

```rust
pub fn tag(label: &str, size: Size, primary: Primary, remove: Option<Node>) -> Node
```

```rust
use fandhe_frontend_wireframe_ui::{icon, tag, Primary, Size};

tag("draft", Size::Md, Primary(false), None);
tag("removable", Size::Md, Primary(false), Some(icon::x(Size::Md)));
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| label | `&str` | - | 必須のタグ文言。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。フォントサイズに反映される。 |
| primary | `Primary` | `Primary(false)` | true のとき強調（反転色）バリアントにする。 |
| remove | `Option<Node>` | `None` | `Some(icon::x(size))` を渡すと削除「×」パートを出力する（見た目のみ、対話操作は行わない）。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/tag/
- 低忠実度ワイヤーフレーム部品。Themes の `Tag` とは別物で、`@ark-ui/react` / `@chakra-ui/react` の JS/TS API とも無関係（Rust 製）。操作可能なタグ入力・削除機能が必要な場合は Themes の Tag / Tags Input、または Primitives の Tags Input を使う。
- 原案差分: 削除「×」は §11.4 の `Option<Node>` スロット規約に従い（`link` の `trailing` と同型）、呼び出し側が `Some(icon::x(size))` を渡したときのみ出力する。
- `border-radius: 999px` の固定ピル形状。`primary` の反転時は削除アイコンの色を `--fw-wire-ink-muted` ではなく `--fw-wire-fill` に切り替える（コントラスト確保。`annotation` と同じ判断）。
- 非インタラクティブ: 削除「×」は `<button>` ではなく表示専用パート。`role` / `aria-*` / `tabindex` / 実際の削除操作は実装しない。
- スクリーンショットは非掲載（視覚的参照元は blocks.pm の Tag）。

## Related

- [Text wireframes](./overview.md)
- [Tag (Themes)](../../themes/data-display/tag.md)
