# Drawer

画面端からスライドインするパネル。WAI-ARIA 上 Dialog パターンの変種であり、新規状態機械は作らず `dialog` モジュールの `Dialog` 状態機械を再利用する。追加するのは `data-scope="drawer"` の専用 anatomy と `DrawerPlacement`（`data-placement`）のみ。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::drawer::{root, trigger, backdrop, positioner, content, DrawerPlacement};
use fandhe_frontend_headless_ui::dialog::ContentIds;
use fandhe_frontend_headless_ui::state::OpenState;

let node = root(
    OpenState::Closed,
    DrawerPlacement::End,
    vec![],
    vec![
        trigger(OpenState::Closed, None, vec![], vec![]),
        positioner(
            OpenState::Closed,
            DrawerPlacement::End,
            vec![],
            vec![content(OpenState::Closed, DrawerPlacement::End, true, ContentIds::default(), vec![], vec![])],
        ),
    ],
);
```

状態機械は `Drawer::new(OpenState, DrawerPlacement)` を経由し、`dispatch(&mut d, "open"/"close"/"toggle", "")` で遷移する（内部で `Dialog` へ委譲）。

## Anatomy

```
trigger
root
  backdrop
  positioner
    content
      title
      description
      close-trigger
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root(state, placement, attrs, children)` | `OpenState`, `DrawerPlacement` | placement: `End` | `data-state`/`data-placement` へ反映 |
| `trigger(state, controls, attrs, children)` | `OpenState`, `Option<&str>` | — | `dialog::trigger` と同一契約 |
| `backdrop(state, attrs, children)` | `OpenState` | — | `dialog::backdrop` と同一契約 |
| `positioner(state, placement, attrs, children)` | `OpenState`, `DrawerPlacement` | — | closed で `hidden`、placement を `data-placement` へ反映 |
| `content(state, placement, modal, ids, attrs, children)` | `OpenState`, `DrawerPlacement`, `bool`, `ContentIds` | — | `role="dialog"` 固定（`Alertdialog` 相当は無し） |
| `title(id, attrs, children)` | `Option<&str>` | — | `dialog::title` と同一契約 |
| `description(id, attrs, children)` | `Option<&str>` | — | `dialog::description` と同一契約 |
| `close_trigger(attrs, children)` | — | — | `type="button"` 固定 |
| `DrawerPlacement` | `enum` | `End` | `Start` / `End` / `Top` / `Bottom`（`start`/`end` は論理方向） |

## Notes

- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui` クレート）
- Grabber / snapPoints / draggable 等のドラッグ操作は JS ランタイムの責務でスコープ外
- `fandhe-frontend-wasm-full` の `OverlayKind::from_scope` は `"drawer"` を未対応（fail-closed）

## Related

- [dialog](./dialog.md)
