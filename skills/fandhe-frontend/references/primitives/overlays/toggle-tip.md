# Toggle Tip

クリックで開閉する小型ヒント。見た目は Tooltip だが挙動は Popover（明示的に閉じるまで持続）に近い、Tooltip と Popover の中間に位置する variant。`trigger` に `aria-expanded`/`aria-controls` は付与するが `aria-haspopup` は付与しない。`content` は `role="tooltip"` を持たない。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::toggle_tip::{root, trigger, positioner, content, arrow, arrow_tip};
use fandhe_frontend_headless_ui::state::OpenState;

let node = root(
    OpenState::Open,
    vec![],
    vec![
        trigger(OpenState::Open, false, Some("tt1"), vec![], vec![]),
        positioner(
            OpenState::Open,
            vec![],
            vec![content(OpenState::Open, Some("tt1"), vec![], vec![arrow(vec![], vec![arrow_tip(vec![], vec![])])])],
        ),
    ],
);
```

状態機械は `ToggleTip::new(OpenState)` を経由し、`dispatch(&mut tt, "open"/"close"/"toggle", "")` で遷移する。

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
| `trigger(state, disabled, controls, attrs, children)` | `OpenState`, `bool`, `Option<&str>` | — | `type="button"` 固定・`aria-expanded` 常時出力・`aria-haspopup` は付与しない |
| `positioner(state, attrs, children)` | `OpenState` | — | closed で `hidden` |
| `content(state, id, attrs, children)` | `OpenState`, `Option<&str>` | — | closed で `hidden`。`role="tooltip"` は持たない |
| `arrow(attrs, children)` / `arrow_tip(attrs, children)` | — | — | `aria-hidden="true"` 固定 |

## Notes

- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui` クレート）
- click-outside dismiss・Escape 閉鎖はクライアントサイド実行時挙動でスコープ外
- Tooltip（`aria-describedby` + `role="tooltip"`、hover/focus 由来）・Popover（`aria-haspopup="dialog"`、対話的な dialog 相当）のいずれとも ARIA 表現が異なる

## Related

- [tooltip](./tooltip.md)
- [popover](./popover.md)
