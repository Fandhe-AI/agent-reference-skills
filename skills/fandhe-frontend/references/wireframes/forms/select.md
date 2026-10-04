# Select (wireframe)

`fandhe-frontend-wireframe-ui` のドロップダウン選択欄風プレースホルダー。表示文言 + 任意の先頭アイコン + サイズ / 強調 / 無効状態を持つ非インタラクティブな部品。`<select>` 要素・開閉・リストボックス・キーボード操作は実装しない。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/select.rs
#[must_use]
pub fn select(
    text_content: &str,
    leading: Option<Node>,
    size: Size,
    active: Active,
    disabled: Disabled,
) -> Node

// 呼び出し例
use fandhe_frontend_wireframe_ui::{icon, select, Active, Disabled, Size};

select(
    "山田太郎",
    Some(icon::user(Size::Md)),
    Size::Md,
    Active(false),
    Disabled(false),
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| text_content | `&str` | - | 表示文言（選択済み値・プレースホルダー風のいずれも 1 種類の文言として扱う）。 |
| leading | `Option<Node>` | `None` | 省略可能な先頭アイコンスロット。`Some(icon::user(size))` のように渡す。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。コントロール高さ・フォントサイズに反映される。 |
| active | `Active` | `Active(false)` | true のとき `data-active=""` を付与する（フォーカス風の強調枠）。 |
| disabled | `Disabled` | `Disabled(false)` | true のとき `data-disabled=""` を付与する（見た目のみ。操作不能を実装するものではない）。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/select/
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の同名 Select とは別物。操作可能な select が必要な場合は Themes / Primitives の Select を使う
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- ルートは `div`。`role` / `aria-*` / `tabindex` / `on*` は出力しない（アイコンの装飾用 `aria-hidden="true"` を除く）
- アイコン有無は `leading: Option<Node>` の `Some` / `None` に畳み込む
- 末尾のドロップダウン指示子は固定パートで、常に `icon::caret_down` を出力する（省略・差し替え不可）
- 専用の `SelectState` 列挙は無く、フォーカス風の強調は `Active`、無効状態は `Disabled`
- 開いた状態（リストボックス表示）の variant は実装しない
- 配色は `--fw-wire-*` トークン（`ink` / `ink-muted` / `line` / `fill-subtle`）

## Related

- [Forms overview](./overview.md)
- [共通型 (Size / Active / Disabled)](../foundations/common-types.md)
- [Question (wireframe)](./question.md)
- [Select (Themes)](../../themes/collections/select.md)
- [Select (Primitives)](../../primitives/collections/select.md)
