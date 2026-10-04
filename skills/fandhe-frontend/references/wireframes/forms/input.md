# Input (wireframe)

`fandhe-frontend-wireframe-ui` のテキストフィールド風プレースホルダー。先頭アイコン + プレースホルダー風テキストで「テキストフィールドらしさ」だけを表現する非インタラクティブな部品。`<input>` は出力しない。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/input.rs
#[must_use]
pub fn input(
    text_content: &str,
    leading: Option<Node>,
    size: Size,
    active: Active,
    disabled: Disabled,
) -> Node

// 呼び出し例
use fandhe_frontend_wireframe_ui::{icon, input, Active, Disabled, Size};

input(
    "検索",
    Some(icon::search(Size::Md)),
    Size::Md,
    Active(false),
    Disabled(false),
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| text | `&str` | - | 表示文言（プレースホルダー風の 1 種類のみ。空文字も可）。 |
| leading | `Option<Node>` | `None` | 省略可能な先頭アイコンスロット。例: `Some(icon::search(size))`。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。最小高さ・フォントサイズに反映される。 |
| active | `Active` | `Active(false)` | true のとき `data-active` を付与し、フォーカス風の強調枠にする。 |
| disabled | `Disabled` | `Disabled(false)` | true のとき `data-disabled` を付与し、破線・淡色にする。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/input/
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の同名 Input とは別物。実際に入力できるフィールドが必要な場合は Themes の Input を使う
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- 関数のテキスト引数名は ArgRow 表では `text` だが、`src/input.rs` の実シグネチャでは `text_content`
- 先頭アイコンは `leading: Option<Node>` で受ける（専用の `Icon` bool 型や追加引数は無い）
- 状態は共通型 `Active` / `Disabled` の `data-*` で表現し、専用の `InputState` 列挙は無い
- テキストはプレースホルダー風の 1 種類のみ。実入力値とプレースホルダーの区別はモデル化していない。`Bold` / `Primary` は使わない
- ルートは `div`。`<input>` / `placeholder` / `value` / `role` / `aria-*` / `tabindex` は出力しない
- 配色は `--fw-wire-ink-muted` 基調。Active は `--fw-wire-ink` の枠線 + box-shadow、Disabled は破線 + `--fw-wire-fill-subtle` 背景

## Related

- [Forms overview](./overview.md)
- [共通型 (Size / Active / Disabled)](../foundations/common-types.md)
- [Input (Themes)](../../themes/forms/input.md)
