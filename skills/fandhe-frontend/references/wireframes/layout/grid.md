# Grid (wireframe)

`fandhe-frontend-wireframe-ui` の列数固定グリッド配置部品。子ノード列を指定した列数のグリッドへ配置し、各セルは破線境界のプレースホルダーとして表示する。blocks.pm に対応部品はなく、wireframe-ui 独自の追加部品。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/grid.rs
/// `columns` の上限。これを超える値は本値へ、`0` は `1` へ丸める
/// （[`grid`] 参照）。
pub const MAX_COLUMNS: u32 = 12;

#[must_use]
pub fn grid(children: Vec<Node>, columns: u32, gap: Size) -> Node

// 呼び出し例
use fandhe_frontend_core::{div, text, Node};
use fandhe_frontend_wireframe_ui::{grid, Size};

/// Demo 内のプレーンテキストセルを組み立てる小さなヘルパー（docs-site より）。
fn cell(label: &str) -> Node {
    div(vec![], vec![text(label)])
}

grid(vec![cell("A"), cell("B"), cell("C")], 3, Size::Sm)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| children | `Vec<Node>` | - | グリッドへ配置する子ノード列。各要素は `fw-wire-grid-item` で 1 個ずつ包まれる。空なら item を出力しない。 |
| columns | `u32` | - | 列数。1〜12 へ丸める（0 は 1 へ、13 以上は 12 へ）。 |
| gap | `Size` | - | サイズ段階（xs〜xl）。セル間隔に反映される。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/grid/
- 低忠実度のワイヤーフレーム部品。Primitives / Themes に同名の Grid は無く、本部品は `fandhe-frontend-wireframe-ui` 固有
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- `children` は `Vec<Node>` 所有渡し（`fandhe_frontend_core::div` / `el_owned` と同じ設計、不要な `clone()` を避ける）
- `columns` は `MAX_COLUMNS`（12）で飽和させ、`0` は `1` へ丸める。極端な入力でも出力サイズが有界になるようにする設計判断
- `gap.class()`（`fw-wire-size-<段階>`）をルートへ付与するため、`--fw-wire-font-size` / `--fw-wire-control-size` も子孫へ継承される。各 wireframe 部品が自分の size class で上書きするため実害はない
- セル（`fw-wire-grid-item`）は実線境界の `Annotation` と区別するため破線（`dashed`）境界
- `role` / `aria-*` / `tabindex` は付与せず、`button` / `a[href]` も出力しない

## Related

- [Layout overview](./overview.md)
- [共通型 (Size)](../foundations/common-types.md)
- [Stack (wireframe)](./stack.md)
