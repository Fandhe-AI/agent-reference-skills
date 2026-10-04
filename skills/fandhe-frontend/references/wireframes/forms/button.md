# Button (wireframe)

`fandhe-frontend-wireframe-ui` のボタン風プレースホルダー。テキストラベル + 任意の先頭アイコン + サイズ / 強調 / 無効状態を持つ非インタラクティブな部品。`<button>` 要素・クリック操作・フォーム送信は実装しない。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/button.rs
#[must_use]
pub fn button(
    label: &str,
    icon: Option<Node>,
    size: Size,
    primary: Primary,
    disabled: Disabled,
) -> Node

// 呼び出し例
use fandhe_frontend_wireframe_ui::{button, icon, Disabled, Primary, Size};

button(
    "追加",
    Some(icon::plus(Size::Md)),
    Size::Md,
    Primary(false),
    Disabled(false),
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| label | `&str` | - | 必須。ボタン内に表示する文言。 |
| icon | `Option<Node>` | `None` | 省略可能な先頭アイコンスロット。`Some(icon::plus(size))` のように渡す。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。コントロール高さ・フォントサイズに反映される。 |
| primary | `Primary` | `Primary(false)` | true のとき強調（反転色）バリアントにする。 |
| disabled | `Disabled` | `Disabled(false)` | true のとき `data-disabled=""` を付与する（見た目のみ。クリック不能を実装するものではない）。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/button/
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の同名コンポーネントとは別物。`<button>` を出力しない。操作可能なボタンが必要な場合は Themes の Button を使う
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- ルートは `div`。`role` / `aria-*` / `tabindex` / `on*` は出力しない（アイコンの装飾用 `aria-hidden="true"` を除く）
- アイコン有無は `icon: Option<Node>` の `Some` / `None` に畳み込む。アイコンのみ（テキストなし）の variant は未実装
- `Bold` / `Active` は付与しない
- `Primary` バリアントは `--fw-wire-ink` 背景・`--fw-wire-paper` 文字色へ反転する（`--fw-wire-*` トークン使用）
- 視覚的な参照元は blocks.pm の Button 部品。ライセンス上の理由によりスクリーンショットは掲載されない

## Related

- [Forms overview](./overview.md)
- [共通型 (Size / Primary / Disabled ほか)](../foundations/common-types.md)
- [Button (Themes)](../../themes/forms/button.md)
