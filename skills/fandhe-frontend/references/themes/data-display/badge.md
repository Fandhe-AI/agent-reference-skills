# Badge

ラベル・件数等の小さな情報を強調表示する単一パーツの styled コンポーネント。削除操作（close trigger）を持たない点で `Tag` と異なる。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::badge::{badge, BadgeProps};
use fandhe_frontend_core::text;

let node = badge(&BadgeProps::default(), vec![], vec![text("New")]);
```

`badge(props: &BadgeProps, attrs, children) -> Node`。`link(href: &str, props: &BadgeProps, external: bool, attrs, children) -> Node` は Badge の見た目のまま `<a>` を出す専用コンストラクタ。`css() -> String` が静的 CSS 全量を返す。

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `BadgeVariant` (`Solid`/`Subtle`/`Outline`/`Surface`/`Plain`) | `Subtle` | 塗り方。`Surface` は淡色背景 + 輪郭、`Plain` は背景・枠線なし |
| `size` | `Size` (`Xs`/`Sm`/`Md`/`Lg`/`Xl`) | `Md` | サイズ |
| `palette` | `ColorPalette` (`Accent`/`Info`/`Success`/`Warning`/`Danger`/`Neutral`) | `Accent` | セマンティック色 |
| `shape` | `Option<Shape>` (`Pill`/`Circle`) | `None` | `None` は既定の角丸。`Pill` は両端を最大まで丸める。`Circle` は 1〜2 桁のカウントバッジを真円に保つ |
| `link: href` | `&str` | 必須 | リンク先。危険なスキーム（`javascript:` 等）は属性ごと出力されない |
| `link: external` | `bool` | 必須 | `true` で `target="_blank"` と `rel="noopener noreferrer"` を不可分に付与 |

## Notes

- `badge` は `root`（`<span>`）1 パーツのみ。`link` は同じ見た目の `<a>`。`link` の `href`/`target`/`rel` は呼び出し側 `attrs` による上書き不可の予約属性（`rel` の追加トークンは保護トークンの後ろへ統合され、`opener` は除外される）。`role`/`aria-*` は付与しない（chakra-ui v3 準拠の最小サブセット）。意味を伝える必要がある場合は周囲テキストで補う。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Tag](./tag.md)
- [Status](./status.md)
