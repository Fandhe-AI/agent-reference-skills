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

let node = root(&CalloutProps::default(), vec![], vec![
    text(vec![], vec![]),
]);

pub fn root<'a>(props: &CalloutProps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn icon<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn text<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn css() -> String
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `CalloutProps.variant` | `CalloutVariant` | `Soft` | `Soft` / `Surface` / `Outline` の見た目 |
| `CalloutProps.size` | `Size` | `Md` | `Sm` / `Md` / `Lg` |
| `CalloutProps.palette` | `ColorPalette` | `Accent` | `Accent` / `Info` / `Success` / `Warning` / `Danger` |

## Notes

- `root` は `role`/`aria-*` を一切付与しない（本文中の静的な補足情報であり live region ではない）
- `text` は `size` 引数を取らない。font-size は `root` の `--fandhe-callout-font-size` custom property から継承して決まる（`root` と `text` へ同じ `size` を渡す必要があった旧設計の揃え漏れを解消）
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [Alert](./alert.md)
