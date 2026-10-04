# Stack (wireframe)

`fandhe-frontend-wireframe-ui` の純粋なレイアウトコンテナ部品。子要素を縦または横に等間隔で並べる。blocks.pm に対応部品はなく、wireframe-ui 独自の追加部品。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/stack.rs
#[must_use]
pub fn stack(children: Vec<Node>, orientation: Orientation, gap: Size) -> Node

// 呼び出し例
use fandhe_frontend_wireframe_ui::{annotation, stack, Orientation, Primary, Size};

stack(
    vec![
        annotation("A", None, Size::Md, Primary(false)),
        annotation("B", None, Size::Md, Primary(false)),
        annotation("C", None, Size::Md, Primary(false)),
    ],
    Orientation::Vertical,
    Size::Md,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| children | `Vec<Node>` | - | 並べる子ノード列。渡した順序どおりに描画される（空でもルート div は出力される）。 |
| orientation | `Orientation` | `Orientation::Horizontal` | 並べる方向。Horizontal は行方向、Vertical は列方向。 |
| gap | `Size` | `Size::Md` | 子要素間の間隔（xs〜xl の 5 段）。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/stack/
- 低忠実度のワイヤーフレーム部品。Primitives / Themes に同名の Stack は無く、本部品は `fandhe-frontend-wireframe-ui` 固有
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- 方向は新型を導入せず共通型 `Orientation`（`Horizontal` 既定 / `Vertical`）を再利用する
- `children` は `Vec<Node>` 所有渡し（借用の `&[Node]` ではない）
- gap は共有 `fw-wire-size-*` ではなく Stack 専用 class `.fw-wire-stack.fw-wire-stack-gap-<段階>`（`0.25rem`〜`2rem`）で表現する。共有 class は `--fw-wire-font-size` / `--fw-wire-control-size` も定義して子孫へ継承され、子部品の文字・コントロールサイズまで変えてしまうため
- `role` / `aria-*` / `tabindex` / `style` / `data-*` は付与せず、対話要素も出力しない

## Related

- [Layout overview](./overview.md)
- [共通型 (Size / Orientation)](../foundations/common-types.md)
- [Grid (wireframe)](./grid.md)
- [Frame (wireframe)](./frame.md)
