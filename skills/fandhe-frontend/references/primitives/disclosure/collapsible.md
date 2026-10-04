# Collapsible

開閉パネルを表す headless コンポーネント。`root`/`trigger`/`indicator`/`content` の自由関数、または状態機械 `Collapsible` を提供する。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::collapsible;
use fandhe_frontend_headless_ui::state::OpenState;

// SSR: 自由関数を直接呼ぶ
collapsible::root(state: OpenState, disabled: bool, attrs, children);
collapsible::trigger(state: OpenState, disabled: bool, controls: Option<&str>, attrs, children);
collapsible::indicator(state: OpenState, disabled: bool, attrs, children);
collapsible::content(state: OpenState, disabled: bool, id: Option<&str>, attrs, children);

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
| `indicator.state` | `OpenState` | `data-state` へ反映する最小主義な装飾パーツ |
| `indicator.disabled` | `bool` | `data-disabled` へ反映（`span` のためネイティブ `disabled` は付与しない） |
| `content.state` | `OpenState` | closed のとき `hidden` 存在属性を付与 |
| `content.disabled` | `bool` | `data-disabled` へ反映（`div` のためネイティブ `disabled` は付与しない） |
| `content.id` | `Option<&str>` | `trigger.controls` と対で使う id |

## Data Attributes

| Part | Attribute | Values |
|------|-----------|--------|
| `root` | `data-state` | `open` \| `closed` |
| `trigger` | `data-state` | `open` \| `closed` |
| `indicator` | `data-state` | `open` \| `closed` |
| `content` | `data-state` | `open` \| `closed` |
| `root` / `trigger` / `indicator` / `content` | `data-disabled` | 存在属性（`disabled=true` のとき） |

## Accessibility

- `trigger` に `type="button"`（意図しない submit を防ぐ）、`aria-expanded`、`controls` が `Some` のとき `aria-controls` を出力

## Notes

- `Collapsible` の dispatch は `"open"`/`"close"`/`"toggle"`。キーボード操作は Space / Enter のみ（`trigger` がネイティブ `<button type="button">` のため。独自 keydown ハンドラは持たない）
- 呼び出し側 `attrs` による固定属性（`data-state` / `data-disabled` / `aria-expanded` / `aria-controls` / `type` / `disabled` / `hidden` / `id`）の上書きは除去される
- ark-ui の `data-collapsible` 存在属性、サイズ計測系の CSS 変数は非採用
- アニメーション対応（`open`/`visible` の分離、CSS 変数出力）はスコープ外
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [Accordion](./accordion.md)
