# Code

インラインコード片（`<code>`）を組み立てる単一 slot styled 部品。`variant`/`size`/`colorPalette` の 3 軸を持つ。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::code::{code, CodeProps};

let node = code(&CodeProps::default(), vec![], vec![/* children */]);
```

`code(props: &CodeProps, attrs, children) -> Node`。`css() -> String` が静的 CSS 全量を返す。

## Anatomy

```
root (code)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `CodeProps.variant` | `CodeVariant` (`Solid`/`Subtle`/`Outline`) | `Subtle` | 見た目。`Solid` は塗りつぶし、`Subtle` は淡色背景、`Outline` は輪郭のみ |
| `CodeProps.size` | `Size` (`Xs`/`Sm`/`Md`/`Lg`/`Xl`) | `Md` | サイズ |
| `CodeProps.palette` | `ColorPalette` | `Neutral` | colorPalette 軸（chakra Code の既定 `gray` に対応） |

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。
- 呼び出し側 `attrs` の `class` は破棄され、recipe 由来のクラスに差し替わる。
- chakra-ui v3 の `CodeBlock`（複数行コードブロック）に相当する機能は対象外。インライン `<code>` のみを扱う。

## Related

- [Kbd](./kbd.md)
