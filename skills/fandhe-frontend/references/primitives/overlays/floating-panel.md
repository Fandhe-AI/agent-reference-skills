# Floating Panel

ドラッグ・リサイズ可能な非モーダルのフローティングオーバーレイ。開閉状態に加え表示段階（`Stage`: `Default`/`Minimized`/`Maximized`）と座標（x, y）を持つ。`role="dialog"` を付与するが非モーダルのため `aria-modal` は出力しない。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::floating_panel::{root, trigger, positioner, content, header, title, control, stage_trigger, close_trigger, body, Stage};
use fandhe_frontend_headless_ui::state::OpenState;

let node = root(
    OpenState::Open,
    Stage::Default,
    vec![],
    vec![positioner(
        OpenState::Open,
        Stage::Default,
        vec![],
        vec![content(
            OpenState::Open,
            Stage::Default,
            None,
            None,
            vec![],
            vec![
                header(vec![], vec![title(None, vec![], vec![])]),
                body(Stage::Default, vec![], vec![]),
            ],
        )],
    )],
);
```

状態機械は `FloatingPanel::new(OpenState, Stage, x: f64, y: f64)` を経由する。`FloatingPanelAction::{Open, Close, Toggle, Minimize, Maximize, Restore, SetPosition { x, y }}` を dispatch する。

## Anatomy

```
trigger
root
  positioner
    content
      header
        title
        control
          stage-trigger
          close-trigger
      body
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root(state, stage, attrs, children)` | `OpenState`, `Stage` | — | `data-state`/`data-stage` へ反映 |
| `trigger(state, disabled, controls, attrs, children)` | `OpenState`, `bool`, `Option<&str>` | — | `type="button"` 固定・`aria-haspopup="dialog"`・`aria-expanded`。`disabled` はネイティブ `disabled` のみ反映 |
| `positioner(state, stage, attrs, children)` | `OpenState`, `Stage` | — | closed で `hidden` |
| `content(state, stage, id, labelledby, attrs, children)` | `OpenState`, `Stage`, `Option<&str>`, `Option<&str>` | — | `role="dialog"` 固定（`aria-modal` は出力しない） |
| `header(attrs, children)` | — | — | 装飾用コンテナ |
| `title(id, attrs, children)` | `Option<&str>` | — | `id` が `Some` のとき `content` の `labelledby` と対 |
| `control(attrs, children)` | — | — | `stage_trigger`/`close_trigger` のコンテナ |
| `stage_trigger(target, attrs, children)` | `Stage` | — | `type="button"` 固定、`target` を `data-stage` へ反映 |
| `close_trigger(attrs, children)` | — | — | `type="button"` 固定 |
| `body(stage, attrs, children)` | `Stage` | — | `data-stage` へ反映。`minimized` を折り畳みのフックに使う |
| `Stage` | `enum` | `Default` | `Default` / `Minimized` / `Maximized` |
| `FloatingPanel::new(initial, stage, x, y)` | `OpenState`, `Stage`, `f64`, `f64` | x/y: `24.0` | 状態機械。close しても stage・座標は保持する |

## Notes

- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui` クレート）
- `aria-modal` は意図的に出力しない（非モーダルオーバーレイのため）
- ドラッグ・リサイズの実座標配線は `fandhe-frontend-wasm-full` 側の責務

## Related

- [dialog](./dialog.md)
