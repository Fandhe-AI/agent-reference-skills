# Question (wireframe)

`fandhe-frontend-wireframe-ui` の質問項目風プレースホルダー。ラベル + 任意の補足説明 + フォームコントロール + 任意のヒントという「1 つの質問項目」の配置イメージだけを示す非インタラクティブな部品。`control` は既存の wireframe-ui 部品（`select` / `switch` 等）の戻り値をそのまま渡す `Node` スロット。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/question.rs
#[must_use]
pub fn question(
    label: &str,
    description: Option<&str>,
    control: Node,
    hint: Option<&str>,
    size: Size,
) -> Node

// 呼び出し例
use fandhe_frontend_wireframe_ui::{icon, question, select, Active, Disabled, Size};

question(
    "担当者を選んでください",
    Some("直近の対応履歴から自動で絞り込まれます"),
    select(
        "山田太郎",
        Some(icon::user(Size::Md)),
        Size::Md,
        Active(true),
        Disabled(false),
    ),
    Some("後から変更できます"),
    Size::Md,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| label | `&str` | - | 質問文（常に太字で表示）。 |
| description | `Option<&str>` | `None` | 省略可能なラベル直下の補足説明。`None` のときはパート要素自体を出力しない。 |
| control | `Node` | - | フォームコントロールのスロット。`select` / `switch` 等の戻り値をそのまま渡す。呼び出し側は同じ `size` をコントロール側にも渡すこと。 |
| hint | `Option<&str>` | `None` | 省略可能なコントロール直下のヒント。`None` のときはパート要素自体を出力しない。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。ラベル・説明・ヒントのフォントサイズにのみ効く。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/question/
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の Field とは別物。操作可能な質問項目が必要な場合は Primitives の Field 等を使う
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- コントロール種別は専用 variant を持たず、`control: Node` スロットへ委ねる（`question` 自身がテキストフィールド anatomy を内蔵する案は採用しなかった）
- `Bold` / `Primary` / `Active` / `Disabled` は使わず、ルートに `data-*` を付与しない。ラベルは常に太字で、表示状態はスロット側のコントロールが担う
- `size` はラベル / 説明 / ヒントのフォントサイズにのみ効く。コントロールの高さ・フォントサイズは制御しないため、同じ `size` をコントロールにも渡すこと
- ラベルは `<label>` ではなく `div`。`<label>` / `<input>` / `<fieldset>` / `<legend>` は出力しない

## Related

- [Forms overview](./overview.md)
- [共通型 (Size)](../foundations/common-types.md)
- [Select (wireframe)](./select.md)
- [Switch (wireframe)](./switch.md)
- [Field (Primitives)](../../primitives/form/field.md)
