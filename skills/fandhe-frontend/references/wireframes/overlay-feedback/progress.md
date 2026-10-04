# Progress (wireframe)

`fandhe-frontend-wireframe-ui` の進捗表示のプレースホルダー。バー形・円形の 2 通りで「ここに進捗が表示される」という配置を示す。API は `progress(value, shape, size)` の 3 引数。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/progress.rs
#[must_use]
pub fn progress(value: u8, shape: ProgressShape, size: Size) -> Node

#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub enum ProgressShape {
    #[default]
    Bar,    // 水平のバー形（既定）
    Circle, // 円形（conic-gradient + くり抜きで表現）
}

// 呼び出し例（docs-site demo より）
use fandhe_frontend_wireframe_ui::{progress, ProgressShape, Size};

progress(80, ProgressShape::Bar, Size::Md)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| value | `u8` | - | 進捗率（%）。100 超は 100 へクランプし、5 刻みへ量子化（四捨五入相当）してから固定 class を付与する。 |
| shape | `ProgressShape` | `ProgressShape::Bar` | 表示形状（Bar/Circle）。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。 |

### ProgressShape

| Variant | Description |
|---------|-------------|
| `Bar` | 水平のバー形（既定）。 |
| `Circle` | 円形（`conic-gradient` + くり抜きで表現）。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/progress/
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の同名コンポーネントとは別物。実際に値が変化する進捗表示としては出力しない。操作・更新できる進捗表示が必要な場合は Themes / Primitives の Progress を使う
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- `ProgressShape` は bool 引数ではなく部品ローカルの列挙型（Rust API Guidelines が bool 引数を推奨しないため）
- `value: u8` は `slider` と同じ規則で 0〜100 へクランプしたうえで 5 刻みへ丸め、固定 class `fw-wire-progress-value-<q>` を付与する（例: 42 → 40）。`style="--…: 42%"` のような動的属性や `data-value` は出力しない
- Circle は `mask` ではなく `conic-gradient` の背景と、中央に重ねた `fw-wire-progress-hole` 要素（内側を紙面色でくり抜く）で描く
- `<progress>` 要素・`role="progressbar"`・`aria-valuenow` / `aria-valuemin` / `aria-valuemax` は出力しない。値の変化・アニメーションも実装しない（不確定進捗〔indeterminate〕・スピナーは `spinner` の対象）
- `Active` / `Disabled` は持たず、ラベルやパーセント値のテキスト表示もない
- 配色はグレースケール（`--fw-wire-ink` / `--fw-wire-fill` のコントラスト）

## Related

- [Overlay & Feedback overview](./overview.md)
- [Spinner (wireframe)](./spinner.md)
- [共通型 (Size ほか)](../foundations/common-types.md)
- [Progress (Themes)](../../themes/feedback/progress.md)
- [Progress (Primitives)](../../primitives/display/progress.md)
