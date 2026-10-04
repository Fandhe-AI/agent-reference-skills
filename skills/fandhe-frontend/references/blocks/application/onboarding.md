# Onboarding（Application Blocks）

Onboarding は、ステップ式フロー・スタートガイド・画像付き分割構成などのオンボーディング画面の合成例 4 件。blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate docs-site 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

`onboarding-vertical-steps`（カテゴリ内で最も短い block）の `## Rust コード` の冒頭抜粋。

```rust
use crate::blocks::dummy_assets;
use fandhe_frontend_core::{div, text as core_text, Node};
use fandhe_frontend_pre_styled_ui::button::{button, ButtonProps, ButtonVariant};
use fandhe_frontend_pre_styled_ui::fandhe_frontend_headless_ui::steps::Steps;
use fandhe_frontend_pre_styled_ui::heading::{heading, HeadingLevel, HeadingProps};
use fandhe_frontend_pre_styled_ui::image::{image, AspectRatio, ImageFit, ImageProps, ImageShape};
use fandhe_frontend_pre_styled_ui::recipe::{ColorPalette, Size};
use fandhe_frontend_pre_styled_ui::steps;
use fandhe_frontend_pre_styled_ui::text::{text as styled_text, TextProps};
use fandhe_frontend_pre_styled_ui::Orientation;

/// ステップ 4 件分の題名（[`step_list`] の trigger ラベルに使う架空
/// ダミー）。
const STEP_TITLES: [&str; 4] = [
    "ワークスペースを作成",
    "メンバーを招待",
    "最初のプロジェクトを設定",
    "通知を確認",
];

/// 現在ステップ（step 2）の見出し。[`STEP_TITLES`][2] と対応させる。
const CURRENT_STEP_HEADING: &str = "最初のプロジェクトを設定";

/// 現在ステップ（step 2）の説明文。
const CURRENT_STEP_DESCRIPTION: &str =
    "テンプレートを選び、チームで使う最初のプロジェクトを数分で立ち上げます。\
     右側には手順動画のプレビュー（静止画）を表示します。";

/// 縦向きステップ一覧（左カラム）。`showcase::steps_demo` と同型に
/// `item` → `trigger`（`indicator` に番号 + 題名 `text`）+ 末尾以外に
/// `separator` を並べる。
fn step_list(s: &Steps) -> Node {
    let mut items = Vec::new();
    for (index, title) in STEP_TITLES.iter().enumerate() {
        let mut item_children = vec![steps::trigger(
            s,
            index,
            // 無 JS の docs サイトでは押しても状態遷移しない dead control
            // になるため、ネイティブ `disabled` で操作不能を構造的に表現
            // する（Codex #2981 指摘の是正。prev/next と同型、モジュール
            // 冒頭 doc「状態は固定」節参照）。`data-disabled` も併記する:
            // `crates/pre-styled-ui/src/steps.rs` の `trigger` hover 規則
            // （`StateCondition::Hover` が自動生成する
            // `:hover:not([data-disabled])`）はネイティブ `disabled` 属性
            // を条件に含まないため、`disabled` のみではホバー表示・
            // ポインターカーソルが無効ステップに残っていた（Codex #2981
            // 指摘の是正）。
            vec![("disabled", ""), ("data-disabled", "")],
            vec![
                steps::indicator(s, index, vec![], vec![core_text((index + 1).to_string())]),
                core_text(*title),
            ],
        )];
        if index + 1 < STEP_TITLES.len() {
            item_children.push(steps::separator(s, index, vec![], vec![]));
        }
        items.push(steps::item(s, index, vec![], item_children));
    }
    steps::list(s, vec![], items)
}
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/onboarding-vertical-steps/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品 | 公式 URL |
|------|------|----------|----------|
| onboarding-centered-steps | 中央寄せのステップ式オンボーディングフロー。ロゴ + 4 段の進捗ステップ、中央カラムに見出し・説明文とステップ固有の入力欄、下部に「戻る / 次へ」。プロフィール入力・興味関心・環境設定・チーム招待の 4 インスタンスを縦に並べる | [Steps](../../themes/collections/steps.md) / [Field](../../themes/forms/field.md) / [Input](../../themes/forms/input.md) / [Native Select](../../themes/forms/native-select.md) / [Checkbox Card](../../themes/forms/checkbox-card.md) / [Radio Card](../../themes/forms/radio-card.md) / [Card](../../themes/data-display/card.md) / [Avatar](../../themes/data-display/avatar.md) / [File Upload](../../themes/forms/file-upload.md) / [Checkbox](../../themes/forms/checkbox.md) / [Button](../../themes/forms/button.md) / [Heading](../../themes/typography/heading.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/onboarding-centered-steps/ |
| onboarding-checklist | 見出し + 達成率バーの下に開始タスクのチェックリストを置くスタートガイド。先頭の未完了タスクだけ展開し、完了タスクはチェック済み + 取り消し線ラベル | [Progress](../../themes/feedback/progress.md) / [Steps](../../themes/collections/steps.md) / [Checkbox](../../themes/forms/checkbox.md) / [Button](../../themes/forms/button.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Visually Hidden](../../themes/utilities/visually-hidden.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/onboarding-checklist/ |
| onboarding-split-image | 左カラムにロゴ・進捗・見出し・選択カード群・次へボタン、右カラムに装飾画像を置く 2 カラム構成。ラジオカード / チェックボックスカード / 曜日チェックボックスカードの 4 形を併記 | [Steps](../../themes/collections/steps.md) / [Radio Card](../../themes/forms/radio-card.md) / [Checkbox Card](../../themes/forms/checkbox-card.md) / [Image](../../themes/data-display/image.md) / [Button](../../themes/forms/button.md) / [Heading](../../themes/typography/heading.md) / [Native Select](../../themes/forms/native-select.md) / [Field](../../themes/forms/field.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/onboarding-split-image/ |
| onboarding-vertical-steps | 左に縦向きのステップ一覧、右に現在ステップの内容（動画枠 + 見出し + 説明文 + 前へ・次へ）を並べる 2 カラム | [Steps](../../themes/collections/steps.md) / [Button](../../themes/forms/button.md) / [Image](../../themes/data-display/image.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/onboarding-vertical-steps/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 152 行）。全文は公式ページを参照する。
- docs-site は crates.io 未公開の crate で、`demo()` は利用者が `use` できる API ではない。上記コードの `crate::blocks::dummy_assets`（`SCREENSHOT_SRC` 等のビルド時生成プレースホルダー画像）も docs-site 内部で未公開のため、コピー利用時は自前の画像へ差し替える。
- すべての Demo は無 JS の静的表示で `<form>` を含まない。`onboarding-vertical-steps` では trigger / prev-trigger / next-trigger / 再生ボタンをネイティブ `disabled` にして dead control を避ける。`onboarding-split-image` の選択カードもすべて `disabled: true` の静的表示。ステップ題名・説明は架空のデータ。
- `onboarding-vertical-steps` の差分メモ: 参照構成は前へ・次へをステップ一覧側（左）に描くが、`steps` 部品の縦向きレイアウト契約（`root` の直下は `list` と `body` の 2 要素のみ）を優先し、前へ・次へを右カラム（`body` 側）へ配置している。動画は 16:9 のプレースホルダー静止画枠 + 装飾的な「動画を再生」ボタンで代替する。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `crates/docs-site/src/blocks/application/onboarding/onboarding_vertical_steps.rs`（コードは `// blocks-code:begin`〜`end` の範囲）、公式 md は `site/blocks/<slug>.md`。他 3 件も同ディレクトリの `onboarding_<slug_snake>.rs`。

## Related

- [Application Blocks overview](./overview.md)
- [Steps](../../themes/collections/steps.md)
- [Empty State（Application Blocks）](./empty-state.md)
