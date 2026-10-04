# Collapsible

トリガー・インジケータ・パネルを持つページ内 disclosure（開閉パネル）のスタイル済み部品。Root / Trigger / Indicator / Content の 4 パーツ構成。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::collapsible::{self, OpenState};

// root(state: OpenState, disabled: bool, attrs, children)
let node = collapsible::root(OpenState::Closed, false, vec![], vec![]);
```

`stylesheet() -> String` が静的 CSS 全量を返す（決定的）。パーツ関数は本モジュールで再定義されず、`fandhe_frontend_headless_ui::collapsible::*` を glob 再エクスポートする。`OpenState` / `DisclosureAction` も再エクスポートされる。

```rust
pub fn root<'a>(state: OpenState, disabled: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn trigger<'a>(state: OpenState, disabled: bool, controls: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn indicator<'a>(state: OpenState, disabled: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn content<'a>(state: OpenState, disabled: bool, id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
```

状態機械 `Collapsible::new(initial: OpenState)`（`state()` / `data_state()` / `is_open()` と、`state` 引数を省いた `root` / `trigger` / `indicator` / `content` メソッド）も再エクスポートされる。

## Anatomy

`root` / `trigger` / `indicator` / `content`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `state` | `OpenState`（`Open` \| `Closed`） | 開閉状態（`data-state`） |
| `disabled` | `bool` | 無効化（`data-disabled`） |
| `trigger.controls` | `Option<&str>` | 制御対象 content の id（`aria-controls`） |
| `content.id` | `Option<&str>` | content の id |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/themes/collapsible/
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- size / variant / colorPalette 軸は持たず、CSS 到達は `[data-scope]` / `[data-part]` 属性セレクタのみに依存する
- `data-state`（open / closed）と `data-disabled` は、トリガーの文字色強調・インジケータの回転・減光として視覚に反映される
- ページ内に収まる disclosure でオーバーレイではないため、掲示位置を中和する専用 CSS は不要
- パネルの開閉は headless 層が付与する `hidden` 属性で行う。JS 有効時は `fandhe-frontend-wasm-full` が実測した content の高さを CSS 変数 `--fandhe-content-height` へ書き込み、`@starting-style` + `transition-behavior: allow-discrete` で高さトランジションとして表現する（`hidden` 契約は維持）。Radix の `collapsedHeight` のような JS 実測依存の部分表示は再現しない
- JS 無効時（変数未設定）は `auto` フォールバックにより `hidden` による即時切り替えのまま動作する

## Related

- [Collapsible (primitives)](../../primitives/disclosure/collapsible.md)
- [Accordion](./accordion.md)
