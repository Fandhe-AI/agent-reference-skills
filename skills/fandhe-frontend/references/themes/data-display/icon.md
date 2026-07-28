# Icon

インライン SVG の寸法・配色を統一する `<svg>` ラッパー。SVG 本体（`path` 等）は持たず、呼び出し側が構築したノード木を `children` として渡す。

## Signature / Usage

```rust
use fandhe_frontend_core::el;
use fandhe_frontend_pre_styled_ui::icon::{icon, IconProps};

let node = icon(
    &IconProps::default(),
    vec![],
    vec![el("path", vec![("d", "M12 2L2 22h20z")], vec![])],
);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `Size` (`Sm`/`Md`/`Lg`) | `Md` | 寸法（1rem/1.5rem/2rem） |
| `label` | `Option<&str>` | `None` | アクセシブルネーム。`Some` で `role="img"` + `aria-label`、`None` で `aria-hidden="true"` |
| `view_box` | `&str` | `"0 0 24 24"` | `viewBox` 属性値 |

## Notes

- `fill="currentColor"` を固定付与し、色制御は祖先の `color` プロパティ経由に一本化する。`color-palette` 軸は提供しない。
- `focusable="false"` で IE 系の既定フォーカス挙動を抑止する。
- children の SVG 属性にも `fandhe_frontend_core::render` の既定エスケープと URL 属性検証（`xlink:href` 等）がそのまま適用される。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Image](./image.md)
