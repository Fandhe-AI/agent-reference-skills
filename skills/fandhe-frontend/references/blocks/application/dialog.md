# Dialog（Application Blocks）

Dialog は、モーダルの入場アニメーション例 1 件の合成例。blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate docs-site 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

`game-ui-modal`（カテゴリ唯一の block）の `## Rust コード`。

```rust
use fandhe_frontend_core::{li, text, ul, Node};
use fandhe_frontend_pre_styled_ui::badge::{self, BadgeProps, BadgeVariant};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps, ButtonVariant};
use fandhe_frontend_pre_styled_ui::dialog::{self, ContentIds, DialogRole, OpenState};
use fandhe_frontend_pre_styled_ui::recipe::stagger_index_style;
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};

/// 架空の報酬データ（実企業名・実クレデンシャルは使わない）。
const REWARDS: [(&str, ColorPalette); 3] = [
    ("+320 XP", ColorPalette::Success),
    ("レア装備 x1", ColorPalette::Info),
    ("称号「開拓者」", ColorPalette::Accent),
];

/// `game-ui-modal` の Demo 本体（既に開いた静的な初期状態のみ描く）。
pub fn demo() -> Node {
    let title_id = "blocks-game-ui-modal-title";
    let description_id = "blocks-game-ui-modal-description";

    let rewards: Vec<Node> = REWARDS
        .iter()
        .enumerate()
        .map(|(index, (label, palette))| {
            let style = stagger_index_style(index);
            li(
                vec![("data-blocks-game-ui-modal-reward", ""), ("style", &style)],
                vec![badge::badge(
                    &BadgeProps {
                        variant: BadgeVariant::Solid,
                        size: Size::Md,
                        palette: *palette,
                        shape: None,
                    },
                    vec![],
                    vec![text(*label)],
                )],
            )
        })
        .collect();

    dialog::root(
        Size::Md,
        OpenState::Open,
        vec![("data-blocks-game-ui-modal-root", "")],
        vec![
            dialog::backdrop(OpenState::Open, vec![], vec![]),
            dialog::positioner(
                OpenState::Open,
                vec![],
                vec![dialog::content(
                    OpenState::Open,
                    DialogRole::Dialog,
                    // 静的デモは閉じる機構を持たず外側に説明・コード・
                    // ナビゲーションがあるため、表示実態と一致させ
                    // aria-modal は false にする（支援技術が外側を
                    // 無視しないようにする、イシュー #2552 レビュー指摘）。
                    false,
                    ContentIds {
                        id: Some("blocks-game-ui-modal-content"),
                        labelledby: Some(title_id),
                        describedby: Some(description_id),
                    },
                    vec![("data-blocks-game-ui-modal-content", "")],
                    vec![
                        dialog::title(Some(title_id), vec![], vec![text("Quest Complete")]),
                        dialog::description(
                            Some(description_id),
                            vec![],
                            vec![text("討伐クエスト「北の遺跡」を制覇しました。")],
                        ),
                        dialog::body(vec![], vec![ul(vec![], rewards)]),
                        dialog::footer(
                            vec![],
                            vec![
                                button::button(
                                    &ButtonProps {
                                        variant: ButtonVariant::Ghost,
                                        ..ButtonProps::default()
                                    },
                                    vec![],
                                    vec![text("Later")],
                                ),
                                button::button(
                                    &ButtonProps::default(),
                                    vec![],
                                    vec![text("Claim rewards")],
                                ),
                            ],
                        ),
                    ],
                )],
            ),
        ],
    )
}
```

## Blocks

| slug | 説明 | 使用部品 | 公式 URL |
|------|------|----------|----------|
| game-ui-modal | ゲーム風 UI のモーダル入場アニメーション例。報酬バッジを stagger 表示するダイアログを、開いた状態で固定表示する | [Dialog](../../themes/overlays/dialog.md) / [Button](../../themes/forms/button.md) / [Badge](../../themes/data-display/badge.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/game-ui-modal/ |

## Notes

- docs-site は crates.io 未公開の crate で、`demo()` は利用者が `use` できる API ではない。利用者は block のコード例をコピーし、既存部品を合成して使う。
- Motion+ `examples/game-ui`（ゲーム風 UI カテゴリの実例）参照のモーダル入場アニメーション例。`<form>` は使わず、無 JS のためモーダルが既に開いた状態のみを固定表示する。静的デモは閉じる機構を持たないため `aria-modal` は `false`。
- 公式 md は Motion+ が購入者限定素材のため取得手段・内部識別子は記載していない。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `crates/docs-site/src/blocks/application/dialog/game_ui_modal.rs`（コードは `// blocks-code:begin`〜`end` の範囲）、公式 md は `site/blocks/game-ui-modal.md`。

## Related

- [Application Blocks overview](./overview.md)
- [Dialog](../../themes/overlays/dialog.md)
- [Command Palette（Application Blocks）](./command-palette.md)
