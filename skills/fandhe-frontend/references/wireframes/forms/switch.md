# Switch (wireframe)

`fandhe-frontend-wireframe-ui` のトグルスイッチ風プレースホルダー。楕円トラック + つまみ + 任意のラベルを持つ非インタラクティブな部品。`<input type="checkbox">`・`role="switch"`・`aria-checked`・クリック操作は実装しない。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/switch.rs
#[must_use]
pub fn switch(label: Option<&str>, size: Size, active: Active, disabled: Disabled) -> Node

// 呼び出し例
use fandhe_frontend_wireframe_ui::{switch, Active, Disabled, Size};

switch(Some("通知"), Size::Md, Active(true), Disabled(false))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| label | `Option<&str>` | `None` | 省略可能なラベル文言。`None` のときはパート要素自体を出力しない。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。トラック寸法・フォントサイズに反映される。 |
| active | `Active` | `Active(false)` | true のとき `data-active=""` を付与する（本部品では ON 状態そのものを表す）。 |
| disabled | `Disabled` | `Disabled(false)` | true のとき `data-disabled=""` を付与する（見た目のみ。操作不能を実装するものではない）。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/switch/
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の同名 Switch とは別物。操作可能なスイッチが必要な場合は Themes / Primitives の Switch を使う
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- 共通型 `Active` の意味は部品ごとに異なる。Select 等ではフォーカス風の強調、本部品では ON 状態そのもの
- ラベル（Label(bool) + Text 相当）は `label: Option<&str>` 1 引数に畳み込み、`None` のときパート要素自体を出力しない
- `Disabled` は Forms A 家族との API 整合のために併用する状態軸
- `<input>` / `role="switch"` / `aria-checked` は出力しない（非対話制約）
- ON 状態は `--fw-wire-ink` トークン 1 段の反転で表現する

## Related

- [Forms overview](./overview.md)
- [共通型 (Size / Active / Disabled)](../foundations/common-types.md)
- [Select (wireframe)](./select.md)
- [Switch (Themes)](../../themes/forms/switch.md)
- [Switch (Primitives)](../../primitives/form/switch.md)
