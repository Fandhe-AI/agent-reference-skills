# Accordion

開閉可能な項目リストを表す headless コンポーネント。高々1項目が開く single モード（`root`/`item`/`item_trigger`/`item_indicator`/`item_content` の自由関数、または状態機械 `Accordion`）と、複数項目が同時に開く multiple モード（状態機械 `MultiAccordion`）を提供する。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::accordion::{self, AccordionProps};
use fandhe_frontend_headless_ui::state::OpenState;

let props = AccordionProps::default(); // orientation: Vertical, disabled: false

// SSR: 自由関数を直接呼ぶ
accordion::root(&props, attrs, children);
accordion::item(state: OpenState, disabled: bool, &props, attrs, children);
accordion::item_trigger(state: OpenState, disabled: bool, &props, value: &str, id: Option<&str>, controls: Option<&str>, attrs, children);
accordion::item_indicator(state: OpenState, disabled: bool, &props, attrs, children);
accordion::item_content(state: OpenState, disabled: bool, &props, id: Option<&str>, labelled_by: Option<&str>, attrs, children);

// CSR/hydration: 状態機械（項目値 value から OpenState を解決して各パーツへ注入する）
let mut a = accordion::Accordion::default(); // single モード（高々1項目 open）
// let mut a = accordion::MultiAccordion::default(); // multiple モード（複数同時 open）
a.item_trigger("value", false, &props, None, None, vec![], vec![]);
```

## Anatomy

```
root
  item
    item-trigger
      item-indicator
    item-content
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `AccordionProps.orientation` | `Orientation`（既定 `Vertical`） | 全パーツの `data-orientation` へ反映 |
| `AccordionProps.disabled` | `bool`（既定 `false`） | 全項目を一括 disabled にする。実効 disabled は `props.disabled \|\| 項目単位 disabled` |
| `item.state` | `OpenState`（既定 `Closed`） | 項目の開閉状態を `data-state` へ反映 |
| `item.disabled` | `bool` | 実効 disabled を `data-disabled` へ反映 |
| `item_trigger.state` | `OpenState` | `aria-expanded`/`data-state` へ反映 |
| `item_trigger.disabled` | `bool` | 実効 disabled をネイティブ `disabled`・`data-disabled`・`aria-disabled="true"` の 3 つへ反映 |
| `item_trigger.value` | `&str` | 項目値。`data-value` として出力され、クリックを `"toggle"` アクションへ写像する際の payload になる |
| `item_trigger.id` | `Option<&str>` | トリガー要素の `id` |
| `item_trigger.controls` | `Option<&str>` | `aria-controls` で `item_content` と関連付け |
| `item_indicator.state` | `OpenState` | `data-state` へ反映する最小主義な装飾パーツ |
| `item_indicator.disabled` | `bool` | 実効 disabled を `data-disabled` へ反映 |
| `item_content.state` | `OpenState` | closed のとき `hidden` 存在属性を付与 |
| `item_content.disabled` | `bool` | 実効 disabled を `data-disabled` へ反映 |
| `item_content.id` | `Option<&str>` | `item_trigger.controls` と対で使う id |
| `item_content.labelled_by` | `Option<&str>` | `Some` のときのみ `role="region"` + `aria-labelledby` を出力 |

## Data Attributes

| Part | Attribute | Values |
|------|-----------|--------|
| `item` | `data-state` | `open` \| `closed` |
| `item-trigger` | `data-state` | `open` \| `closed` |
| `item-indicator` | `data-state` | `open` \| `closed` |
| `item-content` | `data-state` | `open` \| `closed` |
| `root` / `item` / `item-trigger` / `item-indicator` / `item-content` | `data-orientation` | `horizontal` \| `vertical`（`AccordionProps.orientation`） |
| `item` / `item-trigger` / `item-indicator` / `item-content` | `data-disabled` | 存在属性（実効 disabled のとき） |
| `item-trigger` | `data-value` | 項目値 |

## Accessibility

- `item_trigger` に `type="button"`（フォーム内での意図しない submit を防ぐ）、`aria-expanded`、`controls` が `Some` のとき `aria-controls`、実効 disabled のとき `aria-disabled="true"` を出力
- `item_indicator` は常に `aria-hidden="true"`（装飾用。開閉状態は trigger の `aria-expanded` で伝わる）
- `item_content` は `labelled_by` が `Some` のときのみ `role="region"` + `aria-labelledby` の対を出力（名前なし region を作らない）
- 呼び出し側 `attrs` による固定付与キー（`data-orientation` / `aria-disabled` / `aria-hidden`）の上書きは除去される
- キーボードナビゲーション（orientation に応じた矢印キー移動）はクライアント層の責務。SSR マークアップは `data-orientation` までを出力する。キーボード循環（loop）は非採用

## Notes

- `Accordion`（single モード）は dispatch `"select"`/`"deselect"`/`"toggle"`（`"deselect"` は payload なしで全解除）
- `MultiAccordion`（multiple モード）は dispatch `"select"`/`"deselect"`/`"toggle"`（`"deselect"` は項目値 payload 必須）
- lazyMount / unmountOnExit / アニメーション用 CSS 変数はスコープ外（`item_content` は `hidden` のみで closed を表現）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [Collapsible](./collapsible.md)
- [Tabs](./tabs.md)
