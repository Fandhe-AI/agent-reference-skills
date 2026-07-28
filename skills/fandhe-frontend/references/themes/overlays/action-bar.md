# Action Bar

複数選択に対する一括操作を提示する、画面下端固定の操作バー（styled）。`fandhe-frontend-headless-ui` の `action_bar` を `pub use ...::*` でそのまま再エクスポートし、`stylesheet()` で既定 CSS を追加提供する薄いラッパー。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::action_bar::{
    root, positioner, content, selection_trigger, separator, close_trigger, stylesheet,
};
use fandhe_frontend_pre_styled_ui::action_bar::OpenState;

let css = stylesheet();
let node = root(
    OpenState::Open,
    vec![],
    vec![positioner(
        OpenState::Open,
        vec![],
        vec![content(
            OpenState::Open,
            "3 selected",
            vec![],
            vec![
                selection_trigger(vec![], vec![]),
                separator(vec![], vec![]),
                close_trigger(vec![], vec![]),
            ],
        )],
    )],
);
```

## Anatomy

```
root
  └─ positioner
      └─ content
          ├─ selection-trigger
          ├─ separator
          └─ close-trigger
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root`/`positioner`/`content`/`selection_trigger`/`separator`/`close_trigger` | — | — | headless `action_bar` の同名関数をそのまま再エクスポート（引数・挙動は変更なし） |
| `stylesheet()` | — | — | 既定 CSS 全量を返す（決定的）。`positioner` は画面下部中央固定（`position: fixed; bottom; left: 50%; transform: translateX(-50%)`）、`z-index: 900` |

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-pre-styled-ui` クレート）
- `size`/`color-palette` 等の variant クラスは持たない（`class` 属性を付与しない）
- closed 時は `positioner` に `[hidden] { display: none }` を明示上書きする規則を含む（`display: flex` の base 規則より優先）

## Related

- [primitives/overlays/action-bar](../../primitives/overlays/action-bar.md)
