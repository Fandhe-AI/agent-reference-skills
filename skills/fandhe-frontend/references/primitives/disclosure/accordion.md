# Accordion

開閉可能な項目リストを表す headless コンポーネント。高々1項目が開く single モード（`root`/`item`/`item_trigger`/`item_indicator`/`item_content` の自由関数、または状態機械 `Accordion`）と、複数項目が同時に開く multiple モード（状態機械 `MultiAccordion`）を提供する。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::accordion;
use fandhe_frontend_headless_ui::state::OpenState;

// SSR: 自由関数を直接呼ぶ
accordion::root(attrs, children);
accordion::item(state: OpenState, disabled: bool, attrs, children);
accordion::item_trigger(state: OpenState, disabled: bool, id: Option<&str>, controls: Option<&str>, attrs, children);
accordion::item_indicator(state: OpenState, attrs, children);
accordion::item_content(state: OpenState, id: Option<&str>, labelled_by: Option<&str>, attrs, children);

// CSR/hydration: 状態機械
let mut a = accordion::Accordion::default(); // single モード（高々1項目 open）
// let mut a = accordion::MultiAccordion::default(); // multiple モード（複数同時 open）
a.item_trigger("value", false, None, None, vec![], vec![]);
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
| `item.state` | `OpenState`（既定 `Closed`） | 項目の開閉状態を `data-state` へ反映 |
| `item.disabled` | `bool` | `data-disabled` へ反映 |
| `item_trigger.state` | `OpenState` | `aria-expanded`/`data-state` へ反映 |
| `item_trigger.disabled` | `bool` | ネイティブ `disabled` と `data-disabled` の両方へ反映 |
| `item_trigger.id` | `Option<&str>` | トリガー要素の `id` |
| `item_trigger.controls` | `Option<&str>` | `aria-controls` で `item_content` と関連付け |
| `item_indicator.state` | `OpenState` | `data-state` のみを反映する最小主義な装飾パーツ |
| `item_content.state` | `OpenState` | closed のとき `hidden` 存在属性を付与 |
| `item_content.id` | `Option<&str>` | `item_trigger.controls` と対で使う id |
| `item_content.labelled_by` | `Option<&str>` | `Some` のときのみ `role="region"` + `aria-labelledby` を出力 |

## Data Attributes

| Part | Attribute | Values |
|------|-----------|--------|
| `item` | `data-state` | `open` \| `closed` |
| `item-trigger` | `data-state` | `open` \| `closed` |
| `item-indicator` | `data-state` | `open` \| `closed` |
| `item-content` | `data-state` | `open` \| `closed` |

## Accessibility

- `item_trigger` に `type="button"`（フォーム内での意図しない submit を防ぐ）、`aria-expanded`、`controls` が `Some` のとき `aria-controls` を出力
- `item_content` は `labelled_by` が `Some` のときのみ `role="region"` + `aria-labelledby` の対を出力（名前なし region を作らない）
- orientation・キーボードナビゲーションは SSR 静的マークアップに寄与しない CSR 挙動層としてスコープ外（`data-orientation` が必要な場合は呼び出し側が `attrs` で付与）

## Notes

- `Accordion`（single モード）は dispatch `"select"`/`"deselect"`/`"toggle"`（`"deselect"` は payload なしで全解除）
- `MultiAccordion`（multiple モード）は dispatch `"select"`/`"deselect"`/`"toggle"`（`"deselect"` は項目値 payload 必須）
- lazyMount / unmountOnExit / アニメーション用 CSS 変数はスコープ外（`item_content` は `hidden` のみで closed を表現）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [Collapsible](./collapsible.md)
- [Tabs](./tabs.md)
