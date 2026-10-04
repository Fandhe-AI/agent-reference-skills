# Checkbox (wireframe)

`fandhe-frontend-wireframe-ui` のチェックボックス風プレースホルダー。正方形のボックス + 任意のラベルを持つ非インタラクティブな部品。`<input type="checkbox">` は出力しない。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/checkbox.rs
#[must_use]
pub fn checkbox(label: Option<&str>, size: Size, active: Active, disabled: Disabled) -> Node

// 呼び出し例
use fandhe_frontend_wireframe_ui::{checkbox, Active, Disabled, Size};

checkbox(
    Some("利用規約に同意する"),
    Size::Md,
    Active(true),
    Disabled(false),
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| label | `Option<&str>` | `None` | 省略可能なラベル文言。`None` のときラベルのパート要素自体を出力しない。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。ボックス寸法・フォントサイズに反映される。 |
| active | `Active` | `Active(false)` | チェック済み状態。true のとき `data-active=""` を付与し、ボックス内へチェックグリフを描画する。 |
| disabled | `Disabled` | `Disabled(false)` | true のとき `data-disabled=""` を付与する（見た目のみ。操作不能を実装するものではない）。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/checkbox/
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の同名 Checkbox とは別物。操作可能なチェックボックスが必要な場合は Themes / Primitives の Checkbox を使う
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- ルートは `div`。`role` / `aria-checked` / `tabindex` / `on*` は出力しない（チェックグリフの装飾用 `aria-hidden="true"` を除く）
- チェック済みは専用 `Checked` 型を新設せず共通型 `Active`（`data-active`）を再利用する。`false` のときはグリフ自体を出力しない（CSS での非表示にはしない）
- ラベル有無とラベル文言は `label: Option<&str>` 1 引数に畳み込む
- `Primary` / `Bold` / `Orientation` は付与しない
- チェック済みはボックスを `--fw-wire-ink` 背景・`--fw-wire-paper` 文字色へ反転する

## Related

- [Forms overview](./overview.md)
- [共通型 (Size / Active / Disabled)](../foundations/common-types.md)
- [Checkbox (Themes)](../../themes/forms/checkbox.md)
- [Checkbox (Primitives)](../../primitives/form/checkbox.md)
