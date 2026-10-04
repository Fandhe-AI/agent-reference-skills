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
                header(Stage::Default, vec![], vec![title(None, vec![], vec![])]),
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
| `content(state, stage, id, labelledby, attrs, children)` | `OpenState`, `Stage`, `Option<&str>`, `Option<&str>` | — | `role="dialog"` 固定（`aria-modal` は出力しない）・`data-state`・`data-stage` |
| `header(stage, attrs, children)` | `Stage` | — | 装飾用コンテナ。`data-stage` へ反映 |
| `title(id, attrs, children)` | `Option<&str>` | — | `id` が `Some` のとき `content` の `labelledby` と対（`h2`） |
| `control(stage, attrs, children)` | `Stage` | — | `stage_trigger`/`close_trigger` のコンテナ。`data-stage` へ反映 |
| `stage_trigger(target, attrs, children)` | `Stage` | — | `type="button"` 固定、`target`（遷移先 stage）を `data-stage` へ反映 |
| `close_trigger(attrs, children)` | — | — | `type="button"` 固定 |
| `body(stage, attrs, children)` | `Stage` | — | `data-stage` へ反映。`Stage::Minimized` のとき `hidden`（本文のみを隠す） |
| `Stage` | `enum` | `Default` | `Default` / `Minimized` / `Maximized` |
| `FloatingPanel::new(initial, stage, x, y)` | `OpenState`, `Stage`, `f64`, `f64` | x/y: `24.0` | 状態機械。close しても stage・座標は保持する |

## Notes

- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui` クレート）
- `aria-modal` は意図的に出力しない（非モーダルオーバーレイのため）
- ドラッグ・リサイズの実座標配線は `fandhe-frontend-wasm-full` 側の責務。dispatch は `"open"` / `"close"` / `"toggle"` / `"minimize"` / `"maximize"` / `"restore"` / `"set_position"`。`headless` の part → action 対応表に `floating-panel` scope が無く、`trigger` / `close-trigger` / `stage-trigger` の click、Escape 閉鎖、矢印キー移動は配線されていない
- `FloatingPanel::position_style` は `--fandhe-x` / `--fandhe-y` の CSS 変数語彙で座標を出力する。`drag-trigger` / `resize-trigger` パーツ、`data-dragging` / `data-topmost` / `data-behind`、`--width` / `--height` / `--z-index` は未提供
- `data-stage` 値語彙は `default` / `minimized` / `maximized`（`Stage::from_data_stage` あり）

## Related

- [dialog](./dialog.md)
