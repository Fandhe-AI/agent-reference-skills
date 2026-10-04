# Code Block（Docs Blocks）

ドキュメント用コードブロック（ヘッダー帯・言語切替タブ・コピー操作）の Blocks 2 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例であり、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `code-block-language-tabs` の `## Rust コード` の冒頭抜粋。

```rust
use fandhe_frontend_core::{div, el, text, Node};
use fandhe_frontend_pre_styled_ui::clipboard;
use fandhe_frontend_pre_styled_ui::code::{self, CodeProps};
use fandhe_frontend_pre_styled_ui::tabs::{
    self, ActivationMode, Orientation, TabItem, TabsProps, TabsVariant,
};
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps, TextSize, TextVariant};
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};

/// 架空の Rust サンプル（`fandhe_frontend_core` の実在 API のみを使う）。
const RUST_CODE: &str = "use fandhe_frontend_core::{render, p, text};\n\nfn main() {\n    let html = render(&p(vec![], vec![text(\"Hello\")]));\n    println!(\"{html}\");\n}";

/// 架空の `Cargo.toml` 断片（具体的なバージョン番号は陳腐化を避けるため
/// 書かない）。
const TOML_CODE: &str = "[dependencies]\nfandhe-frontend-core = { version = \"...\" }";

/// 架空のシェルコマンド列。
const SHELL_CODE: &str = "cargo add fandhe-frontend-core\ncargo run";

/// 言語ごとのコードを引く。
fn code_for(lang: &str) -> &'static str {
    match lang {
        "rust" => RUST_CODE,
        "toml" => TOML_CODE,
        "shell" => SHELL_CODE,
        _ => unreachable!("code_block_language_tabs only declares rust/toml/shell"),
    }
}

/// 言語タブ列 + コピー対象コードを持つヘッダー帯 1 個を組み立てる。
///
/// - `variant`: インスタンス識別子（`"a"`/`"b"`/`"c"`、id の一意化と
///   [`LAYOUT_CSS`] 側の `data-blocks-code-block-language-tabs-variant`
///   セレクタ分岐に使う）。
/// - `title`: ヘッダーに表示するタイトル文言（`None` なら非表示、A 版）。
/// - `selected`: SSR 時点で選択表示する言語（`"rust"`/`"toml"`/`"shell"`）。
/// - `tabs_variant`/`tabs_size`: タブの見た目（B/C 版の控えめな外観差分）。
fn frame(
    variant: &str,
    title: Option<&str>,
    selected: &str,
    tabs_variant: TabsVariant,
    tabs_size: Size,
) -> Node {
    let frame_id = format!("blocks-code-block-language-tabs-{variant}");
    let tabs_id = format!("{frame_id}-tabs");

    let langs = [("rust", "Rust"), ("toml", "TOML"), ("shell", "Shell")];
    let items = langs
        .iter()
        .map(|(value, label)| TabItem {
            value,
            trigger: vec![text(*label)],
            content: vec![el(
                "pre",
                vec![("class", "blocks-code-block-language-tabs-pre")],
                vec![code::code(
                    &CodeProps::default(),
                    vec![],
                    vec![text(code_for(value))],
                )],
            )],
            // 選択されていない言語は disabled 固定（モジュール doc「無 JS
            // での扱い」節参照）。押しても選択状態・パネルが変わらない
            // dead control を残さない。
            disabled: *value != selected,
        })
        .collect();
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/code-block-language-tabs/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品（BLOCK.parts） | 公式 URL |
|------|------|------------------------|----------|
| code-block-header | 角丸枠の上端にヘッダー帯を持つコードブロック（ヘッダー帯にバッジ・テキスト・コピー操作） | [Code](../../themes/typography/code.md) / [Clipboard](../../themes/data-display/clipboard.md) / [Button](../../themes/forms/button.md) / [Badge](../../themes/data-display/badge.md) / [Text](../../themes/typography/text.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/code-block-header/ |
| code-block-language-tabs | ヘッダー帯に言語切替タブ（タブ列 + コピー操作）を備えたコードブロック。A/B/C の 3 インスタンスを並記 | [Tabs](../../themes/disclosure/tabs.md) / [Code](../../themes/typography/code.md) / [Clipboard](../../themes/data-display/clipboard.md) / [Text](../../themes/typography/text.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/code-block-language-tabs/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 172 行）。全文は公式ページを参照する。
- `docs-site` は crates.io 未公開 crate のため `use` できる API ではない。コードをコピーして `fandhe_frontend_pre_styled_ui::*` / `fandhe_frontend_core::*` の呼び出し規約の見本として使う前提。
- 全 block は無 JS の静的表示で `<form>` を持たない。docs サイトは無 JS のためタブを切り替えられず、`code-block-language-tabs` は各インスタンスで選択されていない言語の trigger を `disabled` に固定する（コピー対象の値は常に表示中のコードと一致）。コピーボタンは実アプリに組み込めば機能するが、Demo 単体では静的表示。コード・コマンドは架空。
- 差分メモ（`code-block-language-tabs`）: A は R0058（基準形、タイトルなし、`Line` タブ + コピーのみ、選択 Rust）、B は R0059（タイトルを大文字・字間広めで控えめに、`Enclosed` + 小サイズのタブ、選択 TOML）、C は R0060（淡色面のヘッダー帯でタイトルを左・タブとコピーを右へ両端寄せ、選択 Shell）。狭い幅ではタブ列がヘッダーの 2 行目へ折り返す。
- `code-block-header` の差分メモは公式 md を参照（主参照 R0054、集約元 R0055 / R0057）。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md `site/blocks/<slug>.md`、Rust ソース `crates/docs-site/src/blocks/docs/code_block/<slug_snake>.rs`。

## Related

- [Docs Blocks overview](./overview.md)
- [Example Preview](./example-preview.md)
- [Docs Layout](./docs-layout.md)
