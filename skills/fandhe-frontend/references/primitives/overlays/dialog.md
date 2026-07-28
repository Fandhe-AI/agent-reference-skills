# Dialog

モーダルダイアログ。`role="dialog"`/`"alertdialog"` の切り替え、フォーカス管理を伴わない SSR/属性出力のみの headless 実装。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::dialog::{root, trigger, backdrop, positioner, content, title, description, close_trigger, DialogRole, ContentIds};
use fandhe_frontend_headless_ui::state::OpenState;

let node = root(
    OpenState::Closed,
    vec![],
    vec![
        trigger(OpenState::Closed, Some("d1"), vec![], vec![]),
        positioner(
            OpenState::Closed,
            vec![],
            vec![content(
                OpenState::Closed,
                DialogRole::Dialog,
                true,
                ContentIds { id: Some("d1"), labelledby: Some("d1-title"), describedby: None },
                vec![],
                vec![title(Some("d1-title"), vec![], vec![])],
            )],
        ),
    ],
);
```

状態機械は `Dialog::new(OpenState)` を経由し、`dispatch(&mut d, "open"/"close"/"toggle", "")` で遷移する。

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
| `root(state, attrs, children)` | `OpenState` | — | `data-state` へ反映 |
| `trigger(state, controls, attrs, children)` | `OpenState`, `Option<&str>` | — | `type="button"` 固定・`aria-haspopup="dialog"`・`aria-expanded`・`controls` が `Some` のとき `aria-controls` |
| `backdrop(state, attrs, children)` | `OpenState` | — | `aria-hidden="true"` 固定、closed で `hidden` |
| `positioner(state, attrs, children)` | `OpenState` | — | closed で `hidden` |
| `content(state, role_kind, modal, ids, attrs, children)` | `OpenState`, `DialogRole`, `bool`, `ContentIds` | — | `role`・`aria-modal`・`ids` の各フィールドが `Some` のとき `id`/`aria-labelledby`/`aria-describedby` |
| `title(id, attrs, children)` | `Option<&str>` | — | `id` が `Some` のとき出力（`h2`） |
| `description(id, attrs, children)` | `Option<&str>` | — | `id` が `Some` のとき出力（`p`） |
| `close_trigger(attrs, children)` | — | — | `type="button"` 固定 |
| `DialogRole` | `enum` | — | `Dialog`（`role="dialog"`）/ `Alertdialog`（`role="alertdialog"`） |
| `ContentIds<'a>` | `struct` | `default()` | `id` / `labelledby` / `describedby` の3フィールド（すべて `Option<&str>`） |

## Notes

- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui` クレート）
- フォーカストラップ・Escape キー閉鎖・外側クリック閉鎖・アニメーションは JS ランタイム側の責務でスコープ外
- ネイティブ `<dialog>` 要素は `core` のタグ語彙に存在しないため未採用

## Related

- [drawer](./drawer.md)
- [floating-panel](./floating-panel.md)
