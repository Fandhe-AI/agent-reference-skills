# Breadcrumbs (wireframe)

`fandhe-frontend-wireframe-ui` のパンくずリスト風プレースホルダー。上位階層から現在ページへ至る経路の配置イメージだけを示す非インタラクティブな部品。API は `breadcrumbs(items, size)` の 2 引数で、props 構造体は導入していない。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/breadcrumbs.rs
#[must_use]
pub fn breadcrumbs(items: &[&str], size: Size) -> Node

// 呼び出し例（docs-site demo より）
use fandhe_frontend_wireframe_ui::{breadcrumbs, Size};

breadcrumbs(&["ホーム", "商品", "詳細"], Size::Md)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| items | `&[&str]` | - | 上位階層から現在ページの順で並べる階層ラベル列。項目数の上限はなく、空スライスでも panic しない。最後の項目には常に選択インジケータ（data-active）が付く。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。フォントサイズに反映される。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/breadcrumbs/
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の同名コンポーネントとは別物。`nav` / `ol` / `li` / `a[href]` / `aria-current` のいずれも実装しない。操作可能なパンくずが必要な場合は Themes / Primitives の Breadcrumb を使う
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- ルートは `div`。`role` / `aria-*` / `tabindex` / `on*` / `href` は出力しない
- 階層ラベルは `items: &[&str]` 1 引数で受ける（固定スロットではない）
- 現在階層は引数を持たず、`items` が空でない限り常に最後の項目へ既存の共通型 `Active`（`data-active`）を自動付与する。新規の `Current` 等の型は新設していない
- 区切り記号は CSS 擬似要素のみで描く（`stepper` の連結線と同じ先例）。DOM へ区切りノード・テキストを出力しない
- `Orientation` / `Disabled` / `Bold` / `Primary`・先頭のホームアイコン `Node` スロット・中間階層の省略（「…」折りたたみ）は持たない（必要なら `rich_text` / `icon` 等との合成）
- 現在項目は `--fw-wire-ink`、非現在項目は `--fw-wire-ink-muted`、区切りは `--fw-wire-line` 系のグレースケール
- 視覚的な参照元は blocks.pm の Breadcrumbs 部品。ライセンス上の理由によりスクリーンショットは掲載されない

## Related

- [Navigation overview](./overview.md)
- [共通型 (Size / Active ほか)](../foundations/common-types.md)
- [Breadcrumb (Themes)](../../themes/navigation/breadcrumb.md)
- [Breadcrumb (Primitives)](../../primitives/navigation/breadcrumb.md)
