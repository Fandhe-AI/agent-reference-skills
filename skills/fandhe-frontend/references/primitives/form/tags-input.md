# Tags Input

タグごとの編集モードと `role="listbox"` コントロールを持つ複数タグテキスト入力。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::tags_input::{self, TagsInput, TagsInputProps};

let tags = TagsInput::new(vec!["rust".into(), "wasm".into()], Some(10));
let props = TagsInputProps::default();

tags.root(&props, vec![], vec![
    tags.label(&props, vec![], vec![]),
    tags.control(&props, vec![], vec![
        tags.item(0, false, vec![], vec![
            tags.item_preview(0, false, vec![], vec![
                tags.item_text(0, false, vec![], vec![]),
                tags.item_delete_trigger(0, false, vec![], vec![]),
            ]),
            tags.item_input(0, false, "rust", vec![]),
        ]),
        tags.input(&props, "", vec![]),
    ]),
    tags.clear_trigger(&props, vec![], vec![]),
    tags.hidden_input(&props, "tags", vec![]),
    tags.live_region(vec![], vec![]),
]);
```

フリー関数: `tags_input::root(props: &TagsInputProps, attrs, children)`, `label(props, attrs, children)`, `control(props, attrs, children)`, `item(item: &TagItem, attrs, children)`, `item_preview(item, attrs, children)`, `item_text(item, attrs, children)`, `item_input(item, value, attrs)`, `item_delete_trigger(item, attrs, children)`, `clear_trigger(props, attrs, children)`, `input(props, value, at_max: bool, attrs)`, `hidden_input(props, name, value, attrs)`, `live_region(attrs, children)`。`TagItem { value, disabled, editing, highlighted }` はタグ 1 個分の状態束。`TagsInput` のメソッドは `index` と `disabled` から `TagItem` を導出して注入する（`item_state(index, disabled)` は範囲外で `None`）。`TagsInput::control` は上限到達時に `data-invalid` も反映する。

## Anatomy

- `root`（`<div>`）, `label`（`<label>`）, `control`（`<div>`、`role` なし）
- `item`（`<div data-value>`）, `item-preview`（`<div>`、編集中は `hidden`）, `item-text`（`<div>`）, `item-input`（`<input type="text">`、非編集時は `hidden`）
- `item-delete-trigger`（`<button type="button" aria-label="Delete tag {value}">`）, `clear-trigger`（`<button type="button">`）
- `input` — 新規タグ入力（`autocomplete="off"` / `autocorrect="off"` / `autocapitalize="none"` / `enterkeyhint="done"`）、`hidden-input`（全タグのカンマ結合値）, `live-region`（`role="status"`, `aria-live="polite"`, `aria-atomic="true"`）

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `TagsInput::new(tags, max)` | `Vec<String>, Option<usize>` | 空文字列・`,` を含む・重複タグは除去し、`max` 超過分は切り詰める |
| `TagsInputProps.disabled` | `bool`（既定 `false`） | 各パーツに `data-disabled`。`input` / `clear_trigger` / `hidden_input` にネイティブ `disabled` |
| `TagsInputProps.readonly` | `bool`（既定 `false`） | 各パーツに `data-readonly`。`input` にネイティブ `readonly`（`hidden_input` には付与しない） |
| `TagsInputProps.invalid` | `bool`（既定 `false`） | 各パーツに `data-invalid`。`input` に `aria-invalid="true"` |
| `TagsInputProps.required` | `bool`（既定 `false`） | `label` / `hidden_input` に `data-required` |
| `is_at_max()` | `bool` | 上限到達（`input` は `data-invalid` + `aria-invalid="true"` を出力） |
| `is_editing(index)` / `editing_index()` | `bool` / `Option<usize>` | |
| `is_highlighted(index)` / `highlighted_index()` | `bool` / `Option<usize>` | キーボード強調（ephemeral、hydration では運ばない） |
| `tags()` / `len()` / `value()` | `&[String]` / `usize` / `String` | タグ列 / 件数 / カンマ結合値 |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| item / item-preview | `data-value` | タグ文字列 |
| item | `data-editing` | 存在属性（編集中） |
| item / item-preview / item-text / item-input / item-delete-trigger | `data-disabled` | 存在属性 |
| item-preview / item-text / item-delete-trigger | `data-highlighted` | 存在属性（キーボード強調中） |
| input | `data-empty` | 存在属性（入力値が空のとき） |

## Notes

- dispatch: `"add"` / `"remove"` / `"clear"` / `"edit-start"` / `"edit-submit"` / `"edit-cancel"` / `"highlight-prev"`（ArrowLeft 相当）/ `"highlight-next"`（ArrowRight 相当）/ `"highlight-clear"`（Escape 相当）/ `"delete-highlighted"`（Delete 相当）/ `"backspace"`（強調中は強調タグ、なければ末尾タグを削除）。キー入力の自動 dispatch 配線は未提供
- `control` / `item-preview` に `role="listbox"` / `role="option"` は付与しない。`item-input` / `item-delete-trigger` に `tabindex` は固定付与しない
- 呼び出し側 `attrs` による固定付与の状態属性の上書きは除去される

- 「タグのリスト + 編集中インデックス」がどの共有語彙にも当てはまらないため、`crate::state` の既存の型ではなく専用の状態機械を使用する
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Pin Input](./pin-input.md)
- [File Upload](./file-upload.md)
