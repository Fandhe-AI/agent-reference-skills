# Accordion (wireframe)

`fandhe-frontend-wireframe-ui` のアコーディオンのプレースホルダー。見出し + 開閉キャレット + 本文からなる項目を縦に並べる。API は `accordion(items, size)` の 2 引数で、`items` は「見出しテキスト・本文スロット・展開済みか」の組の列（`Vec<(&str, Node, bool)>`）。blocks.pm カタログに対応部品を持たない wireframe-ui 独自追加部品。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/accordion.rs
#[must_use]
pub fn accordion(items: Vec<(&str, Node, bool)>, size: Size) -> Node

// 呼び出し例（docs-site demo より）
use fandhe_frontend_wireframe_ui::{accordion, paragraph, Bold, Size};

accordion(
    vec![(
        "見出し",
        paragraph("本文プレースホルダーです。", Size::Sm, Bold(false)),
        true,
    )],
    Size::Sm,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| items | `Vec<(&str, Node, bool)>` | - | 「見出し・本文スロット・展開済みか」の組の列。所有で受ける。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/accordion/
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の同名コンポーネントとは別物。実際に開閉するアコーディオンが必要な場合は Themes / Primitives の Accordion を使う
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- 独自追加部品: blocks.pm カタログに対応部品を持たない
- 項目は借用スライスではなく `Vec<(&str, Node, bool)>` の所有で受ける（`stack` / `grid` / `frame` / `question` の先例に揃えた設計。借用スライスだと項目ごとに `Node::clone()` が必要になるため）
- 展開状態は新しい専用型を追加せず、既存の `props::Active` を項目単位で再利用し `data-active` を付与する。`aria-expanded` は非対話制約により出力しない
- 折りたたみ項目（`expanded == false`）の本文 `Node` は出力せず捨てる。`hidden` 属性や CSS で隠す方式は使わない
- `<details>` / `<summary>` は使わず、ルート・項目・見出し行はすべて `div`。`<button>` / `<a>` / `<input>` / `role` / `aria-*`（アイコン基盤の装飾用 `aria-hidden` を除く）/ `tabindex` / `style` / `on*` は出力しない
- 見出し行の末尾にキャレットを置き、展開時は `icon::caret_up`、折りたたみ時は `icon::caret_down`
- `Bold` / `Primary` / `Disabled` / `Orientation`・先頭アイコンスロットは持たない

## Related

- [Navigation overview](./overview.md)
- [共通型 (Size / Active ほか)](../foundations/common-types.md)
- [Accordion (Themes)](../../themes/disclosure/accordion.md)
- [Accordion (Primitives)](../../primitives/disclosure/accordion.md)
