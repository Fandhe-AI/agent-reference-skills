# Headless UI component anatomy (Dialog)

`fandhe-frontend-pre-styled-ui` の headless ラッパー経由で、`data-scope`/`data-part` の anatomy と WAI-ARIA 属性を持つ静的 SSR マークアップを組み立てる。

```rust
use fandhe_frontend_core::{el, text, Node};
use fandhe_frontend_pre_styled_ui::dialog::{self, ContentIds, DialogRole};
use fandhe_frontend_pre_styled_ui::OpenState;

fn dialog_section() -> Node {
    let state = OpenState::Closed;
    el(
        "div",
        vec![],
        vec![
            dialog::trigger(state, Some("showcase-dialog-content"), vec![], vec![text("Open dialog")]),
            dialog::root(
                state,
                vec![],
                vec![
                    dialog::backdrop(state, vec![], vec![]),
                    dialog::positioner(
                        state,
                        vec![],
                        vec![dialog::content(
                            state,
                            DialogRole::Dialog,
                            true,
                            ContentIds {
                                id: Some("showcase-dialog-content"),
                                labelledby: Some("showcase-dialog-title"),
                                describedby: Some("showcase-dialog-description"),
                            },
                            vec![],
                            vec![
                                dialog::title(Some("showcase-dialog-title"), vec![], vec![text("Confirm action")]),
                                dialog::description(
                                    Some("showcase-dialog-description"),
                                    vec![],
                                    vec![text("この操作は取り消せません。続行しますか？")],
                                ),
                                dialog::close_trigger(vec![], vec![text("Close")]),
                            ],
                        )],
                    ),
                ],
            ),
        ],
    )
}
```

## Notes

- 各パーツ関数（`trigger` / `root` / `backdrop` / `positioner` / `content` / `title` / `description` / `close_trigger`）は `OpenState` を引数に取り、`data-state` 属性・`hidden` 属性・ARIA 属性（`aria-modal` 等）を状態に応じて自動付与する。
- SSR 時の初期状態は常に `OpenState::Closed`。開閉の実挙動（クリック等）は wasm 層（`hydrate`）の責務であり、SSR コードは全 anatomy を `hidden` 付きで DOM に掲載するだけでよい。
- 既定 CSS は各モジュールの `stylesheet()`（例: `fandhe_frontend_pre_styled_ui::dialog::stylesheet()`）が `data-scope`/`data-part` セレクタ向けに提供する。
- コンポーネントへ渡す文字列（タイトル・説明文等）はすべて `text()` 経由で載せる。生の HTML 文字列を差し込む `raw_html()` は使わない。
