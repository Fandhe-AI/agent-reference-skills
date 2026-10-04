# Wireframes: Layout

`fandhe-frontend-wireframe-ui` の Layout カテゴリ（4 部品）。画面設計図上で領域をまとめ、並べ、区切るための非インタラクティブな低忠実度コンテナ群。

## Signature / Usage

| 名前 | 関数 | 説明 | 個別ページ |
|------|------|------|-----------|
| Divider | `divider` | 水平 / 垂直の区切り線 + 任意の中央ラベル | [divider.md](./divider.md) |
| Frame | `frame` | padding と境界線だけを持つ矩形コンテナ | [frame.md](./frame.md) |
| Grid | `grid` | 列数固定（1〜12）グリッド。各セルは破線境界 | [grid.md](./grid.md) |
| Stack | `stack` | 子要素を縦または横に等間隔で並べるコンテナ | [stack.md](./stack.md) |

カテゴリ共通の使い方（`Vec<Node>` の子ノードを渡して合成する。Frame / Grid / Stack は互いに入れ子にできる）:

```rust
use fandhe_frontend_core::{p, text};
use fandhe_frontend_wireframe_ui::{annotation, frame, Primary, Size};

frame(
    vec![
        annotation("配置メモ", None, Size::Sm, Primary(false)),
        p(vec![], vec![text("フレーム内の段落。")]),
    ],
    Size::Md,
    true,
)
```

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/
- Layout 部品はすべて位置引数の関数で、props 構造体は無い。`children` は借用ではなく `Vec<Node>` の所有渡し
- Divider は Themes の Separator、Frame は Themes の Card と用途が近いが別物。Grid / Stack は Primitives / Themes に同名部品が無い（wireframe-ui 固有）
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- `role` / `aria-*` / `tabindex` は付与せず、`button` / `a[href]` 等の対話要素も出力しない
- 4 部品とも `Size` を引数に取るが、意味が異なる: Divider はラベルのフォントサイズと垂直方向の最小長さ、Frame は padding、Grid / Stack は gap（セル / 子要素間隔）
- Grid は 1〜12 列に飽和（`MAX_COLUMNS = 12`）。Frame は `frame_padding_css()` 補助関数も公開する
- Stack の gap と Frame の padding は専用 class で表現し、共有 `fw-wire-size-*` の継承副作用を避ける。Grid は `gap.class()` をルートへ付与する

## Related

- [共通型 (Size / Orientation)](../foundations/common-types.md)
- [Forms overview](../forms/overview.md)
