# Collapsible

開閉パネルを表す headless コンポーネント。`root`/`trigger`/`indicator`/`content` の自由関数、または状態機械 `Collapsible` を提供する。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::collapsible;
use fandhe_frontend_headless_ui::state::OpenState;

// SSR: 自由関数を直接呼ぶ
collapsible::root(state: OpenState, disabled: bool, attrs, children);
collapsible::trigger(state: OpenState, disabled: bool, controls: Option<&str>, attrs, children);
collapsible::indicator(state: OpenState, attrs, children);
collapsible::content(state: OpenState, id: Option<&str>, attrs, children);

// CSR/hydration: 状態機械
let c = collapsible::Collapsible::new(OpenState::Closed);
c.trigger(false, None, vec![], vec![]);
```

## Anatomy

```
root
  trigger
    indicator
  content
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `root.state` | `OpenState`（既定 `Closed`） | パネル全体の開閉状態を `data-state` へ反映 |
| `root.disabled` | `bool` | `data-disabled` へ反映 |
| `trigger.state` | `OpenState` | `aria-expanded`/`data-state` へ反映 |
| `trigger.disabled` | `bool` | ネイティブ `disabled` と `data-disabled` の両方へ反映 |
| `trigger.controls` | `Option<&str>` | `Some` のとき `aria-controls` で `content` と関連付け |
| `indicator.state` | `OpenState` | `data-state` のみを反映する最小主義な装飾パーツ |
| `content.state` | `OpenState` | closed のとき `hidden` 存在属性を付与 |
| `content.id` | `Option<&str>` | `trigger.controls` と対で使う id |

## Data Attributes

| Part | Attribute | Values |
|------|-----------|--------|
| `root` | `data-state` | `open` \| `closed` |
| `trigger` | `data-state` | `open` \| `closed` |
| `indicator` | `data-state` | `open` \| `closed` |
| `content` | `data-state` | `open` \| `closed` |

## Accessibility

- `trigger` に `type="button"`（意図しない submit を防ぐ）、`aria-expanded`、`controls` が `Some` のとき `aria-controls` を出力

## Notes

- `Collapsible` の dispatch は `"open"`/`"close"`/`"toggle"`
- アニメーション対応（`open`/`visible` の分離、CSS 変数出力）はスコープ外
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [Accordion](./accordion.md)
