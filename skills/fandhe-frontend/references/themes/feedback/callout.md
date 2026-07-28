# Callout

本文フロー中に置く補足情報を強調表示する単一 recipe styled 部品。Alert と異なり `role`/`aria-*` を一切付与しない静的な装飾部品（live region ではない）。

## Anatomy

```
root
  icon
  text
```

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::callout::{root, text, CalloutProps};
use fandhe_frontend_pre_styled_ui::Size;

let node = root(&CalloutProps::default(), vec![], vec![
    text(Size::Md, vec![], vec![]),
]);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `CalloutProps.variant` | `CalloutVariant` | `Soft` | `Soft` / `Surface` / `Outline` の見た目 |
| `CalloutProps.size` | `Size` | `Md` | `Sm` / `Md` / `Lg` |
| `CalloutProps.palette` | `ColorPalette` | `Accent` | `Accent` / `Info` / `Success` / `Warning` / `Danger` |

## Notes

- `root` は `role`/`aria-*` を一切付与しない（本文中の静的な補足情報であり live region ではない）
- `text` パーツは `root` と同じ `size` を渡す必要がある（`text` slot 用のフォントサイズ variant は `text` 要素自身へのクラス付与を前提とする複合セレクタのため）
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [Alert](./alert.md)
