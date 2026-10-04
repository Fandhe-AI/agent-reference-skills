# AI Chat（Application Blocks）

AI Chat は、AI チャットの開始画面・コード生成チャット画面・モデル実験プレイグラウンドの合成例 3 件。blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate docs-site 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

`ai-chat-prompt-start`（カテゴリ内で最も短い block）の `## Rust コード` の冒頭抜粋。

```rust
use fandhe_frontend_core::{div, el, text, Node};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps, ButtonVariant};
use fandhe_frontend_pre_styled_ui::empty_state::{self, EmptyStateProps};
use fandhe_frontend_pre_styled_ui::heading::{self, HeadingLevel, HeadingProps, HeadingSize};
use fandhe_frontend_pre_styled_ui::icon::{self, IconProps};
use fandhe_frontend_pre_styled_ui::menu::{self, OpenState};
use fandhe_frontend_pre_styled_ui::textarea::{self, FieldIds, FieldProps, TextareaProps};
use fandhe_frontend_pre_styled_ui::Size;

/// 装飾用アイコン（吹き出し状の抽象図形、`aria-hidden` 固定・実在ブランド
/// のロゴを模さない）。
fn sparkle_icon() -> Node {
    icon::icon(
        &IconProps::default(),
        vec![],
        vec![el(
            "path",
            vec![(
                "d",
                "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z",
            )],
            vec![],
        )],
    )
}

/// 添付アイコン（クリップ状の抽象図形）。
fn attach_icon() -> Node {
    icon::icon(
        &IconProps {
            size: Size::Sm,
            ..IconProps::default()
        },
        vec![],
        vec![el(
            "path",
            vec![(
                "d",
                "M8 12V6a3 3 0 0 1 6 0v8a5 5 0 0 1-10 0V7h2v7a3 3 0 0 0 6 0V6a1 1 0 0 0-2 0v6H8z",
            )],
            vec![],
        )],
    )
}

/// 送信アイコン（上矢印の抽象図形）。
fn send_icon() -> Node {
    icon::icon(
        &IconProps {
            size: Size::Sm,
            ..IconProps::default()
        },
        vec![],
        vec![el("path", vec![("d", "M12 4l6 7h-4v9h-4v-9H6z")], vec![])],
    )
}

/// 候補ボタン 1 個（`data-blocks-ai-chat-prompt-start-suggestion` で
/// `suggestions_are_four_per_instance` テストが数える）。
fn suggestion_button(variant: ButtonVariant, label: &'static str) -> Node {
    button::button(
        &ButtonProps {
            variant,
            size: Size::Md,
            ..ButtonProps::default()
        },
        vec![("data-blocks-ai-chat-prompt-start-suggestion", "")],
        vec![text(label)],
    )
}
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/ai-chat-prompt-start/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品 | 公式 URL |
|------|------|----------|----------|
| ai-chat-code-preview | コード生成チャット画面の骨格。上部にロゴ・プロジェクト名・操作ボタン・三点メニューのナビ、左列にメッセージ履歴と入力欄、右列に「プレビュー / コード」タブ列と両パネルの常時併記 | [Message](../../themes/data-display/message.md) / [Message Scroller](../../themes/data-display/message-scroller.md) / [Textarea](../../themes/forms/textarea.md) / [Button](../../themes/forms/button.md) / [Menu](../../themes/collections/menu.md) / [Code](../../themes/typography/code.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/ai-chat-code-preview/ |
| ai-chat-playground | モデル実験用プレイグラウンド。左カラムにモデル・プリセット選択、応答プレビュー、プロンプト入力欄を縦積み、右カラムに生成パラメータ（温度・最大トークン数・Top P のスライダー、ストリーミング / システムプロンプト同梱の switch） | [Field](../../themes/forms/field.md) / [Native Select](../../themes/forms/native-select.md) / [Textarea](../../themes/forms/textarea.md) / [Slider](../../themes/forms/slider.md) / [Switch](../../themes/forms/switch.md) / [Button](../../themes/forms/button.md) / [Popover](../../themes/overlays/popover.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/ai-chat-playground/ |
| ai-chat-prompt-start | AI チャットの開始画面。アイコン付き挨拶見出し、候補ボタン 2×2、添付・ツール選択・送信ボタン付きの複数行入力欄（composer）。基本形（default）と中央寄せ形（centered）の 2 インスタンス | [Textarea](../../themes/forms/textarea.md) / [Button](../../themes/forms/button.md) / [Empty State](../../themes/feedback/empty-state.md) / [Menu](../../themes/collections/menu.md) / [Icon](../../themes/data-display/icon.md) / [Heading](../../themes/typography/heading.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/ai-chat-prompt-start/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 280 行）。全文は公式ページを参照する。
- docs-site は crates.io 未公開の crate で、`demo()` は利用者が `use` できる API ではない。利用者は block のコード例をコピーし、既存部品を合成して使う。
- AI Chat は UI 部品の合成例のみで、LLM 呼び出し・ストリーミング・永続化のロジックは含まない。送信・添付・ツール選択・生成の処理を行わず、ボタンは `type="button"` のまま送信先を持たない。ツール選択メニューは閉じた状態の固定表示（開閉には `fandhe-frontend-wasm-full` の JS 配線が必要で、docs サイトは JS ハイドレーションを行わない）。文言・モデル名・プロンプトは架空のもの。
- `ai-chat-prompt-start` の差分メモ: `field` / `input-group` が使用部品に含まれないため、`textarea::textarea` を素の `div` で直接包んでいる。「入力欄を画面下端に固定する」要件は、Demo 表示枠が横スクロールコンテナで `position: sticky` が保証されないため `margin-top: auto` で表現している（実アプリでは `position: sticky; bottom: 0` を使える）。アイコンはすべて独自の抽象 SVG path。
- `ai-chat-code-preview` では右列に実物の `tabs::tabs` を使わず、タブ列の見た目を再現して「プレビュー / コード」両パネルを常時併記する。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `crates/docs-site/src/blocks/application/ai_chat/ai_chat_prompt_start.rs`（コードは `// blocks-code:begin`〜`end` の範囲）、公式 md は `site/blocks/<slug>.md`。他 2 件も同ディレクトリの `ai_chat_<slug_snake>.rs`。

## Related

- [Application Blocks overview](./overview.md)
- [Message](../../themes/data-display/message.md)
- [Message Scroller](../../themes/data-display/message-scroller.md)
