# Kbd

キーボード入力・ショートカット表示のための `<kbd>` を組み立てる styled 部品。`variant`/`size`/`colorPalette` の 3 軸を持つ。pre-styled-only の `group` パーツで複数の `kbd` を組み合わせ表示できる。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::kbd::{kbd, KbdProps};

let node = kbd(&KbdProps::default(), vec![], vec![/* children */]);
```

`kbd(props: &KbdProps, attrs, children) -> Node`、`group(attrs, children) -> Node`。`css() -> String` が静的 CSS 全量を返す。

## Anatomy

```
root (kbd)
group (kbd)   （pre-styled-only。複数の root を横並びにするレイアウト専用）
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `KbdProps.variant` | `KbdVariant` (`Raised`/`Subtle`/`Outline`) | `Raised` | `Raised` はキー押下風の立体表現（枠線 + 下枠強調）+ 淡色背景、`Subtle` は淡色背景のみ、`Outline` は輪郭のみ |
| `KbdProps.size` | `Size` | `Md` | サイズ |
| `KbdProps.palette` | `ColorPalette` | `Neutral` | colorPalette 軸（chakra Kbd の既定 `gray` に対応） |

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。
- `kbd` は呼び出し側 `attrs` の `class` を破棄して recipe 由来のクラスに差し替える。`group` は recipe 由来クラスを持たず、`class` をそのまま通す。
- `font-family` は mono フォントトークンが存在しないため固定のフォントスタック文字列を直接宣言する。

## Related

- [Code](./code.md)
