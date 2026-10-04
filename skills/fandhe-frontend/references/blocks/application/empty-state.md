# Empty State（Application Blocks）

Empty State は、データが無い状態の案内・導入手順・開始候補を示す空状態の合成例 5 件。blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate docs-site 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

`empty-state-setup-steps`（カテゴリ内で最も短い block）の `## Rust コード` の冒頭抜粋。

```rust
use fandhe_frontend_core::{div, el, strong, text, Node};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps};
use fandhe_frontend_pre_styled_ui::empty_state::{
    self, EmptyStateIndicatorVariant, EmptyStateProps,
};
use fandhe_frontend_pre_styled_ui::fandhe_frontend_headless_ui::steps::Steps;
use fandhe_frontend_pre_styled_ui::icon::{icon, IconProps};
use fandhe_frontend_pre_styled_ui::recipe::ColorPalette;
use fandhe_frontend_pre_styled_ui::steps;
use fandhe_frontend_pre_styled_ui::{Orientation, Size};

/// 自作の幾何アイコン（角丸の四角に「+」を重ねた単純な折れ線、
/// `page_heading_meta::geo_icon` と同型で [`icon::icon`] へ独自の `path`/
/// `rect` を渡すのみ）。`aria-hidden="true"` の装飾用 SVG で、実在
/// ブランドのロゴ・商標は模さない。
fn folder_icon() -> Node {
    icon(
        &IconProps::default(),
        // `empty_state::indicator` は `font-size` を Size 連動（Lg で拡大）
        // させ、子アイコンが `1em` で追従する設計（`empty_state.rs` モジュール
        // doc「`_icon: { boxSize: 1em }`」節）。`icon::icon` の `Size` variant
        // は固定 rem 実寸のため、インライン style で上書きして追従させる
        // （インライン style は recipe が発行するクラスより詳細度で勝つ、
        // `empty_state_card_header::folder_plus_icon` と同型の判断）。
        vec![("style", "width: 1em; height: 1em;")],
        vec![
            el(
                "rect",
                vec![
                    ("x", "3"),
                    ("y", "5"),
                    ("width", "18"),
                    ("height", "14"),
                    ("rx", "2"),
                    ("fill", "none"),
                    ("stroke", "currentColor"),
                    ("stroke-width", "1.5"),
                ],
                vec![],
            ),
            el(
                "path",
                vec![
                    ("d", "M12 10v6M9 13h6"),
                    ("fill", "none"),
                    ("stroke", "currentColor"),
                    ("stroke-width", "1.5"),
                    ("stroke-linecap", "round"),
                ],
                vec![],
            ),
        ],
    )
}

/// 導入手順 1 段分（番号インジケータ + 見出し + 説明）を組み立てる内部
/// ヘルパ。`steps::trigger`/`content` を使わず `item` 直下へ静的な構造を
/// 置く（モジュール冒頭「`steps::trigger`/`content`/`separator` を置かない
/// 理由」節参照）。
fn step<'a>(s: &Steps, index: usize, heading: &'a str, description: &'a str) -> Node {
    // `aria-current="step"` は本来 `trigger` のみに付与される
    // （`steps.rs` モジュール doc）が、本 Demo は `trigger` を置かないため
    // （モジュール冒頭「`steps::trigger`/`content`/`separator` を置かない
    // 理由」節）現在地が支援技術へ一切伝わらない。`item` は同属性を
    // 予約しないため、current な段にのみ明示付与して代替する。
    let item_attrs = if index == s.step() {
        vec![("aria-current", "step")]
    } else {
        vec![]
    };
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/empty-state-setup-steps/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品 | 公式 URL |
|------|------|----------|----------|
| empty-state-card-header | ヘッダー付きカード内の空状態。ヘッダーに題名と「新規作成」ボタン、本文に中央寄せの空状態。作成ダイアログを開いた状態を 2 つ目のインスタンスとして静的併記 | [Card](../../themes/data-display/card.md) / [Empty State](../../themes/feedback/empty-state.md) / [Button](../../themes/forms/button.md) / [Dialog](../../themes/overlays/dialog.md) / [Field](../../themes/forms/field.md) / [Input](../../themes/forms/input.md) / [Native Select](../../themes/forms/native-select.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/empty-state-card-header/ |
| empty-state-invite-team | メンバーがいない空状態に、メールアドレス入力による招待欄とおすすめメンバー候補一覧（縦一覧・グリッド）を組み合わせる | [Empty State](../../themes/feedback/empty-state.md) / [Field](../../themes/forms/field.md) / [Input Group](../../themes/forms/input-group.md) / [Input](../../themes/forms/input.md) / [Button](../../themes/forms/button.md) / [Avatar](../../themes/data-display/avatar.md) / [Item](../../themes/data-display/item.md) / [Text](../../themes/typography/text.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/empty-state-invite-team/ |
| empty-state-setup-steps | 導入手順付きの大きめの空状態。空状態の下に導入手順を 3 段（番号・見出し・説明）並べる | [Empty State](../../themes/feedback/empty-state.md) / [Steps](../../themes/collections/steps.md) / [Button](../../themes/forms/button.md) / [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/empty-state-setup-steps/ |
| empty-state-starter-grid | 候補が無い状態から行き先を選ばせる空状態。ガイド・サンプル等へのタイルをグリッドで並べ、末尾に一覧へ戻る導線を置く | [Item](../../themes/data-display/item.md) / [Icon](../../themes/data-display/icon.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/empty-state-starter-grid/ |
| empty-state-starter-list | 開始候補（テンプレート等）を区切り線付きの縦一覧で並べる空状態。各行はアイコン・題名・説明・行末シェブロンで、行全体がリンク | [Item](../../themes/data-display/item.md) / [Icon](../../themes/data-display/icon.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Separator](../../themes/utilities/separator.md) / [Link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/empty-state-starter-list/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 165 行）。全文は公式ページを参照する。
- docs-site は crates.io 未公開の crate で、`demo()` は利用者が `use` できる API ではない。利用者は block のコード例をコピーし、既存部品を合成して使う。
- すべての Demo は静的な表示例で、`<form>` を出力せずボタンは `type="button"` のまま送信先・状態管理を持たない。文言・アイコンは独自に書き下ろした架空のもの。
- `empty-state-setup-steps` の差分メモ: 手順は `steps::trigger`（実 `<button>`）を使わず `item` 直下へ番号・見出し・説明を静的に組み立てる。説明は `steps::content` を使わず素の `div` で常時表示する（`content` は非 current の段が `data-state="closed"` で隠れるため）。現在地の段にのみ `aria-current="step"` を明示付与する。
- `empty-state-starter-grid` / `empty-state-starter-list` の `href` はサイト内の索引ページを指す。実際に使う際は自分のページ URL へ差し替える。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `crates/docs-site/src/blocks/application/empty_state/empty_state_setup_steps.rs`（コードは `// blocks-code:begin`〜`end` の範囲）、公式 md は `site/blocks/<slug>.md`。他 4 件も同ディレクトリの `empty_state_<slug_snake>.rs`。

## Related

- [Application Blocks overview](./overview.md)
- [Empty State](../../themes/feedback/empty-state.md)
- [Steps](../../themes/collections/steps.md)
