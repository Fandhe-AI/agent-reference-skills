# Hover Card

hover / focus で開閉するリンクプレビュー用オーバーレイ。WAI-ARIA に hover card 専用パターンが存在しないため、`aria-expanded`/`aria-controls`/`aria-haspopup` および `content` への固定 `role` を一切付与しない。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::hover_card::{root, trigger, positioner, content, arrow, arrow_tip, HoverCardDelays};
use fandhe_frontend_headless_ui::state::OpenState;

let node = root(
    OpenState::Open,
    HoverCardDelays::default(),
    vec![],
    vec![
        trigger(OpenState::Open, Some("https://example.com"), vec![], vec![]),
        positioner(
            OpenState::Open,
            vec![],
            vec![content(OpenState::Open, None, vec![], vec![arrow(vec![], vec![arrow_tip(vec![], vec![])])])],
        ),
    ],
);
```

状態機械は `HoverCard::new(OpenState, HoverCardDelays)` を経由し、`dispatch(&mut hc, "open"/"close"/"toggle", "")` で遷移する。

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
| `root(state, delays, attrs, children)` | `OpenState`, `HoverCardDelays` | — | `data-state`・`data-open-delay`・`data-close-delay`（10進 ms 値）へ反映 |
| `trigger(state, href, attrs, children)` | `OpenState`, `Option<&str>` | — | `a` 要素。`href` が `Some` のときのみ `href` 出力 |
| `positioner(state, attrs, children)` | `OpenState` | — | closed で `hidden` |
| `content(state, id, attrs, children)` | `OpenState`, `Option<&str>` | — | closed で `hidden`。固定 `aria-describedby` 配線なし |
| `arrow(attrs, children)` | — | — | `aria-hidden="true"` 固定 |
| `arrow_tip(attrs, children)` | — | — | `aria-hidden="true"` 固定 |
| `HoverCardDelays` | `struct` | `open_ms: 600`, `close_ms: 300` | ark-ui 既定値相当（タイマー駆動自体はスコープ外） |

## Notes

- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui` クレート）
- `trigger` は `a`（リンクプレビュー用途）で `button` ではない
- タイマー駆動そのものは JS ランタイム側の責務でスコープ外

## Related

- [tooltip](./tooltip.md)
- [popover](./popover.md)
