# Divider (wireframe)

`fandhe-frontend-wireframe-ui` の区切り線部品。水平 / 垂直の線に、任意で中央へラベルを置ける非インタラクティブなローファイ・プレースホルダー。セクション間・項目間の視覚的な区切りを表現する用途を想定する。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/divider.rs
#[must_use]
pub fn divider(label: Option<&str>, size: Size, orientation: Orientation) -> Node

// 呼び出し例
use fandhe_frontend_wireframe_ui::{divider, Orientation, Size};

divider(Some("または"), Size::Md, Orientation::Horizontal)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| label | `Option<&str>` | `None` | 線の中央に置く省略可能なラベル文言。`None` のときはラベルパート要素自体が出力されない。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。ラベルのフォントサイズと垂直方向の最小長さに反映される。線の太さは固定で連動しない。 |
| orientation | `Orientation` | `Orientation::Horizontal` | 水平 / 垂直。垂直時はルートが縦積みのフレックスコンテナになる。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/divider/
- 低忠実度のワイヤーフレーム部品。Primitives / Themes に同名の Divider は無く、本部品は `fandhe-frontend-wireframe-ui` 固有。`role="separator"` + `aria-orientation` 連動のアクセシブルな区切り線が必要な場合は Themes の Separator を使う
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- `hr` は使わず、ルートは `div` + `::before` / `::after` 擬似要素で線を描く（垂直・ラベル付きを表現できないため）。`role="separator"` も付与しない
- `Size` はラベルのフォントサイズと垂直方向の最小長さ（`--fw-wire-control-size`）に反映される。線の太さ（`--fw-wire-line-width`）は固定
- `role` / `aria-*` / `tabindex` は付与せず、`button` / `a[href]` も出力しない
- 視覚的な参照元は blocks.pm の Divider 部品。API は `Size` 軸 + 方向 + 省略可能テキストから独立設計されている

## Related

- [Layout overview](./overview.md)
- [共通型 (Size / Orientation)](../foundations/common-types.md)
- [Separator (Themes)](../../themes/utilities/separator.md)
