# Select

Popup-style listbox selection component (18 anatomy parts). Combines [`state::Disclosure`](../../) (open/close) + [`state::SingleSelect`] (selection, at most 1) into a composite state machine, with trigger/positioner and a `hidden_select` for native form submission.

## Signature / Usage

```rust
// Free functions (SSR, `fandhe_frontend_headless_ui::select`)
pub fn root<'a>(state: OpenState, props: &SelectProps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn label<'a>(props: &SelectProps, id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn control<'a>(state: OpenState, props: &SelectProps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn trigger<'a>(state: OpenState, props: &SelectProps, placeholder_shown: bool, controls: Option<&'a str>, labelledby: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn value_text<'a>(placeholder_shown: bool, props: &SelectProps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn clear_trigger<'a>(props: &SelectProps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn indicator<'a>(state: OpenState, props: &SelectProps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn positioner<'a>(state: OpenState, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn content<'a>(state: OpenState, id: Option<&'a str>, labelledby: Option<&'a str>, activedescendant: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item_group<'a>(props: &SelectProps, labelledby: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item_group_label<'a>(id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item<'a>(selected_state: OpenState, props: &SelectProps, disabled: bool, highlighted: bool, value: &'a str, id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item_text<'a>(selected_state: OpenState, props: &SelectProps, disabled: bool, highlighted: bool, id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item_indicator<'a>(selected_state: OpenState, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn separator<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn scroll_up_button<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn scroll_down_button<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn hidden_select<'a>(selected: Option<&'a str>, name: Option<&'a str>, props: &SelectProps, attrs: Vec<(&'a str, &'a str)>, options: Vec<(&'a str, &'a str)>) -> Node

// State machine (CSR/hydration, implements `Component` + `Hydrate`)
pub enum SelectAction { Open, Close, Toggle, /* ... */ }

pub struct Select { /* disclosure: Disclosure, selection: SingleSelect */ }
impl Select {
    pub fn open_state(&self) -> OpenState
    pub fn is_open(&self) -> bool
    pub fn selected(&self) -> Option<&str>
    pub fn is_selected(&self, value: &str) -> bool
    pub fn item_state(&self, value: &str) -> OpenState
    // 現在状態を注入する利便メソッド: root(props, ..) / control(props, ..) / trigger(props, controls, labelledby, ..)
    // value_text(props, ..) / indicator(props, ..) / positioner(..) / content(id, labelledby, activedescendant, ..)
    // item(value, props, disabled, highlighted, id, ..) / item_text(value, props, disabled, highlighted, id, ..)
    // item_indicator(value, ..) / hidden_select(name, props, attrs, options)
    // （label / clear_trigger / item_group / item_group_label / separator / scroll_*_button の利便メソッドは無い）
}
```

## Anatomy

```
root
  label
  control
    trigger
      value-text
      indicator
    clear-trigger
  positioner
    content
      scroll-up-button
      item-group
        item-group-label
        item
          item-text
          item-indicator
      separator
      scroll-down-button
  hidden-select
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| state | `OpenState` | listbox 開閉状態（`data-state`、`aria-expanded`） |
| `SelectProps.disabled` | `bool`（既定 `false`） | root / label / control / trigger / value-text / clear-trigger / indicator / item-group に `data-disabled`。`item` / `item_text` へは `props.disabled \|\| 個別 disabled` として伝播。`trigger` / `clear_trigger` / `hidden_select` にネイティブ `disabled` |
| `SelectProps.readonly` | `bool`（既定 `false`） | 同パーツに `data-readonly`（readonly 中の trigger 操作抑止はクライアント層が `data-readonly` を参照して行う） |
| `SelectProps.invalid` | `bool`（既定 `false`） | 同パーツに `data-invalid` |
| `SelectProps.required` | `bool`（既定 `false`） | `label` に `data-required`、`hidden_select` にネイティブ `required`（`<select readonly>` は無効な HTML のため `readonly` は反映しない） |
| activedescendant | `Option<&str>` | `content` の `aria-activedescendant`（`combobox` と異なり `content` 側に配線） |
| placeholder_shown | `bool` | `value_text` の `data-placeholder-shown` |
| selected / name | `Option<&str>` | `hidden_select` のネイティブ `<select>` 選択値・`name` |

## Notes

- `hidden_select` は `aria-hidden="true"` + `tabindex="-1"` で視覚 UI との二重公開・二重フォーカスを防ぐ。未選択時は不可視プレースホルダー option を自動挿入し、ブラウザの先頭 option 自動選択による誤送信を防ぐ
- `trigger` は未選択時に `data-placeholder-shown`（`value_text` と同様）を出力。`item` は選択時のみ `data-selected` 存在属性を追加し、`item_text` は `data-state` / `data-disabled` / `data-highlighted`、`item_group_label` は `role="presentation"`、`item_indicator` は `aria-hidden="true"` を出力する。`separator` / `scroll_up_button` / `scroll_down_button` は装飾用で `aria-hidden="true"`（可視性判定・スクロール動作はクライアント層の責務）
- ハイライト移動・typeahead・キーボードナビゲーション自体は CSR 挙動層のスコープ。本モジュールは `data-highlighted`/`aria-activedescendant` の SSR 静的表現のみ提供する
- `combobox` と異なり `aria-activedescendant` は `content` 側に配線する（`select` の trigger は combobox 化しない）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [combobox](./combobox.md)
- [listbox](./listbox.md)
