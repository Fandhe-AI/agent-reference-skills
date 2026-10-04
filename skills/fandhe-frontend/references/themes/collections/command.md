# Command

cmdk 由来のコマンドパレット（shadcn/ui `Command` 相当）のスタイル済み部品。headless 10 パーツ + pre-styled-only の `footer` の計 11 パーツ構成。`size` / `variant` / `color-palette` のいずれの軸も持たない。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::command::{self, OpenState};

// root(state: OpenState, empty: bool, attrs, children)
let node = command::root(OpenState::Open, false, vec![], vec![]);

// pre-styled-only footer: children へ kbd とテキストを組んで渡す
let footer = command::footer(vec![], vec![]);
```

`stylesheet() -> String` が静的 CSS 全量を返す（決定的）。`filter_items`（headless 層の純粋関数）と `OpenState` は再エクスポートされる。

```rust
pub fn root<'a>(state: OpenState, empty: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn dialog<'a>(state: OpenState, label: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn input<'a>(state: OpenState, value: &'a str, list_id: &'a str, activedescendant: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>) -> Node
pub fn list<'a>(id: &'a str, label: &'a str, empty: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn empty<'a>(present: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn group<'a>(labelledby: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn group_heading<'a>(id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item<'a>(selected: bool, disabled: bool, value: &'a str, id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn shortcut<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn separator<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn footer<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
```

## Anatomy

`root` / `dialog` / `input` / `list` / `empty` / `group` / `group-heading` / `item` / `shortcut` / `separator`（headless 10 パーツ）+ `footer`（pre-styled-only、headless anatomy には存在しない）

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `root.state` / `dialog.state` / `input.state` | `OpenState`（`Open` \| `Closed`） | 開閉状態 |
| `root.empty` / `list.empty` | `bool` | 絞り込み結果が 0 件か |
| `empty.present` | `bool` | `data-empty` の有無を切り替える。付くと `display: block`（既定は `display: none`） |
| `item.selected` | `bool` | `data-selected` の有無。選択行の背景色を切り替える |
| `item.disabled` | `bool` | 無効行 |
| `item.value` | `&str` | 項目値 |
| `input.value` / `input.list_id` / `input.activedescendant` | `&str` / `&str` / `Option<&str>` | 入力値・対応する list の id・アクティブ項目 id |
| `dialog.label` / `list.label` | `&str` | アクセシブルネーム |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/themes/command/
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- 呼び出し側 `class` 属性は全パーツで除去される（見た目クラスを付与しない）
- 選択行は `data-selected` の背景色で表し、hover はその背景色を洗い流さないよう選択行を除外する
- `shortcut` は右寄せのみを担う。`children` へ [Kbd](../typography/kbd.md) を渡してキー表示を合成する
- `dialog` の幅は `--fandhe-command-dialog-max-width`（既定 32rem）で決まり、closed 時は `hidden` で非表示化される
- `footer`（イシュー #3143）はキー操作ヒント（例: `↑↓ で移動` / `↵ で選択` / `esc で閉じる`）を区切り線付きでリスト下端に並べるレイアウト専用パート。`root` の直接の子として `list` / `empty` の後ろに置く
- 絞り込み配線・Enter 実行・Cmd/Ctrl+K のグローバルショートカット・フォーカストラップ・`footer` のキー操作配線は本部品では実装しない

## Related

- [Command (primitives)](../../primitives/collections/command.md)
- [Kbd](../typography/kbd.md)
- [Select](./select.md)
- [Menu](./menu.md)
