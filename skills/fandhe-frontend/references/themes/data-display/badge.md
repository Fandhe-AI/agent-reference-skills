# Badge

ラベル・件数等の小さな情報を強調表示する単一パーツの styled コンポーネント。削除操作（close trigger）を持たない点で `Tag` と異なる。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::badge::{badge, BadgeProps};
use fandhe_frontend_core::text;

let node = badge(&BadgeProps::default(), vec![], vec![text("New")]);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `BadgeVariant` (`Solid`/`Subtle`/`Outline`) | `Subtle` | 塗り方 |
| `size` | `Size` (`Sm`/`Md`/`Lg`) | `Md` | サイズ |
| `palette` | `ColorPalette` (`Accent`/`Info`/`Success`/`Warning`/`Danger`) | `Accent` | セマンティック色 |

## Notes

- `root`（`<span>`）1 パーツのみ。`role`/`aria-*` は付与しない（chakra-ui v3 準拠の最小サブセット）。意味を伝える必要がある場合は周囲テキストで補う。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Tag](./tag.md)
- [Status](./status.md)
