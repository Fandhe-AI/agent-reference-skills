# Tags Input

タグごとの編集モードと `role="listbox"` コントロールを持つ複数タグテキスト入力。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::tags_input::{self, TagsInput};

let tags = TagsInput::new(vec!["rust".into(), "wasm".into()], Some(10));

tags.root(vec![], vec![
    tags.label(vec![], vec![]),
    tags.control("Tags", vec![
        tags.item(false, vec![
            tags.item_preview(false, vec![
                tags.item_text(vec![]),
                tags.item_delete_trigger("rust", false, vec![], vec![]),
            ]),
        ]),
        tags.input("", vec![]),
    ]),
    tags.clear_trigger(false, vec![], vec![]),
    tags.hidden_input("tags", vec![]),
    tags.live_region(vec![], vec![]),
]);
```

フリー関数: `tags_input::root(disabled, attrs, children)`, `label`, `control(disabled, invalid, label_text, attrs, children)`, `item(disabled, editing, attrs, children)`, `item_preview(highlighted, attrs, children)`, `item_text(attrs, children)`, `item_input(value, attrs)`, `item_delete_trigger(tag, disabled, attrs, children)`, `clear_trigger`, `input(value, disabled, at_max, attrs)`, `hidden_input(name, value, disabled, attrs)`, `live_region(attrs, children)`。

## Anatomy

- `root`, `label`, `control` — `role="listbox"` `aria-orientation="horizontal"`
- `item`（`li`）, `item-preview`（`role="option"`）, `item-text`, `item-input`（編集モード）
- `item-delete-trigger`, `clear-trigger`
- `input` — 新規タグ入力、`hidden-input`, `live-region`（`role="status"`, `aria-live="polite"`）

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `TagsInput::new(tags, max)` | `Vec<String>, Option<usize>` | |
| `is_at_max()` | `bool` | |
| `is_editing(index)` / `editing_index()` | `bool` / `Option<usize>` | |

## Notes

- 「タグのリスト + 編集中インデックス」がどの共有語彙にも当てはまらないため、`crate::state` の既存の型ではなく専用の状態機械を使用する
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Pin Input](./pin-input.md)
- [File Upload](./file-upload.md)
