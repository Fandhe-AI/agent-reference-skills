# Command

検索入力 + 絞り込み済みリスト + グループ + ショートカット表示 + dialog 内表示を組み合わせたコマンドパレット相当の shadcn/ui Command（cmdk 由来）部品。`command` mod が構造・アクセシビリティ（WAI-ARIA）・表示状態（`data-*`）のみを提供する unstyled 部品で、`root` / `input` / `list` / `empty` / `group` / `group-heading` / `item` / `shortcut` / `separator` / `dialog` の 10 anatomy パーツと、`Disclosure` + `TextInput` + `SingleSelect` を合成した状態機械 `Command` を持つ。

## Signature / Usage

```rust
use fandhe_frontend_core::text;
use fandhe_frontend_headless_ui::command::{self, Command};

let cmd = Command::default();
let items = [("calendar", "Calendar"), ("search", "Search")];
let empty = cmd.is_empty(&items);

let node = cmd.root(empty, vec![], vec![
    cmd.input("command-list", None, vec![]),
    command::list("command-list", "Suggestions", empty, vec![], vec![
        cmd.item("calendar", false, Some("opt-calendar"), vec![], vec![text("Calendar")]),
    ]),
    command::empty(empty, vec![], vec![text("No results.")]),
]);
```

自由関数（状態を引数で受ける）:

```rust
command::root(state: OpenState, empty: bool, attrs, children) -> Node
command::dialog(state: OpenState, label: &str, attrs, children) -> Node
command::input(state: OpenState, value: &str, list_id: &str, activedescendant: Option<&str>, attrs) -> Node
command::list(id: &str, label: &str, empty: bool, attrs, children) -> Node
command::empty(present: bool, attrs, children) -> Node
command::group(labelledby: Option<&str>, attrs, children) -> Node
command::group_heading(id: Option<&str>, attrs, children) -> Node
command::item(selected: bool, disabled: bool, value: &str, id: Option<&str>, attrs, children) -> Node
command::shortcut(attrs, children) -> Node
command::separator(attrs, children) -> Node
command::filter_items<'a>(items: &[(&'a str, &'a str)], query: &str) -> Vec<(&'a str, &'a str)>
```

`Command` のメソッド: `open_state()` / `is_open()` / `query()` / `filtered_items(items)` / `is_empty(items)` / `selected()` / `is_selected(value)` / `root(empty, attrs, children)` / `dialog(label, attrs, children)` / `input(list_id, activedescendant, attrs)` / `item(value, disabled, id, attrs, children)`。

## Anatomy

典型的な入れ子の一例（各パーツは自由関数で独立に組み立てられる）。

```
root
  dialog
  input
  list
    group
      group-heading
      item
        shortcut
    separator
  empty
```

`empty` は `list` の外、`root` の直接の子として置く。

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root: state` | `OpenState` | — | dialog の開閉状態。`data-state` に反映 |
| `root` / `list` / `empty: empty` (`present`) | `bool` | — | 絞り込み結果 0 件のとき `data-empty` を出力 |
| `dialog: label` | `&str` | — | 空文字列でないときのみ `aria-label` を付与 |
| `input: list_id` | `&str` | 必須 | `aria-controls` として常に出力 |
| `input: activedescendant` | `Option<&str>` | — | `Some` のとき `aria-activedescendant`。選択中 `item` の `id` と対応 |
| `list: id` / `label` | `&str` | 必須 | `id` と `aria-label`（アクセシブルネームを型で強制） |
| `group: labelledby` | `Option<&str>` | — | `Some` のときのみ `role="group"` + `aria-labelledby`。`group-heading` の `id` が参照先 |
| `item: selected` | `bool` | — | `aria-selected` + `data-selected`（presence） |
| `item: disabled` | `bool` | — | `aria-disabled="true"` + `data-disabled` |
| `item: value` | `&str` | 必須 | `data-value` として出力 |
| `item: id` | `Option<&str>` | — | `input` の `activedescendant` の参照先 |

## Actions

`CommandAction`（`Command::update`）と WASM 境界の dispatch 名:

| Variant | dispatch 名 | Description |
| --- | --- | --- |
| `Open` | `"open"` | dialog を開く |
| `Close` | `"close"` | dialog を閉じる |
| `Toggle` | `"toggle"` | dialog の開閉を反転 |
| `Input(String)` | `"input"` (payload=クエリ) | 検索クエリを置換。dialog は開閉しない |
| `Clear` | `"clear"` | 検索クエリをクリア |
| `Select(String)` | `"select"` (payload=value) | 候補値を選択。dialog は閉じない |
| `Deselect` | `"deselect"` | 選択解除 |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| root | `data-state` | `open` \| `closed` |
| root / list / empty | `data-empty` | presence |
| input | `data-state` | `open` \| `closed` |
| dialog | `data-state` | `open` \| `closed`（closed のとき `hidden` も付与） |
| item | `data-selected` / `data-disabled` | presence |
| item | `data-value` | 候補値 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/primitives/command/
- `input` は `role="combobox"` + `aria-autocomplete="list"` + `autocomplete="off"` + `aria-controls` を固定付与する。`list` は `role="listbox"`、`item` は `role="option"`、`dialog` は `role="dialog"` + `aria-modal="true"` + `tabindex="-1"`。
- `item` は `data-highlighted` / `data-state` を出力しない（`combobox` / `listbox` との意図的な差分。`aria-activedescendant` が指すのは確定選択中の item であり、キーボードでハイライト中の行ではない）。
- `Command` 状態機械は cmdk 意味論に合わせ、入力（`Input`）も選択（`Select`）も dialog を開閉しない。実行フックはアプリケーションロジックで UI 層の範囲外。
- 表示切替（`hidden` 等）は呼び出し側または pre-styled-ui の CSS の責務。
- キーボード操作（矢印キー・Enter・Escape・Cmd/Ctrl+K）の実 DOM 配線は `fandhe-frontend-wasm-full` の `command` モジュールが実装済み。
- 自前 CSS の最小例: `[data-scope="command"][data-part="item"][data-selected] { background: #eef; }`、`[data-scope="command"][data-part="dialog"][hidden] { display: none; }`。
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）。

## Related

- [Combobox](./combobox.md)
- [Listbox](./listbox.md)
- [Menu](./menu.md)
- [Dialog](../overlays/dialog.md)
- [Command（Themes 版）](../../themes/collections/command.md)
