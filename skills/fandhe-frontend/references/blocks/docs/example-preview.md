# Example Preview（Docs Blocks）

部品のコード例をプレビューとコードで見せるカード（タブ切替・ツールバー付き）の Blocks 2 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例であり、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `example-preview-tabs` の `## Rust コード` の冒頭抜粋。

```rust
use fandhe_frontend_core::{div, pre, text, Node};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps, ButtonVariant};
use fandhe_frontend_pre_styled_ui::card::{self, CardProps};
use fandhe_frontend_pre_styled_ui::clipboard;
use fandhe_frontend_pre_styled_ui::code::{self, CodeProps};
use fandhe_frontend_pre_styled_ui::recipe::ColorPalette;
use fandhe_frontend_pre_styled_ui::tabs::{
    self, ActivationMode, Orientation, TabItem, TabsProps, TabsVariant,
};
use fandhe_frontend_pre_styled_ui::Size;

/// コードパネルに表示するコード片。プレビュー関数（[`preview`]）が組み立てる
/// ボタン 2 個と一致させ、コピーした片だけで成り立つ自己完結の例にする。
const SNIPPET: &str = "use fandhe_frontend_core::{div, text};\nuse fandhe_frontend_pre_styled_ui::button::{self, ButtonProps, ButtonVariant};\n\nfn demo() -> fandhe_frontend_core::Node {\n    div(\n        vec![],\n        vec![\n            button::button(&ButtonProps { disabled: true, ..ButtonProps::default() }, vec![], vec![text(\"保存する\")]),\n            button::button(\n                &ButtonProps { variant: ButtonVariant::Outline, disabled: true, ..ButtonProps::default() },\n                vec![],\n                vec![text(\"キャンセル\")],\n            ),\n        ],\n    )\n}\n";

/// プレビューパネルの中身（部品の実演）。[`SNIPPET`] と内容を一致させる。
fn preview() -> Node {
    div(
        vec![("class", "blocks-example-preview-tabs-preview")],
        vec![
            button::button(
                &ButtonProps {
                    // 遷移先・送信処理を持たない合成例のボタンのため
                    // `disabled: true` にして「押しても何も起きない」ことを
                    // 明示する（`code_block_header` と同型の判断）。
                    disabled: true,
                    ..ButtonProps::default()
                },
                vec![],
                vec![text("保存する")],
            ),
            button::button(
                &ButtonProps {
                    variant: ButtonVariant::Outline,
                    disabled: true,
                    ..ButtonProps::default()
                },
                vec![],
                vec![text("キャンセル")],
            ),
        ],
    )
}

/// A/B 共通のカード + タブ 1 インスタンスを組み立てる。
///
/// - `root_id`: 独立マウントルート識別子（モジュール doc「id」節参照）。
/// - `selected`: SSR 時点の選択状態（`"preview"`/`"code"`）。
fn instance(root_id: &'static str, selected: &'static str) -> Node {
    let tabs_id = format!("{root_id}-tabs");
    let props = TabsProps {
        id: tabs_id.as_str(),
        selected,
        orientation: Orientation::Horizontal,
        activation_mode: ActivationMode::Automatic,
        loop_focus: true,
        indicator: false,
    };
    let items = vec![
        TabItem {
            value: "preview",
            trigger: vec![text("プレビュー")],
            content: vec![preview()],
            disabled: selected != "preview",
        },
        TabItem {
            value: "code",
            trigger: vec![text("コード")],
            content: vec![pre(
                vec![("data-blocks-example-preview-tabs-code-panel", "")],
                vec![code::code(
                    &CodeProps::default(),
                    vec![("data-blocks-example-preview-tabs-code", "")],
                    vec![text(SNIPPET)],
                )],
            )],
            disabled: selected != "code",
        },
    ];
    let tabs_node = tabs::tabs(
        TabsVariant::Line,
        Size::Sm,
        ColorPalette::default(),
        &props,
        items,
    );
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/example-preview-tabs/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品（BLOCK.parts） | 公式 URL |
|------|------|------------------------|----------|
| example-preview-tabs | 部品のコード例をプレビュー/コード切替タブで見せるカード。タブ列と同じ行の右端にコピー・外部で開く操作。選択状態違いの 2 インスタンス（A: プレビュー選択、B: コード選択） | [Tabs](../../themes/disclosure/tabs.md) / [Card](../../themes/data-display/card.md) / [Code](../../themes/typography/code.md) / [Clipboard](../../themes/data-display/clipboard.md) / [Button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/example-preview-tabs/ |
| example-preview-toolbar | 部品のコード例を「プレビュー + ツールバー + コード」の 3 段構成 1 枠で見せる | [Tabs](../../themes/disclosure/tabs.md) / [Select](../../themes/collections/select.md) / [Button](../../themes/forms/button.md) / [Clipboard](../../themes/data-display/clipboard.md) / [Code](../../themes/typography/code.md) / [Popover](../../themes/overlays/popover.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/example-preview-toolbar/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 156 行）。全文は公式ページを参照する。
- `docs-site` は crates.io 未公開 crate のため `use` できる API ではない。コードをコピーして `fandhe_frontend_pre_styled_ui::*` / `fandhe_frontend_core::*` の呼び出し規約の見本として使う前提。
- 全 block は静的な表示例で `<form>` を持たない。docs サイトは JS ハイドレーションを行わないため、選択していないタブは `disabled`、クリップボードは未コピー（idle）状態の固定表示、「外部で開く」は遷移先を持たず押下不能。実際のコピー・遷移には `fandhe-frontend-wasm-full` の JS 配線が必要。コード片はプレビューと同内容の自己完結の Rust コードで、実企業名・実クレデンシャル・PII を含まない。
- 差分メモ（`example-preview-tabs`）: 主参照 R0092（カード内のプレビュー/コード切替）に対し、タブ列と同じ行の右端へコピー・外部で開く操作を並べる。集約元 R0093（タブ + 右寄せの外部リンク）の差分は「コピー操作が無い」程度に小さく基本仕様に含まれるため 3 つ目のインスタンスは追加しない。参照元の文言・配色・アイコンは持ち込まない。
- `example-preview-toolbar` の差分メモは公式 md を参照（主参照 R0094）。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md `site/blocks/<slug>.md`、Rust ソース `crates/docs-site/src/blocks/docs/example_preview/<slug_snake>.rs`。

## Related

- [Docs Blocks overview](./overview.md)
- [Code Block](./code-block.md)
- [API Reference](./api-reference.md)
