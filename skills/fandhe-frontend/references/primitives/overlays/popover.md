# Popover

トリガー起点のオーバーレイ。`trigger` に `aria-haspopup="dialog"` + `aria-expanded`、`content` に固定 `role="dialog"` を付与する。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::popover::{root, trigger, anchor, positioner, arrow, arrow_tip, content, title, description, close_trigger, indicator};
use fandhe_frontend_headless_ui::state::OpenState;

let node = root(
    OpenState::Open,
    vec![],
    vec![
        trigger(OpenState::Open, false, Some("p1"), vec![], vec![]),
        positioner(
            OpenState::Open,
            vec![],
            vec![content(OpenState::Open, Some("p1"), Some("p1-title"), None, vec![], vec![title(Some("p1-title"), vec![], vec![])])],
        ),
    ],
);
```

状態機械は `Popover::new(OpenState)` を経由し、`dispatch(&mut p, "open"/"close"/"toggle", "")` で遷移する。

## Anatomy

```
root
  trigger
  anchor
  positioner
    content
      arrow
        arrow-tip
      title
      description
      close-trigger
      indicator
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root(state, attrs, children)` | `OpenState` | — | `data-state` へ反映 |
| `trigger(state, disabled, controls, attrs, children)` | `OpenState`, `bool`, `Option<&str>` | — | `type="button"` 固定・`aria-haspopup="dialog"`。`disabled` はネイティブ `disabled` と `data-disabled` の両方へ反映 |
| `anchor(attrs, children)` | — | — | 位置決めの代替参照要素（装飾用） |
| `positioner(state, attrs, children)` | `OpenState` | — | closed で `hidden` |
| `arrow(attrs, children)` / `arrow_tip(attrs, children)` | — | — | 装飾用のみ（`aria-hidden` 明示なし、anatomy 属性のみ） |
| `content(state, id, labelledby, describedby, attrs, children)` | `OpenState`, `Option<&str>` ×3 | — | `role="dialog"` 固定。closed で `hidden` |
| `title(id, attrs, children)` | `Option<&str>` | — | `id` が `Some` のとき `content` の `labelledby` と対 |
| `description(id, attrs, children)` | `Option<&str>` | — | `id` が `Some` のとき `content` の `describedby` と対 |
| `close_trigger(attrs, children)` | — | — | `type="button"` 固定 |
| `indicator(state, attrs, children)` | `OpenState` | — | `data-state` のみ反映する最小主義パーツ |

## Notes

- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui` クレート）
- 位置計算自体（Floating UI 相当）は `positioning::compute_position` が担い、`positioner`/`arrow` は `attrs` 経由で `style`/`data-side`/`data-align` を透過するだけの薄いラッパー

## Related

- [dialog](./dialog.md)
- [toggle-tip](./toggle-tip.md)
