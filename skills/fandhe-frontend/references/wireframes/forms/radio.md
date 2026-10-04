# Radio (wireframe)

`fandhe-frontend-wireframe-ui` のラジオボタン風プレースホルダー。円形コントロール + 任意のラベル + サイズ / 選択 / 無効状態を持つ非インタラクティブな部品。`<input type="radio">`・`role="radio"`・選択状態の遷移は実装しない。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/radio.rs
#[must_use]
pub fn radio(label: Option<&str>, size: Size, active: Active, disabled: Disabled) -> Node

// 呼び出し例
use fandhe_frontend_wireframe_ui::{radio, Active, Disabled, Size};

radio(Some("選択肢 B"), Size::Md, Active(true), Disabled(false))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| label | `Option<&str>` | `None` | 省略可能なラベル文言。`None` のときラベルパート要素自体を出力しない。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。円の直径・フォントサイズに反映される。 |
| active | `Active` | `Active(false)` | true のとき `data-active=""` を付与する（選択済み＝内側の黒丸ありを表す表示状態）。 |
| disabled | `Disabled` | `Disabled(false)` | true のとき `data-disabled=""` を付与する（見た目のみ。操作不能を実装するものではない）。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/radio/
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の Radio Group とは別物。操作可能なラジオが必要な場合は Themes / Primitives の Radio Group を使う
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- ルートは `div`。`role` / `aria-*` / `tabindex` / `on*` は出力しない
- ラベル有無は `label: Option<&str>` の `Some` / `None` に畳み込む
- 選択状態は専用 `Selected` / `Checked` 型を新設せず共通型 `Active` を再利用し、内側の黒丸は `::after` の CSS で描く。選択状態を表す共通型の統一（`data-selected` 等）は意図的にスコープ外
- `Disabled` は Forms 部品として整合させるため追加された表示状態軸
- グループ化・排他選択はモデル化しない。単体 1 個のみを表現し、ラジオグループ部品は無い（複数並べる場合は呼び出し側で `div` 等に並べる）
- 黒丸は `--fw-wire-ink` トークン経由

## Related

- [Forms overview](./overview.md)
- [共通型 (Size / Active / Disabled)](../foundations/common-types.md)
- [Radio Group (Themes)](../../themes/forms/radio-group.md)
- [Radio Group (Primitives)](../../primitives/form/radio-group.md)
