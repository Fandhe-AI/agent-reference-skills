# Tabs (wireframe)

`fandhe-frontend-wireframe-ui` のタブ列風プレースホルダー。タブ項目の並び + 選択中インジケータの配置イメージだけを示す非インタラクティブな部品。API は `tabs(items, active, orientation, size)` の 4 引数で、props 構造体は導入していない。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/tabs.rs
#[must_use]
pub fn tabs(items: &[&str], active: Option<usize>, orientation: Orientation, size: Size) -> Node

// 呼び出し例（docs-site demo より）
use fandhe_frontend_wireframe_ui::{tabs, Orientation, Size};

tabs(
    &["概要", "詳細", "設定"],
    Some(0),
    Orientation::Horizontal,
    Size::Md,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| items | `&[&str]` | - | タブのラベル列。項目数の上限はなく、空スライスでも panic しない。 |
| active | `Option<usize>` | `None` | 選択中タブの添字。`None` または範囲外の値のときはどの項目にも選択インジケータを付けない。 |
| orientation | `Orientation` | `Orientation::Horizontal` | 水平/垂直。垂直時は選択インジケータが側線として表示される。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。フォントサイズに反映される。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/tabs/
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の同名コンポーネントとは別物。`role="tablist"` / `role="tab"`・`aria-selected`・実際のパネル切り替えのいずれも実装しない。操作可能なタブが必要な場合は Themes / Primitives の Tabs を使う
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- ルートは `div`。`role` / `aria-*` / `tabindex` / `on*` は出力しない
- タブラベルは固定スロットではなく `items: &[&str]` 1 引数で受ける
- 選択状態は `active: Option<usize>`（「選択中は高々 1 件」を型で保証）。既存の共通型 `Active` は項目ごとの `data-active` 出力にのみ用いる。`None` または範囲外は選択インジケータなし
- `Orientation` を必須引数に取る（`props.rs` の doc が消費者として stack / divider / tabs / slider を明記）
- `Disabled` / `Bold` / `Primary`・アイコンスロット・パネル領域は持たない（パネルが必要なら `Frame` 等との合成）
- 選択中項目は `--fw-wire-ink`、非選択項目は `--fw-wire-ink-muted`、選択中の背景は `--fw-wire-fill-subtle`
- 視覚的な参照元は blocks.pm の Tabs 部品。ライセンス上の理由によりスクリーンショットは掲載されない

## Related

- [Navigation overview](./overview.md)
- [共通型 (Size / Orientation / Active ほか)](../foundations/common-types.md)
- [Tabs (Themes)](../../themes/disclosure/tabs.md)
- [Tabs (Primitives)](../../primitives/disclosure/tabs.md)
