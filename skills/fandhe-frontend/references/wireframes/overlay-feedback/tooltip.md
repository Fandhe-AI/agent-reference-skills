# Tooltip (wireframe)

`fandhe-frontend-wireframe-ui` の吹き出しのプレースホルダー。本文 + 三角形の指示子（矢印）からなり、画面設計図で「ここに補足の吹き出しが出る」という配置を示す。API は `tooltip(label, side, size)` の 3 引数。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/tooltip.rs
#[must_use]
pub fn tooltip(label: &str, side: TooltipSide, size: Size) -> Node

#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub enum TooltipSide {
    #[default]
    Top,    // 対象の上に出る（既定）。矢印は下辺から下向き
    Right,  // 対象の右に出る。矢印は左辺から左向き
    Bottom, // 対象の下に出る。矢印は上辺から上向き
    Left,   // 対象の左に出る。矢印は右辺から右向き
}

// 呼び出し例（docs-site demo より）
use fandhe_frontend_wireframe_ui::tooltip::TooltipSide;
use fandhe_frontend_wireframe_ui::{tooltip, Size};

tooltip("補足説明", TooltipSide::Top, Size::Md)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| label | `&str` | - | 吹き出しの本文。 |
| side | `TooltipSide` | `TooltipSide::Top` | 吹き出しが対象のどちら側に出るか（top/right/bottom/left）。矢印は反対側の辺に付く。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。 |

### TooltipSide

| Variant | Description |
|---------|-------------|
| `Top` | 対象の上に出る（既定）。矢印は下辺から下向き。 |
| `Right` | 対象の右に出る。矢印は左辺から左向き。 |
| `Bottom` | 対象の下に出る。矢印は上辺から上向き。 |
| `Left` | 対象の左に出る。矢印は右辺から右向き。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/tooltip/
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の同名コンポーネントとは別物。ホバー・フォーカスで開閉する tooltip としては出力しない。操作できる tooltip が必要な場合は Themes / Primitives の Tooltip を使う
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- `side` は Themes の `side`（Floating UI 相当）と同じ意味で「吹き出しが対象のどちら側に出るか」。矢印は反対側の辺から対象の方を向く
- 方向は `data-*` ではなく修飾 class `fw-wire-tooltip-side-<top|right|bottom|left>` で表す（表示状態ではないため）
- `role="tooltip"` / `aria-*`（`aria-describedby` 等を含む）/ `title` 属性は出力しない。対象要素（トリガー）のスロットや対象への位置合わせ（Floating UI 相当の計算）も持たない。対象と組み合わせた配置イメージは `stack` / `button` 等との合成で示す
- `Bold` / `Primary` / `Disabled` / `Active`・アイコンスロットは持たない
- 配色はグレースケール（`--fw-wire-ink-muted` の地に `--fw-wire-paper` の文字）
- 視覚的な参照元は blocks.pm の Tooltip カタログ。ライセンス上の理由によりスクリーンショットは掲載されない

## Related

- [Overlay & Feedback overview](./overview.md)
- [共通型 (Size ほか)](../foundations/common-types.md)
- [Tooltip (Themes)](../../themes/overlays/tooltip.md)
- [Tooltip (Primitives)](../../primitives/overlays/tooltip.md)
