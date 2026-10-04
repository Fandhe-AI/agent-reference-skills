# Wireframe 共通型

`fandhe-frontend-wireframe-ui` の複数 wireframe 部品が共有する修飾型。`Size`（`src/size.rs`）と `Bold` / `Primary` / `Active` / `Disabled` / `Orientation`（`src/props.rs`）で、いずれもクレートルートから再エクスポートされる。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/lib.rs（再エクスポート）
pub use props::{Active, Bold, Disabled, Orientation, Primary};
pub use size::Size;

// src/size.rs
#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub enum Size {
    Xs,
    Sm,
    #[default]
    Md,
    Lg,
    Xl,
}

impl Size {
    pub const ALL: [Size; 5] = [Size::Xs, Size::Sm, Size::Md, Size::Lg, Size::Xl];
    pub const fn as_str(self) -> &'static str   // "xs" 〜 "xl"
    pub const fn class(self) -> &'static str    // "fw-wire-size-<段階>"
}

// src/props.rs
#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub struct Bold(pub bool);
pub struct Primary(pub bool);
pub struct Active(pub bool);
pub struct Disabled(pub bool);
// いずれも #[derive(Debug, Clone, Copy, PartialEq, Eq, Default)] と impl From<bool>

#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub enum Orientation {
    #[default]
    Horizontal,
    Vertical,
}

// 呼び出し例（button の docs-site demo より）
use fandhe_frontend_wireframe_ui::{button, Disabled, Primary, Size};

button("送信", None, Size::Md, Primary(false), Disabled(false))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Size` | enum（`Xs` / `Sm` / `Md` / `Lg` / `Xl`） | `Md` | サイズ段階。class `fw-wire-size-<段階>` を付与し、`--fw-wire-font-size` / `--fw-wire-control-size` をスコープ付きで定義する |
| `Bold` | `Bold(bool)` | `Bold(false)` | 太字修飾。`true` のとき class `fw-wire-bold`（`Bold::class()`） |
| `Primary` | `Primary(bool)` | `Primary(false)` | 主要（強調）修飾。`true` のとき class `fw-wire-primary`（`Primary::class()`） |
| `Active` | `Active(bool)` | `Active(false)` | アクティブ状態。`true` のとき `data-active=""` 属性（`Active::attr()`） |
| `Disabled` | `Disabled(bool)` | `Disabled(false)` | 無効状態。`true` のとき `data-disabled=""` 属性（`Disabled::attr()`） |
| `Orientation` | enum（`Horizontal` / `Vertical`） | `Horizontal` | 方向。class `fw-wire-horizontal` / `fw-wire-vertical`（`Orientation::class()`） |

`Size` の段階値（`SCALE`、クレート内限定）:

| Size | font-size | control-size |
|------|-----------|--------------|
| Xs | 0.75rem | 1.5rem |
| Sm | 0.875rem | 1.75rem |
| Md | 1rem | 2rem |
| Lg | 1.125rem | 2.5rem |
| Xl | 1.25rem | 3rem |

## Notes

- 出典: https://docs.rs/crate/fandhe-frontend-wireframe-ui/0.52.0/source/src/size.rs / https://docs.rs/crate/fandhe-frontend-wireframe-ui/0.52.0/source/src/props.rs
- Wireframes 専用の独立型。Themes の `recipe::Size` とは段階名（`xs` / `sm` / `md` / `lg` / `xl`）のみ一致し、`SlotRecipe` / `VariantValue` トレイトは実装しない。headless-ui / pre-styled-ui への依存は持たない
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- 型は 2 系統: 視覚修飾（`Bold` / `Primary`）は class を付与し、表示状態（`Active` / `Disabled`）は `data-*` 属性を付与する。対話セマンティクス（`role` / `aria-*` / `tabindex`）に相当する型は意図的に持たない
- `Active` の意味は部品ごとに異なる（Select / Input / Textarea / Slider ではフォーカス風の強調、Checkbox ではチェック済み、Radio では選択済み、Switch では ON、Calendar では選択日、Stepper では現在ステップ、Ratings では塗りの星）。詳細は各ページの Notes を参照
- 本クレートで `Primary` を受ける部品は button / tag / image / counter / annotation、`Bold` は paragraph / text / rich_text / link、`Orientation` は slider / stack / divider / tabs / nav_item / chart / rich_text（`src` のシグネチャ検索による）
- `Size::class()` を直接ルートへ付与すると `--fw-wire-font-size` が子孫へ継承される。Stack の gap と Frame の padding は、この副作用を避けるため専用 class を使う（Grid は `gap.class()` をそのまま付与する）

## Related

- [Forms overview](../forms/overview.md)
- [Layout overview](../layout/overview.md)
- [Button (wireframe)](../forms/button.md)
