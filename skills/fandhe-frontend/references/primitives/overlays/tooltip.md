# Tooltip

吹き出しヒント。WAI-ARIA tooltip パターンに従い、`trigger` は `aria-describedby` で `content` と関連付け、`role="tooltip"` は `content` 側が持つ。`aria-expanded`/`aria-controls` は使用しない（trigger 自体が展開可能なウィジェットではないため）。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::tooltip::{root, trigger, positioner, content, arrow, arrow_tip};
use fandhe_frontend_headless_ui::state::OpenState;

let node = root(
    OpenState::Open,
    vec![],
    vec![
        trigger(OpenState::Open, false, Some("tip1"), vec![], vec![]),
        positioner(
            OpenState::Open,
            vec![],
            vec![content(OpenState::Open, Some("tip1"), vec![], vec![arrow(vec![], vec![arrow_tip(vec![], vec![])])])],
        ),
    ],
);
```

状態機械は `Tooltip::new(OpenState)` を経由し、`dispatch(&mut t, "open"/"close"/"toggle", "")` で遷移する。

## Anatomy

```
root
  trigger
  positioner
    content
      arrow
        arrow-tip
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root(state, attrs, children)` | `OpenState` | — | `data-state` へ反映 |
| `trigger(state, disabled, describedby, attrs, children)` | `OpenState`, `bool`, `Option<&str>` | — | `type="button"` 固定・`data-state`。`describedby` が `Some` のとき `aria-describedby`。`disabled` はネイティブ `disabled` と `data-disabled` の両方へ反映 |
| `positioner(state, attrs, children)` | `OpenState` | — | closed で `hidden` |
| `content(state, id, attrs, children)` | `OpenState`, `Option<&str>` | — | `role="tooltip"` 固定・`data-state`（trigger の describedby と対の `id`）。closed で `hidden` |
| `arrow(attrs, children)` / `arrow_tip(attrs, children)` | — | — | `aria-hidden="true"` 固定 |

## Notes

- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui` クレート）
- `openDelay`/`closeDelay`/`interactive`/`closeOnEscape` はクライアントサイド実行時挙動でスコープ外
- `Tooltip` の利便メソッド: `root(attrs, children)` / `trigger(disabled, describedby, attrs, children)` / `content(id, attrs, children)` / `positioner(attrs, children)`（`arrow` / `arrow_tip` は状態非依存のため無し）。`state()` / `is_open()` / `data_state()` あり。位置計算は `positioner` / `arrow` の `attrs` 経由で `style` / `data-side` / `data-align` を透過する

## Related

- [toggle-tip](./toggle-tip.md)
- [hover-card](./hover-card.md)
